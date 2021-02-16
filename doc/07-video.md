# Video Codec

According to [RFC7742](https://tools.ietf.org/html/rfc7742),

One of the major functions of WebRTC endpoints is the ability to send and receive interactive video.  The video might come from a camera, a screen recording, a stored file, or some other source.  
   
Unless specified otherwise by the SDP or codec, the color space SHOULD be sRGB [SRGB].  
For clarity, this is the color space indicated by codepoint 1 from "ColourPrimaries" as defined in [IEC23001-8].

## Codec

  WebRTC Browsers MUST implement the VP8 video codec as described in [RFC6386](https://tools.ietf.org/html/rfc6386) and H.264 Constrained Baseline as described in [H264](http://www.itu.int/rec/T-REC-H.264).
  
### Codec-Specific Considerations

SDP allows for codec-independent indication of preferred video resolutions using the mechanism described in [RFC6236](https://tools.ietf.org/html/rfc6236).  
WebRTC endpoints MAY send an "a=imageattr" attribute to indicate the maximum resolution they wish to receive.  
Senders SHOULD interpret and honor this attribute by limiting the encoded resolution to the indicated  maximum size, as the receiver may not be capable of handling higher
resolutions.

Additionally, codecs may include codec-specific means of signaling maximum receiver abilities with regard to resolution, frame rate, and
bitrate.    

Unless otherwise signaled in SDP, recipients of video streams MUST be  able to decode video at a rate of at least 20 fps at a resolution of
at least 320 pixels by 240 pixels.  These values are selected based  on the recommendations in [HSUP1].

Encoders are encouraged to support encoding media with at least the  same resolution and frame rates cited above.


### H.264 Codec

For the [H264] codec, endpoints MUST support the payload formats defined in [RFC6184](https://tools.ietf.org/html/rfc6184).  
In addition, they MUST support Constrained Baseline Profile Level 1.2 and SHOULD support H.264 Constrained High Profile Level 1.3.

Implementations of the H.264 codec have utilized a wide variety of optional parameters.  

To improve interoperability, the following  parameter settings are specified:

* packetization-mode:  Packetization-mode 1 MUST be supported.  Other modes MAY be negotiated and used.

* profile-level-id:  Implementations MUST include this parameter within SDP and MUST interpret it when receiving it.

* max-mbps, max-smbps, max-fs, max-cpb, max-dpb, and max-br:

These parameters allow the implementation to specify that they can support certain features of H.264 at higher rates and values 
than those signaled by their level (set with profile-level-id).

Implementations MAY include these parameters in their SDP, but they SHOULD interpret them when receiving them, allowing them to send the highest quality of video possible.

* sprop-parameter-sets:  H.264 allows sequence and picture information to be sent both in-band and out-of-band.  
WebRTC implementations  MUST signal this information in-band.  

This means that WebRTC implementations MUST NOT include this parameter in the SDP they  generate.

H.264 codecs MAY send and MUST support proper interpretation of  Supplemental Enhancement Information (SEI) "filler payload" and "full frame freeze" messages.  The "full frame freeze" messages are used in  video-switching MCUs, to ensure a stable decoded displayed picture while switching among various input streams.

When the use of the video orientation (CVO) RTP header extension is not signaled as part of the SDP, H.264 implementations MAY send and SHOULD support proper interpretation of Display Orientation SEI  messages.

Implementations MAY send and act upon "User data registered by Rec. ITU-T T.35" and "User data unregistered" messages.  
Even if they do  not act on them, implementations MUST be prepared to receive such  messages without any ill effects.

Unless otherwise signaled, implementations that use H.264 MUST encode and decode pixels with an implied 1:1 (square) aspect ratio.

# Build 

```shell script
git clone https://github.com/cisco/openh264
emmake make OS=linux ARCH=asmjs
```
