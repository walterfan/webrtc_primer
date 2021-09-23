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
    
    this.audioElement = document.getElementById("myAudio");
    this.canvasElement = document.getElementById("myCanvas");

    this.canvasContext = this.canvasElement.getContext("2d");
};



RtcApp.prototype.setupAudioNodes=function(stream) {
    console.log("--- setupAudioNodes ---", stream);
    this.sourceNode     =  this.audioContext.createMediaStreamSource(stream);
    this.analyserNode   = this.audioContext.createAnalyser();
   
    // Now connect the nodes together
    //this.sourceNode.connect(this.audioContext.destination);
    this.analyserNode.fftSize = 2048;
    this.amplitudeArray = new Uint8Array(this.analyserNode.frequencyBinCount);

    this.javascriptNode = this.audioContext.createScriptProcessor(this.sampleSize, 1, 1);
    this.javascriptNode.onaudioprocess = this.processMedia.bind(this);


    this.sourceNode.connect(this.analyserNode);
    //this.sourceNode.connect(this.javascriptNode);
    this.analyserNode.connect(this.javascriptNode);
    this.javascriptNode.connect(this.audioContext.destination);
};

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
}

RtcApp.prototype.stopMedia = function(e) {
    e.preventDefault();
    console.log("--- stopMedia ---");
    if(this.localStream) {

        this.sourceNode.disconnect(this.analyserNode);
        this.analyserNode.disconnect(this.javascriptNode);
        this.javascriptNode.disconnect();

        const tracks = this.localStream.getTracks();

        tracks.forEach(function(track) {
            track.stop();
        });

        this.audioElement.srcObject = null;
        this.localStream = null;

        console.log('stopMedia success ');
    }

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
        me.setupAudioNodes(stream);
    })
    .catch(function(err) {
        /* handle the error */
        console.log("getUserMedia error: ", err.message);
    });
};
