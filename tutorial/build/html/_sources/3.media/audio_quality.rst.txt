#################
Audio Quality
#################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ =============
**Abstract** Audio Quality
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ =============

.. |date| date::

.. contents::
   :local:

概述
=============

There are four types of impairments that a QoS tester should focus on:

* Bandwidth Limiting
* Packet Loss
* Packet Jitter
* Packet Delay


Standard
===================
There are Six Major International Standards:

* PSQM (1996)
* PEAQ (1999)
* PESQ (2000)
* 3SQM (2004)
* PEVQ (2008)
* POLQA (2010)


POLQA
---------------------
POLQA is the next-generation mobile voice quality testing standard P.863 ” the successor of PESQ

* POLQA stands for ‚Perceptual Objective Listening Quality Assessment‚
* Standardised as Draft ITU-T P.863, following the history of P.861 ’PSQM’ and P.862 ‘PESQ’
* Specially developed for HD Voice, 3G and 4G/LTE, VoIP 
* Offers a new level of benchmarking accuracy
* A joint development of the POLQA consortium in the ITU-T

Application of POLQA

* Handset and accessory Acoustic performance
* Coding and Audio path quality
* Voice Enhancement processing
* Speech with noise performance
* Speech level and filtering effects
* Standards Conformance


Bandwidth Limiting
---------------------------
Bandwidth Limiting sets the maximum amount of network packets that can be sent through the network.  The bandwidth limiting sets the theoretical maximum bandwidth for the connection.  Therefore, the actual amount of data that can be sent through the channel will be less than the limit because of network overhead.  It is adjusted in kilobits per second (Kbps).  Ex. 1000 Kbps = 1 megabit.

Packet Loss
---------------------------
Packet loss sets the percentage of total packets that will be lost in transit from the sender to receiver.  It is adjusted in percentage of total packets from 0 - 100%.

Packet Jitter
---------------------------
Packet jitter is the time between when each packet is received.  The time is adjusted in milliseconds, and the impairment tool adds a random amount of time between the packets between 0 and the number entered, so that the time interval between two packets is random.

Packet Delay
---------------------------
Packet delay is the amount of time it takes for each packet to arrive to the sender.  The time is adjusted in milliseconds.



MOS
=================

A Mean Opinion Score (MOS) is a numerical measure of the human-judged overall quality of an event or experience.  In telecommunications, a Mean Opinion Score is a ranking of the quality of voice and video sessions.

Most often judged on a scale of 1 (bad) to 5 (excellent), Mean Opinion Scores are the average of a number of other human-scored individual parameters.  Although originally Mean Opinion Scores were derived from surveys of expert observers, today a MOS is often produced by an Objective Measurement Method approximating a human ranking.




ITU-T's P.800.1 discusses objective and subjective scoring of telephone transmission quality, while recommendations such as P.863 and J.247 cover speech and video quality, respectively.

The most commonly used rating scale is the Absolute Category Ranking (ACR) scale, which ranges from 1 to 5. The levels of the Absolute Category Ranking are:

* 5 Excellent
* 4 Good
* 3 Fair
* 2 Poor
* 1 Bad



Audio distortion
=============================

refer to https://audiojudgement.com/measure-distortion-audio-systems/


Tools
==============

`visqol`_
---------------------

ViSQOL(Virtual Speech Quality Objective Listener)虚拟语音质量目标监听器是感知音频质量的客观、完整的参考指标。

它使用参考和测试语音信号之间相似性的空间-时间(spectro-temporal)度量来产生 MOS-LQO（平均意见分数 - 听力质量目标）分数。 

MOS-LQO 分数范围从 1（最差）到 5（最好）。




Reference
==============

* `MOS`_

.. _visqol: https://github.com/google/visqol
.. MOS_: https://en.wikipedia.org/wiki/Mean_opinion_score

