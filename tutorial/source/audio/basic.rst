#############
Audio Basic
#############

.. contents::
   :local:

Audio 声音是什么
================================

* 声音是气压形成的波

  * 形状
  * 频率
  * 振幅

* 声音的主观属性

  * 响度
  * 音色
  * 音调


Glossaries
================================

* AGC是自动增益补偿功能（Automatic Gain Control）

AGC可以自动调麦克风的收音量，使与会者收到一定的音量水平，不会因发言者与麦克风的距离改变时，声音有忽大忽小声的缺点。

* AEC是回声消除器（Acoustic Echo Chancellor）

AEC的工作原理是通过对讲话者的输出建模，并且将其从麦克风捕捉的信号里除去。AEC有助于确保对方听不到回声。AEC是对扬声器信号与由它产生的多路径回声的相关性为基础，建立远端信号的语音模型，利用它对回声进行估计，并不断地修改滤波器的系数，使得估计值更加逼近真实的回声。然后，将回声估计值从话筒的输入信号中减去，从而达到消除回声的目的，AEC还将话筒的输入与扬声器过去的值相比较，从而消除延长延迟的多次反射的声学回声。根椐存储器存放的过去的扬声器的输出值的多少，AEC可以消除各种延迟的回声。

* ANS是背景噪音抑制功能（Automatic Noise Suppression）

ANS可探测出背景固定频率的杂音并消除背景噪音，例如：风扇、空调声自动滤除。呈现出与会者清晰的声音。

* Decibel 分贝

1. 表示功率量之比的一种单位，等于功率强度之比的常用对数的10倍。
2. 表示场量之比的一种单位，等于场强幅值之比的常用对数的20倍。
3.声压级的单位，大约等于人耳通常可觉察响度差别的最小分度值。

L_I = 10lg(I/I_0)


Audio 频宽
=================================


.. list-table::
  :widths: 15 10 25 50
  :header-rows: 1

  * - 音频质量
    - 频率范围
    - 采样率
    - 采样位数
  * - 电话语音-窄带
    - 200 Hz ~ 3400 Hz
    - 8k Hz
    - 13
  * - 宽带语音-宽带
    - 50 Hz ~ 7k Hz
    - 16k Hz
    - 16
  * - 调频广播-超宽带
    - 20 Hz ~ 15k Hz
    - 32k Hz
    - 16
  * - 高质量音频-全带
    - 20 Hz ~20k Hz
    - 44.1k Hz
    - 16

Audio 语音质量
==========================================


* 清晰度

  * 准确性 fidelity
  * 回声 Echo
     * 振幅: 回声的音量
     * 延迟: 说话声音与回声的时间差
  * 抖动 Jitter
     * 语音数据包抵达目的端的时间变化
        * buffer
           * play out delay buffer
           * dejitter buffer

  * 延迟 Delay
     * 从源端到目的端的所花费时间
     * 影响因素
        * 距离-传播延迟
        * 编码
        * 压缩
        * 序列化
        * 缓存
     * 固定延迟
        * 编码 coding
        * 封包 packetization
        * 序列化 serialization
        * 处理 propagating
           * 网络传输的延迟
     * 可变延迟
        * 也就是抖动

  * 丢包 Packet Loss
     * 网络不稳定
     * 网络拥塞
     * 可变延迟过大
  * 侧音 side tone
     * 使说话人以够从听筒听到自己的声音
  * 背景噪声 background noise
     * 从远端听到的低音量声音
        * VAD 语音活动检测
        * CNG 舒适噪声生成

* 可接受延迟

  * below 150 ms
     * 多数用户可接受
  * 150 to 400 ms
     * 有影响
  * above 400 ms
     * 不可接受


语音质量测量
---------------------------------------------
* MOS 平均意见得分
* PSQM 感知通话质量测量
* PESQ 感知语音质量评估: ITU-T P.862
* POLQA 感性客观听力质量分析


信令协议
======================================

* H.323
* MGCP: RFC3661
* SIP
* SCCP
* REST
* ROAP

媒体传输协议
======================================
* RTP
* RTCP
* SRTP
* CRTP

Codec
======================================

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


Application
======================================

* DTMF

* IVR

* Dial Plan

  * 端点寻址 Endpoint addressing(Numbering Plan)
  * 呼叫路由和路径选择 Call routing and path selection
  * 号码处理 Digit manipulation
  * 呼叫权限 Calling privilege
  * 呼叫覆盖 Call coverage
     * top down
     * circular hunt
     * longest idle

* Components

  * IP Phone
  * PSTN Phone
  * PSTN MG
  * SBC
  * GateKeeper
  * MCU
  * Call Agent
  * Application server
  * TP endpoint

* Examples

  * CUCM - Cisco Unify Call Manager
  * CUSP - Cisco Unify SIP Proxy
  * Asterisk
  * FreeSwitch



Functions
======================================

* Signaling by SIP, XMPP or others
* RTP Rx/Tx (receiving/transmitting)
* Jitter buffering controller (adaptive policy)
* Decoding (G.711/G.722/G.729/PLC)
* Audio enhancement processing (AGC, AEC, ANS)
* Audio mixing
* Active speaker notification
* Encoding (G.711/G.722/G.729)
* Audio playback
* Audio recording
* Mute/unmute
* DTMF collecting/reporting (RFC2833/In-band/KPML)
* TLS/Secure RTP
* IPv6 RTP media transport



主要指标
======================================


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


PCM 是什么？
------------------------------

PCM(Pulse Code Modulation) 即脉冲编码调制，每秒8000次抽样，每次抽样用一个 8bit 二进制数表示其振幅。
每秒需要传输 64k bit = 8 * 8000

