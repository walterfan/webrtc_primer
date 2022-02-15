self.rtcWorker = new RtcWorker();

self.onmessage = function(event) {
    var command = event.data;
    var command_name = command && command.name;
    var command_data = command && command.data;
    console.log("begin onmessage: ", command);
    if (!(command_name && command_data)) {
        return;
    }
    var start_time = performance.now();
    if (command_name.match(/init/i)) {
        self.rtcWorker.initialize(command_data.value);
        self.postMessage(`Did ${command_name}: ${command_data.value} in ${performance.now() - start_time} ms`);
    } else  if (command_name.match(/createVideoFrames/i)) {
        self.rtcWorker.createVideoFrames(command_data.value);
        self.postMessage(`Did ${command_name}: ${command_data.value} in ${performance.now() - start_time} ms`);
    } else  if (command_name.match(/encodeVideoFrames/i)) {
        self.rtcWorker.encodeVideoFrames(command_data.value);
        self.postMessage(`Did ${command_name}: ${self.rtcWorker.encodedCount} in ${performance.now() - start_time} ms`);
    } else  if (command_name.match(/decodeVideoFrames/i)) {
        self.rtcWorker.decodeVideoFrames(command_data.value);
        self.postMessage(`Did ${command_name}: ${self.rtcWorker.decodedCount} in ${performance.now() - start_time} ms`);
    }

    
};

function RtcWorker() {
 
    this.canvasWidth  = 1920;
    this.canvasHeight = 1080;
    this.config = {};
    this.frameRate = 30;
    this.frameCount = 30;
    this.encodedCount = 0;
    this.decodedCount = 0;

    this.encodeTimepoints = [];
    this.decodeTimepoints = [];

    this.videoFrames = [];
    this.encodedFrames = [];
    this.decodedFrames = [];
}


RtcWorker.prototype.initialize = function(configuration) {
    this.config = JSON.parse(configuration);
    console.log("--- initialize ---", this.config);
    
    this.frameCount = this.config.frameCount;
    this.frameRate = this.config.frameRate;
    this.canvasWidth = this.config.width;
    this.canvasHeight = this.config.height;

    const initOfEncoder = {
        output: this.handleChunk.bind(this),
        error: this.handleError.bind(this)
      };

    const initOfDecoder = {
        output: this.handleFrame.bind(this),
        error: this.handleError.bind(this)
      };  
      //https://developer.mozilla.org/en-US/docs/Web/API/VideoEncoder/configure
      //avc codec string: https://www.w3.org/TR/webcodecs-avc-codec-registration/
    const config = {
        codec: 'avc1.42E01F', //H264: 42e01f
        width: this.canvasWidth,
        height: this.canvasHeight,
        bitrate: 12_000_000, // 2 Mbps
        framerate: 60
      };

      this.videoEncoder = new VideoEncoder(initOfEncoder);
      this.videoEncoder.configure(config);
      
      this.videoDecoder = new VideoDecoder(initOfDecoder);
      this.videoDecoder.configure(config);
}

RtcWorker.prototype.createVideoFrames = function() {
    console.log("--- createVideoFrames ---");

    //new VideoFrame(this.canvasElement, { timestamp: 0 });
    for(var i=0; i < this.frameCount; i++) {
        let videoFrame = this.createVideoFrame(performance.now() * 1000);
        this.videoFrames.push(videoFrame);
    }

};




RtcWorker.prototype.createVideoFrame=function(timestamp) {
    const pixelSize = 4;
    const init = {timestamp: timestamp, codedWidth: this.canvasWidth, codedHeight: this.canvasHeight, format: 'RGBA'};
    let data = new Uint8Array(init.codedWidth * init.codedHeight * pixelSize);
    for (let x = 0; x < init.codedWidth; x++) {
      for (let y = 0; y < init.codedHeight; y++) {
        let offset = (y * init.codedWidth + x) * pixelSize;
        data[offset] =  Math.random() * 255;      // Red
        data[offset + 1] =  Math.random() * 255;  // Green
        data[offset + 2] =  Math.random() * 255;  // Blue
        data[offset + 3] = Math.random() * 0x0FF; // Alpha
      }
    }
    let frame = new VideoFrame(data, init);
    return frame;
}

RtcWorker.prototype.encodeVideoFrames = async function(e) {
    console.log("--- encodeVideoFrames ---");
    for(var videoFrame of this.videoFrames) {
        
        const insert_keyframe = (this.encodedCount % 10) == 0;
        this.videoEncoder.encode(videoFrame, { keyFrame: insert_keyframe });
        videoFrame.close();
    }

    await this.videoEncoder.flush();
    
}



RtcWorker.prototype.handleChunk = function(chunk, metadata) {
    //console.log("handleChunk: ", chunk, metadata, " at ", performance.now());
    this.encodedCount++;
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
        description:  ArrayBuffer(41) //contain sps, pps, sei, etc .
        hardwareAcceleration: "no-preference"
    */
    this.encodeTimepoints.push(performance.now());

    let chunkData = new Uint8Array(chunk.byteLength);
    chunk.copyTo(chunkData);
    
    let chunkObj = new EncodedVideoChunk({
        timestamp: chunk.timestamp,
        duration: chunk.duration,
        type: chunk.type,
        data: chunkData
      });
  
    let frameData = {
        chunkObj: chunkObj,
        chunkConfig: metadata.decoderConfig
    }
      
    this.encodedFrames.push(frameData);

    if(this.encodedCount >= 30) 
        this.checkPerformance("encode");
    
}

RtcWorker.prototype.handleFrame = function(frame) {
    //console.log("--- handleFrame ---", this.decodedCount);
    this.decodedCount++;
    this.decodeTimepoints.push(performance.now());
    this.decodedFrames.push(frame);

    if(this.decodedCount >= 30) 
        this.checkPerformance("decode");
}

RtcWorker.prototype.handleError = function(e) {
    console.log("error: ", e);
    self.postMessage(e.message);
}

RtcWorker.prototype.decodeVideoFrames = async function() {
    console.log("--- decodeVideoFrames ---");
    var keyFrameCount = 0;
    for (var frameData of this.encodedFrames) {
        var chunk = frameData.chunkObj;
        //console.log("chunk=", frameData);
        if (chunk.type === "key") { 
            keyFrameCount++;
            this.videoDecoder.configure(frameData.chunkConfig);
        }
        
        if (keyFrameCount === 0) continue;

        this.videoDecoder.decode(chunk);
    }
    await this.videoDecoder.flush();
}

RtcWorker.prototype.checkPerformance=function(category) {
    console.log("--- checkPerformance ---", category);
    if("encode" === category) {
        var duration = this.encodeTimepoints[29] - this.encodeTimepoints[0];
        //console.log("encodeTimepoints: ",  this.encodeTimepoints);
        self.postMessage(`Spent ${duration} ms to encode ${this.encodedCount} video frames`);
    } else {
        var duration = this.decodeTimepoints[29] - this.decodeTimepoints[0];
        //console.log("encodeTimepoints: ",  this.encodeTimepoints);
        self.postMessage(`Spent ${duration} ms to decode ${this.decodedCount} video frames`);
    }
    
}




