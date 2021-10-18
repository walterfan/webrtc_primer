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

* 反馈 Feedback： 通过 NACK(Negative ACK), PLI(Picture Loss Indication), FIR 这些反馈机制要求发送方重新发包
* 纠错 FEC：通过发送一些冗余的包，例如 RED， ULPFEC 这些协议来在接收方恢复丢失或错误的包
* 带宽控制 bandwidth control：在弱网环境下降低带宽使用率（升码率，帧率或分辨率）在网络恢复后再提高带宽使用率（升码率, 帧率或分辨率）
* 拥塞控制 congestion control: 在网络拥塞时如何应对
* 抗抖动 Dejitter Buffer
* 故障转移 Fallover: 切换到不同的连接通道，协议和服务器集群

参考资料
======================


https://www.w3.org/TR/webrtc-priority/