#############
Opus Codec
#############

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ =============
**Abstract** Opus Codec
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ =============

.. |date| date::

.. contents::
   :local:

概述
=============

Opus 是一种实时交互音频编码， 设计用来满足在 `RFC6366 <https://tools.ietf.org/html/rfc6366>`_  中所提出的对互联网音频编码的需求.
不稳定的网络环境下的高质量语音通信.


Opus 由基于线性预测 (LP)的层和基于修正离散余弦变换 (MDCT)的层组成。

使用两层背后的主要思想是：对于语音，线性预测技术（如代码激励线性预测 CELP）的低频率编码比变换（例如，MDCT）域技术更加有效，而对于音乐和更高频率的语音，情况则正相反。

因此，具有两层可用的编解码器可操作范围比任何单个一层都大，将它们组合在一起比起单独使用任何一个能实现更好的质量。

本规范的主要规范部分由附录 A 中的源代码提供。只有该软件的解码器部分是规范的，尽管编码器和解码器共享大量代码。第 6 节提供了解码器一致性测试。解码器包含大量需要精确执行的整数和定点算术，包括所有舍入考虑，因此任何有用的规范都需要特定领域的符号语言来充分定义这些操作。此外，必须解决符号表示与包含的参考实现之间的任何冲突。出于兼容性和可测试性的实际原因，在任何分歧中给予参考实现优先级将是有利的。 C 语言也是机器行为的最广泛理解、人类可读的符号表示之一。由于这些原因，本 RFC 使用参考实现作为编解码器的唯一符号表示。

虽然符号表示是明确和完整的，但它并不总是理解编解码器操作的最简单方法。出于这个原因，本文档还以散文的形式描述了编解码器的重要部分，并借此机会解释了许多更令人惊讶的设计元素背后的基本原理。这些描述旨在准确和提供信息，但普通英语的局限性有时会导致歧义，因此预计读者将始终与符号表示一起阅读。为此提供了许多对实现的引用。这些描述有时在排序或数学简化方面与参考文献不同，只要这种偏差使解释更容易理解。例如，参考实现中的右移和左移操作在文本中经常使用除法和乘法来描述。一般来说，文本侧重于“什么”和“为什么”，而符号表示最清楚地提供了“如何”。


Opus可以处理各种音频应用，包括IP语音，视频会议，游戏内聊天，甚至远程现场音乐表演。它可以从低比特率窄带语音扩展到非常高质量的立体声音乐。支持的特性包括：

* 比特率从 6kb/s 到 510 kb/s
* 采样率从 8kHz（窄带）到 48kHz（全频段）
* 帧大小从 2.5ms 到 60ms
* 支持恒定比特率（CBR）和可变比特率（VBR）
* 从窄带到全频带的音频带宽
* 支持语音和音乐
* 支持单声道和立体声
* 支持多达255个通道（多流帧）
* 动态可调比特率，音频带宽和帧大小
* 良好的稳健性和隐蔽性
* 浮点和定点实现

互联网音频编码需求
=====================

`Requirements for an Internet Audio Codec <https://tools.ietf.org/html/rfc6366>`_

定义
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Narrowband: 8 kilohertz (kHz)
* Wideband: 16 kHz
* Super-wideband: 24/32 kHz
* Full-band: 44.1/48 kHz

应用场景
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Point-to-point calls
* Conferencing
* Telepresence
* Teleoperation
* In-game voice chat
* Live distributed music performances / Internet music lessons
* Delay-tolerant networking or push-to-talk services
* Other applications


详细的基本需求
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* 操作空间
* 质量和比特率
* 丢包健壮性
* 计算资源

其他的考虑
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

术语
================

* bitrate 比特每秒
* complexity 复杂度从1到10，复杂度最高为10
* signal_type 信号类型有 OPUS_AUTO, OPUS_SIGNAL_VOICE 或 OPUS_SIGNAL_MUSIC

* audio_frame 以 opus_int16 或 float 数据类型的音频数据
* frame_size  音频帧的长度，也是就所包含的采样数(per channel)

例如 48 kHz 所允许的值有 120, 240, 480, 960, 1920, 和 2880
传入一个小于 10 ms(以 48 kHz 为例是 480 个采样) 会阻止编码器使用 LPC 或混合模式

* packet 音频数据包是一个包含压缩数据的字节数组
* max_packet 最大数据包是指音频数据包可以包含的最大的字节数  (最大为 4000 字节).

不要使用 max_packet 来控制目标可变比特率，用 OPUS_SET_BITRATE 来代替




Opus Architecture
=============================





Opus编码带宽
-----------------------------

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



Opus frame size and timestamp increments
================================================

+---------+-----------------+-----+-----+-----+-----+------+------+
|   Mode  |        fs       | 2.5 |  5  |  10 |  20 |  40  |  60  |
+=========+=================+=====+=====+=====+=====+======+======+
| ts incr |       all       | 120 | 240 | 480 | 960 | 1920 | 2880 |
+---------+-----------------+-----+-----+-----+-----+------+------+
|  voice  | NB/MB/WB/SWB/FB |  x  |  x  |  o  |  o  |  o   |  o   |
+---------+-----------------+-----+-----+-----+-----+------+------+
|  audio  |   NB/WB/SWB/FB  |  o  |  o  |  o  |  o  |  x   |  x   |
+---------+-----------------+-----+-----+-----+-----+------+------+


Control Parameters
===================================
* bitrate
* channels
* audio Bandwidth
* frame duration
* complexity
* packetloss resilience
* FEC
* Constant/Variable bitrate
* DTX

  
FEC
-----------------------------------

In-band Forward Error Correction (FEC)

Packets that are determined to contain perceptually important speech information, such as onsets or transients,
are encoded again at a lower bitrate and this re-encoded information is added to a subsequent packet.


Discontinuous Transmission (DTX)
----------------------------------------------------------------------
Discontinuous Transmission (DTX) reduces the bitrate during silence or background noise.
When DTX is enabled, only one frame is encoded every 400 milliseconds.



内部分帧
===================================


TOC
-----------------------------------

帧打包
-----------------------------------

Opus Decoder 解码
===================================
* Range Decoder
* SILK Decoder
* Packet Loss Concealment
* Configuration Switching
  


Opus Encoder 编码
===================================
* Range Encoder
* SILK Encoder
* CELT Encoder



SDP
===========

* maxaveragebitrate
* maxplaybackrate
* minptime
* stereo
* cbr
* useinbandfec
* usedtx
* sprop-maxcapturerate
* sprop-stereo

Example
--------------

.. code-block::

    m=audio 9000 RTP/SAVPF 111
    a=rtpmap:111 opus/48000/2
    a=ptime:20
    a=maxptime:20
    a=fmtp:111 minptime=20
    a=fmtp:111 maxplaybackrate=24000; sprop-maxcapturerate=24000; maxaveragebitrate=40000; useinbandfec=1; usedtx=1


API
===========
* Encodes an Opus frame.

.. code-block:: C++

    // 创建编码器
    OpusEncoder *opus_encoder_create(
        opus_int32 Fs,
        int channels,
        int application,
        int *error
    )

    // 修改编码器参数
    int opus_encoder_ctl(
        OpusEncoder *st,
        int request, ...
    )

    // 创建解码器
    OpusDecoder *opus_decoder_create(
        opus_int32 Fs,
        int channels,
        int *error
    )

    // 将PCM编码成opus
    opus_int32 opus_encode(
        OpusEncoder *st,
        const opus_int16 *pcm,
        int frame_size,
        unsigned char *data,
        opus_int32 max_data_bytes
    )

    // 从opus中译码出PCM
    int opus_decode(
        OpusDecoder *st,
        const unsigned char *data,
        opus_int32 len,
        opus_int16 *pcm,
        int frame_size,
        int decode_fec
    )



参考资料
====================================================

* `RFC6716 Definition of the Opus Audio Codec <https://tools.ietf.org/html/rfc6716>`_

* `Official Opus RTP specification - RFC 7587 <https://tools.ietf.org/html/rfc7587>`_

* `Official Opus file format specification- RFC 7845 <https://tools.ietf.org/html/rfc7845>`_

* `Updates to the Opus Audio Codec - RFC 8251 <https://tools.ietf.org/html/rfc8251>`_

* `Ambisonics in an Ogg Opus Container - RFC 8486 <https://tools.ietf.org/html/rfc8486>`_

* `Documentation – Opus Codec <https://opus-codec.org/docs/>`_

* `编解码器杂谈：浅析 Opus <https://mbd.baidu.com/ma/s/Qhnhx3tH>`_

* `互联网音频编码需求 - RFC6366  <https://tools.ietf.org/html/rfc6366>`_

