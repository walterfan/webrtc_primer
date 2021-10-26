########################
WebRTC RTX
########################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** WebRTC RTX
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:


简介
=========================

RTP retransmission is an effective packet loss recovery technique for real-time applications with relaxed delay bounds.

`RFC4588`_ describes an RTP payload format for performing retransmissions.  Retransmitted RTP packets are sent in a separate stream from the original RTP stream.

发送方与接收方之间的丢包会显著地降低接收到的媒体质量。有好几种技术可以用来提高抗丢包的弹性：

* Forward error correction (FEC)： 前身纠错
* Retransmissions 重传
* Interleaving 交织
  
`RFC2354`_ 对这些方法有所讨论
  
RTX 即 RTransmission, 用于丢包重传， 它使用额外的 ssrc   
  

参考资料
=========================
* RFC4588: `RTP Retransmission Payload Format`_
* RFC4585: `Extended RTP Profile for RTCP-Based Feedback`_
* `Implement RTX for WebRTC`_


.. _Implement RTX for WebRTC: https://bugzilla.mozilla.org/show_bug.cgi?id=1164187
.. _RTP Retransmission Payload Format: https://tools.ietf.org/html/rfc4588
.. _Extended RTP Profile for RTCP-Based Feedback: https://datatracker.ietf.org/doc/html/rfc4585
