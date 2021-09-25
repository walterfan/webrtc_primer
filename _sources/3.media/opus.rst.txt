#############
Opus Codec
#############

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

.. contents:: 目录
    :local:

******************************
Opus 音频编码定义
******************************

Opus 是一种实时交互音频编码， 设计用来满足在 `RFC6366 <https://tools.ietf.org/html/rfc6366>`_  中所提出的对互联网音频编码的需求.
不稳定的网络环境下的高质量语音通信


* Sampling rates from 8 to 48 kHz
* Bit-rates from 6 kb/s to 510 kb/s
* Support for both constant bit-rate (CBR) and variable bit-rate (VBR)
* Audio bandwidth from narrowband to full-band
* Support for speech and music
* Support for mono and stereo
* Support for multichannel (up to 255 channels)
* Frame sizes from 2.5 ms to 60 ms
* Good loss robustness and packet loss concealment (PLC)
* Floating point and fixed-point implementation



`RFC6716 Definition of the Opus Audio Codec <https://tools.ietf.org/html/rfc6716>`_

1. Introduction 简介
=============================

Opus 编解码器是一种实时交互式音频编解码器，旨在满足 WebRTC 的要求。 
它由基于线性预测 (LP)的层和基于修正离散余弦变换 (MDCT)的层组成。 

使用两层背后的主要思想是：对于语音，线性预测技术（如代码激励线性预测 CELP）的低频率编码比变换（例如，MDCT）域技术更加有效，而对于音乐和更高频率的语音，情况则正相反。

因此，具有两层可用的编解码器可操作范围比任何单个一层都大，将它们组合在一起比起单独使用任何一个能实现更好的质量。
  
本规范的主要规范部分由附录 A 中的源代码提供。只有该软件的解码器部分是规范的，尽管编码器和解码器共享大量代码。第 6 节提供了解码器一致性测试。解码器包含大量需要精确执行的整数和定点算术，包括所有舍入考虑，因此任何有用的规范都需要特定领域的符号语言来充分定义这些操作。此外，必须解决符号表示与包含的参考实现之间的任何冲突。出于兼容性和可测试性的实际原因，在任何分歧中给予参考实现优先级将是有利的。 C 语言也是机器行为的最广泛理解、人类可读的符号表示之一。由于这些原因，本 RFC 使用参考实现作为编解码器的唯一符号表示。

虽然符号表示是明确和完整的，但它并不总是理解编解码器操作的最简单方法。出于这个原因，本文档还以散文的形式描述了编解码器的重要部分，并借此机会解释了许多更令人惊讶的设计元素背后的基本原理。这些描述旨在准确和提供信息，但普通英语的局限性有时会导致歧义，因此预计读者将始终与符号表示一起阅读。为此提供了许多对实现的引用。这些描述有时在排序或数学简化方面与参考文献不同，只要这种偏差使解释更容易理解。例如，参考实现中的右移和左移操作在文本中经常使用除法和乘法来描述。一般来说，文本侧重于“什么”和“为什么”，而符号表示最清楚地提供了“如何”。

1. Opus 概述
=============================

Opus 编码可从 6 kbit/s 窄带单声道语音扩展到 510 kbit/s 全带立体声音乐， 其算法延迟范围从5 ms 到 65.2 ms。在给定的时间，或者 LP 层，或者 MDCT 层，或者两者都有应用。它可无缝地在它的各种操作模式之间切换，这给它很大的灵活性来适应各种内容和网络条件，而无需重新协商当前的会话。

此编码允许输入和输出多种不同的音频带宽，定义如下：

+----------------------+-----------------+-------------------------+
| Abbreviation         | Audio Bandwidth | Sample Rate (Effective) |
+======================+=================+=========================+
| NB (narrowband)      |           4 kHz |                   8 kHz |
+----------------------+-----------------+-------------------------+
| MB (medium-band)     |           6 kHz |                  12 kHz |
+----------------------+-----------------+-------------------------+
| WB (wideband)        |           8 kHz |                  16 kHz |
+----------------------+-----------------+-------------------------+
| SWB (super-wideband) |          12 kHz |                  24 kHz |
+----------------------+-----------------+-------------------------+
| FB (fullband)        |      20 kHz (*) |                  48 kHz |
+----------------------+-----------------+-------------------------+



2.1.7 FEC
-----------------------------------

In-band Forward Error Correction (FEC)

Packets that are determined to contain perceptually important speech information, such as onsets or transients,
are encoded again at a lower bitrate and this re-encoded information is added to a subsequent packet.


2.1.9.  Discontinuous Transmission (DTX)
----------------------------------------------------------------------
Discontinuous Transmission (DTX) reduces the bitrate during silence or background noise.
When DTX is enabled, only one frame is encoded every 400 milliseconds.


控制参数
-----------------------------------

3. 内部分帧
===================================


TOC
-----------------------------------

帧打包
-----------------------------------

4. Opus Decoder 解码
===================================



5. Opus Encoder 编码
===================================


6. 一致性
====================================



* `RFC8251 Updates to the Opus Audio Codec <https://tools.ietf.org/html/rfc8251>`_

它由基于线性预测（LP）[LPC]的层和基于改进离散余弦变换（MDCT）[MDCT]的层组成。


******************************
互联网音频编码需求
******************************

`Requirements for an Internet Audio Codec <https://tools.ietf.org/html/rfc6366>`_

定义
================================

* Narrowband: 8 kilohertz (kHz)
* Wideband: 16 kHz
* Super-wideband: 24/32 kHz
* Full-band: 44.1/48 kHz

应用场景
================================

* Point-to-point calls
* Conferencing
* Telepresence
* Teleoperation
* In-game voice chat
* Live distributed music performances / Internet music lessons
* Delay-tolerant networking or push-to-talk services
* Other applications

互联网引入的对编码的限制
================================

详细的基本需求
================================

* 操作空间
* 质量和比特率
* 丢包健壮性
* 计算资源

其他的考虑
================================

* 混音的低复杂性
* 编码的潜在改进
* 分层的比特流
* 部分的冗余
* 立体声支持
* 比特错误的健壮性
* 时间的拉长和缩短
* 输入的健壮性
* 对音频识别的支持
* 对传统的兼容


参考资料
====================================================

* `IETF specifications Official Opus codec RFC 6716 <https://tools.ietf.org/html/rfc6716>`_

* `Official Opus RTP specification - RFC 7587 <https://tools.ietf.org/html/rfc7587>`_

* `Official Opus file format specification- RFC 7845 <https://tools.ietf.org/html/rfc7845>`_

* `Updates to the Opus Audio Codec - RFC 8251 <https://tools.ietf.org/html/rfc8251>`_

* `Ambisonics in an Ogg Opus Container - RFC 8486 <https://tools.ietf.org/html/rfc8486>`_

* `Documentation – Opus Codec <https://opus-codec.org/docs/>`_

* `编解码器杂谈：浅析 Opus <https://mbd.baidu.com/ma/s/Qhnhx3tH>`_

* `互联网音频编码需求 - RFC6366  <https://tools.ietf.org/html/rfc6366>`_
