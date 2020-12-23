# What

WebRTC MediaStream Identification in the Session Description Protocol

在 SDP 中的 WebRTC 媒体流标识

此文档为 RTP 媒体流指定了一种分组机制，可用于指定媒体流之间的关系。
参见 https://tools.ietf.org/id/draft-ietf-mmusic-msid-05.html

该机制用于使用 SDP 信令来表示 SDP 中的概念 "m-line" 和 WebRTC 概念中 “MediaStream” 及 ” MediaStreamTrack“ 之间的关联。


# Why

有这样的 cases,  应用程序用 RTP 和 SDP 去告之在 RTP 媒体流之间存在一些关系，它们可能承载在相同或者不同的的 RTP 会话中

RTP 流之间存在应用级上的关联，SDP grouping framework [RFC5888] 可以把 m-lines 分组. 可是，有时应用程序需要对有关联的 m-line 和 group 指定一些应用层的信息

通过 SDP grouping framework 没办法做到。

## Background

In WebRTC, a MediaStreamTrack is generally carried using a single SSRC in an RTP session to form a RTP stream

In the RTP specification, media streams are identified using the SSRC field. Streams are grouped into RTP Sessions, and also carry a CNAME.

Neither CNAME nor RTP session correspond to a MediaStream. Therefore, the association of an RTP media stream to MediaStreams need to be explicitly signaled.

The WebRTC work has come to agreement (documented in [I-D.roach-mmusic-unified-plan]) that one M-line is used to describe each MediaStreamTrack,

and that the BUNDLE mechanism [I-D.ietf-mmusic-sdp-bundle-negotiation] is used to group MediaStreamTracks into RTP sessions.

Therefore, the need is to specify the ID of a MediaStreamTrack and its containing MediaStream for each M-line, which can be accomplished with a media-level attribute.

# How

## 1）New SDP attributes

```
msid
 ; "attribute" is defined in RFC 4566.
  attribute =/ msid-attr
  msid-attr = "msid:" identifier [ " " appdata ]
  identifier = token
  appdata = token
msid-semantic
  attribute =/ msid-semantic-attr
  msid-semantic-attr = "msid-semantic:" token identifier-list
  identifier-list = (" " identifier)* / " *"
  token = <as defined in RFC 4566>
```

## 2） Applying Msid to WebRTC MediaStreams

The semantic token for this semantic is "WMS" (short for WebRTC Media Stream).

The value of the msid corresponds to the "id" attribute of a MediaStream.

The appdata for a WebRTC MediaStreamTrack consists of the "id" attribute of a MediaStreamTrack.

If two different m-lines have MSID attributes with the same value for identifier and appdata, it means that these two m-lines are both intended for the same MediaStreamTrack.

So far, no semantic for such a mixture have been defined, but this specification does not forbid the practice.

When an SDP description is updated, a specific msid continues to refer to the same MediaStream. Once negotiation has completed on a session, there is no memory; an msid value that appears in a later negotiation will be taken to refer to a new MediaStream.



# Example

```
   a=msid-semantic: LS xyzzy forolow
```

This means that the SDP description has two lip sync groups, with the group identifiers xyzzy and forolow, respectively.


看一个完整的例子 (参见 https://tools.ietf.org/html/draft-nandakumar-rtcweb-sdp-08)

```
   +----------------------------------+--------------------------------+
   | SDP Contents                     | RFC#/Notes                     |
   +----------------------------------+--------------------------------+
   | v=0                              | [RFC4566]                      |
   | o=- 20518 0 IN IP4 0.0.0.0       | [RFC4566] - Session Origin     |
   |                                  | Information                    |
   | s=-                              | [RFC4566]                      |
   | t=0 0                            | [RFC4566]                      |
   | a=msid-semantic:WMS ma           | [I-D.ietf-mmusic-msid]         |
   | a=group:BUNDLE audio             | [I-D.ietf-mmusic-sdp-bundle-ne |
   |                                  | gotiation]                     |
   | m=audio 54609 UDP/TLS/RTP/SAVPF  | [RFC4566]                      |
   | 109 0 8                          |                                |
   | c=IN IP4 24.23.204.141           | [RFC4566]                      |
   | a=mid:audio                      | [RFC5888]                      |
   | a=msid:ma ta                     | Identifies RTCMediaStream ID   |
   |                                  | (ma) and RTCMediaStreamTrack   |
   |                                  | ID (ta)                        |
   | a=rtcp-mux                       | [RFC5761] - Alice can perform  |
   |                                  | RTP/RTCP Muxing                |
   | a=rtcp:54609 IN IP4              | [RFC3605] - Port for RTCP data |
   | 24.23.204.141                    |                                |
   | a=rtpmap:109 opus/48000/2        | [I-D.ietf-payload-rtp-opus] -  |
   |                                  | Opus Codec 48khz, 2 channels   |
   | a=ptime:60                       | [I-D.ietf-payload-rtp-opus] -  |
   |                                  | Opus packetization of 60ms     |
   | a=rtpmap:0 PCMU/8000             | [RFC3551] PCMU Audio Codec     |
   | a=rtpmap:8 PCMA/8000             | [RFC3551] PCMA Audio Codec     |
   | a=extmap:1 urn:ietf:params:rtp-  | [RFC6464] Alice supports RTP   |
   | hdrext:ssrc-audio-level          | header extension to indicate   |
   |                                  | audio levels                   |
   | a=sendrecv                       | [RFC3264] - Alice can send and |
   |                                  | recv audio                     |
   | a=setup:actpass                  | [RFC4145] - Alice can perform  |
   |                                  | DTLS before Answer arrives     |
   | a=fingerprint:sha-1 99:41:49:83: | [RFC5245] - DTLS Fingerprint   |
   | 4a:97:0e:1f:ef:6d:f7:c9:c7:70:9d | for SRTP                       |
   | : 1f:66:79:a8:07                 |                                |
   | a=ice-ufrag:074c6550             | [RFC5245] - ICE user fragment  |
   | a=ice-pwd:a28a397a4c3f31747d1ee3 | [RFC5245] - ICE password       |
   | 474af08a068                      |                                |
   | a=candidate:0 1 UDP  2122194687  | [RFC5245] - RTP Host Candidate |
   | 192.168.1.4 54609 typ host       |                                |
   | a=candidate:0 2 UDP 2122194687   | [RFC5245] - RTCP Host          |
   | 192.168.1.4 54609 typ host       | Candidate                      |
   | a=candidate:1 1 UDP  1685987071  | [RFC5245] - RTP Server         |
   | 24.23.204.141 64678 typ srflx    | Reflexive ICE Candidate        |
   | raddr 192.168.1.4 rport 54609    |                                |
   | a=candidate:1 2 UDP  1685987071  | [RFC5245] - RTCP Server        |
   | 24.23.204.141 64678 typ srflx    | Reflexive Candidate            |
   | raddr 192.168.1.4 rport 54609    |                                |
   | a=rtcp-fb:109 nack               | [RFC5104] - Indicates NACK     |
   |                                  | RTCP feedback support          |
   | a=ssrc:12345                     | [RFC5576]                      |
   | cname:EocUG1f0fcg/yvY7           |                                |
   | a=rtcp-rsize                     | [RFC5506] - Alice intends to   |
   |                                  | use reduced size RTCP for this |
   |                                  | session                        |
   | a=ice-options:trickle            | [I-D.ietf-mmusic-trickle-ice]  |
   +----------------------------------+--------------------------------+

                         SDP Offer

   +----------------------------------+--------------------------------+
   | SDP Contents                     | RFC#/Notes                     |
   +----------------------------------+--------------------------------+
   | v=0                              | [RFC4566]                      |
   | o=-  16833 0 IN IP4 0.0.0.0      | [RFC4566] - Session Origin     |
   |                                  | Information                    |
   | s=-                              | [RFC4566]                      |
   | t=0 0                            | [RFC4566]                      |
   | a=msid-semantic:WMS ma           | [I-D.ietf-mmusic-msid]         |
   | a=group:BUNDLE audio             | [I-D.ietf-mmusic-sdp-bundle-ne |
   |                                  | gotiation]                     |
   | m=audio 49203 UDP/TLS/RTP/SAVPF  | [RFC4566]                      |
   | 109 0 8                          |                                |
   | c=IN IP4 98.248.92.77            | [RFC4566]                      |
   | a=mid:audio                      | [RFC5888]                      |
   | a=msid:ma ta                     | Identifies RTCMediaStream ID   |
   |                                  | (ma) and RTCMediaStreamTrack   |
   |                                  | ID (ta)                        |
   | a=rtpmap:109 opus/48000/2        | [I-D.ietf-payload-rtp-opus]    |
   |                                  | Opus Codec                     |
   | a=ptime:60                       | [I-D.ietf-payload-rtp-opus]    |
   |                                  | Packetization of 60ms          |
   | a=rtpmap:0 PCMU/8000             | [RFC3551] PCMU Audio Codec     |
   | a=rtpmap:8 PCMA/8000             | [RFC3551] PCMA Audio Codec     |
   | a=extmap:1 urn:ietf:params:rtp-  | [RFC6464] Bob supports audio   |
   | hdrext:ssrc-audio-level          | level RTP header extension as  |
   |                                  | well                           |
   | a=sendrecv                       | [RFC3264] - Bob can send and   |
   |                                  | recv audio                     |
   | a=setup:active                   | [RFC4145] - Bob carries out    |
   |                                  | DTLS Handshake in parallel     |
   | a=rtcp-mux                       | [RFC5761] - Bob can perform    |
   |                                  | RTP/RTCP Muxing on port 49203  |
   | a=fingerprint:sha-1 c9:c7:70:9d: | [RFC5245] - DTLS Fingerprint   |
   | 1f:66:79:a8:07:99:41:49:83:4a:   | for SRTP                       |
   | 97:0e:1f:ef:6d:f7                |                                |
   | a=ice-ufrag:05067423             | [RFC5245] - ICE user fragment  |
   | a=ice-pwd:1747d1ee3474a28a397a4c | [RFC5245] - ICE password       |
   | 3f3af08a068                      | parameter                      |
   | a=candidate:0 1 UDP 2122194687   | [RFC5245] - RTP/RTCP Host ICE  |
   | 192.168.1.7 49203 typ host       | Candidate                      |
   | a=candidate:1 1 UDP 1685987071   | [RFC5245] - RTP/RTCP Server    |
   | 98.248.92.77 60654 typ srflx     | Reflexive ICE Candidate        |
   | raddr 192.168.1.7 rport 49203    |                                |
   | a=rtcp-fb:109 nack               | [RFC5104] - Indicates NACK     |
   |                                  | RTCP feedback support          |
   | a=ssrc:54321                     | [RFC5576]                      |
   | cname:NWs1ao1HmN4Xa5/yvY7        |                                |
   | a=rtcp-rsize                     | [RFC5506] - Bob intends to use |
   |                                  | reduced size RTCP for this     |
   |                                  | session                        |
   | a=ice-options:trickle            | [I-D.ietf-mmusic-trickle-ice]  |
   +----------------------------------+--------------------------------+

                         SDP Answer
```

# Conclusion
Use msid-semantic and msid  to bind WebRTC Media Stream with RTP media stream(m-line)

# Reference

The Session Description Protocol (SDP) Grouping Framework：http://www.rfcreader.com/#rfc5888