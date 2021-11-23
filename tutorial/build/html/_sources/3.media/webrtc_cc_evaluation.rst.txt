################################
Congeston Control Evaluation
################################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ =============================
**Abstract** Congeston Control Evaluation
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ =============================

.. |date| date::

.. contents::
   :local:


Evaluating Congestion Control for Interactive Real-Time Media
=====================================================================

度量
-------------

从数据包日志中可以计算出下列度量指标

1.   Sending rate, receiver rate, goodput (measured at 200ms intervals) 发送速率，接收速率，和实际吞吐量（以 200ms 间隔来度量）

2.   Packets sent, packets received

3.   Bytes sent, bytes received

4.   Packet delay

5.   Packets lost, packets discarded (from the playout or de-jitter buffer)

6.   If using retransmission or FEC: post-repair loss

7.   Self-fairness and fairness with respect to cross traffic:
   
    Experiments testing a given congestion control proposal must
    report on relative ratios of the average throughput (measured at
    coarser time intervals) obtained by each RTP media stream.  In
    the presence of background cross-traffic such as TCP, the report
    must also include the relative ratio between average throughput
    of RTP media streams and cross-traffic streams.

    During static periods of a test (i.e., when bottleneck bandwidth
    is constant and no arrival/departure of streams), these reports
    on relative ratios serve as an indicator of how fairly the RTP
    streams share bandwidth amongst themselves and against cross-
    traffic streams.  The throughput measurement interval should be
    set at a few values (for example, at 1 s, 5 s, and 20 s) in
    order to measure fairness across different timescales.

    As a general guideline, the relative ratio between congestion-
    controlled RTP flows with the same priority level and similar
    path RTT should be bounded between 0.333 and 3.  For example,
    see the test scenarios described in [RFC8867].

8.  Convergence time: The time taken to reach a stable rate at startup, after the available link capacity changes, or when new
    flows get added to the bottleneck link.

9.  Instability or oscillation in the sending rate: 
     
    The frequency or number of instances when the sending rate oscillates between an
    high watermark level and a low watermark level, or vice-versa in
    a defined time window.  For example, the watermarks can be set
    at 4x interval: 500 Kbps, 2 Mbps, and a time window of 500 ms.

10. Bandwidth utilization, defined as the ratio of the instantaneous sending rate to the instantaneous bottleneck capacity: 
   
    This metric is useful only when a congestion-controlled RTP flow is by itself or is competing with similar cross-traffic.


From the logs, the statistical measures (min, max, mean, standard
deviation, and variance) for the whole duration or any specific part
of the session can be calculated.  Also the metrics (sending rate,
receiver rate, goodput, latency) can be visualized in graphs as
variation over time; the measurements in the plot are at one-second
intervals.  Additionally, from the logs, it is possible to plot the
histogram or cumulative distribution function (CDF) of packet delay.


List of Network Parameters
------------------------------------

One-Way Propagation Delay
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1.  Very low latency: 0-1 ms

2.  Low latency: 50 ms

3.  High latency: 150 ms

4.  Extreme latency: 300 ms


End-to-End Loss
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1.  no loss: 0%

2.  1%

3.  5%

4.  10%

5.  20%



Drop-Tail Router Queue Length
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Loss Generation Model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Jitter Models
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Random Bounded PDV (RBPDV)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Approximately Random Subject to No-Reordering Bounded PDV (NR-BPDV)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Recommended Distribution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Traffic Models
---------------------------------
TCP Traffic Model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

RTP Video Model
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Background UDP
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

