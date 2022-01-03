function factorial(n) {
    let result = 1;
    while(n) {
        result *= n--;
    }
    return result;
}


function createVideoFrame(frameWidth, frameHeight) {
    const pixelSize = 4;
    const init = {timestamp: 0, codedWidth: frameWidth, codedHeight: frameHeight, format: 'RGBA'};
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
    return new VideoFrame(data, init);
}

function encodeVideoFrame(videoFrame) {

}

function decodeVideoFrame(videoData) {
    
}

self.onmessage = ({data}) => {
    self.postMessage(`${data}! = ${factorial(data)}`);
};