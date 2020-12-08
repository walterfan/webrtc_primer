# examples

## Video Chat

* offer:

```
  sdp: 'v=0\r\n' +
    'o=- 1732992172565611611 2 IN IP4 127.0.0.1\r\n' +
    's=-\r\n' +
    't=0 0\r\n' +
    'a=group:BUNDLE 0 1 2\r\n' +
    'a=msid-semantic: WMS FS5grJSJ7IEan6AtqJ8sUrAykrMT0uXkjz8F\r\n' +
    'm=video 9 UDP/TLS/RTP/SAVPF 96 97 98 99 100 101 102 121 127 120 125 107 108 109 124 119 123 118 114 115 116\r\n' +
    'c=IN IP4 0.0.0.0\r\n' +
    'a=rtcp:9 IN IP4 0.0.0.0\r\n' +
    'a=ice-ufrag:NvqW\r\n' +
    'a=ice-pwd:hvZcwHzesYyK5B9Pl/5SVPaO\r\n' +
    'a=ice-options:trickle\r\n' +
    'a=fingerprint:sha-256 7F:46:BE:4D:90:D7:35:FA:1A:EE:0B:18:1A:32:79:12:68:7F:8E:33:D9:02:14:DC:04:06:12:DD:C2:B4:A0:A9\r\n' +
    'a=setup:actpass\r\n' +
    'a=mid:0\r\n' +
    'a=extmap:1 urn:ietf:params:rtp-hdrext:toffset\r\n' +
    'a=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n' +
    'a=extmap:3 urn:3gpp:video-orientation\r\n' +
    'a=extmap:4 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01\r\n' +
    'a=extmap:5 http://www.webrtc.org/experiments/rtp-hdrext/playout-delay\r\n' +
    'a=extmap:6 http://www.webrtc.org/experiments/rtp-hdrext/video-content-type\r\n' +
    'a=extmap:7 http://www.webrtc.org/experiments/rtp-hdrext/video-timing\r\n' +
    'a=extmap:8 http://www.webrtc.org/experiments/rtp-hdrext/color-space\r\n' +
    'a=extmap:9 urn:ietf:params:rtp-hdrext:sdes:mid\r\n' +
    'a=extmap:10 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id\r\n' +
    'a=extmap:11 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id\r\n' +
    'a=sendrecv\r\n' +
    'a=msid:FS5grJSJ7IEan6AtqJ8sUrAykrMT0uXkjz8F a7877ef0-ab87-44c7-8551-1cece43424f7\r\n' +
    'a=rtcp-mux\r\n' +
    'a=rtcp-rsize\r\n' +
    'a=rtpmap:96 VP8/90000\r\n' +
    'a=rtcp-fb:96 goog-remb\r\n' +
    'a=rtcp-fb:96 transport-cc\r\n' +
    'a=rtcp-fb:96 ccm fir\r\n' +
    'a=rtcp-fb:96 nack\r\n' +
    'a=rtcp-fb:96 nack pli\r\n' +
    'a=rtpmap:97 rtx/90000\r\n' +
    'a=fmtp:97 apt=96\r\n' +
    'a=rtpmap:98 VP9/90000\r\n' +
    'a=rtcp-fb:98 goog-remb\r\n' +
    'a=rtcp-fb:98 transport-cc\r\n' +
    'a=rtcp-fb:98 ccm fir\r\n' +
    'a=rtcp-fb:98 nack\r\n' +
    'a=rtcp-fb:98 nack pli\r\n' +
    'a=fmtp:98 profile-id=0\r\n' +
    'a=rtpmap:99 rtx/90000\r\n' +
    'a=fmtp:99 apt=98\r\n' +
    'a=rtpmap:100 VP9/90000\r\n' +
    'a=rtcp-fb:100 goog-remb\r\n' +
    'a=rtcp-fb:100 transport-cc\r\n' +
    'a=rtcp-fb:100 ccm fir\r\n' +
    'a=rtcp-fb:100 nack\r\n' +
    'a=rtcp-fb:100 nack pli\r\n' +
    'a=fmtp:100 profile-id=2\r\n' +
    'a=rtpmap:101 rtx/90000\r\n' +
    'a=fmtp:101 apt=100\r\n' +
    'a=rtpmap:102 H264/90000\r\n' +
    'a=rtcp-fb:102 goog-remb\r\n' +
    'a=rtcp-fb:102 transport-cc\r\n' +
    'a=rtcp-fb:102 ccm fir\r\n' +
    'a=rtcp-fb:102 nack\r\n' +
    'a=rtcp-fb:102 nack pli\r\n' +
    'a=fmtp:102 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42001f\r\n' +
    'a=rtpmap:121 rtx/90000\r\n' +
    'a=fmtp:121 apt=102\r\n' +
    'a=rtpmap:127 H264/90000\r\n' +
    'a=rtcp-fb:127 goog-remb\r\n' +
    'a=rtcp-fb:127 transport-cc\r\n' +
    'a=rtcp-fb:127 ccm fir\r\n' +
    'a=rtcp-fb:127 nack\r\n' +
    'a=rtcp-fb:127 nack pli\r\n' +
    'a=fmtp:127 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42001f\r\n' +
    'a=rtpmap:120 rtx/90000\r\n' +
    'a=fmtp:120 apt=127\r\n' +
    'a=rtpmap:125 H264/90000\r\n' +
    'a=rtcp-fb:125 goog-remb\r\n' +
    'a=rtcp-fb:125 transport-cc\r\n' +
    'a=rtcp-fb:125 ccm fir\r\n' +
    'a=rtcp-fb:125 nack\r\n' +
    'a=rtcp-fb:125 nack pli\r\n' +
    'a=fmtp:125 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f\r\n' +
    'a=rtpmap:107 rtx/90000\r\n' +
    'a=fmtp:107 apt=125\r\n' +
    'a=rtpmap:108 H264/90000\r\n' +
    'a=rtcp-fb:108 goog-remb\r\n' +
    'a=rtcp-fb:108 transport-cc\r\n' +
    'a=rtcp-fb:108 ccm fir\r\n' +
    'a=rtcp-fb:108 nack\r\n' +
    'a=rtcp-fb:108 nack pli\r\n' +
    'a=fmtp:108 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42e01f\r\n' +
    'a=rtpmap:109 rtx/90000\r\n' +
    'a=fmtp:109 apt=108\r\n' +
    'a=rtpmap:124 H264/90000\r\n' +
    'a=rtcp-fb:124 goog-remb\r\n' +
    'a=rtcp-fb:124 transport-cc\r\n' +
    'a=rtcp-fb:124 ccm fir\r\n' +
    'a=rtcp-fb:124 nack\r\n' +
    'a=rtcp-fb:124 nack pli\r\n' +
    'a=fmtp:124 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=4d0032\r\n' +
    'a=rtpmap:119 rtx/90000\r\n' +
    'a=fmtp:119 apt=124\r\n' +
    'a=rtpmap:123 H264/90000\r\n' +
    'a=rtcp-fb:123 goog-remb\r\n' +
    'a=rtcp-fb:123 transport-cc\r\n' +
    'a=rtcp-fb:123 ccm fir\r\n' +
    'a=rtcp-fb:123 nack\r\n' +
    'a=rtcp-fb:123 nack pli\r\n' +
    'a=fmtp:123 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=640032\r\n' +
    'a=rtpmap:118 rtx/90000\r\n' +
    'a=fmtp:118 apt=123\r\n' +
    'a=rtpmap:114 red/90000\r\n' +
    'a=rtpmap:115 rtx/90000\r\n' +
    'a=fmtp:115 apt=114\r\n' +
    'a=rtpmap:116 ulpfec/90000\r\n' +
    'a=ssrc-group:FID 1949835868 1985796221\r\n' +
    'a=ssrc:1949835868 cname:FwevbbmUULlqgeI8\r\n' +
    'a=ssrc:1949835868 msid:FS5grJSJ7IEan6AtqJ8sUrAykrMT0uXkjz8F a7877ef0-ab87-44c7-8551-1cece43424f7\r\n' +
    'a=ssrc:1949835868 mslabel:FS5grJSJ7IEan6AtqJ8sUrAykrMT0uXkjz8F\r\n' +
    'a=ssrc:1949835868 label:a7877ef0-ab87-44c7-8551-1cece43424f7\r\n' +
    'a=ssrc:1985796221 cname:FwevbbmUULlqgeI8\r\n' +
    'a=ssrc:1985796221 msid:FS5grJSJ7IEan6AtqJ8sUrAykrMT0uXkjz8F a7877ef0-ab87-44c7-8551-1cece43424f7\r\n' +
    'a=ssrc:1985796221 mslabel:FS5grJSJ7IEan6AtqJ8sUrAykrMT0uXkjz8F\r\n' +
    'a=ssrc:1985796221 label:a7877ef0-ab87-44c7-8551-1cece43424f7\r\n' +
    'm=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126\r\n' +
    'c=IN IP4 0.0.0.0\r\n' +
    'a=rtcp:9 IN IP4 0.0.0.0\r\n' +
    'a=ice-ufrag:NvqW\r\n' +
    'a=ice-pwd:hvZcwHzesYyK5B9Pl/5SVPaO\r\n' +
    'a=ice-options:trickle\r\n' +
    'a=fingerprint:sha-256 7F:46:BE:4D:90:D7:35:FA:1A:EE:0B:18:1A:32:79:12:68:7F:8E:33:D9:02:14:DC:04:06:12:DD:C2:B4:A0:A9\r\n' +
    'a=setup:actpass\r\n' +
    'a=mid:1\r\n' +
    'a=extmap:14 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\n' +
    'a=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n' +
    'a=extmap:4 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01\r\n' +
    'a=extmap:9 urn:ietf:params:rtp-hdrext:sdes:mid\r\n' +
    'a=extmap:10 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id\r\n' +
    'a=extmap:11 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id\r\n' +
    'a=recvonly\r\n' +
    'a=rtcp-mux\r\n' +
    'a=rtpmap:111 opus/48000/2\r\n' +
    'a=rtcp-fb:111 transport-cc\r\n' +
    'a=fmtp:111 minptime=10;useinbandfec=1\r\n' +
    'a=rtpmap:103 ISAC/16000\r\n' +
    'a=rtpmap:104 ISAC/32000\r\n' +
    'a=rtpmap:9 G722/8000\r\n' +
    'a=rtpmap:0 PCMU/8000\r\n' +
    'a=rtpmap:8 PCMA/8000\r\n' +
    'a=rtpmap:106 CN/32000\r\n' +
    'a=rtpmap:105 CN/16000\r\n' +
    'a=rtpmap:13 CN/8000\r\n' +
    'a=rtpmap:110 telephone-event/48000\r\n' +
    'a=rtpmap:112 telephone-event/32000\r\n' +
    'a=rtpmap:113 telephone-event/16000\r\n' +
    'a=rtpmap:126 telephone-event/8000\r\n' +
    'm=application 9 UDP/TLS/RTP/SAVPF 117\r\n' +
    'c=IN IP4 0.0.0.0\r\n' +
    'b=AS:30\r\n' +
    'a=rtcp:9 IN IP4 0.0.0.0\r\n' +
    'a=ice-ufrag:NvqW\r\n' +
    'a=ice-pwd:hvZcwHzesYyK5B9Pl/5SVPaO\r\n' +
    'a=ice-options:trickle\r\n' +
    'a=fingerprint:sha-256 7F:46:BE:4D:90:D7:35:FA:1A:EE:0B:18:1A:32:79:12:68:7F:8E:33:D9:02:14:DC:04:06:12:DD:C2:B4:A0:A9\r\n' +
    'a=setup:actpass\r\n' +
    'a=mid:2\r\n' +
    'a=sendrecv\r\n' +
    'a=msid:sendDataChannel sendDataChannel\r\n' +
    'a=rtcp-mux\r\n' +
    'a=rtpmap:117 google-data/90000\r\n' +
    'a=ssrc:1432980463 cname:FwevbbmUULlqgeI8\r\n' +
    'a=ssrc:1432980463 msid:sendDataChannel sendDataChannel\r\n' +
    'a=ssrc:1432980463 mslabel:sendDataChannel\r\n' +
    'a=ssrc:1432980463 label:sendDataChannel\r\n'
}

```


will broadcast message to  undefined {
  type: 'candidate',
  label: 0,
  id: '0',
  candidate: 'candidate:679794740 1 udp 2122262783 2001:420:5899:1252:81d8:9d7f:46c8:e9bd 59936 typ host generation 0 ufrag NvqW network-id 2 network-cost 10'
}
will broadcast message to  undefined {
  type: 'candidate',
  label: 0,
  id: '0',
  candidate: 'candidate:3254054740 1 udp 2122194687 10.140.202.33 60004 typ host generation 0 ufrag NvqW network-id 1 network-cost 10'
}
will broadcast message to  undefined {
  type: 'candidate',
  label: 1,
  id: '1',
  candidate: 'candidate:679794740 1 udp 2122262783 2001:420:5899:1252:81d8:9d7f:46c8:e9bd 60005 typ host generation 0 ufrag NvqW network-id 2 network-cost 10'
}
will broadcast message to  undefined {
  type: 'candidate',
  label: 1,
  id: '1',
  candidate: 'candidate:3254054740 1 udp 2122194687 10.140.202.33 59151 typ host generation 0 ufrag NvqW network-id 1 network-cost 10'
}
will broadcast message to  undefined {
  type: 'candidate',
  label: 2,
  id: '2',
  candidate: 'candidate:679794740 1 udp 2122262783 2001:420:5899:1252:81d8:9d7f:46c8:e9bd 59152 typ host generation 0 ufrag NvqW network-id 2 network-cost 10'
}
will broadcast message to  undefined {
  type: 'candidate',
  label: 2,
  id: '2',
  candidate: 'candidate:3254054740 1 udp 2122194687 10.140.202.33 50727 typ host generation 0 ufrag NvqW network-id 1 network-cost 10'
}
will broadcast message to  undefined {
  type: 'candidate',
  label: 0,
  id: '0',
  candidate: 'candidate:1711744196 1 tcp 1518283007 2001:420:5899:1252:81d8:9d7f:46c8:e9bd 9 typ host tcptype active generation 0 ufrag NvqW network-id 2 network-cost 10'
}
will broadcast message to  undefined {
  type: 'answer',
  sdp: 'v=0\r\n' +
    'o=- 4204369404252007872 2 IN IP4 127.0.0.1\r\n' +
    's=-\r\n' +
    't=0 0\r\n' +
    'a=group:BUNDLE 0 1 2\r\n' +
    'a=msid-semantic: WMS XunlxfyEuURGpOgNgVmEEceSRAhGaykdocgt\r\n' +
    'm=video 9 UDP/TLS/RTP/SAVPF 96 97 98 99 100 101 102 121 127 120 125 107 108 109 124 119 123 118 114 115 116\r\n' +
    'c=IN IP4 0.0.0.0\r\n' +
    'a=rtcp:9 IN IP4 0.0.0.0\r\n' +
    'a=ice-ufrag:RVFN\r\n' +
    'a=ice-pwd:InZzf7YvOMmU/yR14IDW6a7f\r\n' +
    'a=ice-options:trickle\r\n' +
    'a=fingerprint:sha-256 07:45:85:D0:A2:F5:4F:50:D8:46:2F:88:2F:A0:5F:22:C5:77:E0:09:48:E8:04:A1:69:5B:32:8E:8B:F3:2E:B0\r\n' +
    'a=setup:active\r\n' +
    'a=mid:0\r\n' +
    'a=extmap:1 urn:ietf:params:rtp-hdrext:toffset\r\n' +
    'a=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n' +
    'a=extmap:3 urn:3gpp:video-orientation\r\n' +
    'a=extmap:4 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01\r\n' +
    'a=extmap:5 http://www.webrtc.org/experiments/rtp-hdrext/playout-delay\r\n' +
    'a=extmap:6 http://www.webrtc.org/experiments/rtp-hdrext/video-content-type\r\n' +
    'a=extmap:7 http://www.webrtc.org/experiments/rtp-hdrext/video-timing\r\n' +
    'a=extmap:8 http://www.webrtc.org/experiments/rtp-hdrext/color-space\r\n' +
    'a=extmap:9 urn:ietf:params:rtp-hdrext:sdes:mid\r\n' +
    'a=extmap:10 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id\r\n' +
    'a=extmap:11 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id\r\n' +
    'a=sendrecv\r\n' +
    'a=msid:XunlxfyEuURGpOgNgVmEEceSRAhGaykdocgt e4f874ef-994b-433e-b54d-7e72653b9bf8\r\n' +
    'a=rtcp-mux\r\n' +
    'a=rtcp-rsize\r\n' +
    'a=rtpmap:96 VP8/90000\r\n' +
    'a=rtcp-fb:96 goog-remb\r\n' +
    'a=rtcp-fb:96 transport-cc\r\n' +
    'a=rtcp-fb:96 ccm fir\r\n' +
    'a=rtcp-fb:96 nack\r\n' +
    'a=rtcp-fb:96 nack pli\r\n' +
    'a=rtpmap:97 rtx/90000\r\n' +
    'a=fmtp:97 apt=96\r\n' +
    'a=rtpmap:98 VP9/90000\r\n' +
    'a=rtcp-fb:98 goog-remb\r\n' +
    'a=rtcp-fb:98 transport-cc\r\n' +
    'a=rtcp-fb:98 ccm fir\r\n' +
    'a=rtcp-fb:98 nack\r\n' +
    'a=rtcp-fb:98 nack pli\r\n' +
    'a=fmtp:98 profile-id=0\r\n' +
    'a=rtpmap:99 rtx/90000\r\n' +
    'a=fmtp:99 apt=98\r\n' +
    'a=rtpmap:100 VP9/90000\r\n' +
    'a=rtcp-fb:100 goog-remb\r\n' +
    'a=rtcp-fb:100 transport-cc\r\n' +
    'a=rtcp-fb:100 ccm fir\r\n' +
    'a=rtcp-fb:100 nack\r\n' +
    'a=rtcp-fb:100 nack pli\r\n' +
    'a=fmtp:100 profile-id=2\r\n' +
    'a=rtpmap:101 rtx/90000\r\n' +
    'a=fmtp:101 apt=100\r\n' +
    'a=rtpmap:102 H264/90000\r\n' +
    'a=rtcp-fb:102 goog-remb\r\n' +
    'a=rtcp-fb:102 transport-cc\r\n' +
    'a=rtcp-fb:102 ccm fir\r\n' +
    'a=rtcp-fb:102 nack\r\n' +
    'a=rtcp-fb:102 nack pli\r\n' +
    'a=fmtp:102 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42001f\r\n' +
    'a=rtpmap:121 rtx/90000\r\n' +
    'a=fmtp:121 apt=102\r\n' +
    'a=rtpmap:127 H264/90000\r\n' +
    'a=rtcp-fb:127 goog-remb\r\n' +
    'a=rtcp-fb:127 transport-cc\r\n' +
    'a=rtcp-fb:127 ccm fir\r\n' +
    'a=rtcp-fb:127 nack\r\n' +
    'a=rtcp-fb:127 nack pli\r\n' +
    'a=fmtp:127 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42001f\r\n' +
    'a=rtpmap:120 rtx/90000\r\n' +
    'a=fmtp:120 apt=127\r\n' +
    'a=rtpmap:125 H264/90000\r\n' +
    'a=rtcp-fb:125 goog-remb\r\n' +
    'a=rtcp-fb:125 transport-cc\r\n' +
    'a=rtcp-fb:125 ccm fir\r\n' +
    'a=rtcp-fb:125 nack\r\n' +
    'a=rtcp-fb:125 nack pli\r\n' +
    'a=fmtp:125 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42e01f\r\n' +
    'a=rtpmap:107 rtx/90000\r\n' +
    'a=fmtp:107 apt=125\r\n' +
    'a=rtpmap:108 H264/90000\r\n' +
    'a=rtcp-fb:108 goog-remb\r\n' +
    'a=rtcp-fb:108 transport-cc\r\n' +
    'a=rtcp-fb:108 ccm fir\r\n' +
    'a=rtcp-fb:108 nack\r\n' +
    'a=rtcp-fb:108 nack pli\r\n' +
    'a=fmtp:108 level-asymmetry-allowed=1;packetization-mode=0;profile-level-id=42e01f\r\n' +
    'a=rtpmap:109 rtx/90000\r\n' +
    'a=fmtp:109 apt=108\r\n' +
    'a=rtpmap:124 H264/90000\r\n' +
    'a=rtcp-fb:124 goog-remb\r\n' +
    'a=rtcp-fb:124 transport-cc\r\n' +
    'a=rtcp-fb:124 ccm fir\r\n' +
    'a=rtcp-fb:124 nack\r\n' +
    'a=rtcp-fb:124 nack pli\r\n' +
    'a=fmtp:124 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=4d0015\r\n' +
    'a=rtpmap:119 rtx/90000\r\n' +
    'a=fmtp:119 apt=124\r\n' +
    'a=rtpmap:123 H264/90000\r\n' +
    'a=rtcp-fb:123 goog-remb\r\n' +
    'a=rtcp-fb:123 transport-cc\r\n' +
    'a=rtcp-fb:123 ccm fir\r\n' +
    'a=rtcp-fb:123 nack\r\n' +
    'a=rtcp-fb:123 nack pli\r\n' +
    'a=fmtp:123 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=640015\r\n' +
    'a=rtpmap:118 rtx/90000\r\n' +
    'a=fmtp:118 apt=123\r\n' +
    'a=rtpmap:114 red/90000\r\n' +
    'a=rtpmap:115 rtx/90000\r\n' +
    'a=fmtp:115 apt=114\r\n' +
    'a=rtpmap:116 ulpfec/90000\r\n' +
    'a=ssrc-group:FID 3323389926 3968523726\r\n' +
    'a=ssrc:3323389926 cname:YeU5/aq2U0F8LMe8\r\n' +
    'a=ssrc:3968523726 cname:YeU5/aq2U0F8LMe8\r\n' +
    'm=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126\r\n' +
    'c=IN IP4 0.0.0.0\r\n' +
    'a=rtcp:9 IN IP4 0.0.0.0\r\n' +
    'a=ice-ufrag:RVFN\r\n' +
    'a=ice-pwd:InZzf7YvOMmU/yR14IDW6a7f\r\n' +
    'a=ice-options:trickle\r\n' +
    'a=fingerprint:sha-256 07:45:85:D0:A2:F5:4F:50:D8:46:2F:88:2F:A0:5F:22:C5:77:E0:09:48:E8:04:A1:69:5B:32:8E:8B:F3:2E:B0\r\n' +
    'a=setup:active\r\n' +
    'a=mid:1\r\n' +
    'a=extmap:14 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\n' +
    'a=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n' +
    'a=extmap:4 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01\r\n' +
    'a=extmap:9 urn:ietf:params:rtp-hdrext:sdes:mid\r\n' +
    'a=extmap:10 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id\r\n' +
    'a=extmap:11 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id\r\n' +
    'a=inactive\r\n' +
    'a=rtcp-mux\r\n' +
    'a=rtpmap:111 opus/48000/2\r\n' +
    'a=rtcp-fb:111 transport-cc\r\n' +
    'a=fmtp:111 minptime=10;useinbandfec=1\r\n' +
    'a=rtpmap:103 ISAC/16000\r\n' +
    'a=rtpmap:104 ISAC/32000\r\n' +
    'a=rtpmap:9 G722/8000\r\n' +
    'a=rtpmap:0 PCMU/8000\r\n' +
    'a=rtpmap:8 PCMA/8000\r\n' +
    'a=rtpmap:106 CN/32000\r\n' +
    'a=rtpmap:105 CN/16000\r\n' +
    'a=rtpmap:13 CN/8000\r\n' +
    'a=rtpmap:110 telephone-event/48000\r\n' +
    'a=rtpmap:112 telephone-event/32000\r\n' +
    'a=rtpmap:113 telephone-event/16000\r\n' +
    'a=rtpmap:126 telephone-event/8000\r\n' +
    'm=application 9 UDP/TLS/RTP/SAVPF 117\r\n' +
    'c=IN IP4 0.0.0.0\r\n' +
    'b=AS:30\r\n' +
    'a=rtcp:9 IN IP4 0.0.0.0\r\n' +
    'a=ice-ufrag:RVFN\r\n' +
    'a=ice-pwd:InZzf7YvOMmU/yR14IDW6a7f\r\n' +
    'a=ice-options:trickle\r\n' +
    'a=fingerprint:sha-256 07:45:85:D0:A2:F5:4F:50:D8:46:2F:88:2F:A0:5F:22:C5:77:E0:09:48:E8:04:A1:69:5B:32:8E:8B:F3:2E:B0\r\n' +
    'a=setup:active\r\n' +
    'a=mid:2\r\n' +
    'a=sendrecv\r\n' +
    'a=msid:sendDataChannel sendDataChannel\r\n' +
    'a=rtcp-mux\r\n' +
    'a=rtpmap:117 google-data/90000\r\n' +
    'a=ssrc:3313332176 cname:YeU5/aq2U0F8LMe8\r\n'
}
will broadcast message to  undefined {
  type: 'candidate',
  label: 0,
  id: '0',
  candidate: 'candidate:679794740 1 udp 2122262783 2001:420:5899:1252:81d8:9d7f:46c8:e9bd 65013 typ host generation 0 ufrag RVFN network-id 2 network-cost 10'
}
will broadcast message to  undefined {
  type: 'candidate',
  label: 0,
  id: '0',
  candidate: 'candidate:3254054740 1 udp 2122194687 10.140.202.33 55603 typ host generation 0 ufrag RVFN network-id 1 network-cost 10'
}
will broadcast message to  undefined {
  type: 'candidate',
  label: 0,
  id: '0',
  candidate: 'candidate:2406945700 1 tcp 1518214911 10.140.202.33 9 typ host tcptype active generation 0 ufrag NvqW network-id 1 network-cost 10'
}
will broadcast message to  undefined {
  type: 'candidate',
  label: 1,
  id: '1',
  candidate: 'candidate:1711744196 1 tcp 1518283007 2001:420:5899:1252:81d8:9d7f:46c8:e9bd 9 typ host tcptype active generation 0 ufrag NvqW network-id 2 network-cost 10'
}
will broadcast message to  undefined {
  type: 'candidate',
  label: 1,
  id: '1',
  candidate: 'candidate:2406945700 1 tcp 1518214911 10.140.202.33 9 typ host tcptype active generation 0 ufrag NvqW network-id 1 network-cost 10'
}
will broadcast message to  undefined {
  type: 'candidate',
  label: 2,
  id: '2',
  candidate: 'candidate:1711744196 1 tcp 1518283007 2001:420:5899:1252:81d8:9d7f:46c8:e9bd 9 typ host tcptype active generation 0 ufrag NvqW network-id 2 network-cost 10'
}
will broadcast message to  undefined {
  type: 'candidate',
  label: 2,
  id: '2',
  candidate: 'candidate:2406945700 1 tcp 1518214911 10.140.202.33 9 typ host tcptype active generation 0 ufrag NvqW network-id 1 network-cost 10'
}
