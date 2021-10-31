######################
WebRTC 媒体概论
######################

.. contents::
    :local:


Media Stream and track
========================
* Audio
* Video
* Sharing
  

Peer Connections
=========================

Simulcasting
-------------------------

Simulcast 可翻译为同播或并播，一个摄像头可以发送不同分辨率（spatial quality）或帧率(temporal quality)的视频流，这些流可以在一个 RTP 会话中传送， 不同的分辨率使用不同的 SSRC, 不同的帧率可以使用相同的 SSRC（SST） 或者不同的 SSRC（MST）。这些流可以共同使用一个相同的 CSRC 或者一个扩展的 ID 
