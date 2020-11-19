RTP sessions frequently consist of multiple streams, each of which is
   identified at any given time by its SSRC; however, the SSRC
   associated with a stream is not guaranteed to be stable over its
   lifetime.  Within a session, these streams can be tagged with a
   number of identifiers, including CNAMEs and MSIDs
   [I-D.ietf-mmusic-msid].  Unfortunately, none of these have the proper
   ordinality to refer to an individual stream; all such identifiers can
   appear in more than one stream at a time.  While approaches that use
   unique Payload Types (PTs) per stream have been used in some
   applications, this is a semantic overloading of that field, and one
   for which its size is inadequate: in moderately complex systems that
   use PT to uniquely identify every potential combination of codec
   configuration and unique stream, it is possible to simply run out of
   values.

   To address this situation, we define a new RTCP Stream Identifier
   Source Description (SDES) identifier, RtpStreamId, that uniquely
   identifies a single RTP stream.  A key motivator for defining this
   identifier is the ability to differentiate among different encodings
   of a single Source Stream that are sent simultaneously (i.e.,
   simulcast).  This need for unique identification extends to dependent
