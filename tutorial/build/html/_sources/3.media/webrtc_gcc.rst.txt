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



