'use strict';

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const callButton = document.getElementById('callButton');
const hangupButton = document.getElementById('hangupButton');

const sdpButton = document.getElementById('sdpButton');
const outputTextarea = document.querySelector('textarea#output');

stopButton.disabled = true;
callButton.disabled = true;
hangupButton.disabled = true;

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
callButton.addEventListener('click', call);
hangupButton.addEventListener('click', hangup);

let startTime;
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo')

localVideo.addEventListener('loadedmetadata', function() {
  console.log(`Local video videoWidth: ${this.videoWidth}px,  videoHeight: ${this.videoHeight}px`);
});

remoteVideo.addEventListener('loadedmetadata', function() {
  console.log(`Remote video videoWidth: ${this.videoWidth}px,  videoHeight: ${this.videoHeight}px`);
});

remoteVideo.addEventListener('resize', () => {
  console.log(`Remote video size changed to ${remoteVideo.videoWidth}x${remoteVideo.videoHeight}`);
  // We'll use the first onsize callback as an indication that video has started
  // playing out.
  if (startTime) {
    const elapsedTime = window.performance.now() - startTime;
    console.log('Setup time: ' + elapsedTime.toFixed(3) + 'ms');
    startTime = null;
  }
});

let localStream;
let pc1;
let pc2;

const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1,
  iceRestart:true,
  voiceActivityDetection: true
};



function getName(pc) {
  return (pc === pc1) ? 'pc1' : 'pc2';
}

function getOtherPc(pc) {
  return (pc === pc1) ? pc2 : pc1;
}

//start the video stream

async function start() {
  console.log('Requesting local stream');
  startButton.disabled = true;
  stopButton.disabled = false;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({audio: false, video: true});
    weblog('Received local stream');
    localVideo.srcObject = stream;
    localStream = stream;
    callButton.disabled = false;
  } catch (e) {
    alert(`getUserMedia() error: ${e.name}`);
  }
}

  function stop(e) {
        const stream = localVideo.srcObject;
        const tracks = stream.getTracks();
        e.target.disabled = true;
        startButton.disabled = false;
        callButton.disabled = true;
        tracks.forEach(function(track) {
            track.stop();
        });
    
        localVideo.srcObject = null;
    }

  
  function getSelectedSdpSemantics() {
    const sdpSemanticsSelect = document.querySelector('#sdpSemantics');
    const option = sdpSemanticsSelect.options[sdpSemanticsSelect.selectedIndex];
    return option.value === '' ? {} : {sdpSemantics: option.value};
  }

  //call the remote peer
  async function call() {
    callButton.disabled = true;
    hangupButton.disabled = false;
    weblog('Starting call');
    startTime = window.performance.now();
    const videoTracks = localStream.getVideoTracks();
    const audioTracks = localStream.getAudioTracks();
    if (videoTracks.length > 0) {
      weblog(`Using video device: ${videoTracks[0].label}`);
    }
    if (audioTracks.length > 0) {
      weblog(`Using audio device: ${audioTracks[0].label}`);
    }
    const configuration = getSelectedSdpSemantics();
    weblog('RTCPeerConnection configuration:', configuration);
    pc1 = new RTCPeerConnection(configuration);
    weblog('Created local peer connection object pc1', configuration);
    pc1.addEventListener('icecandidate', e => onIceCandidate(pc1, e));
    pc2 = new RTCPeerConnection(configuration);
    weblog('Created remote peer connection object pc2');
    pc2.addEventListener('icecandidate', e => onIceCandidate(pc2, e));
    pc1.addEventListener('iceconnectionstatechange', e => onIceStateChange(pc1, e));
    pc2.addEventListener('iceconnectionstatechange', e => onIceStateChange(pc2, e));
    pc2.addEventListener('track', gotRemoteStream);

    //localStream.getTracks().forEach(track => pc1.addTrack(track, localStream));


    for(const audioTrack of localStream.getAudioTracks()) {
      pc1.addTransceiver(audioTrack, {direction:  'sendrecv', streams: [localStream]});
    }

    var encodings = [
        {rid: 'high', maxBitrate: 2500000, active: true, maxBitrate: 5000000000},
        {rid: 'middle', maxBitrate: 1500000, active: true, scaleResolutionDownBy: 2.0},
        {rid: 'low', maxBitrate: 800000, active: true, scaleResolutionDownBy: 4.0}
    ];

    for(const videoTrack of localStream.getVideoTracks()) {

        pc1.addTransceiver(videoTrack, {direction:  'sendrecv',
          sendEncodings: encodings, streams: [localStream]});

    }

    weblog('Added local stream to pc1');

    try {
      weblog('pc1 createOffer start');
      const offer = await pc1.createOffer(offerOptions);
      await onCreateOfferSuccess(offer);
    } catch (e) {
      onCreateSessionDescriptionError(e);
    }
  }
  

  function onCreateSessionDescriptionError(error) {
    console.log(`Failed to create session description: ${error.toString()}`);
  }
  
  async function onCreateOfferSuccess(desc) {
    var strSdp =  desc.sdp.replaceAll("\r\n", "<br/>");
    weblog(`Offer from pc1\n${strSdp}`);

    //document.getElementById("sdpDiv").innerHTML = "Offer: " + desc.sdp.replaceAll("\r\n", "<br/>");

    weblog('pc1 setLocalDescription start');
    try {
      await pc1.setLocalDescription(desc);
      onSetLocalSuccess(pc1);
    } catch (e) {
      onSetSessionDescriptionError();
    }
  
    weblog('pc2 setRemoteDescription start');
    try {
      await pc2.setRemoteDescription(desc);
      onSetRemoteSuccess(pc2);
    } catch (e) {
      onSetSessionDescriptionError();
    }
  
    weblog('pc2 createAnswer start');
    // Since the 'remote' side has no media stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    try {
      const answer = await pc2.createAnswer();
      await onCreateAnswerSuccess(answer);
    } catch (e) {
      onCreateSessionDescriptionError(e);
    }
  }
  
  function onSetLocalSuccess(pc) {
    weblog(`${getName(pc)} setLocalDescription complete`);
  }
  
  function onSetRemoteSuccess(pc) {
    weblog(`${getName(pc)} setRemoteDescription complete`);
  }
  
  function onSetSessionDescriptionError(error) {
    weblog(`Failed to set session description: ${error.toString()}`);
  }

  function gotRemoteStream(e) {
    
    if (remoteVideo.srcObject !== e.streams[0]) {
      remoteVideo.srcObject = e.streams[0];
      weblog('pc2 received remote stream');
    }
  }
  
  async function onCreateAnswerSuccess(desc) {
    var strSdp =  desc.sdp.replaceAll("\r\n", "<br/>");
    weblog(`Answer from pc2:\n${strSdp}`);
    weblog('pc2 setLocalDescription start');
    try {
      await pc2.setLocalDescription(desc);
      onSetLocalSuccess(pc2);
    } catch (e) {
      onSetSessionDescriptionError(e);
    }
    console.log('pc1 setRemoteDescription start');
    try {
      await pc1.setRemoteDescription(desc);
      onSetRemoteSuccess(pc1);
    } catch (e) {
      onSetSessionDescriptionError(e);
    }
  }
  
  async function onIceCandidate(pc, event) {
    try {
      await (getOtherPc(pc).addIceCandidate(event.candidate));
      onAddIceCandidateSuccess(pc);
    } catch (e) {
      onAddIceCandidateError(pc, e);
    }
    console.log(`${getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
  }
  
  function onAddIceCandidateSuccess(pc) {
    weblog(`${getName(pc)} addIceCandidate success`);
  }
  
  function onAddIceCandidateError(pc, error) {
    weblog(`${getName(pc)} failed to add ICE Candidate: ${error.toString()}`);
  }
  
  function onIceStateChange(pc, event) {
    if (pc) {
      weblog(`${getName(pc)} ICE state: ${pc.iceConnectionState}`);
      weblog('ICE state change event: ', JSON.stringify(event));
    }
  }
  
  function hangup() {
    weblog('Ending call');
    pc1.close();
    pc2.close();
    pc1 = null;
    pc2 = null;
    hangupButton.disabled = true;
    callButton.disabled = false;
  }


  function displayDivOrNot(btnElement, divElement) {
    if(btnElement.innerText === "hide") {
        divElement.style.display = "none";
        btnElement.innerText = "display";
    } else {
        divElement.style.display = "block";
        btnElement.innerText = "hide";
    }
  }