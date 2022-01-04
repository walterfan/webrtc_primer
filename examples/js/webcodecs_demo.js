function RtcApp() {

    this.canvasContext = null;

   
    this.canvasWidth  = 1920;
    this.canvasHeight = 1080;

    this.canvasElement = null;
    this.frameCounter = 0;

    this.timepoints = [];
    this.encodedFrames = [];
}

RtcApp.prototype.init = function() {
    console.log("--- init ---");

    this.canvasElement = document.getElementById("myCanvas");
    this.canvasContext = this.canvasElement.getContext("2d");

    this.codecsWorker = new Worker("./js/webcodecs_worker.js");
    this.codecsWorker.onmessage = ({data}) => weblog(data);

    var command = { name: "init", data: { value: 30}};
    this.codecsWorker.postMessage(command);
}



RtcApp.prototype.createVideoFrames=function(e) {

    var command = { name: "createVideoFrames", data: { value: 30}};
    this.codecsWorker.postMessage(command);
}

RtcApp.prototype.encodeVideoFrames=function(e) {

    var command = { name: "encodeVideoFrames", data: { value: 5}};
    this.codecsWorker.postMessage(command);
}

RtcApp.prototype.decodeVideoFrames=function(e) {

    var command = { name: "decodeVideoFrames", data: { value: 5}};
    this.codecsWorker.postMessage(command);
}

