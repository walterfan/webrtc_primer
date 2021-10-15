

# WebRTC Primer

Collect WebRTC related learning materials , write some notes and samples here.

## WebRTC examples

Extended from [WebRTC Samples](https://github.com/webrtc/samples) and book [Real-Time Communication with WebRTC](https://github.com/spromano/WebRTC_Book)
Please install nodejs in advance.

1. Media Stream example:
  - cd examples & python -m http.server
  - open http://localhost:8000/media_stream.html

2. Screen Sharing example:
  - cd examples & python -m http.server
  - open http://localhost:8000/desktop_sharing.html

3. Local Peer Connection example:
  - cd examples & python -m http.server
  - open http://localhost:8000/local_peer_connection_demo.html

4. Local Data Channel example:
  - cd examples & python -m http.server
  - open http://localhost:8000/loal_data_channel_demo.html 
  
5. Chat demo example:
  - node chat_server.js       
  - open http://localhost:8181/chat_demo.html

6. Video Chat example:
  - node webrtc_server.js       
  - open http://localhost:8181/video_chat_demo.html

7. Screen Share example:
  - node webrtc_server.js       
  - open http://localhost:8181/screen_share_demo.html

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

# Tutorial

* [WebRTC 新手指南](https://walterfan.github.io/webrtc_primer/)


# Materials and Tools

* [audio files of TSP Lab in McGill University](http://www-mmsp.ece.mcgill.ca/Documents/Data)
* [Audacity](https://www.audacityteam.org)
* [BlackHole: Virtual Audio Driver](https://github.com/ExistentialAudio/BlackHole)
* [VB-CABLE Virtual Audio Device](https://vb-audio.com/Cable)
* 
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
