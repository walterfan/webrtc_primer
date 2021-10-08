

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

    this.audioElement = document.getElementById("localAudio");
    //this.remoteAudio = document.getElementById("remoteAudio");
};

RtcApp.prototype.startMedia = function(e) {
    e.preventDefault();
    console.log("--- startMedia ---");
    var me = this;
    this.audioContext = new AudioContext();
    var constraints = {
        audio: true
    };

    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
        /* use the stream */
        me.localStream = stream;
        me.audioElement.srcObject = stream;
        me.audioElement.play();

        const tracks = me.localStream.getAudioTracks();

        tracks.forEach(function(track) {
            console.log("track=", track);
        });
        //me.setupAudioNodes(stream);
    })
    .catch(function(err) {
        /* handle the error */
        console.log("getUserMedia error: ", err.message);
    });
};

RtcApp.prototype.stopMedia = function(e) {
    e.preventDefault();
    console.log("--- stopMedia ---");
    if(this.localStream) {

        const tracks = this.localStream.getTracks();

        tracks.forEach(function(track) {
            track.stop();
        });

        this.audioElement.srcObject = null;
        this.localStream = null;

        console.log('stopMedia success ');
    }

};