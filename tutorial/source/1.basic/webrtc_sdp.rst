################
WebRTC SDP
################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref


.. contents::
    :local:


overview
==============

An SDP session description includes the following: 
* Session name and purpose 
* Time(s) the session is active 
* The media comprising the session o Information needed to receive those media (addresses, ports, formats, etc.)


An Offer/Answer Model with the SDP
========================================

* 每当需要 Offer/Answer 交换时，发起方都会通过调用 createOffer() API 创建 Offer。
* 然后，应用程序使用该 Offer 通过 setLocalDescription() API来设置其本地配置。offer 最终通过其首选的信令机制（例如WebSockets）发送到远程端；收到该 offer 后，远程方将使用 setRemoteDescription()API进行安置。
* 为了完成 Offer/Answer 交换，远程方使用 createAnswer() API生成适当的 answer，使用 setLocalDescription()`API应用该`answer，并将 answer 通过信令通道发送回发起方。启动器获得该`answer`后，它将使用 setRemoteDescription() API进行安装，并且初始设置已完成。可以重复此过程以进行其他 Offer/Answer 交换。
  
参见  `RFC3264 <https://tools.ietf.org/html/rfc3264>`_



RTP Profile for Audio and Video Conferenceswith Minimal Control
===================================================================

参见  `RFC3551 <https://tools.ietf.org/html/rfc3551>`_


SDP for ICE and DTLS
============================

关于 DTLS extension to establish keys for SRTP, 请参见 `RFC5764 <https://tools.ietf.org/html/rfc5764>`_


SDP extension
============================

* DTLS fingerprint for SRTP (a=fingerprint) 
* RTP/RTCP Multiplexing (a=rtcp-mux) 
* RTCP Feedback support (a=rtcp-fb) 
* Host and server-reflexive candidate lines (a=candidate) 
* SRTP Setup framework parameters (a=setup) 
* RTCP attribute (a=rtcp) 
* RTP header extension indicating audio-levels from client to the mixer(a=extmap:1 * * urn:ietf:params:rtp-hdrext:ssrc-audio-level)


Negotiating Media Multiplexing Using SDP
=============================================


该扩展可以与SDP提供/应答机制一起使用，以协商使用单个传输（5元组）来发送和接收由多个SDP媒体描述所描述的媒体
5-tuple：client ip, client port, server ip, server port, protocol
Allow an SDP 'group' attribute to contain an identification-tag that identifies a "m=" section with the port set to zero.
It is to use a single transport(BUNDLE transport) for multiple media streams, defines a new SDP Grouping Framework [RFC5888] extension called 'BUNDLE'.

请参见  `RFC8843 <https://datatracker.ietf.org/doc/html/rfc8843>`_


SDP Grouping Framework
============================================

The Session Description Protocol (SDP) Grouping Framework

* Use of "group" and "mid"
* Flow Identification (FID)

   - For each participant, the session is defined by a particular pair of destination transport addresses
   - But a single media instance maybe sent using more than one RTP session

请参见  `RFC5888 <https://datatracker.ietf.org/doc/html/rfc5888>`_


Source-Specific Media Attributes in SDP
============================================


Defines a mechanism to describe RTP sources, identified by their synchronization source (SSRC) identifier, in SDP, to associate attributes with these sources, and to express relationships among individual sources. 

.. code-block::

    a=ssrc:<ssrc-id> <attribute> 
    a=ssrc:<ssrc-id> <attribute>:<value>
    a=ssrc-group:<semantics> <ssrc-id> ...

请参见  `RFC5576 <https://datatracker.ietf.org/doc/html/rfc5576>`_

SDP examples
==============================

请参见 https://tools.ietf.org/html/draft-nandakumar-rtcweb-sdp-08 


参见资料
==============================
* `SDP: Session Description Protocol <http://www.rfcreader.com/#rfc4566>`_
* `An Offer/Answer Model with the Session Description Protocol (SDP) <https://datatracker.ietf.org/doc/html/rfc3264>`_
* `WebRTC 之 SDP <https://www.jianshu.com/p/bd397f73d2b2>`_
* `WebRTC 协议之 ROAP (RTCWeb Offer/Answer Protocol) <https://www.jianshu.com/p/58678471ec13>`_
