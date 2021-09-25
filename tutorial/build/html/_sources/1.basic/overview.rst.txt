######################
WebRTC 概论
######################

.. contents::
    :local:


WebRTC 简介
=======================

一句话，用浏览器来进行实时通信

具体来说：

1. 它是一套基于 Web 进行实时通信的标准和参考实现
2. 它是一个开源项目，最初由 google 发起并交由开源社区


借助WebRTC，你可以在基于开放标准的应用程序中添加实时通信功能。 它支持在节点之间发送视频，语音和通用数据，从而使开发人员能够构建功能强大的语音和视频通信解决方案。 该技术可在所有现代浏览器以及所有主要平台的本机客户端上使用。 

WebRTC背后的技术被实现为一个开放的Web标准，并在所有主要浏览器中均以常规JavaScript API的形式提供。 对于本机客户端（例如Android和iOS应用程序），可以使用提供相同功能的库。 


What is WebRTC?
---------------------------------
WebRTC means two things: 
  * The specification in browser
    * Web Real-Time Communication
    * A specification that is being standardized by W3C and IETF
    * Enables web browsers with audio, video and sharing capabilities via simple JavaScript APIs
    * Zero install
    * Peer 2 peer, also capable for conference
    * Interoperability with existing voice and video systems
  * An open source project
    * Contributed by Google
    * In C++ and cross platform
    * From Google’s acquisition of Global IP Solutions
    * Most new video companies are based on this project

WebRTC is an open framework for the web that enables Real Time Communications in the browser.

* Media Device
* Media capture and constraints
* Peer connection
* Remote streams
* Data channels
* TURN server

VoIP related technologies:
------------------------------
* Audio: Echo Cancellation, Silence Detection, Noise Removal, Codec
* Video: H264, VP8
* Transport: RTP, RTCP
* Signaling: SIP, Jingle, ROAP, RESTful
* Networking - NAT, ICE, TURN, STUN
* SDP
* Security – DTLS, SRTP



三个任务
------------------------------
* acquiring audio and video
* communicating audio and video
* communicating arbitrary data


三个主要的 JavaScript APIs
------------------------------
* MediaStream
* RTCPeerConnection
* RTCDataChannel


WebRTC API
===========================

* media capture devices

 For cameras and microphones, we use navigator.mediaDevices.getUserMedia() to capture MediaStreams. 
 For screen recording, we use navigator.mediaDevices.getDisplayMedia() instead.

* peer-to-peer connectivity

The peer-to-peer connectivity is handled by the RTCPeerConnection interface. 
This is the central point for establishing and controlling the connection between two peers in WebRTC

Media
====================

* Audio
    * Codec
    * g.711
    * iLBC
    * Opus
        * Opus -- rfc6716
    * pcmu
    * pcma
    * acoustic echo cancellation (AEC) 
    * automatic gain control (AGC) 
    * noise reduction
    * noise suppression 
    * hardware access and control
    * VoIP

* Video
    * Codec
    * VP8
    * OpenH264
    * components to conceal packet loss 
    * clean up noisy images 
    * capture and playback capabilities

* Sharing
    * RFD

Network
==================

* QoS for packet loss and unreliable networks. 
    * Dynamic jitter buffers
    * Error concealment 
    * FEC
    * Flow/congestion control
    * Sender-based
    * Received-based
* P2P via NAT
    * ICE
    * STUN
    * TURN
    * RTP-over-TCP

Protocol
==================
* SIP
* XMPP
    * Jingel
* RTP
* SRTP
* DTMF
* Restful
* XMPP/Jingle

Library
==================
* boost
* gtest
* gmock
* protobuf
* lua





 


参考资料
-------------

* https://www.html5rocks.com/en/tutorials/webrtc/basics/
* https://www.html5rocks.com/en/tutorials/webrtc/infrastructure/
* https://a-wing.github.io/webrtc-book-cn/01_introduction.html#web-%E6%9E%B6%E6%9E%84
* https://codelabs.developers.google.com/codelabs/webrtc-web/#0   
* Introduction to WebRTC

    https://learning.oreilly.com/videos/introduction-to-webrtc/9781771373869/9781771373869-video215871?autoplay=false

* real time communication with WebRTC

  - https://learning.oreilly.com/library/view/real-time-communication-with/9781449371869/ch02.html
  - https://a-wing.github.io/webrtc-book-cn/

* Asterisk: the defective guide

    https://learning.oreilly.com/library/view/asterisk-the-definitive/9781492031598/ch19.html

