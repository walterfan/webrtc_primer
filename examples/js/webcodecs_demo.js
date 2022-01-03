function RtcApp() {

    this.canvasContext = null;

   
    this.canvasWidth  = 640;
    this.canvasHeight = 480;

    this.canvasElement = null;
    this.frameCounter = 0;

    this.timepoints = [];
}

RtcApp.prototype.init = function() {
    console.log("--- init ---");

    this.canvasElement = document.getElementById("myCanvas");
    this.canvasContext = this.canvasElement.getContext("2d");

    this.codecsWorker = new Worker("./js/webcodecs_worker.js");


    const init = {
        output: this.handleChunk,
        error: this.handleError
      };
      //https://developer.mozilla.org/en-US/docs/Web/API/VideoEncoder/configure
      //avc codec string: https://www.w3.org/TR/webcodecs-avc-codec-registration/
      let config = {
        codec: 'avc1.42E01F', //H264: 42e01f
        width: 640,
        height: 480,
        bitrate: 2_000_000, // 2 Mbps
        framerate: 30,
      };
      
      this.videoEncoder = new VideoEncoder(init);
      this.videoEncoder.configure(config);

};

RtcApp.prototype.test = function() {
    console.log("--- test ---");
    this.codecsWorker.onmessage = ({data}) => console.log(data);
    this.codecsWorker.postMessage(5);
}


RtcApp.prototype.createVideoFrame=function() {
    const pixelSize = 4;
    const init = {timestamp: 0, codedWidth: 320, codedHeight: 200, format: 'RGBA'};
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
    return frame;
}

RtcApp.prototype.videoEncode=function(e) {
    console.log("--- videoEncode ---");

    let videoFrame = new VideoFrame(this.canvasElement, { timestamp: 0 });

    this.frameCounter++;
    const insert_keyframe = (this.frameCounter % 10) == 0;
    this.videoEncoder.encode(videoFrame, { keyFrame: insert_keyframe });
    videoFrame.close();
}

RtcApp.prototype.handleChunk=function(chunk, metadata) {
    console.log("handleChunk: ", chunk, metadata, " at ", performance.now());

    /*
    chunk: EncodedVideoChunk
        byteLength: 57170
        duration: 0
        timestamp: 0
        type: "key"
    metadata: decoderConfig
        codec: "avc1.42E01F"
        codedHeight: 480
        codedWidth: 640
        colorSpace: {fullRange: false, matrix: 'smpte170m', primaries: 'smpte170m', transfer: 'smpte170m'}
        description:  ArrayBuffer(41)
        hardwareAcceleration: "no-preference"
    */
    this.timepoints.push(performance.now());
    let chunkData = new Uint8Array(chunk.byteLength);
    chunk.copyTo(chunkData);
}
RtcApp.prototype.handleError = function(e) {
    console.log("error: ", e);
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


