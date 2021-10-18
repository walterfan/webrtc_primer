########################
WebRTC stats
########################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** WebRTC Stats
**Authors**  Walter Fan
**Status**   WIP as draft
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:



Overview
======================


In WebRTC, the above metrics are wrapped as a stats object RTCStatsReport, which is an interface provides a statistics report obtained by calling one of the

* RTCPeerConnection.getStats()
* RTCRtpReceiver.getStats()
* RTCRtpSender.getStats()

refer to https://www.w3.org/TR/webrtc-stats for detailed definition of the above interface

Domain Object
RTCStatsReport
It is a dictionary that return by getStats method, which contains a mapping of statistic category string names to objects containing the corresponding statistics data.
refer to https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport

All WebRTC statistics objects are fundamentally based on the RTCStats dictionary, the following categories will be implemented

* inbound-rtp
* outbound-rtp
* remote-inbound-rtp
* candidate-pair

.. image:: ../_static/webrtc_stats_class.png


传输层 transport layer
==================================
* latency
* jitter
* packet loss
* bitrate
* packetRate

荷载层 payload layer 
==================================
* Key frames
* Concealment frames


实现
==================================

假设张三和李四进行在线的视频会议

延迟
------------------------------
* RTT(Round Trip Time) 


* 端到端延迟
    
  - 张三说话直到李四听到李四的声音
  - 张三眨眼直到李四看到李四的眨眼

 