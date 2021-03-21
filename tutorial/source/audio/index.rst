
####################
Audio
####################

.. toctree::
   :maxdepth: 1
   :caption: Audio Technique:

   basic
   opus

.. contents:: Contents
   :depth: 3

...........
Functions
...........

* SIP signaling interface with TAS/MACC
* MSML (Media Server Markup Language, created by Convedia) interpreting
* RTP Rx/Tx (receiving/transmitting)
* Jitter buffering controller (adaptive policy)
* Decoding (G.711/G.722/G.729/PLC)
* Audio enhancement processing (AGC, LEC, NC)
* Conference mixing
* Active speaker notification
* Encoding (G.711/G.722/G.729)
* Single call/Conference prompt playback
* Naming recording/Conference recording
* Mute/unmute
* DTMF collecting/reporting (RFC2833/In-band/KPML)
* TLS/Secure RTP
* IPv6 RTP media transport

...........
Codec
...........

* G.711
  - A-Law
  - μ-Law
* G.722 SB-ADPCM (Sub-band ADPCM)
  - not including G.722.1, G.722.2, these codecs are not variants of G.722
* G.729a
  - G.729 Annex A is a compatible extension of G.729, but requires less computational power
  - G.729 Annex B is not supported
* `Opus`_

.. _Opus: audio/opus.html

...........
主要指标
...........

* 编码速率/比特率
  8 ~ 16 kbit/s 称为中码率，高于它为高码率， 小于它即为低码率，2.4 ~ 8 kbit/s， 小于2.4 kbit/s 称为超低码率
* 编码的顽键性
* 编码延迟
* 误码容错
* 算法复杂性 MIPS（Million Instructions Per Second)
* 语音质量
  - 广播级
  - 网络或电话级
  - 通信级
  - 合成级

语音质量评价标准
============================

1. 主观评价

* 清晰度或可懂度 Intelligibility
* 音质 Quality



FAQ
=============================

为什么语音采样需要 8000 Hz？
-----------------------------

人类说话产生的频率是正常范围是 300Hz ~ 3400 Hz，滤波器会把这个频率范围之外的信号过滤掉
根据采样定理， 3400 -> 4000 * 2 = 8000 Hz， 而采样周期为 1秒/8000次 = 125us



注：采样定理：如果信号带宽小于采样频率的二分之一，那么此时这些离散的采样点能够完全表示原信号。


PDM 是什么？
------------------------------

PDM(Pulse Code Modulation) 即脉冲编码调制，每秒8000次抽样，每次抽样用一个 8bit 二进制数表示其振幅。
每秒需要传输 64k bit = 8 * 8000


...........
Reference
...........

* Opus: https://opus-codec.org/





