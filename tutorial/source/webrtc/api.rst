######################
WebRTC API
######################


.. contents::
    :local:

Overview
======================

The WebRTC standard covers, on a high level, two different technologies: 
media capture devices and peer-to-peer connectivity.

Media device
----------------------


media capture
----------------------


For cameras and microphones, we use navigator.mediaDevices.getUserMedia() to capture MediaStreams. 

For screen recording, we use navigator.mediaDevices.getDisplayMedia() instead.

* 麦克风
* 摄像头
* 电话等 SIP/H.323 设备


peer-to-peer connectivity
============================

The peer-to-peer connectivity is handled by the RTCPeerConnection interface. 
This is the central point for establishing and controlling the connection between two peers in WebRTC.


WebRTC API details
============================


Media devices
-----------------------------

Object
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* MediaDevice
* MediaConstraint
* MediaTrackConstraint

API
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- getUserMedia: navigator.mediaDevices.getUserMedia
- query media devices: navigator.mediaDevices.enumerateDevices
- listen devices change: navigator.mediaDevices.addEventListener

- set media constraints: navigator.mediaDevices.addEventListener

- playback by assign media stream to video/audio element

Media capture
-----------------------------

Object
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* MediaStream
* MediaStreamTrack

API
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MediaStreamTrack.getSettings()


Peer Connection
---------------------------------
https://webrtc.org/getting-started/peer-connections

Object
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* RTCPeerConnection
* RTCSessionDescription
* MediaStream


API
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.createOffer
.setLocalDescription

events
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* iceCandidate
* connectionstatechange

Data channel
-----------------------------
Objects
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* RTCDataChannel

API
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
peerConnection.createDataChannel
RTCDataChannel.send(Blob|ArrayBuffer|ArrayBufferView)

events
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* open
* close

TURN
-----------------------------
RTCConfiguration —> iceConfiguration as RTCPeerConnection parameter


Example
-----------------------------
* https://webrtc.org/getting-started/firebase-rtc-codelab
* https://developer.mozilla.org/en-US/docs/Glossary/WebRTC
* https://webrtc.github.io/samples/
* https://webrtc.googlesource.com/src
* https://groups.google.com/forum/#!forum/discuss-webrtc
* https://stackoverflow.com/questions/tagged/webrtc
* https://twitter.com/webrtc