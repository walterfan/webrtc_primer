# Taxonomy and Terminology 分类和术语

##  Terminology
### RTP Session - RTP 会话

 An RTP session is an association among a group of participants communicating with RTP.  
 
 It is a group communications channel that can potentially carry a number of RTP streams.  
 Within an RTP session, every participant can find metadata and control information
 (over RTCP) about all the RTP streams in the RTP session.  
 
 The bandwidth of the RTCP control channel is shared between all participants within an RTP session.


### RTP Stream - RTP流
An RTP stream is a stream of RTP packets containing media data, source or redundant.  
The RTP stream is identified by an SSRC belonging to a particular RTP Session.  

 A source RTP stream is an RTP stream directly related to an encoded stream, 
 targeted for transport over RTP without any additional RTP-based Redundancy applied.

 Characteristics:

   o  Each RTP stream is identified by an SSRC [RFC3550] that is carried
      in every RTP and RTP Control Protocol (RTCP) packet header.  The
      SSRC is unique in a specific RTP session context.

   o  At any given point in time, an RTP stream can have one and only
      one SSRC, but SSRCs for a given RTP stream can change over time.
      SSRC collision and clock rate change [RFC7160] are examples of
      valid reasons to change SSRC for an RTP stream.  In those cases,
      the RTP stream itself is not changed in any significant way, only
      the identifying SSRC number.

   o  Each SSRC defines a unique RTP sequence numbering and timing
      space.

   o  Several RTP streams, each with their own SSRC, may represent a
      single media source.

   o  Several RTP streams, each with their own SSRC, can be carried in a
      single RTP session.


# Reference
* [A Taxonomy of Semantics and Mechanisms for Real-Time Transport Protocol (RTP) Sources](https://tools.ietf.org/html/rfc7656)
