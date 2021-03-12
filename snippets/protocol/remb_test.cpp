// Receiver Estimated Max Bitrate (REMB) (draft-alvestrand-rmcat-remb).
//
//     0                   1                   2                   3
//     0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
//    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//    |V=2|P| FMT=15  |   PT=206      |             length            |
//    +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
//  0 |                  SSRC of packet sender                        |
//    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//  4 |                       Unused = 0                              |
//    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//  8 |  Unique identifier 'R' 'E' 'M' 'B'                            |
//    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// 12 |  Num SSRC     | BR Exp    |  BR Mantissa                      |
//    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
// 16 |   SSRC feedback                                               |
//    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
//    :  ...                                                          :


//refer to https://github.com/walterfan/webrtc/blob/master/modules/rtp_rtcp/source/rtcp_packet/remb.h
#include <iostream>
#include "rtp_header.h"

using namespace std;

#define msg_trace(msg) {\
    cout<<"["<<__FILE__<<","<<__LINE__<<"]\t"<<msg<<std::endl;\
}

const string MEDIA_PATH = "../../../media";
const string IMAGE_FILE = MEDIA_PATH + "/lena.jpg";
const string TS_FILE = MEDIA_PATH + "/lena.jpg";
const string WAV_FILE = MEDIA_PATH + "/cat.wav";

int main(int argc, char *argv[])
{
     msg_trace("--- remb test ---");
}