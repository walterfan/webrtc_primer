function RtcApp() {

    this.canvasContext = null;

   
    this.canvasWidth  = 640;
    this.canvasHeight = 480;

    this.canvasElement = null;
}

RtcApp.prototype.init = function() {
    console.log("--- init ---");

    this.canvasElement = document.getElementById("myCanvas");
    this.canvasContext = this.canvasElement.getContext("2d");

    this.codecsWorker = new Worker("./js/webcodecs_worker.js");

};

RtcApp.prototype.videoEncode=function(e) {
    console.log("--- videoEncode ---");

    let frame_from_canvas = new VideoFrame(this.canvasElement, { timestamp: 0 });

    const pixelSize = 4;
    const init = {timestamp: 0, codedWidth: this.canvasWidth , codedHeight: this.canvasHeight, format: 'RGBA'};
    let data = new Uint8Array(init.codedWidth * init.codedHeight * pixelSize);
    for (let x = 0; x < init.codedWidth; x++) {
    for (let y = 0; y < init.codedHeight; y++) {
        let offset = (y * init.codedWidth + x) * pixelSize;
        data[offset] = 0x7F;      // Red
        data[offset + 1] = 0xFF;  // Green
        data[offset + 2] = 0xD4;  // Blue
        data[offset + 3] = 0x0FF; // Alpha
    }
    }
    let frame = new VideoFrame(data, init);

}


RtcApp.prototype.videoDecode=function(e) {
    console.log("--- videoDecode ---");
}

RtcApp.prototype.drawRandomImage=function(e) {
    console.log("--- drawRandomImage ---");
    if(this.countDownTimer) clearInterval(this.countDownTimer);
    this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    var imageData = this.canvasContext.createImageData(this.canvasWidth, this.canvasHeight);

    for (var x = 0; x < imageData.width; x++)
    {
        for (var y = 0; y < imageData.height; y++)
        {
            setPixel(imageData, x, y, getRandomNum(0,255), getRandomNum(0,255), getRandomNum(0,255), getRandomNum(0,255));
        }
    }

    this.canvasContext.putImageData(imageData, 0, 0);
}


