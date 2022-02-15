function RtcApp() {

    
    this.codecConfig = null;
   
    this.canvasWidth  = 1920;
    this.canvasHeight = 1080;

    this.srcCanvasElement = null;
    this.destCanvasElement = null;

    this.srcCanvasScreen = null;
    this.destCanvasScreen = null;

    this.frameCounter = 0;

    this.timepoints = [];
    this.encodedFrames = [];
}

RtcApp.prototype.init = function(codecConfig) {
    console.log("--- init ---");
    this.codecConfig = codecConfig;
    this.config = JSON.parse(codecConfig);

    this.srcCanvasElement = document.getElementById("srcCanvas");
    this.destCanvasElement = document.getElementById("destCanvas");
 

    this.codecsWorker = new Worker("./js/webcodecs_worker.js");
    this.codecsWorker.onmessage = ({data}) => weblog(data);

    var command = { name: "init", data: { value: codecConfig}};
    this.codecsWorker.postMessage(command);
}



RtcApp.prototype.createVideoFrames=function(e) {

    var command = { name: "createVideoFrames", data: { value: 30}};
    this.codecsWorker.postMessage(command);
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