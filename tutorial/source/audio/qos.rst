###############
Audio QoS
###############

.. contents::
   :local:

3A
===============

AGC
---------------

语音增强是为了解决噪声污染干扰的一种预处理手段。
理论基础是语音特性，噪声特性以及人耳的感知特性。


AEC
---------------

回声抵消

回声有

* 电学回声（线路回声）： 标准方法为  G.165
* 声学回声: 延时长，噪声干扰严重，语音信号动态范围大


线路回声抵消
~~~~~~~~~~~~~~~~~


声学回声抵消
~~~~~~~~~~~~~~~~~

方法有

1. 麦克风阵列
2. 频移的方法
3. 回声抑制器


ANS
---------------

`Noise reduction`_ is the process of removing noise from a signal.

Audio noise reduction is for audio noise.

Noise reduction techniques exist for audio and images. Noise reduction algorithms may distort the signal to some degree.


.. _Noise reduction: https://en.wikipedia.org/wiki/Noise_reduction

差错检测与恢复
================

纠错码
* 线性分组码
* 卷积码
* Turbo 码
* RS 码
* RCPC 码
* LDPC 码


抗丢包方案
------------------------

1. 语音算法本身的丢包健壮性
2. 多描述语音编码 MDSC(Multiple Description Speech Coding)
3. 滑动窗算法
4. 交织及前身纠错技术
5. 丢包隐藏技术