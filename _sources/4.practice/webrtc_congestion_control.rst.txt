:orphan:

##############################
WebRTC Congestion Control
##############################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** WebRTC Congestion Control
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

Overview
=============

Code
=============


.. code-block:: c++

   enum class BandwidthUsage {
      kBwNormal = 0,
      kBwUnderusing = 1,
      kBwOverusing = 2,
      kLast
   };



* refer to https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/modules/congestion_controller/


Reference
==================
* https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/video/adaptation/encode_usage_resource.h
* https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/video/adaptation/overuse_frame_detector.h

