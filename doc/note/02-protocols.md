# WebRTC 标准
* [Javascript 会议创建协议](jsep.md)
* [WebRTC：媒体传输和 RTP 的使用](draft-ietf-rtcweb-rtp-usage-26.md)

* [在 SDP 中的 WebRTC 媒体流标识](draft-ietf-mmusic-msid-05.md)
* [在 RTCP 包 SDES 中的 RTP 流标记](draft-ietf-avtext-rid-09.md)
* [SDP 分组框架](rfc5888.md)


# 基于 RTCP 的 Feedback 

```
typedef enum {
    RTCP_PT_SR      = 200,
    RTCP_PT_RR      = 201,
    RTCP_PT_SDES    = 202,
    RTCP_PT_BYE     = 203,
    RTCP_PT_APP     = 204,
    RTCP_PT_RTPFB   = 205,
    RTCP_PT_PSFB    = 206,
    RTCP_PT_XR      = 207,
} RTCPPTType;

```
* PT=200 Sender Report
* PT=201 Receiver Report
* PT=202 SDES: Source Description RTCP Packet
* PT=203 BYE: Goodbye RTCP Packet
* PT=204 APP: Application-Defined RTCP Packet
* Pt=205 RTPFB 为 Generic RTP Feedback, 参见 http://www.rfcreader.com/#rfc4585 Transport Layer Feedback 传输层反馈
* Pt=206 PSFB  为 Payload-specific Feedback, 参见 http://www.rfcreader.com/#rfc5104 Codec Control Feedback 编码层反馈
* PT=207 RTP Control Protocol Extended Reports (RTCP XR)， 参见 http://www.rfcreader.com/#rfc3611

* [Extended RTP Profile for Real-time Transport Control Protocol (RTCP)-Based Feedback (RTP/AVPF)](https://www.rfcreader.com/#rfc4585)
  [用于基于 RTCP 反馈的 RTP 配置扩展](rfc4585.md)
  
  | FMT | Message |
  |---|---|
  | 1 | NACK: Negative Acknowledgement |
  | 3 | TMMBR: Temporary Maximum Media Stream Bit Rate Request |
  | 4 | TMMBN: Temporary Maximum Media Stream Bit Rate Notification |
  | 15 | TW: Transport-Wide RTCP Feedback |


* [Codec Control Messages in the RTP Audio-Visual Profile with Feedback (AVPF)](https://www.rfcreader.com/#rfc5104)
  [在 RTP 音视频反馈配置的反馈消息中的编码控制消息](rfc5104.md)	
  
  | FMT | Message |
  |---|---|
  | 1 | PLI: Picture Loss Indication  |
  | 2 | SLI: Slice Loss Indication |
  | 3 | RPSI: Reference Picture Selection In |
  | 4 | FIR: Full Intra Request |
  | 5 | TSTR: Temporal-Spatial Trade-off Request |
  | 6 | TSTN: Temporal-Spatial Trade-off Notification |
  | 7 | VBCM: Video Back Channel Message |
  | 15 | Application layer feedback |
