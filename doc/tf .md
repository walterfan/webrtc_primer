# What

Extended RTP Profile for Real-time Transport Control Protocol (RTCP)-Based Feedback (RTP/AVPF)

https://tools.ietf.org/html/rfc4585


用于基于 RTCP 反馈而扩展的 RTP 配置

## Abstract 简介


使用 RTP 的实时媒体流在某种程度上可以容忍数据包丢失。 接收方可以使用实时传输控制协议（RTCP）的基本机制来报告数据包接收统计信息，从而允许发送方在中期调整其传输行为。 这是用于反馈和基于反馈的错误修复的唯一手段（除了一些特定于编解码器的机制）。 

本文档定义了对音视频配置 (AVP) 的扩展，使接收者可以从统计角度, 向发送者提供更即时的反馈，从而可以实现短期适应和有效的基于反馈的修复机制。 此早期反馈配置 (AVPF) 维护 RTCP 的 AVP 带宽约束，并保留了对大型组通信的可伸缩性。

## Glossary 术语

* Early RTCP mode:

      The mode of operation in that a receiver of a media stream is
      often (but not always) capable of reporting events of interest
      back to the sender close to their occurrence.  In Early RTCP mode,
      RTCP packets are transmitted according to the timing rules defined
      in this document.

* Early RTCP packet:

      An Early RTCP packet is a packet which is transmitted earlier than
      would be allowed if following the scheduling algorithm of [1], the
      reason being an "event" observed by a receiver.  Early RTCP
      packets may be sent in Immediate Feedback and in Early RTCP mode.
      Sending an Early RTCP packet is also referred to as sending Early
      Feedback in this document.

* Event:
      An observation made by the receiver of a media stream that is
      (potentially) of interest to the sender -- such as a packet loss
      or packet reception, frame loss, etc. -- and thus useful to be
      reported back to the sender by means of a feedback message.

* Feedback (FB) message:
      An RTCP message as defined in this document is used to convey
      information about events observed at a receiver -- in addition to
      long-term receiver status information that is carried in RTCP
      receiver reports (RRs) -- back to the sender of the media stream.
      For the sake of clarity, feedback message is referred to as FB
      message throughout this document.

* Feedback (FB) threshold:
      The FB threshold indicates the transition between Immediate
      Feedback and Early RTCP mode.  For a multiparty scenario, the FB
      threshold indicates the maximum group size at which, on average,
      each receiver is able to report each event back to the sender(s)
      immediately, i.e., by means of an Early RTCP packet without having
      to wait for its regularly scheduled RTCP interval.  This threshold
      is highly dependent on the type of feedback to be provided,
      network QoS (e.g., packet loss probability and distribution),
      codec and packetization scheme in use, the session bandwidth, and
      application requirements.  Note that the algorithms do not depend
      on all senders and receivers agreeing on the same value for this
      threshold.  It is merely intended to provide conceptual guidance
      to application designers and is not used in any calculations.  For
      the sake of clarity, the term feedback threshold is referred to as
      FB threshold throughout this document.

* Immediate Feedback mode:
      A mode of operation in which each receiver of a media stream is,
      statistically, capable of reporting each event of interest
      immediately back to the media stream sender.  In Immediate
      Feedback mode, RTCP FB messages are transmitted according to the
      timing rules defined in this document.

* Media packet:
      A media packet is an RTP packet.

* Regular RTCP mode:

      Mode of operation in which no preferred transmission of FB
      messages is allowed.  Instead, RTCP messages are sent following
      the rules of [1].  Nevertheless, such RTCP messages may contain
      feedback information as defined in this document.

* Regular RTCP packet:

      An RTCP packet that is not sent as an Early RTCP packet.

* RTP sender:

      An RTP sender is an RTP entity that transmits media packets as
      well as RTCP packets and receives Regular as well as Early RTCP
      (i.e., feedback) packets.  Note that the RTP sender is a logical
      role and that the same RTP entity may at the same time act as an
      RTP receiver.

* RTP receiver:

      An RTP receiver is an RTP entity that receives media packets as
      well as RTCP packets and transmits Regular as well as Early RTCP
      (i.e., feedback) packets.  Note that the RTP receiver is a logical
      role and that the same RTP entity may at the same time act as an
      RTP sender.

# Why

Motivation


# How

FEC 和 Feedback 是提高媒体质量的法宝

低延迟的 RTCP feedback 消息有以下三种：

1) Transport layer FB messages： 传输层反馈消息
2) Payload-specific FB messages  荷载特定反馈消息
3) Application layer FB messages 应用层反馈消息  

RTCP 消息包格式如下

```
    0                   1                   2                   3
    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |V=2|P|   FMT   |       PT      |          length               |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                  SSRC of packet sender                        |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |                  SSRC of media source                         |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   :            Feedback Control Information (FCI)                 :
   :                                                               :
```

| field | length | meaning|
|---|---|---|
| V | 2 bit   |  |
| P |  1 bit   |  |
| FMT | 5 bits |  Feedback Message Type |
| PT | 8 bits |  Payload Type, 205 for transport layer FB message, 206 for Payload-specific FB message |
| length | 16 bits  |    |
| SSRC of packet sender| 32 bits  |    |
| SSRC of media source| 32 bits  |    |
| Feedback Control Information | 32 bits  |    |


## Generic NACK

PT=RTPFB and FMT=1.

它用来表示一个或多个 RTP 包的丢失

The Feedback Control Information (FCI) field 的格式如下

```

    0                   1                   2                   3
    0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
   |            PID                |             BLP               |
   +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```
   
| field | length | meaning|
|---|---|---|   
| Packet ID (PID) | 16 bits | The PID field is used to specify a lost packet.  The PID field refers to the RTP sequence number of the lost packet. |
| bitmask of following lost packets (BLP) | 16 bits| bit i of the bit mask is set to 1 if the receiver  has not received RTP packet number (PID+i) (modulo 2^16) |      

# Example


# Conclusion


# Reference
