/*
RTCP Feedback Message - refer to RFC4585

    0                   1                   2                   3
    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |V=2|P|   FMT   |       PT      |          length               |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                  SSRC of packet sender                        |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                  SSRC of media source                         |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   :            Feedback Control Information (FCI)                 :
   :                                                               :
*/
class RtpPacketWrapper {
    constructor(length) {
        this.data = new Uint8Array(length);
    }

    writeUint8(offset, value) {
        this.data[offset] = value & 0x000000ff;
    };
    
    writeUint16(offset, value) {
        this.data[offset] = value >>> 8 & 0x000000ff;
        this.data[offset + 1] = value & 0x000000ff;
    };
    
    writeUint32(offset, value) {
        this.data[offset] = value >>> 24 & 0x000000ff;
        this.data[offset + 1] = value >>> 16 & 0x000000ff;
        this.data[offset + 2] = value >>> 8 & 0x000000ff;
        this.data[offset + 3] = value & 0x000000ff;
    };

    readUint8 (offset) {
        return this.data[offset];
    };

    readUint16(offset) {
        return this.data[offset] << 8 | this.data[offset + 1];
    };

    readUint32(offset) {
        return this.data[offset] << 24 | this.data[offset + 1] << 16 | this.data[offset + 2] << 8 | this.data[offset + 3];
    };

    toHexString() { // buffer is an ArrayBuffer
        return Array.prototype.map.call(this.data, x => ('00' + x.toString(16)).slice(-2)).join('');
    };
    toBinaryString() {
        return Array.prototype.map.call(this.data, x => ('00000000' + x.toString(2)).slice(-8)).join(' ');
    }
};


console.log("--- Compose RTCP Feedback Message: PLI ---");
var wrapper = new RtpPacketWrapper(12);
var ssrc_sender = 0xff8800ff;
var ssrc_receiver = 0xff0088ff;

wrapper.writeUint8(0,0x81 );
wrapper.writeUint8(1,206 );
wrapper.writeUint16(2, 3 -1 );
wrapper.writeUint32(4, ssrc_sender);
wrapper.writeUint32(8, ssrc_receiver);

console.log("PLI packet:");
console.log(wrapper.toBinaryString());
console.log("Payload Type is", wrapper.readUint8(1));


