:orphan:

###################################
Transport-wide Congestion Control
###################################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** RTP Extensions for Transport-wide Congestion Control
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:


概述
==================================================
1. Transport wide sequence numbers header extension 
   在 RTP 包中添加一个扩展头，放置传输层面的序号

SDP

.. code-block::

    a=extmap:5 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01


2. Transport Feedback
   增加一个 RTCP 反馈消息，用来反馈接收到的数据包及其延迟的信息 RTCP-Transport-FB 默认发送频率 1time/100ms，同时其动态适应使用 5％的可用带宽，最大频率值为 1time/50ms、最小频率值为 1time/250ms。以 1time/100ms 的频率发送，其最大需要耗费 16kbps 带宽

.. code-block::

    a=rtcp-fb:100 transport-cc


参考资料
==================================================

https://datatracker.ietf.org/doc/html/draft-holmer-rmcat-transport-wide-cc-extensions-01