######################
video adaptation
######################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** Video Adaptation
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

概述
=========

用于 WebRTC 应用的设备往往参差不齐，有高大上的 macbook pro, 也有老掉牙的老笔记本或台式机，或者轻便小巧的平板。多媒体特别是视频的编解码是很耗费资源的, 这时候，需要根据设备的资源消耗情况，实时调整编码质量，如分辨率，帧率等，避免对系统资源主要是 CPU 的使用宜占用过多。



Reference
================
* `Webrtc video framerate/resolution 自适应 <https://xie.infoq.cn/article/50b7931b8a023f8ca7f25d4e9>`_
* `overuse_frame_detector <https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/video/adaptation/overuse_frame_detector.h>`_