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

GCC [#]_ 拥塞控制算法根据估计的拥塞状态调节发送速率。 为了估计状态，GCC 采用了一种有限状态机，该状态机由通过比较测得的单向延迟变化与动态阈值而获得的信号驱动。

简而言之，当瓶颈被估计为“未充分利用 underused”时，发送速率就会增加； 当估计为“过度使用 overused”时，发送速率会降低。 当 GCC 流与 TCP 流共享瓶颈时，使用动态阈值来估计拥塞状态已成为解决饥饿问题的关键设计要求。

主要有两个算法:

* 接收端控制器计算接收的比特率 :math:`A_r`, 并将它发回给发送端
* 发送端控制器计算出不超过的 :math:`A_r` 的目标发送比特率

除了 RFC草案 `A Google Congestion Control Algorithm for Real-Time Communication`_ 有详细阐述，在 IEEE 发布的文章 “Understanding the Dynamic Behaviour of the Google Congestion Control for RTCWeb” [#]_ 亦有所探讨。

1. 发送端控制器
-------------------------------------------

发送端控制器是一种基于丢失的拥塞控制算法，它在每次 tk 第 k 个 RTCP 报告消息到达发送方或每次 tr 携带 Ar 的第 r 个 REMB 消息到达发送方时起作用。 RTCP 报告的发送频率是可变的，它取决于反向路径的可用带宽； 反向路径可用带宽越高，RTCP 报告频率越高。 REMB 格式是 RTCP 协议 [20] 的扩展，RMCAT WG 正在讨论该协议（另见第 III-B 节）。 RTCP 报告包括如 [20] 中所述计算的丢失数据包比例 fl(tk)。 发送方使用 fl(tk) 计算发送速率 As(tk)，以 kbps 为单位，根据以下等式：

.. math::

   A_{s}(t_{k})=\cases{\max\{X(t_{k}), A_{s}(t_{k-1})(1-0.5f_{l}(t_{k}))\} & $f_{l}(t_{k})>0.1$\cr 1.05\ (\ A_{s}(t_{k-1})+\ 1{\rm kbps}) & $f_{l}(t_{k})<0.02$\cr A_{s}(t_{k-1}) & ${\rm otherwise}$}


2. 接收端控制器
-------------------------------------

接收端控制器是一种基于延迟的拥塞控制算法，通过下面的公式来计算 :math:`A_r`

.. math::

   A_{r}(t_{i})=\cases{\eta A_{r}(t_{i-1}) & ${\rm Increase}$\cr \alpha R(t_{i}) & ${\rm Decrease}$\cr A(t_{i-1}) & ${\rm Hold}$}


1) 到达时间滤波器 arrival time filter
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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




2) 过度使用检测器 The over-use detector
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Every time ti a video frame is received, the over-use detector produces a signal s that drives the state σ of the FSM (3) based on m(ti) and a threshold γ, The Algorithm 1 shows in details how s is generated: when m(ti)>γ, the algorithm tracks the time spent in this condition by increasing the variable tOU of the frame inter-departure time △T. When tOU reaches t¯OU=100ms and m(ti)> m(ti−1), the overuse signal is generated. On the other hand, if m(ti) decreases below γ, the underuse signal is generated, whereas the normal signal is triggered when −γ≤m(ti)≤γ.


每次接收到视频帧 :math:`t_i` 时，过度使用检测器都会产生一个信号 s，该信号基于 :math:`m(t_i)` 和阈值 :math:`\gamma` 来驱动 FSM (下面的有限状态机) 的状态 :math:`\sigma`，算法 1 详细显示了 s 是如何生成的 ：

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



3) The remote state region
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This block computes the threshold γ as follows: by default γ=γ¯¯¯ with γ¯¯¯=25/60ms, however, when the system is considered to be close to the congestion, the threshold is halved, i.e. γ=γ¯¯¯/2. In particular, γ is halved when σ= decrease or when Ar is considerably lower that the incoming bitrate R(t).


4) Remote rate controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This block computes Ar according to (3) by using the signal s produced by the overuse detector, which drives the finite state machine shown in Figure 3.

5) REMB Processing
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This block notifies the sender with the computed rate Ar through REMB messages. The REMB messages are sent either every 1s, or immediately, if Ar(ti)< 0.97Ar(ti−1), i.e. when Ar has decreased more than 3%.

参考代码
======================
* https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/modules/
  - congestion_controller/
  - remote_bitrate_estimator/


参考资料
================

* `GCC Introduction`_


.. [#] `A Google Congestion Control Algorithm for Real-Time Communication`_ （draft-alvestrand-rmcat-congestion-03）

.. [#] `Understanding the Dynamic Behaviour of the Google Congestion Control for RTCWeb <https://ieeexplore.ieee.org/document/6691458>`_

.. _A Google Congestion Control Algorithm for Real-Time Communication: https://datatracker.ietf.org/doc/html/draft-alvestrand-rmcat-congestion-03
.. _GCC Introduction: https://www.cnblogs.com/wangyiyunxin/p/11122003.html


