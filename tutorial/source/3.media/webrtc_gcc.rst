################################
WebRTC Congestion Control
################################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** WebRTC 拥塞控制
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:


简介
=========================
视频会议需要低延迟和高带宽

* 基于延迟的控制器 delay-based controller
* 基于丢包的控制器 loss-based controller


基本架构
=========================

在发送方，根据 RTCP Receiver Report 中的 faction lost 得知丢包率，可以调整发送的码率


在接收方，根据 RTP 包到达的时间延迟，通过 arrival time filter, 估算出网络延迟 m(ti), 经过 over-user detector 来判断当前网络的拥塞情况， 再由 Remote rate controller 根据规则计算出最大码率 Ar, 通过 RTCP REMB 消息将 Ar 发回给发送方。 发送方再由 A_s, A_r 和配置，计算出目标的码率 A, 应用到 Encoder 和 Packed Sender 来控制发送方的码率。


.. image:: ../_static/gcc-architecture.png
   :alt: gcc-architecture

术语
=========================

* 排队延迟

* 延迟梯度

* 卡尔曼滤波

* inter-depature delta time

* inter-arrival delta time

* inter-group delay variation

* BBR

* PCC

平滑发送 Smooth Sender
=========================
* send rate
* ack rate
  

参考资料
=========================
* `REMB`_ : RTCP message for Receiver Estimated Maximum Bitrate
* `GCC`_: A Google Congestion Control Algorithm for Real-Time Communication
* `Analysis and Design of the Google Congestion Control for WebRTC <https://c3lab.poliba.it/images/6/65/Gcc-analysis.pdf>`_


