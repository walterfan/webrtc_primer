# Video Codec

According to [RFC7742](https://tools.ietf.org/html/rfc7742)

One of the major functions of WebRTC endpoints is the ability to send and receive interactive video.  The video might come from a camera, a screen recording, a stored file, or some other source.  
   
Unless specified otherwise by the SDP or codec, the color space SHOULD be sRGB [SRGB].  
For clarity, this is the color space indicated by codepoint 1 from "ColourPrimaries" as defined in [IEC23001-8].

## Codec

  WebRTC Browsers MUST implement the VP8 video codec as described in [RFC6386](https://tools.ietf.org/html/rfc6386) and H.264 Constrained Baseline as described in [H264](http://www.itu.int/rec/T-REC-H.264>).
  
### Codec-Specific Considerations

SDP allows for codec-independent indication of preferred video resolutions using the mechanism described in [RFC6236].  
WebRTC endpoints MAY send an "a=imageattr" attribute to indicate the maximum resolution they wish to receive.  
Senders SHOULD interpret and honor this attribute by limiting the encoded resolution to the indicated  maximum size, as the receiver may not be capable of handling higher
resolutions.

Additionally, codecs may include codec-specific means of signaling maximum receiver abilities with regard to resolution, frame rate, and
bitrate.    

Unless otherwise signaled in SDP, recipients of video streams MUST be  able to decode video at a rate of at least 20 fps at a resolution of
at least 320 pixels by 240 pixels.  These values are selected based  on the recommendations in [HSUP1].

Encoders are encouraged to support encoding media with at least the  same resolution and frame rates cited above.
