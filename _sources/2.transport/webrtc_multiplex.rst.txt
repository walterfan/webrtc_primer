########################
WebRTC 传输的多路复用
########################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** WebRTC RTP
**Authors**  Walter Fan
**Status**   WIP as draft
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

简介
=======================================
传统上，一个传输通道只传输一路媒体流，其 RTP 包 的 SSRC 也用来标识这路媒体流。 RTCP 会使用一个单独的传输
媒体协商的 SDP 中的一个 m-line 也只包含一路或者一对(包括重传 RTX 的媒体流 )媒体流。

WebRTC 中为避免过多地使用 NAT 技术来穿透防火墙，可用多路复用技术在一个传输通道中传输多路媒体，包括RTCP, 重传的媒体流。
一个传输通道（五元组: protocol, srcHost, srcPort, destHost, destPort）中包含多路媒体流，也就是有多个 m-line。
而一个 m-line 中也可包含多个 ssrc, 即通过联播 Simulcast 技术让 MediaStream 包含多个 MediaStreamTrack（分辨率或码率不同）。

那么如何辨别这些 MediaStream 和 MediaStreamTrack 呢？ SSRC 和 Payload Type 显然不够，因为 SSRC 会变化，Payload Type 会重复。
WebRTC 通过 mid 来标识 MediaStream, 通过 rid 来标识 MediaStreamTrack.





参考资料
=======================================
* `RFC5761`_： Multiplexing RTP Data and Control Packets on a Single Port
* `RFC8843`_： Negotiating Media Multiplexing Using the Session Description Protocol (SDP)
* `RFC8858`_：Indicating Exclusive Support of RTP and RTP Control Protocol (RTCP) Multiplexing Using the Session Description Protocol (SDP)
* `RFC8860`_： Sending Multiple Types of Media in a Single RTP Session
* `RFC8872`_： Guidelines for Using the Multiplexing Features of RTP to Support Multiple Media Streams


