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


音频在200ms 之内的延迟，视频在400ms 之内的延迟基本上不影响实时通信的质量


发送方
* 根据丢包(remotePacketLoss)和延迟(RTT), 调整分辨率和帧率
* 通过启用 FEC 来避免重传(retransmission)

接收方
* 根据丢包(packetLoss)和延迟(receiveSkew), 抖动(jitter) 来估算带宽，发送  REMB 来告知发送方调整带宽
* use FEC to repair error

WebRTC 内置的机制
============================
在 API 层面, 可以设置视频的最小和最大分辨率（width * height) 和帧率 (frameRate)，例如

.. code-block::

  {
    "audio": true,
    "video": {
        "width": {
            "min": "1280",
            "max": "4096"
        },
        "height": {
            "min": "720",
            "max": "2160"
        },
        "frameRate": {
            "min": "5",
            "max": "60"
        }
    }
  }

WebRTC 内部有一些控制，例如 overuse_frame_detector, 它可以根据编码时间(CPU 时间)占采样间隔的占用率来评估当前设备是否过载。

当资源过载时，针对不同的场景需要不同的调整策略，Webrtc 有 3 种调整策略：

* MAINTAIN_FRAMERATE：保帧率，降分辨率，该模式的使用场景为视频模式
* MAINTAIN_RESOLUTION: 保分辨率降帧率，使用场景为屏幕共享或者文档模式，对清晰度要求较高的场景
* BALANCED: 平衡帧率与分辨率

.. code-block:: c++

  enum class DegradationPreference {
    // Don't take any actions based on over-utilization signals. Not part of the
    // web API.
    DISABLED,
    // On over-use, request lower resolution, possibly causing down-scaling.
    MAINTAIN_FRAMERATE,
    // On over-use, request lower frame rate, possibly causing frame drops.
    MAINTAIN_RESOLUTION,
    // Try to strike a "pleasing" balance between frame rate or resolution.
    BALANCED,
  };


WebRTC 提供一个接口 MediaStreamTrack Content Hints 用来告知当前所使用的模式

https://www.w3.org/TR/mst-content-hint/


Glossary
==================
* PLI: Picture Loss Indication 图片丢失通知
* SLI: Slice Loss Indication 图像切片丢失通知
* TMMBR: Temporal Max Media Bitrate Request，表示临时最大码率请求。表明接收端当前带宽受限，告诉发送端控制码率。
* REMB: ReceiverEstimated Max Bitrate，接收端估计的最大码率。
* TMMBN: Temporal Max Media Bitrate Notification
* FIR: Full Intra Request

note: Intra的含义是图像内编码，不需要其他图像信息即可解码；Inter指图像间编码，解码需要参考帧。
故Intra Frame其实就是指I帧，Inter Frame指P帧或B帧。在一个中心化的Video Conference中，新的参与者加入，就需要发送一个FIR，
其他的参与者给他发送一个关键帧这样才能解码，而 PLI 和 SLI 的含义更多是在发生丢包或解码错误时使用。


RTX
----------

RTX stands for retransmission.

In the context of WebRTC, this refers to IETF RC 4588 that defines a special RTP payload that is used to retransmit packets that were previously sent.

While retransmission is usually useless in RTC, there are times where it can make sense – especially if a previous frame needs to be used for the decoding of fresh frames

测试工具
==================================

Network Link Conditioner
-----------------------------------


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
* `Webrtc video framerate/resolution 自适应 <https://xie.infoq.cn/article/50b7931b8a023f8ca7f25d4e9>`_