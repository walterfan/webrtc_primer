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

Transport-wide Sequence Number
===========================================

在每个要发送的 RTP 包中添加一个扩展头，包含 16 bits 的序号 sequence number.  在同一个传输通道中，每发一个 RTP 包，这个序号就加一


.. code-block::

      0                   1                   2                   3
      0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
     +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
     |       0xBE    |    0xDE       |           length=1            |
     +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
     |  ID   | L=1   |transport-wide sequence number | zero padding  |
     +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+



Transport-wide RTCP Feedback Message
===========================================

.. code-block::

        0                   1                   2                   3
        0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |V=2|P|  FMT=15 |    PT=205     |           length              |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |                     SSRC of packet sender                     |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |                      SSRC of media source                     |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |      base sequence number     |      packet status count      |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |                 reference time                | fb pkt. count |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |          packet chunk         |         packet chunk          |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       .                                                               .
       .                                                               .
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |         packet chunk          |  recv delta   |  recv delta   |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       .                                                               .
       .                                                               .
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |           recv delta          |  recv delta   | zero padding  |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

* version (V):  2 bits This field identifies the RTP version.  The current version is 2.

* padding (P):  1 bit If set, the padding bit indicates that the packet contains additional padding octets at the end that are not part of the control information but are included in the length field.

* feedback message type (FMT):  5 bits This field identifies the type of the FB message.  It must have the value 15.

* payload type (PT):  8 bits This is the RTCP packet type that  identifies the packet as being an RTCP FB message. The value must be RTPFB = 205.

* SSRC of packet sender:  32 bits The synchronization source identifier for the originator of this packet.

* SSRC of media source:  32 bits The synchronization source identifier of the media source that this piece of feedback

* information is related to.  TODO: This is transport wide, do we just pick any of the media source SSRCs?

* base sequence number:  16 bits The transport-wide sequence number of the first packet in this feedback.  This number is not necessarily increased for every feedback; in the case of reordering it may be decreased.
  - 该 fb 包首个 rtp 包的 transport seq，非 rtp 包序列号。

* packet status count:  16 bits The number of packets this feedback  contains status for, starting with the packet identified by the base sequence number.
  - 该 fb packet 包含 rtp 包个数。

* reference time:  24 bits Signed integer indicating an absolute reference time in some (unknown) time base chosen by the sender of the feedback packets.  The value is to be  interpreted in multiples of 64ms.  The first recv delta in this packet is relative to the reference time.  The reference time makes it possible to calculate the delta between feedbacks even if some feedback packets are lost,  since it always uses the same time base.
  - 参考时间，fb 包首个 rtp 的到达时间/64
  
* feedback packet count:  8 bits A counter incremented by one for each feedback packet sent.  Used to detect feedback packet losses.
  - 已发送 feedback 包计数器，可用于 fb packet 丢失检测
  
* packet chunk:  16 bits A list of packet status chunks.  These indicate the status of a number of packets starting with the one identified by base sequence number.  See below  for details.
  - 描述 rtp 包 4 种状态（见：4.2），有 Run Length Chunk 和 Status Vector Chunk 两种格式
  
* recv delta: 8 bits For each "packet received" status, in the packet  status chunks, a receive delta block will follow.  See details below.
  - 当 rtp 包的状态为 Packet received，通过 recv delta 记录其与前一个 rtp 包到达的时间间隔。



Rtp Packet Status
---------------------------------

包的状态 (Packet Status) 表示为 2 个比特的符号：

* 00 Packet not received （包未收到）
* 01 Packet received, small delta （包收到，间隔时间很小 ）
* 10 Packet received, large or negative delta（ 包收到，间隔时间很大或者为负数）
* 11 [Reserved], packet received, w/o recv delta (包收到了，但是没有间隔时间)


Packet chunk 
--------------------

packet  chunk 对 rtp 的到达状态进行描述，它有两种类型  

* Run Length Chunk 
* Status Vector Chunk

通过第一个比特位标识了是哪种类型 

* 0 ：Run Length Chunk 
* 1 ：Status Vector Chunk


Run Length Chunk
~~~~~~~~~~~~~~~~~~~~

.. code-block::

       0                   1
       0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5
      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
      |T| S |       Run Length        |
      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+


.. sidebar:: 行程编码

    编码原理是把数据看成一个线性序列，而这些数据序列组织方式分成两种情况：
    1) 连续的重复数据块，
    2) 连续的不重复数据块。

    对于连续的重复数据快采用的压缩策略是用一个字节（我们称之为数据重数属性）表示数据块重复的次数，然后在这个数据重数属性字节后面存储对应的数据字节本身举个例子：

    原始数据：A-A-A-A-A-B-B-C-D

    * 压缩前：A-A-A-A-A-B-B-C-D（0x41-0x41-0x41-0x41-0x41-0x42-0x42-0x43-0x44）
    * 压缩后： 5-A-2-B-1-C-1-D（0x05-0x41-0x02-0x42-0x01-0x43-0x01-0x44）

字段含义如下

* T (1 bit) : chunk type，当为 Run Length Chunk ，此时值为 0。

* S (1 bit)  ：packet status symbo，2 bits ，表示包的到达状态

* Run Length (13 bit) ：表示多少个连续包的状态

例 1：

.. code-block::

      0                   1
       0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5
      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
      |0|0 0|0 0 0 0 0 1 1 0 1 1 1 0 1|
      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

   00 代表包未收到 "packet not received" 后面13个比特值为 221，表示221个包未收到


例 2:

.. code-block::

       0                   1
       0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5
      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
      |0|1 1|0 0 0 0 0 0 0 0 1 1 0 0 0|
      +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

   11 代表 "packet received, w/o recv delta" ，共有 24 个包，不过没有间隔时间数据


Status Vector Chunk
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block::

        0                   1
        0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |T|S|       symbol list         |
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+


* T(1 bit): chunk type， 当为 Status Vector Chunk ，此时值为 1。

* S(1 bit): symbol size 符号长度，0 表示符号长度为 14， 1 表示符号长度为 7

* Symbol list(14 bits)，符号表，描述了 x 个包的到达状态，x 的数量取决于 S 的值，
  - 当 S = 0 时 x = 14，每个符号为 1 个比特， 0 代表没收到，1 代表收到了
  - 当 S = 1 时 x = 7， 每个符号为 2 个比特， 00，01，10，11 表示包的状态
   


例 1:

.. code-block

        0                   1
        0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |1|0|0 1 1 1 1 1 0 0 0 1 1 1 0 0|
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

这块数据中 S = 0 ，包含了 14 个包的状态，用 14 个比特位描述， 0 代表没收到，1 代表收到了

   1x "packet not received" - 第一个包没收到
   5x "packet received"     - 之后 5 个包收到了
   3x "packet not received" - 之后 3 个包没收到
   3x "packet received"     - 之后 3 个包收到了
   2x "packet not received" - 之后 2 个包没收到


例 2:

.. code-block

        0                   1
        0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |1|1|0 0 1 1 0 1 0 1 0 1 0 0 0 0|
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+

这块数据中 S = 1 ，包含了 7 个包的状态，每个包用 2 个比特来描述

      1x "packet not received"

      1x "packet received, w/o timestamp"

      3x "packet received"

      2x "packet not received"

Receive Delta
=========================

当包的状态为 Packet received，此时 fb packet 会通过 Receive Delta 记录其与前一个 RTP 包到达时间的间隔，单位是 250us. 

* 当状态是 "Packet received, small delta"，用 8-bit unsigned 存储 delta，此时 delta 取值为 `[0,255] * 250` 

* 当状态是 "Packet received, large or negative delta"，用 16-bit signed 存储 delta，此时 delta 取值为 `[-32767, 32768] * 250`


其他情况，用使用新的 fb 包

Sender Bandwidth Estimation
==================================================

* GoogleCcNetworkController
* SendSideBandwidthEstimator
* DelayBaseBwe
  - Interarrival
  - Trendline
  - AIMDRateController
* Trendline



参考资料
==================================================
* `RTP Extensions for Transport-wide Congestion Control (draft-holmer-rmcat-transport-wide-cc-extensions-01) <https://datatracker.ietf.org/doc/html/draft-holmer-rmcat-transport-wide-cc-extensions-01>`_
* `Webrtc Rtp/rtcp （2） <https://xie.infoq.cn/article/8a8ad2f8170d0072941c2aa9e>`_
* `webrtc 即时带宽评估器（BitrateEstimator）<https://xie.infoq.cn/article/2f944089023274ef0ac6eabd8>`