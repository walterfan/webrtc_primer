# WebRTC Primer

Collect WebRTC related learning materials , write some notes and samples here.

## WebRTC examples
Did a little change based on [WebRTC Samples](https://github.com/webrtc/samples) and book [Real-Time Communication with WebRTC](https://github.com/spromano/WebRTC_Book)


* Media Stream example:
  - cd examples & python -m http.server
  - open http://localhost:8000/media_stream.html

* Screen Sharing example:
  - cd examples & python -m http.server
  - open http://localhost:8000/desktop_sharing.html

* Local Peer Connection example:
  - cd examples & python -m http.server
  - open http://localhost:8000/local_peer_connection_demo.html

* Local Data Channel example:
  - cd examples & python -m http.server
  - open http://localhost:8000/loal_data_channel_demo.html 
  
* Chat demo example:
  - node chat_server.js       
  - open http://localhost:8181/chat_demo.html

* Video Chat example:
  - node video_chat_server.js       
  - open http://localhost:8181/video_chat_demo.html

## WebRTC source codes


```
$ git clone https://webrtc.googlesource.com/src
$ git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
#vi ~/.bashrc or ~/.zshrc
$ export PATH=/path/to/depot_tools:$PATH


$ mkdir webrtc-checkout
$ cd webrtc-checkout
$ fetch --nohooks webrtc
$ gclient sync

```

# Document & Protocols

* WebRTC standard: 
  - https://www.w3.org/TR/webrtc

* SDP
  - http://www.rfcreader.com/#rfc4566

* RTP: 
  - https://www.rfcreader.com/#rfc3550

* SRTP: 
  - https://www.rfcreader.com/#rfc3711

* RTP Profile: 
  - https://www.rfcreader.com/#rfc3551

* Datagram Transport Layer Security Version 1.2
  - https://www.rfcreader.com/#rfc6347

* RTCWeb Offer/Answer Protocol (ROAP)
  - https://tools.ietf.org/html/draft-jennings-rtcweb-signaling-01

* Javascript Session Establishment Protocol (JSEP)
  - ~~https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-26~~
  - https://tools.ietf.org/html/rfc8829


* Session Traversal Utilities for NAT (STUN)
  - https://tools.ietf.org/html/rfc5389


* Traversal Using Relays around NAT (TURN)
  - https://tools.ietf.org/html/rfc5766

* Interactive Connectivity Establishment (ICE)
  - ~~https://tools.ietf.org/html/rfc5245~~
  - https://tools.ietf.org/html/rfc8445
  
* TCP Candidates with Interactive Connectivity Establishment (ICE)
  - https://tools.ietf.org/html/rfc6544

* Trickling ICE
  - https://tools.ietf.org/html/draft-ivov-mmusic-trickle-ice-sip-02

* Datagram Transport Layer Security for SRTP (DTLS-SRTP) 
  - https://www.rfcreader.com/#rfc5764

* Connection-Oriented Media Transport over TLS in SDP
  - https://www.rfcreader.com/#rfc4572  

* TCP-Based Media Transport in SDP
  - https://www.rfcreader.com/#rfc4145

* Web Real-Time Communication (WebRTC): Media Transport and Use of RTP
  - https://tools.ietf.org/html/draft-ietf-rtcweb-rtp-usage-26


* Codec Control Messages in the RTP Audio-Visual Profile with Feedback (AVPF)
  - https://tools.ietf.org/html/rfc5104

* Extended RTP Profile for RTCP-Based Feedback (RTP/AVPF)
  - https://tools.ietf.org/html/rfc4585


* REMB - RTCP message for Receiver Estimated Maximum Bitrate
  - https://tools.ietf.org/html/draft-alvestrand-rmcat-remb-03

* Codec Control Messages in the RTP Audio-Visual Profile with Feedback (AVPF)
  - https://tools.ietf.org/html/rfc5104

* A Google Congestion Control Algorithm for Real-Time Communication
  - https://tools.ietf.org/html/draft-ietf-rmcat-gcc-02

* Framing RTP and RTCP Packets over Connection-Oriented Transport
  - https://tools.ietf.org/html/rfc4571

* SSRC Attributes in SDP
  - https://tools.ietf.org/html/rfc5576


* (RTP) Header Extension for Client-to-Mixer Audio Level Indication
  - https://tools.ietf.org/html/rfc6464

* RTP Retransmission Payload Format
  - https://tools.ietf.org/html/rfc4588

* Guidelines for Using the Multiplexing Features of RTP to Support Multiple Media Streams
  - https://tools.ietf.org/html/rfc8872

* Negotiating Media Multiplexing Using SDP
  - ~~https://tools.ietf.org/html/draft-ietf-mmusic-sdp-bundle-negotiation-54~~
  - https://tools.ietf.org/html/rfc8843

* RTP Stream Identifier Source Description (SDES)
  - https://tools.ietf.org/html/draft-ietf-avtext-rid-09

* WebRTC MediaStream Identification in SDP
  - ~~https://tools.ietf.org/id/draft-ietf-mmusic-msid-05.html~~
  - https://tools.ietf.org/html/rfc8830

* RTP Extensions for Transport-wide Congestion Control
  - https://tools.ietf.org/html/draft-ietf-avtext-rid-09

* RTP Header Extension for the RTCP Source Description Items
  - https://tools.ietf.org/html/draft-holmer-rmcat-transport-wide-cc-extensions-01

* A Framework for SDP Attributes when Multiplexing
  - https://tools.ietf.org/html/draft-ietf-mmusic-sdp-mux-attributes-19

* ULPFEC - RTP Payload Format for Generic Forward Error Correction
  - https://tools.ietf.org/html/rfc5109

* RED - RTP Payload for Redundant Audio Data
  - https://tools.ietf.org/html/rfc2198

* RTP Payload Format for H.264 Video
  - https://tools.ietf.org/html/rfc6184

* RTP Payload Format for Scalable Video Coding  
  - https://tools.ietf.org/html/rfc6190

* Definition of the Opus Audio Codec
  - https://tools.ietf.org/html/rfc6716

# Reference

* WebRTC offical site
  - https://webrtc.org/
  
* [WebRTC API](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
  - https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
  - https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection
  - https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel
  
* WebRTC tutorial and book
  - https://www.html5rocks.com/en/tutorials/webrtc/basics/
  - https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/
  - https://a-wing.github.io/webrtc-book-cn/01_introduction.html
  
* WebRTC native codes 
  - https://webrtc.googlesource.com/src/+/refs/heads/master/docs/native-code/index.md
  - https://webrtc.googlesource.com/src/+/refs/heads/master/docs/native-code/development/index.md
