#################
WebRTC QoS
#################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** WebRTC QoS
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:


概述
======================

在 WebRTC 中，我们希望有高质量和低延迟的音视频通信效果，声音清晰，画面流畅，可是在复杂多变的网络环境中，要做到这点，其实很难。

为提高通信质量，通过有如下手段：

.. image:: ../_static/webrtc_flow.png
  :alt: webrtc_flow

* 反馈 Feedback 和重传 RTX(Retransimission)
  
  通过 NACK(Negative ACK), PLI(Picture Loss Indication), FIR(Full Intra Request) 这些反馈机制要求发送方重新发包
  重传在网络拥塞时并非最好的选择，反而会把加重拥塞，要在发送端做平滑的速率控制 (rate controller)

* 纠错 FEC
  
  通过发送一些冗余的包，例如 RED， ULPFEC 这些协议来在接收方恢复丢失或错误的包

* 带宽控制 bandwidth control
  
  在弱网环境下降低带宽使用率（升码率，帧率或分辨率）在网络恢复后再提高带宽使用率（升码率, 帧率或分辨率）
  也有称它为码率控制，拥塞控制 congestion control，主要关注于在网络拥塞时如何应对， 
  相关的协议有 `REMB`_，`GCC`_, TMMBR，TMMBN 等

* 抗抖动 Dejitter Buffer

* 故障转移 Fallover: 切换到不同的连接通道，协议和服务器集群


高质量与低延迟的平衡
============================
以 Video 为例， 在网络会议中需要流畅的视频，可是带宽有限，网络质量不是太好，这样就需要降低视频和图像质量（例如降低分辨率，帧率等）
所以我们需要在高质量与低延迟之间做平衡，如何平衡的依据很重要，我们要看度量数据(metrics), 例如丢包，延迟，抖动等数据。

发送方
* 根据丢包(remotePacketLoss)和延迟(RTT), 调整分辨率和帧率
* 通过启用 FEC 来避免重传(retransmission)

接收方
* 根据丢包(packetLoss)和延迟(receiveSkew), 抖动(jitter) 来估算带宽，发送  REMB 来告知发送方调整带宽
* use FEC to repair error

WebRTC 内置的机制
============================
在 API 层面
* MediaStreamTrack Content Hints

https://www.w3.org/TR/mst-content-hint/


177 5191 0482

Glossary
==================

RTX
----------

RTX stands for retransmission.

In the context of WebRTC, this refers to IETF RC 4588 that defines a special RTP payload that is used to retransmit packets that were previously sent.

While retransmission is usually useless in RTC, there are times where it can make sense – especially if a previous frame needs to be used for the decoding of fresh frames

实例
==================================

假设张三和李四进行在线的视频会议

延迟
------------------------------
* RTT(Round Trip Time) 


端到端延迟
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  - 张三说话直到李四听到李四的声音
  - 张三眨眼直到李四看到李四的眨眼

 
estimatedPlayoutTimestamp
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
* 类型 DOMHighResTimeStamp 以毫秒为单位表示的足够准确的时间戳，表示为一个双精度 double 数据类型

这是在接收端 media track 估计的回放时间, 它是一个 NTP 时间戳，来自最近一个可播放的音频采样或者视频帧，也就是从 RTP 头中的 timestamp 通过 RTCP SR 消息映射为 NTP timestamp，推测它准备好播放以来经过的时间。这是发送方的 media track 的“当前时间”（NTP 时间戳），即使当前没有可播放的音视频，它依然可以存在。

它可用于估计从相同数据源来的音频和视频有多少是不同步的： 

::
   
   audioTrackStats.estimatedPlayoutTimestamp - videoTrackStats.estimatedPlayoutTimestamp.


FAQ
================

丢失或损坏的媒体流如何修复？
--------------------------------------------
参见 RFC2354: Options for Repair of Streaming Media , 可供选择有手段有 

* redundant transmission
* retransmission
* interleaving
* forward error correction


分辨率与比特率之间的关系
--------------------------------------------

参见 https://chromium.googlesource.com/external/webrtc/+/master/media/engine/webrtc_video_engine.cc#326

.. code-block:: c++

  // The selected thresholds for QVGA and VGA corresponded to a QP around 10.
  // The change in QP declined above the selected bitrates.
  static int GetMaxDefaultVideoBitrateKbps(int width,
                                          int height,
                                          bool is_screenshare) {
    int max_bitrate;
    if (width * height <= 320 * 240) {
      max_bitrate = 600;
    } else if (width * height <= 640 * 480) {
      max_bitrate = 1700;
    } else if (width * height <= 960 * 540) {
      max_bitrate = 2000;
    } else {
      max_bitrate = 2500;
    }
    if (is_screenshare)
      max_bitrate = std::max(max_bitrate, 1200);
    return max_bitrate;
  }



参考资料
======================
* `RFC2354`_: Options for Repair of Streaming Media 
* `RFC5348`_: TCP Friendly Rate Control (TFRC): Protocol Specification
* `RFC4588`_: RTP Retransmission Payload Format
* `RFC5104`_: Codec Control Messages in the RTP Audio-Visual Profile with Feedback (AVPF)
* `RFC4585`_: Extended RTP Profile for RTCP-Based Feedback (RTP/AVPF)
* `REMB`_ : RTCP message for Receiver Estimated Maximum Bitrate
* `GCC`_: A Google Congestion Control Algorithm for Real-Time Communication
* `WebRTC Priority API`_