# What

RTP Stream Identifier Source Description (SDES)
在 RTCP 包 SDES 中的 RTP 流标记 

https://tools.ietf.org/html/draft-ietf-avtext-rid-09

# Why

RTP 会话经常包含多个流，每个流在给定时间由SSRC来区分, 但是 SSRC 与 stream 的关联并不保证在其生命周期中是稳定的。


在一个会话中， 这些流可以标注为一些标识符来作为标记，比如 CNAMES 和 MSIDs.

不幸的是， 这些标识符都没有以正确的顺序指向一个独立的流，所有这些标识符可以出现在同一时间出现在多个流中。



一些应用程序用每个流中的PT(Payload Type 荷载类型) 来标识独立的流，这在语义上重新定义这个字段，而且 PT 字段的大小在复杂的系统中有可能不够用。

为了解决这个问题， 这里在SDES中定义了一个新的条目

RtpStreamId 唯一的标识一个单个的 RTP stream, 
一个主要的动机是用它来区分一个相同的源同时发送的不同的编码, 这种唯一标识的需要也扩展到有依赖的流, 比如一 个分层的编码在各个独立的流中传输）



同时，当使用 冗余的 RTP 流，我们还需要一个标识符来连接这样的流与那些提供冗余信息的流，故此，这里还定义了一个额外的 SDES 标识符 RepairedRtpStreamId.

这个标识符仅仅出现在冗余的 RTP stream 中


Stream A: RtpStreamId==aaa

Stream B: RepairedRtpStreamId=aaa,  Stream B 提供与 Stream A 的冗余信息

# How

## 术语

* CNAME: Canonical End-Point Identifier, defined in [RFC3550]
* MID: Media Identification, defined in [I-D.ietf-mmusic-sdp-bundle-negotiation]
* MSID: Media Stream Identifier, defined in [I-D.ietf-mmusic-msid]
* RTCP: Real-time Transport Control Protocol, defined in [RFC3550]
* RTP: Real-time Transport Protocol, defined in [RFC3550]
* SDES: Source Description, defined in [RFC3550]
* SSRC: Synchronization Source, defined in [RFC3550]

## Solution

uses the RTP header extension for RTCP SDES items [I-D.ietf-avtext-sdes-hdr-ext] to allow carrying RtpStreamId and RepairedRtpStreamId values in RTP packets.
RtpStreamId and RepairedRtpStreamId values are scoped by source identifier (e.g., CNAME) and by media session.
When the media is multiplexed using the BUNDLE extension[I-D.ietf-mmusic-sdp-bundle-negotiation], these values are further scoped by their associated MID values.
For example: an RtpStreamId of "1" may be present in the stream identified with a CNAME of "1234@example.com", and may also be present in a stream with a CNAME
of "5678@example.org", and these would refer to different streams.
Similarly, an RtpStreamId of "1" may be present with an MID of "A", and again with a MID of "B", and also refer to two different streams.
RTCP 'RtpStreamId' SDES Extension

```
        0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |RtpStreamId=TBD|     length    | RtpStreamId                 ...
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

   The RtpStreamId payload is ASCII encoded and is not null-terminated.
RTCP 'RepairedRtpStreamId' SDES Extension

```
        0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
       |Repaired...=TBD|     length    | RepairRtpStreamId           ...
       +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

   The RepairedRtpStreamId payload is ASCII encoded and is not null-terminated.
Example


# Conclusion

RtpStreamId and RepairedRtpStreamId are to identify the RTP stream in a  media session

The SSRC may be same(different encoding) or different

# Reference

RTP Header Extension for the RTP Control Protocol (RTCP) Source Description Items
https://tools.ietf.org/html/rfc7941
