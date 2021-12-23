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


多路复用
=======================================
传统方法是一个端口传输 RTP, 另一个端口传输 RTCP 包，然后通过 payload type 来区分不同的包的用途。

回顾一下 RTP 包 和 RTCP 包的格式

* RTP
  
.. code-block::


    0                   1                   2                   3
    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |V=2|P|X|  CC   |M|     PT      |       sequence number         |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                           timestamp                           |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |           synchronization source (SSRC) identifier            |
   +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
   |            contributing source (CSRC) identifiers             |
   |                             ....                              |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+


* RTCP

.. code-block::

        0                   1                   2                   3
        0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |V=2|P| RC/FMT  |       PT      |             length            |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |                         SSRC of sender                        |
       |                              ...                              |

在一个端口上传输 RTP 和 RTCP 包会面临 payload 冲突的问题。RTCP 头的第二个字节是 payload type, RTP 头的第二个字节的低 7 位是 payload type, RFC 5761 总结了一下，有如下冲突

*  RTP payload types 64-65 conflict with the (obsolete) RTCP FIR and NACK packets defined in the original "RTP Payload Format for H.261 Video Streams" [3] (which was obsoleted by [17]).

*  RTP payload types 72-76 conflict with the RTCP SR, RR, SDES, BYE,and APP packets defined in the RTP specification [1].

*  RTP payload types 77-78 conflict with the RTCP RTPFB and PSFB packets defined in the RTP/AVPF profile [4].

*  RTP payload type 79 conflicts with RTCP Extended Report (XR) [5] packets.

*  RTP payload type 80 conflicts with Receiver Summary Information (RSI) packets defined in "RTCP Extensions for Single-Source Multicast Sessions with Unicast Feedback" [6].


也就是 RTP payload type 64 ~ 95 会和 RTCP 有冲突，所以根据 RFC3551 RTP/AVP profile 的规定，RFC 5761 建议 RTP payload 64 ~ 95 不要再使用， RTP 的动态 payload type 的选择最好在 96 ~ 127 之间




参考资料
=======================================
* `RFC5761`_： Multiplexing RTP Data and Control Packets on a Single Port
* `RFC8843`_： Negotiating Media Multiplexing Using the Session Description Protocol (SDP)
* `RFC8858`_：Indicating Exclusive Support of RTP and RTP Control Protocol (RTCP) Multiplexing Using the Session Description Protocol (SDP)
* `RFC8860`_： Sending Multiple Types of Media in a Single RTP Session
* `RFC8872`_： Guidelines for Using the Multiplexing Features of RTP to Support Multiple Media Streams


