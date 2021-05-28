var mediaButton = document.getElementById('openMedia');
var recordButton = document.getElementById('startRecord');
var playButton = document.getElementById('playRecord');
var downButton = document.getElementById('downRecord');

// define behaviour here
mediaButton.addEventListener('click', openMedia);
recordButton.addEventListener('click', startRecord);

playButton.addEventListener('click', playRecord);
downButton.addEventListener('click', downRecord);


var mediaConstraints = {
    audio:  {
        echoCancellation: {exact: true}
      }
};

var localStream = null;
var mediaRecorder = null;
var recordChunks = [];
var recordElement = document.querySelector('audio');

var canvas = document.getElementById("visualizer");
var canvasCtx = canvas.getContext("2d");

var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
var analyser = audioCtx.createAnalyser();
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
analyser.smoothingTimeConstant = 0.85;

async function openMedia(e, constraints) {
    if (mediaButton.textContent === 'Close Media') {
        closeMedia(e);
        return;
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
        handleSuccess(stream);

        mediaButton.textContent = 'Close Media';
        playButton.disabled = true;
        downButton.disabled = true;
    
        console.log('openMedia success ');
    } catch (ex) {
        handleError(ex);
    }
}

function closeMedia(e) {

    const stream = recordElement.srcObject;
    const tracks = stream.getTracks();
    
    tracks.forEach(function(track) {
        track.stop();
    });

    recordElement.srcObject = null;

    mediaButton.textContent = 'Open Media';

    console.log('closeMedia success ');
}

function handleSuccess(stream) {
    
    document.querySelector('audio').srcObject = stream;
    localStream = stream;

    var source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);

}

function handleError(error) {
    console.log('getUserMedia error: ', error);
}

function startRecord() {
    if(!localStream) {
        console.error("stream is not created.");
        return;
    }

    if (recordButton.textContent === 'Stop Record') {
        stopRecord();
        return;
    } 

    
    mediaRecorder = new MediaRecorder(localStream);
    
    mediaRecorder.start();

    recordButton.textContent = 'Stop Record';
    playButton.disabled = true;
    downButton.disabled = true;

    console.log("recorder started");

    mediaRecorder.ondataavailable = function(e) {
        console.log("data available", e.data);
        recordChunks.push(e.data);
    }

    mediaRecorder.onstop = function(e) {
        console.log('onstop fired');
        var blob = new Blob(recordChunks, { 'type' : 'audio/wav' });
        var blobURL = URL.createObjectURL(blob);
        const aLink = document.createElement('a');
        aLink.style.display = 'none';
        aLink.href = blobURL;
        aLink.download = 'test.wav';
        document.body.appendChild(aLink);
    };
    
    
}

function stopRecord() {

    if(!mediaRecorder) {
        console.error("stream is not created.");
        return;
    }
    mediaRecorder.stop();
    console.log("recorder stopped");

    recordButton.textContent = 'Start Record';
    playButton.disabled = false;
    downButton.disabled = false;
}

function playRecord() {
    const blob = new Blob(recordChunks, {type: 'audio/wav'});
    recordElement.src = null;
    recordElement.srcObject = null;
    recordElement.src = window.URL.createObjectURL(blob);
    recordElement.controls = true;
    recordElement.play();
}

function downRecord() {
    const blob = new Blob(recordChunks, {type: 'audio/wav'});
    const url = window.URL.createObjectURL(blob);
    const aLink = document.createElement('a');
    aLink.style.display = 'none';
    aLink.href = url;
    aLink.download = 'test.wav';
    document.body.appendChild(a);
    aLink.click();
    setTimeout(() => {
      document.body.removeChild(aLink);
      window.URL.revokeObjectURL(url);
    }, 100);
}

function draw(recordChunks) {

    //requestAnimationFrame(draw);
  
    analyser.getByteTimeDomainData(dataArray);
  
    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";
  
    canvasCtx.beginPath();
    var bufferLength = recordChunks.length;
    var sliceWidth = canvas.width * 1.0 / bufferLength;
    var x = 0;
  
    for (var i = 0; i < bufferLength; i++) {
  
      var v = recordChunks[i] / 128.0;
      var y = v * canvas.height / 2;
  
      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }
  
      x += sliceWidth;
    }
  
    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  }
