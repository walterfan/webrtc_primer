REMB - 接收者估计的最大带宽
=============================
* What
* Why
* How
* Example
* Conclusion
* Reference

# What

RTCP message for Receiver Estimated Maximum Bitrate
      draft-alvestrand-rmcat-remb-03

用于接收者估计最大比特率的 RTCP 消息

该文档提出了一种RTCP反馈消息，该消息指示一个会话的估计总可用带宽。

REMB（Receiver Estimated Max Bitrate) 接收者估计最大比特率

## Abstract

This document proposes an RTCP message for use in experimentally-deployed congestion control algorithms for RTP-based media flows.

It also describes an absolute-value timestamp option for use in bandwidth estimatoin.

提出了一种RTCP消息，用于基于RTP的媒体流的，实验式部署的拥塞控制算法。

它还描述了用于带宽估计的绝对值时间戳选项


# Why

## Motivation

在信令通道上指定带宽可以通过 SDP 中的

* 整个会话的带宽(比特率)
```
 b = AS:<kbps>) 
```

* 单个媒体流的带宽(media line) 
```
 b=TIAS:<bps>)
``` 

但是毕竟不够及时，还要在信令层重新协商，不如在媒体层直接由接收方发送 RTCP 消息给发送方来得及时


# How

该反馈消息用于在同一RTP会话上向多个媒体流的发送方通知在到达该RTP会话的接收方的路径上的总估计可用比特率。

在用于反馈消息的公共数据包头中（如[RFC4585]的6.1节所定义），“数据包发送者的SSRC”字段指示通知的来源。 不使用“媒体源的SSRC”，并且应将其设置为0。在其他RFC中也使用零值。

媒体发送方收到的符合此规范的 REMB 消息将导致该消息在 RTP 会话上发送的总比特率等于或低于此消息中的比特率。 

新的比特率限制应尽快应用。 发送者可以根据自己的限制和估计自由应用其他带宽限制

The message is an RTCP message with payload type 206.  RFC 3550 [RFC3550] defines the range, RFC 4585 defines the specific PT value 206 and the FMT value 15.


```
    0                   1                   2                   3
    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |V=2|P| FMT=15  |   PT=206      |             length            |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                  SSRC of packet sender                        |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                  SSRC of media source                         |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |  Unique identifier 'R' 'E' 'M' 'B'                            |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |  Num SSRC     | BR Exp    |  BR Mantissa                      |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |   SSRC feedback                                               |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |  ...                                                          |

```

# Example


# Conclusion


# Reference
