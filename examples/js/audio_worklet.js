// Hacks to deal with different function names in different browsers
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function(callback, element){
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.AudioContext = (function(){
    return  window.webkitAudioContext || window.AudioContext || window.mozAudioContext;
})();


function RtcApp() {
    this.localStream = null;
    this.audioContext = null;
    this.canvasContext = null;

    ;
    this.sourceNode = null;
    this.analyserNode = null;
    this.scriptNode = null;

    this.oscillatorNode = null
    this.gainNode = null;
    this.noiseGeneratorNode = null;

    this.sampleSize = 4096;
    this.amplitudeArray = null;

    this.canvasWidth  = 512;
    this.canvasHeight = 256;

    this.audioElement = null;
    this.canvasElement = null;

    this.controlMediaButton = null;
    this.controlRecordButton = null;
    this.playButton = null;
    this.downloadButton = null;

}

RtcApp.prototype.init = function() {
    console.log("--- init ---");

    this.audioElement = document.getElementById("myAudio");
    this.canvasElement = document.getElementById("myCanvas");

    this.controlMediaButton = document.getElementById("controlMedia");
    this.controlRecordButton = document.getElementById("controlRecord");

    this.makeNoiseButton = document.getElementById("makeNoise");

    this.playButton = document.getElementById("playRecord");
    this.downloadButton = document.getElementById("downloadRecord");

    this.canvasContext = this.canvasElement.getContext("2d");

    this.instantMeter = document.querySelector('#instant meter');
    this.instantValueDisplay = document.querySelector('#instant .value');
};

RtcApp.prototype.controlMedia=function(e) {

    if (this.controlMediaButton.textContent === 'Close Media') {
        this.closeMedia(e);
        return;
    }

    this.openMedia(e);
}

RtcApp.prototype.openMedia=async function (e) {
    console.log("--- openMedia ---");
    this.audioContext = this.audioContext || new AudioContext();
    this.soundMeter = this.soundMeter || new SoundMeter(this.audioContext);
    var mediaConstraints = {audio: true};
    try {
        const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);

        this.audioElement && (this.audioElement.srcObject = stream);
        this.localStream = stream;

        this.monitorVolume(stream);
        this.setupAudioNodes(stream);

        this.controlMediaButton && (this.controlMediaButton.textContent = 'Close Media');
        this.playButton && (this.playButton.disabled = true);
        this.downloadButton && (this.downloadButton.disabled = true);

        console.log('openMedia success ');
    } catch (ex) {
        console.error("openMedia error ", ex);
    }
}

RtcApp.prototype.monitorVolume = function(stream) {
    var me = this;
    me.soundMeter.connectToSource(stream, function(e) {
        if (e) {
            alert(e);
            return;
        }
        this.monitorVolumeTimer = setInterval(() => {
            me.instantMeter.value = me.instantValueDisplay.innerText =
                me.soundMeter.instant.toFixed(2);
/*            slowMeter.value = slowValueDisplay.innerText =
                soundMeter.slow.toFixed(2);
            clipMeter.value = clipValueDisplay.innerText =
                soundMeter.clip;*/
        }, 200);
    });
}



RtcApp.prototype.controlRecord=function() {
    console.log("--- controlRecord ---");
};

RtcApp.prototype.setupAudioNodes=function(stream) {
    console.log("--- setupAudioNodes ---", stream);
    this.sourceNode     =  this.audioContext.createMediaStreamSource(stream);
    this.analyserNode   = this.audioContext.createAnalyser();
    this.gainNode = new GainNode(this.audioContext);

    // Now connect the nodes together
    //this.sourceNode.connect(this.audioContext.destination);
    this.analyserNode.fftSize = 2048;
    this.amplitudeArray = new Uint8Array(this.analyserNode.frequencyBinCount);

    this.scriptNode = this.audioContext.createScriptProcessor(this.sampleSize, 1, 1);
    this.scriptNode.onaudioprocess = this.processMedia.bind(this);


    this.sourceNode.connect(this.analyserNode);
    this.analyserNode.connect(this.scriptNode);

    this.sourceNode.connect(this.gainNode);
    //this.gainNode.connect(this.audioContext.destination);

};

RtcApp.prototype.changeGainValue=function(value) {
    if(this.gainNode) {
        this.gainNode.gain.setValueAtTime(value, this.audioContext.currentTime);
    }

}

RtcApp.prototype.makeWhiteNoise = async function(e) {
    e.preventDefault();

    if(this.makeNoiseButton && (this.makeNoiseButton.textContent === 'Stop Noise')) {
        this.stopWhiteNoise();
        return;
    }

    console.log("--- makeWhiteNoise ---");
    try {
        var context = this.audioContext  = this.audioContext || new AudioContext();
        await context.audioWorklet.addModule('js/noise-generator.js');

        this.oscillatorNode = this.oscillatorNode || new OscillatorNode(context);
        this.gainNode = this.gainNode || new GainNode(context);
        this.noiseGeneratorNode = this.noiseGeneratorNode ||  new AudioWorkletNode(context, 'noise-generator');

        // Connect the oscillator to 'amplitude' AudioParam.
        const paramAmp = this.noiseGeneratorNode.parameters.get('amplitude');
        this.oscillatorNode.connect(this.gainNode).connect(paramAmp);

        this.oscillatorNode.frequency.value = 0.5;
        this.gainNode.gain.value = 0.75;

        this.noiseGeneratorNode.connect(context.destination);
        this.oscillatorNode.start();
        this.makeNoiseButton && (this.makeNoiseButton.textContent = 'Stop Noise');
    } catch(err) {
        console.error("error: ", err);
    }


}

RtcApp.prototype.stopWhiteNoise = function () {
    this.noiseGeneratorNode && this.noiseGeneratorNode.disconnect();
    this.oscillatorNode && this.oscillatorNode.stop();
    this.oscillatorNode = null;
    this.makeNoiseButton && (this.makeNoiseButton.textContent = 'Make Noise');
}


RtcApp.prototype.processMedia = function(event) {
    console.log("--- processMedia ---", event);
    var me = this;//this is script node

    var inputBuffer = event.inputBuffer;
    var inputData = inputBuffer.getChannelData(0);

    this.analyserNode.getByteTimeDomainData(this.amplitudeArray);
    requestAnimFrame(drawTimeDomain);

    function drawTimeDomain() {
        clearCanvas();
        for (let i = 0; i < me.amplitudeArray.length; i++) {
            let value = me.amplitudeArray[i] / 256;
            let y = me.canvasHeight - (me.canvasHeight * value) - 1;
            me.canvasContext.fillStyle = '#336699';
            me.canvasContext.fillRect(i, y, 1, 1);
        }
    }

    function clearCanvas() {
        me.canvasContext.clearRect(0, 0, me.canvasWidth, me.canvasHeight);
    }
};

RtcApp.prototype.closeMedia = function(e) {
    e.preventDefault();
    console.log("--- stopMedia ---");
    if(this.localStream) {

        this.sourceNode.disconnect(this.analyserNode);
        this.analyserNode.disconnect(this.scriptNode);
        this.scriptNode.disconnect();

        const tracks = this.localStream.getTracks();

        tracks.forEach(function(track) {
            track.stop();
        });

        this.audioElement && (this.audioElement.srcObject = null);
        this.localStream = null;

        if(this.monitorVolumeTimer) {
            clearInterval(this.monitorVolumeTimer);
        }

        console.log('stopMedia success ');
        this.controlMediaButton.textContent = 'Open Media';
    }

};

RtcApp.prototype.startRecord = function() {
    if(!this.localStream) {
        console.error("stream is not created.");
        return;
    }

    if (this.recordButton.textContent === 'Stop Record') {
        this.stopRecord();
        return;
    }


    this.mediaRecorder = this.mediaRecorder || new MediaRecorder(localStream);

    this.mediaRecorder.start();

    this.recordButton.textContent = 'Stop Record';
    this.playButton.disabled = true;
    this.downloadButton.disabled = true;

    console.log("recorder started");

    this.mediaRecorder.ondataavailable = function(e) {
        console.log("data available", e.data);
        this.recordChunks.push(e.data);
    }

    this.mediaRecorder.onstop = function(e) {
        console.log('onstop fired');
        var blob = new Blob(this.recordChunks, { 'type' : 'audio/wav' });
        var blobURL = URL.createObjectURL(blob);
        const aLink = document.createElement('a');
        aLink.style.display = 'none';
        aLink.href = blobURL;
        aLink.download = 'test.wav';
        document.body.appendChild(aLink);
    };


}

RtcApp.prototype.stopRecord = function() {

    if(!this.mediaRecorder) {
        console.error("stream is not created.");
        return;
    }
    this.mediaRecorder.stop();
    console.log("recorder stopped");

    this.recordButton.textContent = 'Start Record';
    this.playButton.disabled = false;
    this.downloadButton.disabled = false;
}

RtcApp.prototype.playRecord = function() {
    const blob = new Blob(this.recordChunks, {type: 'audio/wav'});
    this.recordElement.src = null;
    this.recordElement.srcObject = null;
    this.recordElement.src = window.URL.createObjectURL(blob);
    this.recordElement.controls = true;
    this.recordElement.play();
}

