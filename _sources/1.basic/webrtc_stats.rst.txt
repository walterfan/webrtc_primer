########################
WebRTC stats
########################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** WebRTC Stats
**Authors**  Walter Fan
**Status**   WIP as draft
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:



Overview
======================

In WebRTC, the above metrics are wrapped as a stats object RTCStatsReport, which is an interface provides a statistics report obtained by calling one of the

* RTCPeerConnection.getStats()
* RTCRtpReceiver.getStats()
* RTCRtpSender.getStats()

refer to https://www.w3.org/TR/webrtc-stats for detailed definition of the above interface

Domain Object
RTCStatsReport
It is a dictionary that return by getStats method, which contains a mapping of statistic category string names to objects containing the corresponding statistics data.
refer to https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport

All WebRTC statistics objects are fundamentally based on the RTCStats dictionary, the following categories will be implemented

* inbound-rtp
* outbound-rtp
* remote-inbound-rtp
* candidate-pair

.. image:: ../_static/webrtc_stats_class.png


传输层 transport layer
==================================
* latency
* jitter
* packet loss
* bitrate
* packetRate

荷载层 payload layer 
==================================
* Key frames
* Concealment frames


重要的是搞清楚状况
===================================

由于新冠疫情，我们待在家中，在网上工作，开会，看电影的时间越来越多了。网络嘛，大家都知道，时常不稳定，网上开会时声音听不清楚，图像模糊，视频有马赛克（不是人为打的）的情况时有发生，这时候，问题出在哪里呢？
也许是网络的问题，也许不是，即使网络出现问题，只要不是不可忍受的，我们依然需要进行调整，保证基本的功能：

1. 语音通话要保持通畅，这是要首先保证的
2. 共享的桌面或文件内容要能够识别
3. 视频要能看到，哪怕分辨率低点也行

首要的事情是要搞清楚出了什么问题？网络传输问题，设备问题，编解码的问题，还是音视频源的问题？

网络抓包后分析媒体流是常规的媒体质量分析方法，可是用户和服务器都不可能让你随时随地去抓包，何况还有安全和隐私问题的红线。所以剩下的选择就是度量
metrics, 做好度量就能见微知著，透过现象看本质，为上述问题找出答案。

先看一个例子 `WebRTC Statistics Example`_\ ， 源码很简单，参见 \*
`stats_demo.html`_ \* `stats_demo.js`_

就是建立一个本地端到端的连接，将收集到的统计数据打印出来

.. image:: https://upload-images.jianshu.io/upload_images/1598924-61df76ebeb2dd752.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240

1) Audio Inbound-rtp 接收的 Audio RTP 数据度量
----------------------------------------------

.. image:: https://upload-images.jianshu.io/upload_images/1598924-33252b250bd2bf2a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240

注： \* concealedSamples： 类型为 unsigned long long，
它只存在于音频中，指隐藏的(concealed)
的音频采样的总个数。一个隐藏的采样是指用本地合成的音频采样来替换收到的音频采样进行回放。它所隐藏的是丢失的包(度量指标为
packetsLoss)或者来得太迟的语音数据包(度量指标为packetsDiscarded)，尽量使得听者感知不到有丢包的情况

-  silentConcealedSamples 类型为 unsigned long long
   它只存在于音频中，指以静音包(slient)作为隐藏的(concealed)
   的音频采样的总个数。静音包以静音或者舒适噪音进行播放，silentConcealedSamples是concealedSamples的子集

-  JitterBufferDelay: 类型为 double ,
   单位为秒，抖动缓冲区的目的让子弹飞一会儿, 将收到的 RTP
   数据包暂存一下, 等一会儿再将缓冲区的 RTP
   包重新组合成帧或者重新排序并平滑播放。此处描述的模型假设样本或帧仍处于压缩状态且尚未解码。
   它是每个音频样本或视频帧从抖动缓冲区接收到第一个数据包的时间（收取时间戳）到它退出抖动缓冲区的时间（发出时间戳）所用时间的总和。
   在音频的情况下，多个样本属于同一个 RTP
   数据包，因此它们将具有相同的摄取时间戳，但不同的抖动缓冲区发出时间戳。
   在视频的情况下，帧可能是通过多个 RTP
   数据包接收的，因此收取时间戳是进入抖动缓冲区的最早数据包，发出时间戳是整个帧退出抖动缓冲区的时间。该指标在样本或帧退出时增加，在缓冲区中完成它们的时间（并增加
   jitterBufferEmittedCount）。 平均抖动缓冲延迟可以通过将
   jitterBufferDelay 与 jitterBufferEmittedCount 相除来计算。

-  jitterBufferEmittedCount：类型为 unsigned long long
   从抖动缓冲区中出来的音频样本或视频帧的总数

-  audioLevel 类型为double, 它代表媒体源的音频水平， 这个值位于 0 和 1
   之间，这里的 1 代表 0 dBov, 0 代表静音，0.5 表示声压级从 0 dBov
   开始大约 6 dBSPL 变化。

注1：dB（SPL）表示 dB（声压级，sound pressure
level）意为在空气或其它气体中的声压，其参考值为20微帕斯卡
:math:`（μP_a） = 2×10^{−5} P_a`\ ，这是人能听到的最安静的声音。大致相当于3米外蚊子飞行的声音。经常被缩写为“dB”，这造成了很多误解以为“dB”是个有量纲的绝对单位。对于水声或其它液体，参考值是1
μPa。 dBov or dBO 意为 dB（过载，overload）–
信号的幅值，其参照于设备的最大在限幅（clipping）发生前的最大允许值。

注2：声压指声音的强度 $ L_p = 20 log_{10}(P_{rms}/P_{ref}) dB $,
单位是分贝，分贝是一个比值，分母 :math:`P_{ref}` 是 20 微帕， 20
微帕是人耳所能听到的最低的声音强度。

-  totalAudioEnergy：类型为 double ， 只存在于音频中。
   它代表收到的音轨的音频能量。这个值计算方式如下:
   每一个收到的音频采样(指标为 totalSamplesReceived) ,
   将采样值加起来，并除以最高强度的编码值，再平方并乘以采样的时间(秒)。
   换句话说，即 ``duration * Math.pow(energy/maxEnergy, 2)``\ 。
   它可以用来获取均方根 RMS(Root Mean Square), 使用与 RFC6464 定义的
   audioLevel 的相同单位。

可以如下公式来转换为这些单位
``Math.sqrt(totalAudioEnergy/totalSampleDuration)``,
而计算平均音频电平的公式为
``Math.sqrt((energy2 - energy1)/(duration2 - duration1))``\ 。

例如， 如果生成一个 10ms 音频数据包， 其 RMS 为 0.5（超过 1.0）, 则将
``0.5 * 0.5 * 0.01 = 0.0025`` 加到 totalAudioEnengy, 如果另外一个 10ms
音频数据包，其 RMS 为 0.1，则添加 0.0001 到 totalAudioEnengy。
然后，\ ``Math.sqrt(totalAudioEnergy/totalSamplesDuration)`` 变为
``Math.sqrt(0.0026/0.02) = 0.36``\ ，这与通过对连续 20 毫秒音频段进行
RMS 计算获得的值相同。

如果使用多个音频通道，则样本的音频能量是指任一通道的最高能量。

2) Audio outbound-rtp 发送的 Audio RTP 数据度量
-----------------------------------------------

.. image:: https://upload-images.jianshu.io/upload_images/1598924-53ca64d7d7435d8f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240

3) Video Inbound-rtp 接收的 Video RTP 数据度量
----------------------------------------------

.. image:: https://upload-images.jianshu.io/upload_images/1598924-fe0dc54aab574f58.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240

注： \* totalDecodeTime:
花费在解码上的总时间(以秒为单位)，所解码的帧数可由 framesDecoded 得到 \*
totalInterFrameDelay
连续解码的帧之间的帧间延迟总和（以秒为单位），在帧解码后立即记录。

可根据公式：(totalSquaredInterFrameDelay -
totalInterFrameDelay^2/framesDecoded)/framesDecoded，从totalInterFrameDelay、totalSquaredInterFrameDelay
和framesDecoded 计算帧间延迟方差。

-  totalSquaredInterFrameDelay
   连续解码的帧之间的平方帧间延迟的总和（以秒为单位）

4) Video outbound-rtp 发送的 Video RTP 数据度量
-----------------------------------------------

.. image:: https://upload-images.jianshu.io/upload_images/1598924-bef8d2bdf0fda02c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240

WebRTC statistics API
=====================

详细的 API 和数据结构定义参见
https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/getStats

.. image:: https://upload-images.jianshu.io/upload_images/1598924-bee7d7d33e4c0f14.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240

-  candidate-pair: refer to RTCIceCandidatePairStats.
-  inbound-rtp: refer to RTCInboundRtpStreamStats
-  outbound-rtp: refer to RTCOutboundRtpStreamStats
-  remote-inbound-rtp: refer to RTCRemoteInboundRtpStreamStats
-  remote-outbound-rtp: refer to RTCRemoteOutboundRtpStreamStats

.. image:: https://upload-images.jianshu.io/upload_images/1598924-85a9cf2eb95afab3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240

全部的度量指标
==============

参见 https://www.w3.org/TR/webrtc-stats/#summary

度量驱动改进
============

我们可以用各种工具来更改网络条件，例如延迟，丢包，抖动等，观察度量指标的变化.

以我常用的 macos 为例，可以安装 `Network Link Cponditioner`_
对本地发送接收的网络条件进行调整，再观察应用的度量指标。

这样在系统设置里可以看到 Network Link Conditioner 的图标

.. image:: https://upload-images.jianshu.io/upload_images/1598924-d32ba17291666f18.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240

然后点击 “Manage Profiles”, 对上行(uplink) 和下行 (downlink)
的带宽(bandwidth)，丢包(packet loss)， 延迟(delay) 进行调整：

.. image:: https://upload-images.jianshu.io/upload_images/1598924-1a09712691a1a79a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240

至于 windows ，我们可以使用 `Clumsy`_ 来更改网络参数, 下载地址有
https://jagt.github.io/clumsy/download.html Manual:
https://jagt.github.io/clumsy/manual.html， 界面如下

.. image:: https://upload-images.jianshu.io/upload_images/1598924-705ea68c6071d2e0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240

至于 Linux 服务器，可以使用 Linux Traffic Control 的 netem
模块来模拟网络异常, 例如想要在服务器上添加 200ms 的延迟

::

   apt-get install iproute
   tc qdisc add dev eth0 root netem delay 200ms
   tc qdisc show  dev eth0

参考资料
===================

-  https://www.w3.org/TR/webrtc-stats
-  https://nshipster.com/network-link-conditioner/#installation
-  https://www.linux.org/docs/man8/tc-netem.html

.. _WebRTC Statistics Example: https://www.fanyamin.com/webrtc/examples/stats_demo.html
.. _stats_demo.html: https://github.com/walterfan/webrtc_primer/blob/main/examples/stats_demo.html
.. _stats_demo.js: https://github.com/walterfan/webrtc_primer/blob/main/examples/js/stats_demo.js
.. _Network Link Cponditioner: https://nshipster.com/network-link-conditioner/#installation
.. _Clumsy: https://jagt.github.io/clumsy/index.html

* https://github.com/webrtc/webrtc-org/blob/gh-pages/experiments/rtp-hdrext/abs-capture-time/index.md
* https://github.com/w3c/webrtc-stats/issues/537
* https://codereview.webrtc.org/2946413002/ 
* https://webrtc.googlesource.com/src/+/refs/heads/master/docs/native-code/rtp-hdrext/video-timing https://github.com/w3ctag/design-reviews/issues/493
* https://github.com/webrtc/samples/pull/27