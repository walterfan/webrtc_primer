:orphan:

##############################
WebRTC OveruseFrameDetector
##############################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** WebRTC OveruseFrameDetector
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

Overview
=============

用户使用的设备千差万别，

视频的分辨率，帧率过高可能会耗费大量的 CPU 资源，如果用户的设备性能不高，可能会造成应用程序


过载检测器，分别对 cpu，qp，分辨率进行状态检测，通过与设定阈值比较，高于就认为过载，低于就认为欠载。


overuse frame detector
-----------------------------


cpu 检测器”，通过编码器占用率与设定的阀值进行比较，编码器占用率计算公式：

编码器占用率 = 编码时长/采集间隔，具体的实现在 SendProcessingUsage1 类中，编码时长与采集间隔

都用了指数加权移动平均法（EWMA）。


Reference
==================
* https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/video/adaptation/encode_usage_resource.h
* https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/video/adaptation/overuse_frame_detector.h

