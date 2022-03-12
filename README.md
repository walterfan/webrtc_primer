# WebRTC Primer

Collect WebRTC related learning materials , write some notes and samples here.

```
#git clone https://github.com/walterfan/webrtc_primer.git
git clone git@github.com:walterfan/webrtc_primer.git
cd webrtc_primer
git submodule update --init --recursive
```
## WebRTC protocols

see [protocols](protocols.md)

## WebRTC examples

My WebRTC example Extended from [WebRTC Samples](https://github.com/webrtc/samples) and book [Real-Time Communication with WebRTC](https://github.com/spromano/WebRTC_Book):

* [WebRTC Example 实例](https://www.hfrtc.top/webrtc/examples/index.html)



# WebRTC Tutorial

* [WebRTC Notes](https://walterfan.github.io/webrtc_note/)


# WebRTC related snippets

* [WebRTC snippets](https://walterfan.github.io/webrtc_snippets/)

# Materials and Tools

* [audio files of TSP Lab in McGill University](http://www-mmsp.ece.mcgill.ca/Documents/Data)
* [Audacity](https://www.audacityteam.org)
* [BlackHole: Virtual Audio Driver](https://github.com/ExistentialAudio/BlackHole)
* [VB-CABLE Virtual Audio Device](https://vb-audio.com/Cable)

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
  
* WebRTC source code 
  - https://webrtc.googlesource.com/src/+/refs/heads/master/docs/native-code/index.md
  - https://webrtc.googlesource.com/src/+/refs/heads/master/docs/native-code/development/index.md


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
