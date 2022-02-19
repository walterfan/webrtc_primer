function RtcApp() {

    
    this.codecConfig = null;
   
    this.canvasWidth  = 1920;
    this.canvasHeight = 1080;

    this.srcCanvasElement = null;
    this.destCanvasElement = null;

    this.videoSource = "random";
    this.localVideoElement = null;

    this.srcCanvasScreen = null;
    this.destCanvasScreen = null;

    this.frameCounter = 0;
    this.frameRate = 30
    this.frameCount = 30;

    this.timepoints = [];
    this.encodedFrames = [];
}

RtcApp.prototype.init = function(codecConfig) {
    console.log("--- init ---", codecConfig);

    this.localVideoElement = document.querySelector('#localVideo');

    this.codecConfig = codecConfig;
    this.config = JSON.parse(codecConfig);
    
    this.frameRate = +this.config["frameRate"];
    this.frameCount = +this.config["frameCount"];

    this.srcCanvasElement = document.getElementById("srcCanvas");
    this.destCanvasElement = document.getElementById("destCanvas");
 
    this.closeMediaButton = document.getElementById("closeMedia");

    this.codecsWorker = new Worker("./js/webcodecs_worker.js");
    this.codecsWorker.onmessage = ({data}) => weblog(data);

    var command = { name: "init", data: { value: codecConfig}};
    this.codecsWorker.postMessage(command);
}

RtcApp.prototype.captureImages = function(imageCapture) {
    var me = this;

    this.inputCanvas = this.inputCanvas ||  window.document.createElement('canvas');
    this.inputContext = this.inputContext || this.inputCanvas.getContext('2d');

    this.inputContext.drawImage(this.localVideoElement, 0, 0, this.canvasWidth, this.canvasWidth);
    var rgbaArray = this.inputContext.getImageData(0, 0, this.canvasWidth, this.canvasWidth).data;

    var command = { name: "saveVideoFrame", data: { value: rgbaArray}};
    me.codecsWorker.postMessage(command, [rgbaArray.buffer]);
    
}


function doRepeatedly(callback, delay, repetitions) {
    var x = 0;
    var intervalID = window.setInterval(function () {

       callback();

       if (++x === repetitions) {
           window.clearInterval(intervalID);
       }
    }, delay);
}

RtcApp.prototype.closeVideoStream=function(e) {

    const stream = this.localVideoElement.srcObject;
    const tracks = stream.getTracks();
    e.target.disabled = true;
    if(!tracks) return;
    this.localVideoElement.controls = false;
    this.closeMediaButton.style.visibility = "hidden";
    tracks.forEach(function(track) {
      track.stop();
    });

}


RtcApp.prototype.attachVideoStream=function(stream) {

    this.localVideoStream = stream;
    this.localVideoElement.srcObject = stream;
    this.localVideoElement.controls = true;
    this.closeMediaButton.style.visibility = "visible";

    doRepeatedly(this.captureImages.bind(this), 1000/(this.frameRate), this.frameCount);
}

RtcApp.prototype.createVideoFrames=function(e) {
    var me = this;
    
    const videoSourceSelect = document.querySelector('select#videoSource');
    var videoSource = this.videoSource = videoSourceSelect.value;
    weblog("create video from " + this.videoSource);

    if(this.videoSource === "camera") {
        var constraints = {
            video: { width: this.canvasWidth, height: this.canvasHeight }
        };
        
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            me.attachVideoStream(stream).bind(me);
            
              
        })
        .catch(function(err) {
            weblog(err);
        });
     
    } else if(this.videoSource === "screen") {
        var constraints = {
            video: { width: this.canvasWidth, height: this.canvasHeight }
        };
        navigator.mediaDevices.getDisplayMedia(constraints)
        .then(function(stream) {
            me.attachVideoStream(stream);
   
        })
        .catch(function(err) {
            weblog(err);
        });
    } else {
        var command = { name: "createVideoFrames", data: { value: this.frameCount, source: this.videoSource}};
        this.codecsWorker.postMessage(command);
    }

    

    
}

RtcApp.prototype.encodeVideoFrames=function(e) {

    var command = { name: "encodeVideoFrames", data: { value: this.codecConfig}};
    this.codecsWorker.postMessage(command);
}

RtcApp.prototype.decodeVideoFrames=function(e) {

    var command = { name: "decodeVideoFrames", data: { value: this.codecConfig}};
    this.codecsWorker.postMessage(command);
}

RtcApp.prototype.renderOriginalFrames=function(e) {
    if(!this.srcCanvasScreen) this.srcCanvasScreen = this.srcCanvasElement.transferControlToOffscreen();
    var command = { name: "renderOriginalFrames", data: { value: this.srcCanvasScreen}};
    this.codecsWorker.postMessage(command, [this.srcCanvasScreen]);
}

RtcApp.prototype.renderDecodedFrames=function(e) {
    if(!this.destCanvasScreen) this.destCanvasScreen = this.destCanvasElement.transferControlToOffscreen();
    var command = { name: "renderDecodedFrames", data: { value: this.destCanvasScreen}};
    this.codecsWorker.postMessage(command, [this.destCanvasScreen]);
}