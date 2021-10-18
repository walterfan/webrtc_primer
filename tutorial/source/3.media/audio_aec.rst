
##############################
Acoustic Echo Canceller
##############################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** Acoustic Echo Canceller
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

概述
===================

何为回声？
---------------------

In audio signal processing and acoustics, an echo is a reflection of sound that arrives at the listener with a delay after the direct sound. The delay is directly proportional to the distance of the reflecting surface from the source and the listener. Typical examples are the echo produced by the bottom of a well, by a building, or by the walls of an enclosed room and an empty room. A true echo is a single reflection of the sound source.[citation needed]

回声产生的原因
--------------------

从通讯回音产生的原因看，可以分为声学回音（Acoustic Echo）和线路回音（Line Echo），相应的回声消除技术就叫声学回声消除（Acoustic Echo Cancelation，AEC）和线路回声消除（Line Echo Canceltion，LEC）。



一方面，IP电话系统与PSTN互联时，涉及到混合线圈的2/4线转换电路，因而会产生线路回声 (Line Echo）。另一方面，IP电话的语音数据在传输过程中还存在“声学回声(Acoustic Echo）”。

声学回声是指扬声器播放出来的声音被麦克风拾取后发回远端，使远端谈话者能听到自己的声音。

声学回声又分为直接回声和间接回声。

* 直接回声是指扬声器播放出来的声音未经任何反射直接进入麦克风。这种回声延迟最短，它与远端说话者的语音能量，扬声器与话筒之间的距离、角度、扬声器的播放音量以及话筒的拾取灵敏度等因素相关；
  
* 间接回声是指扬声器播放的声音经不同的路径一次或多次反射后进入麦克风所产生的回声集合。
  
当回声返回时间超过 10 ms时，人耳就可听到明显的回声了，会干扰正常通话。对于时延相对较大的IP网络环境，时延很容易就达到50 ms，因此必须清除回声。


回声消除的方法
-----------------------

回声消除是非常复杂的技术，但我们可以简单的描述两种处理方法：

1. 回声路径消除

2) 房间A的音频会议系统接收到房间B中的声音

3) 声音被采样，这一采样被称为回声消除参考

4) 随后声音被送到房间A的音箱和声学回声消除器中

5) 房间B的声音和房间A的声音一起被房间A的话筒拾取

6) 声音被送到声学回声消除器中，与原始的采样进行比较，移除房间B的声音

2. 自适应滤波器

自适应滤波器是以输入和输出信号的统计特性的估计为依据，采取特定算法自动地调整滤波器系数，使其达到最佳滤波特性的一种算法或装置。
自适应滤波器 可以是连续域的或是离散域的。离散域自适应滤波器由一组抽头延迟线、可变加权系数和自动调整系数的机构组成。



* specfic double-talk Detector

* auditory masking

* power coherence

* subband processing


Reference
=====================