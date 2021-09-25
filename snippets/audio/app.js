

function RtcApp() {

    this.localStream = null;
    this.audioContext = null;
    this.canvasContext = null;

    this.audioElement = null;
    this.canvasElement = null;

    this.audioBuffer = null;
    this.sourceNode = null;
    this.analyserNode = null;
    this.javascriptNode = null;

    this.sampleSize = 4096;
    this.amplitudeArray = null;

    this.canvasWidth  = 512;
    this.canvasHeight = 256;
}

RtcApp.prototype.init = function() {
    console.log("--- init ---");

    this.localAudio = document.getElementById("localAudio");
    this.remoteAudio = document.getElementById("remoteAudio");
};