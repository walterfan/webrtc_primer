'use strict';

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const joinButton = document.getElementById('joinButton');
const leaveButton = document.getElementById('leaveButton');

stopButton.disabled = true;
//leaveButton.disabled = true;


startButton.addEventListener('click', startMedia);
stopButton.addEventListener('click', stopMedia);
joinButton.addEventListener('click', join);
leaveButton.addEventListener('click', hangup);

// Should use navigator.mediaDevices.getUserMedia of webrtc adapter

// Clean-up function:
// collect garbage before unloading browser's window
window.onbeforeunload = function(e){
	hangup();
}


// HTML5 <video> elements
var localVideo = document.querySelector('#localVideo');
var remoteVideo = document.querySelector('#remoteVideo');

// Flags...
var isChannelReady = false;
var isInitiator = false;
var isStarted  = false;

// WebRTC data structures
// Streams
var localStream;
var remoteStream;

// Peer Connection
var pc;

// Peer Connection ICE protocol configuration (either Firefox or Chrome)
var pc_config = webrtcDetectedBrowser === 'firefox' ?
  {'iceServers':[{'urls':'stun:23.21.150.121'}]} : // IP address
  {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]};

// Peer Connection contraints: (i) use DTLS; (ii) use data channel
var pc_constraints = {
  'optional': [
    {'DtlsSrtpKeyAgreement': true}
  ]};

// Session Description Protocol constraints:
// - use both audio and video regardless of what devices are available
//var sdpConstraints = {'mandatory': {
//  'OfferToReceiveAudio':true,
//  'OfferToReceiveVideo':true }};

var sdpConstraints = webrtcDetectedBrowser === 'firefox' ?
		{'offerToReceiveAudio':true,'offerToReceiveVideo':true } :
		{'mandatory': {'OfferToReceiveAudio':true, 'OfferToReceiveVideo':true }};


/////////////////////////////////////////////

// Set getUserMedia constraints
const gdmOptions = {
  video: {
    cursor: "motion"
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100
  }
}


var socket = io.connect();

// From this point on, execution proceeds based on asynchronous events...
async function join() {
  // Connect to signalling server
  var room = document.getElementById("roomName").value;

  // Send 'Create or join' message to singnalling server
  if (room !== '') {
    weblog('Create or join room ' + room);
    socket.emit('create or join', room);
  }
}
/////////////////////////////////////////////
async function startMedia() {
  try {
    var captureStream = await navigator.mediaDevices.getDisplayMedia(gdmOptions);
    dumpTracksInfo(captureStream);
    handleUserMedia(captureStream);
  } catch (ex) {
    handleUserMediaError(ex);
  }
}

function stopMedia() {
  let tracks = localVideo.srcObject.getTracks();

  tracks.forEach(track => track.stop());
  localVideo.srcObject = null;
}

function dumpTracksInfo(stream) {
  const tracks = stream.getTracks();
  tracks.forEach(track => {
    weblog("<pre>Track Capabilities:\n" + JSON.stringify(track.getCapabilities(), null, 2) +
      "\nTrack settings:\n" + JSON.stringify(track.getSettings(), null, 2) + 
      "\nTrack constraints:\n" + JSON.stringify(track.getConstraints(), null, 2) + "</pre>");
  });
  
}

// getUserMedia() handlers...
/////////////////////////////////////////////
function handleUserMedia(stream) {
	localStream = stream;
	attachMediaStream(localVideo, stream);
  

  stream.getVideoTracks().forEach(track => {
      track.onended = function () {
        startButton.disabled = false;
      };
  });
  
  

	weblog('Add local stream.');

	startButton.disabled = true;
	stopButton.disabled = false;
	sendMessage('got user media');
	if (isInitiator && isChannelReady) {
		startCall();
	}
}

function handleUserMediaError(error){
	weblog('Erroe getDisplayMedia error: ' +  error);
}
/////////////////////////////////////////////


// Server-mediated message exchanging...
/////////////////////////////////////////////

// 1. Server-->Client...
/////////////////////////////////////////////

// Handle 'created' message coming back from server:
// this peer is the initiator
socket.on('created', function (room){
  weblog('Created room ' + room);
  isInitiator = true; 
  if(isChannelReady) {
    startCall();
  }
});

// Handle 'full' message coming back from server:
// this peer arrived too late :-(
socket.on('full', function (room){
  weblog('Room ' + room + ' is full');
});

// Handle 'join' message coming back from server:
// another peer is joining the channel
socket.on('join', function (room){
  weblog('onJoin - another peer made a request to join room ' + room);
  weblog('This peer is the host of room ' + room + '!');
  isChannelReady = true;
  startCall();
});

// Handle 'joined' message coming back from server:
// this is the second peer joining the channel
socket.on('joined', function (room){
  weblog('onJoined - this peer has joined room ' + room);
  isChannelReady = true;
  startCall();
});

// Server-sent log message...
socket.on('log', function (array){
  console.log.apply(console, array);
});

// Receive message from the other peer via the signalling server
socket.on('message', function (message){
  weblog('onMessage: Received message: <pre>' +  JSON.stringify(message, null, 2) + "</pre>");
  if (message === 'got user media') {
      startCall();
  } else if (message.type === 'offer') {
    isInitiator = false; 
    startCall();
    if(pc) {
      pc.setRemoteDescription(new RTCSessionDescription(message));
      doAnswer();
    }
    
  } else if (message.type === 'answer' && isStarted) {
    pc.setRemoteDescription(new RTCSessionDescription(message));
  } else if (message.type === 'candidate' && isStarted) {
    var candidate = new RTCIceCandidate({sdpMLineIndex:message.label,
      candidate:message.candidate});
    pc.addIceCandidate(candidate);
  } else if (message === 'bye' && isStarted) {
    handleRemoteHangup();
  }
});
////////////////////////////////////////////////

// 2. Client-->Server
////////////////////////////////////////////////
// Send message to the other peer via the signalling server
function sendMessage(message){
  weblog('Sending message: <pre>' + JSON.stringify(message, null, 2) + "</pre>");
  socket.emit('message', message);
}
////////////////////////////////////////////////////

////////////////////////////////////////////////////
// Channel negotiation trigger function
function startCall() {
  weblog('startCall: isStarted='+ isStarted + ", isChannelReady=" +  isChannelReady + ",isInitiator=" + isInitiator);
  if (isChannelReady) {
    if(!pc)
      pc = createPeerConnection();
    if(localStream) {
      pc.addStream(localStream);
    }
     
    isStarted = true;
    var state = pc.signalingState;
    weblog("state=", state);
    if(!state || state == "stable") {
      pc.createOffer(setLocalAndSendMessage, onSignalingError, sdpConstraints);
    } else {
      pc.createAnswer(setLocalAndSendMessage, onSignalingError, sdpConstraints);
    }
    
  }
}

/////////////////////////////////////////////////////////
// Peer Connection management...
function createPeerConnection() {
  try {
    pc = new RTCPeerConnection(pc_config, pc_constraints);
    pc.onicecandidate = handleIceCandidate;
    pc.onaddstream = handleRemoteStreamAdded;
    pc.onremovestream = handleRemoteStreamRemoved;

    weblog('Created RTCPeerConnnection with:\n' +
      '  config: \'' + JSON.stringify(pc_config) + '\';\n' +
      '  constraints: \'' + JSON.stringify(pc_constraints) + '\'.');
  } catch (e) {
    weblog('Failed to create PeerConnection, exception: ' + e.message);
    alert('Cannot create RTCPeerConnection object.');
      return;
  }
  
  return pc;
}

// Data channel management
function sendData() {
  var data = sendTextarea.value;
  if(isInitiator) sendChannel.send(data);
  else receiveChannel.send(data);
  trace('Sent data: ' + data);
}

// Handlers...

function gotReceiveChannel(event) {
  trace('Receive Channel Callback');
  receiveChannel = event.channel;
  receiveChannel.onmessage = handleMessage;
  receiveChannel.onopen = handleReceiveChannelStateChange;
  receiveChannel.onclose = handleReceiveChannelStateChange;
}

function handleMessage(event) {
  weblog('Received message: ' + event.data);
  receiveTextarea.value += event.data + '\n';
}

// ICE candidates management
function handleIceCandidate(event) {
  weblog('handleIceCandidate event: ' + JSON.stringify( event));
  if (event.candidate) {
    sendMessage({
      type: 'candidate',
      label: event.candidate.sdpMLineIndex,
      id: event.candidate.sdpMid,
      candidate: event.candidate.candidate});
  } else {
    weblog('End of candidates.');
  }
}

// Signalling error handler
function onSignalingError(error) {
	weblog('Failed to create signaling message : ' , error);
}

// Create Answer
function doAnswer() {
  weblog('Sending answer to peer.');
  pc.createAnswer(setLocalAndSendMessage, onSignalingError, sdpConstraints);
}

// Success handler for both createOffer()
// and createAnswer()
function setLocalAndSendMessage(sessionDescription) {
  pc.setLocalDescription(sessionDescription);

  let lines = sessionDescription.sdp.split('\r\n');
  let newLines = [];
  var isInVPx = false;

  lines.forEach(function(line) {
    if (line.indexOf('m=video') === 0) {
      var newLine = line.replace('96 97 98 99 100 101 122', '');
      newLines.push(newLine);
      weblog('video codec: ' , newLine);
    } else if (line.indexOf('a=rtpmap:') === 0) {     
      let parts = line.substr(9).split(' ');
      let codec = parts[1];
      if(codec === 'VP8/90000' || codec == 'VP9/90000') {
        isInVPx = true;
      }
      if(codec == 'H264/90000') {
        isInVPx = false;
      }
      if(!isInVPx) {
        newLines.push(line);
      }
      
      weblog('codec: ' , parts[0], parts[1], isInVPx);
    } else {
      if(isInVPx) {
        weblog("ignore ", line );
      } else {
        newLines.push(line);
      }
      
    }
  })
  sessionDescription.sdp = newLines.join('\r\n')

  sendMessage(sessionDescription);
}

/////////////////////////////////////////////////////////
// Remote stream handlers...

function handleRemoteStreamAdded(event) {
  weblog('Remote stream added.');
  remoteStream = event.stream;
  attachMediaStream(remoteVideo, remoteStream);
  
}

function handleRemoteStreamRemoved(event) {
  weblog('Remote stream removed.');
  console.log('Remote stream removed. Event: ', event);
}
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
// Clean-up functions...

function hangup() {
  console.log('Hanging up.');
  closeConnection();
  sendMessage('bye');
}

function handleRemoteHangup() {
  console.log('Session terminated.');
  closeConnection();
  isInitiator = false;
}

function closeConnection() {
  isStarted = false;
  if (sendChannel) sendChannel.close();
  if (receiveChannel) receiveChannel.close();
  if (pc) pc.close();
  pc = null;
  sendButton.disabled=true;
}

///////////////////////////////////////////