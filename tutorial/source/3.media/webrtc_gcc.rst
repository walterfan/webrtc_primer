:orphan:

################################
Google Congestion Control
################################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** WebRTC RTP 拥塞控制
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:


简介
=========================

GCC [#]_ 拥塞控制算法根据估计的拥塞状态调节发送速率。 为了估计状态，GCC 采用了一种有限状态机，该状态机由通过比较测得的单向延迟变化与动态阈值而获得的信号来驱动。

简而言之，当瓶颈被估计为“未充分利用 underused”时，发送速率就会增加； 当估计为“过度使用 overused”时，发送速率会降低。 当 GCC 流与 TCP 流共享瓶颈时，使用动态阈值来估计拥塞状态是解决饥饿问题的关键设计要求。

主要有两种方法:

* 接收端控制器计算接收的比特率 :math:`A_r`, 并将它发回给发送端，采用的算法是基于延迟的，估算出带宽会通过 REMB 消息发回给发送端
  
* 发送端控制器计算出不超过的 :math:`A_r` 的目标发送比特率，采用的算法有早期基于丢包的算法，也有后期推荐的基于延迟的算法

除了 RFC草案 `A Google Congestion Control Algorithm for Real-Time Communication`_ 有详细阐述，在 IEEE 发布的文章 “Understanding the Dynamic Behaviour of the Google Congestion Control for RTCWeb” [#]_ 亦有所探讨。



数学符号约定
----------------------------------------


* X_bar 变量 X，其中 X 是向量 - 通常由变量名称加上顶部的横线。

* X_hat 对变量 X 真实值的估计 - 通常由变量名称加上顶部的抑扬音调符号标记。

* X(i) 向量 X 的“第 i”个值 - 通常由下标 i 标记。

* [x y z] 由元素 x、y 和 z 组成的行向量。

* X_bar^T 向量 X_bar 的转置。

* E{X} 随机变量 X 的期望值


1. 系统模型
=======================================

.. figure:: ../_static/gcc-architecture.png
      :scale: 90 %
      :alt: gcc-architecture
      :align: center

      GCC Architecture

3. 反馈和扩展
========================================

* 接收端：使用基于延迟的控制器， 可采用 RTP 扩展头 “abs_send_time”
* 发送端：使用基于丢包的控制器， 可采用 `REMB <webrtc_remb.html>`_ 反馈估算的最大带宽和 RTCP Receiver Report 来反馈丢包及用来计算 RTT
   

4. 发送引擎
=======================================

步行者 `Pacing` 用来驱动由控制器计算出的目标比特率

当媒体编码器产生数据时，会被送往一个步行者队列 (Pacer queue). 步行者 (Pacer) 每隔 burst_time 发送一组数据包到网络上。
推荐的 burst_time 为 5ms, 一组数据包的大小计算为目标比特率和 burst_time 的乘积。


5.  基于延迟的控制
=======================================

基于延迟的控制的算法主要分为四个部分：

1) pre-filtering 预先过滤
2) arrival-time filter 到达时间过滤器
3) over-use detector 过度使用检测器
4) rate-control 速率控制器


5.1 到达时间模型
-----------------------------------
两个包发送的间隔 T(i) – T(i-1) 和接收的间隔 t(i) – t(i-1) 在理想情况下是相同的，实际上会有不同.
也就是说包的到达时间并未保持稳定的速度。 在计算的时候可以用以帧分组，对两个组的到达时间进行计算。

.. math::

   d(t_{i})={\triangle L(t_{i})\over C(t_{i})}+m(t_{i})+n(t_{i})

.. code-block::

   # 发送间隔与到达时间之间的延时
   d(i) = t(i) – t(i-1) – (T(i) – T(i-1))

   # 两组包之间的大小之差
   dL(i) = L(i) - l(i-1)

   # C(i) 表示带宽
   d(i) = dL(i)/C(i) + m(i) + v(i)   

其中dL(i)表示相邻两帧的长度差，

* T(i)是第i个数据包组中第一个数据包的发送时间，
* t(i)是第i个数据包组中最后一个数据包的到达时间
* C(i)表示网络信道容量，
* m(i)表示网络排队延迟，
* v(i)表示网络抖动或其他延迟噪声。

   C(i) 是我们想预测的带宽，m(i)即是我们要求得的网络排队延迟, 可由 Kalman Filter 求得

5.2.  Pre-filtering 预先过滤
-----------------------------------------------------
The pre-filtering aims at handling delay transients caused by channel outages.  During an outage, packets being queued in network buffers, for reasons unrelated to congestion, are delivered in a burst when the outage ends.

The pre-filtering merges together groups of packets that arrive in a burst.  Packets are merged in the same group if one of these two conditions holds:

* A sequence of packets which are sent within a burst_time interval constitute a group.

* A Packet which has an inter-arrival time less than burst_time and an inter-group delay variation d(i) less than 0 is considered being part of the current group of packets.

预滤波旨在处理由信道中断引起的延迟瞬变。 在中断期间，由于与拥塞无关的原因，在网络缓冲区中排队的数据包会在中断结束时突发传送。

预过滤将突发到达的数据包组合并在一起。 如果满足以下两个条件之一，则数据包将合并到同一组中：

* 在一个 burst_time 间隔内发送的数据包序列构成一个组。

* 具有小于 burst_time 的到达间隔时间和小于0 的组间延迟变化d(i) 的数据包被认为是当前数据包组的一部分。


在 RTCP Sender Report 中有成对的 NTP timstamp 和 RTP timestamp， 这样就可以把 RTP 包中的 timestamp 转换为 NTP timstamp。

.. code-block::

                0                   1                   2                   3
                0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
            +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
     header |V=2|P|    RC   |   PT=SR=200   |             length            |
            +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
            |                         SSRC of sender                        |
            +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
     sender |              NTP timestamp, most significant word             |
     info   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
            |             NTP timestamp, least significant word             |
            +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
            |                         RTP timestamp                         |
            +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
            |                     sender's packet count                     |
            +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
            |                      sender's octet count                     |
            +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
     report |                 SSRC_1 (SSRC of first source)                 |
     block  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       1    | fraction lost |       cumulative number of packets lost       |
            +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
            |           extended highest sequence number received           |
            +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
            |                      interarrival jitter                      |
            +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
            |                         last SR (LSR)                         |
            +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
            |                   delay since last SR (DLSR)                  |
            +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
     report |                 SSRC_2 (SSRC of second source)                |
     block  +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       2    :                               ...                             :
            +=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
            |                  profile-specific extensions                  |
            +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+



接收端控制器是一种基于延迟的拥塞控制算法，通过下面的公式来计算 :math:`A_r`

.. math::

   A_{r}(t_{i})=\cases{\eta A_{r}(t_{i-1}) & ${\rm Increase}$\cr \alpha R(t_{i}) & ${\rm Decrease}$\cr A(t_{i-1}) & ${\rm Hold}$}


5.3 到达时间滤波器 arrival time filter
-----------------------------------------------------

估计



5.4 过度使用检测器 The over-use detector
-----------------------------------------------------
 
每次接收到视频帧 :math:`t_i` 时，过度使用检测器都会产生一个信号 s，该信号基于排队延迟 :math:`m(t_i)` 和阈值 :math:`\gamma` 来驱动 FSM (下面的有限状态机) 的状态 :math:`\sigma`，算法 1 详细显示了 s 是如何生成的 ：

当 :math:`m(t_i) > \gamma` 时，算法通过增加帧间隔时间 :math:`\Delta T` 的变量 :math:`t_{OU}` 来跟踪在这种情况下花费的时间。 
当 :math:`t_{OU}` 达到 :math:`\bar{t}_{OU}=100ms` 且 :math:`m(t_i) > m(t_{i-1})`` 时，产生过度使用信号。 

另一方面，如果 :math:`m(t_i)` 减小到 :math:`\gamma` 以下，则产生未充分利用信号，而当 :math:`-\gamma \leq m(t_i) \leq \gamma` 时触发正常信号。


.. figure:: ../_static/rate-controller-fsm.gif
      :scale: 90 %
      :alt: remote rate controller finite state machine
      :align: center

      remote rate controller finite state machine


* 算法: Over-use Detector pseudo-code 过度使用检测器的伪代码

.. figure:: ../_static/over-use-detector-pseudo-code.gif
   :scale: 90 %
   :alt: over-use detector pseudo code
   :align: center

   over-use detector pseudo code



1) Rate controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This block computes Ar according to (3) by using the signal s produced by the overuse detector, which drives the finite state machine shown in Figure 3.

5) REMB Processing
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This block notifies the sender with the computed rate Ar through REMB messages. The REMB messages are sent either every 1s, or immediately, if Ar(ti)< 0.97Ar(ti−1), i.e. when Ar has decreased more than 3%.


4. 发送端控制器
======================

发送端控制器是一种基于丢失的拥塞控制算法，它在每次 tk 第 k 个 RTCP 报告消息到达发送方或每次 tr 携带 Ar 的第 r 个 REMB 消息到达发送方时起作用。 RTCP 报告的发送频率是可变的，它取决于反向路径的可用带宽； 反向路径可用带宽越高，RTCP 报告频率越高。 REMB 格式是 RTCP 协议 [20] 的扩展，RMCAT WG 正在讨论该协议（另见第 III-B 节）。 RTCP 报告包括如 [20] 中所述计算的丢失数据包比例 fl(tk)。 发送方使用 fl(tk) 计算发送速率 As(tk)，以 kbps 为单位，根据以下等式：

.. math::

   A_{s}(t_{k})=\cases{\max\{X(t_{k}), A_{s}(t_{k-1})(1-0.5f_{l}(t_{k}))\} & $f_{l}(t_{k})>0.1$\cr 1.05\ (\ A_{s}(t_{k-1})+\ 1{\rm kbps}) & $f_{l}(t_{k})<0.02$\cr A_{s}(t_{k-1}) & ${\rm otherwise}$}




参考代码
======================
* https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/modules/
  - congestion_controller/
  - remote_bitrate_estimator/


参考资料
================

* `GCC Introduction`_


.. [#] `A Google Congestion Control Algorithm for Real-Time Communication`_ （draft-ietf-rmcat-gcc-02）

.. [#] `Understanding the Dynamic Behaviour of the Google Congestion Control for RTCWeb <https://ieeexplore.ieee.org/document/6691458>`_

.. _A Google Congestion Control Algorithm for Real-Time Communication: https://datatracker.ietf.org/doc/html/draft-ietf-rmcat-gcc-02
.. _GCC Introduction: https://www.cnblogs.com/wangyiyunxin/p/11122003.html


