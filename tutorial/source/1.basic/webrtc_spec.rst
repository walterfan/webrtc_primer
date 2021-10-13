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



相关的标准和协议
===================

* WebRTC standard:

https://www.w3.org/TR/webrtc

* SDP
RFC4566 Session Decscription Protocol

* RTP

RFC3550

* SRTP

https://www.rfcreader.com/#rfc3711

* RTP Profile:

https://www.rfcreader.com/#rfc3551

* Datagram Transport Layer Security Version 1.2
https://www.rfcreader.com/#rfc6347

* RTCWeb Offer/Answer Protocol (ROAP)
https://tools.ietf.org/html/draft-jennings-rtcweb-signaling-01

* Javascript Session Establishment Protocol (JSEP)
https://tools.ietf.org/html/rfc8829

* Session Traversal Utilities for NAT (STUN)
https://tools.ietf.org/html/rfc5389

* Traversal Using Relays around NAT (TURN)
https://tools.ietf.org/html/rfc5766

* Interactive Connectivity Establishment (ICE)
https://tools.ietf.org/html/rfc8445

相关的扩展协议
===================
* Session Description Protocol (SDP) Offer/Answer Procedures for Interactive Connectivity Establishment (ICE)
https://tools.ietf.org/html/rfc8839

* TCP Candidates with Interactive Connectivity Establishment (ICE)
https://tools.ietf.org/html/rfc6544

* Trickling ICE
https://tools.ietf.org/html/draft-ivov-mmusic-trickle-ice-sip-02

* Datagram Transport Layer Security for SRTP (DTLS-SRTP)

https://www.rfcreader.com/#rfc5764

* Connection-Oriented Media Transport over TLS in SDP
https://www.rfcreader.com/#rfc4572

* TCP-Based Media Transport in SDP

https://www.rfcreader.com/#rfc4145

* Web Real-Time Communication (WebRTC): Media Transport and Use of RTP
https://tools.ietf.org/html/draft-ietf-rtcweb-rtp-usage-26

* RFC8834
Codec Control Messages in the RTP Audio-Visual Profile with Feedback (AVPF)
https://tools.ietf.org/html/rfc5104

* Extended RTP Profile for RTCP-Based Feedback (RTP/AVPF)
https://tools.ietf.org/html/rfc4585

* REMB - RTCP message for Receiver Estimated Maximum Bitrate
https://tools.ietf.org/html/draft-alvestrand-rmcat-remb-03

* Codec Control Messages in the RTP Audio-Visual Profile with Feedback (AVPF)
https://tools.ietf.org/html/rfc5104

* A Google Congestion Control Algorithm for Real-Time Communication
https://tools.ietf.org/html/draft-ietf-rmcat-gcc-02

* Framing RTP and RTCP Packets over Connection-Oriented Transport
https://tools.ietf.org/html/rfc4571

* Source-Specific Media Attributes in the Session Description Protocol (SDP)
RFC5576: https://datatracker.ietf.org/doc/html/rfc5576

* Using Simulcast in Session Description Protocol (SDP) and RTP Sessions

RFC8853

* (RTP) Header Extension for Client-to-Mixer Audio Level Indication
https://tools.ietf.org/html/rfc6464

* RTP Retransmission Payload Format
https://tools.ietf.org/html/rfc4588

* Guidelines for Using the Multiplexing Features of RTP to Support Multiple Media Streams
https://tools.ietf.org/html/rfc8872

* Negotiating Media Multiplexing Using SDP

* https://tools.ietf.org/html/rfc8843

* RTP Stream Identifier Source Description (SDES)
https://tools.ietf.org/html/draft-ietf-avtext-rid-09

* WebRTC MediaStream Identification in SDP
https://tools.ietf.org/html/rfc8830

* RTP Extensions for Transport-wide Congestion Control
https://tools.ietf.org/html/draft-ietf-avtext-rid-09

* RTP Header Extension for the RTCP Source Description Items
https://datatracker.ietf.org/doc/html/rfc7941

* RTP Extensions for Transport-wide Congestion Control (draft-holmer-rmcat-transport-wide-cc-extensions-01)
https://tools.ietf.org/html/draft-holmer-rmcat-transport-wide-cc-extensions-01

* A Framework for SDP Attributes when Multiplexing
https://tools.ietf.org/html/rfc8859

* ULPFEC - RTP Payload Format for Generic Forward Error Correction
https://tools.ietf.org/html/rfc5109

* RED - RTP Payload for Redundant Audio Data
https://tools.ietf.org/html/rfc2198

* RTP Payload Format for H.264 Video
https://tools.ietf.org/html/rfc6184

* RTP Payload Format for Scalable Video Coding
https://tools.ietf.org/html/rfc6190

* Definition of the Opus Audio Codec
https://tools.ietf.org/html/rfc6716

* WebRTC Data Channels
https://datatracker.ietf.org/doc/html/rfc8831

* Datagram Transport Layer Security (DTLS) Encapsulation of SCTP Packets
https://datatracker.ietf.org/doc/html/rfc8261


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
