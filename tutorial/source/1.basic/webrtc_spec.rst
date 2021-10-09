########################
WebRTC 标准，协议和规范
########################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** WebRTC Spec
**Authors**  Walter Fan
**Status**   WIP as draft
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:


标准
=========================
* WebRTC 1.0: Real-Time Communication Between Browsers



新标准和规范
=========================

1. The extensions to WebRTC PeerConnection
 
* `WebRTC Extensions`_: defines a set of ECMAScript APIs in WebIDL to extend the WebRTC 1.0 API
* WebRTC-SVC 
* `Insertable Streams`_: defines an API surface for manipulating the bits on MediaStreamTracks being sent via an RTCPeerConnection.

2. Some involves features which did not meet the implementation or maturity requirements for inclusion in the WebRTC-PC Proposed Recommendation
 
* WebRTC Identity
* WebRTC Priority Control
* WebRTC DSCP. 

3. The extensions to Capture, 

* MediaStreamTrack Insertable Streams 
* Media Capture and Streams Extensions
* MediaCapture Depth Stream Extensions

4. standalone specifications, which are not necessarily dependent on either `RTCPeerConnection` or the existing Media Capture specifications. 

* WebRTC-ICE (which so far has been implemented as a standalone specification) 
* WebTransport (in the W3C WebTransport WG), 
* WebRTC-QUIC (in the ORTC CG) and 
* `Web Codecs`_ (in the WICG): provide JavaScript interfaces to implementations of existing codec technology developed elsewhere