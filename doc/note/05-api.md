# WebRTC API 


## Main API


## getUserMedia()

Grants access to a device's camera and/or microphone, and can plug in their signals to a RTC connection.

## RTCPeerConnection

An interface to configure video chat or voice calls.


## RTCDataChannel

Provides a method to set up a peer-to-peer data pathway between browsers. 


## MediaStreamConstraints

refer to https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints



### Properties of all media tracks

* deviceId 设备号

A ConstrainDOMString object specifying a device ID or an array of device IDs which are acceptable and/or required.

* groupId 群组号

A ConstrainDOMString object specifying a group ID or an array of group IDs which are acceptable and/or required.

### Properties of audio tracks

* autoGainControl 自动增益控制

A ConstrainBoolean object which specifies whether automatic gain control is preferred and/or required.

* channelCount 声道数

A ConstrainLong specifying the channel count or range of channel counts which are acceptable and/or required.

* echoCancellation  回声消除

A ConstrainBoolean object specifying whether or not echo cancellation is preferred and/or required.

* latency 延迟范围

A ConstrainDouble specifying the latency or range of latencies which are acceptable and/or required.

* noiseSuppression 噪音抑制

A ConstrainBoolean which specifies whether noise suppression is preferred and/or required.

* sampleRate 采样率

A ConstrainLong specifying the sample rate or range of sample rates which are acceptable and/or required.

* sampleSize 采样大小

A ConstrainLong specifying the sample size or range of sample sizes which are acceptable and/or required.

* volume 音量范围

A ConstrainDouble specifying the volume or range of volumes which are acceptable and/or required. 



### Properties of image tracks

* whiteBalanceMode

    A String specifying one of "none", "manual", "single-shot", or "continuous".

* exposureMode

    A String specifying one of "none", "manual", "single-shot", or "continuous".

* focusMode

    A String specifying one of "none", "manual", "single-shot", or "continuous".

* pointsOfInterest

    The pixel coordinates on the sensor of one or more points of interest. This is either an object in the form { x:value, y:value } or an array of such objects, where value is a double-precision integer.

* exposureCompensation

    A ConstrainDouble (a double-precision integer) specifying f-stop adjustment by up to ±3. 

* colorTemperature

    A ConstrainDouble (a double-precision integer) specifying a desired color temperature in degrees kelvin.

* iso

    A ConstrainDouble (a double-precision integer) specifying a desired iso setting.

* brightness

    A ConstrainDouble (a double-precision integer) specifying a desired brightness setting.
* contrast

    A ConstrainDouble (a double-precision integer) specifying the degree of difference between light and dark.

* saturation

    A ConstrainDouble (a double-precision integer) specifying the degree of color intensity.

* sharpness

    A ConstrainDouble (a double-precision integer) specifying the intensity of edges.
* focusDistance

    A ConstrainDouble (a double-precision integer) specifying distance to a focused object.

* zoom

    A ConstrainDouble (a double-precision integer) specifying the desired focal length.

* torch
    A Boolean defining whether the fill light is continuously connected, meaning it stays on as long as the track is active.

### Properties of video tracks

* aspectRatio

    A ConstrainDouble specifying the video aspect ratio or range of aspect ratios which are acceptable and/or required.

* facingMode

    A ConstrainDOMString object specifying a facing or an array of facings which are acceptable and/or required.

* frameRate
    A ConstrainDouble specifying the frame rate or range of frame rates which are acceptable and/or required.

* height
    A ConstrainLong specifying the video height or range of heights which are acceptable and/or required.

* width
    A ConstrainLong specifying the video width or range of widths which are acceptable and/or required.

* resizeMode
    A ConstrainDOMString object specifying a mode or an array of modes the UA can use to derive the resolution of a video track. Allowed values are none and crop-and-scale. none means that the user agent uses the resolution provided by the camera, its driver or the OS. crop-and-scale means that the user agent can use cropping and downscaling on the camera output  in order to satisfy other constraints that affect the resolution.

### Properties of shared screen tracks

These constraints apply to MediaTrackConstraints objects specified as part of the DisplayMediaStreamConstraints object's video property when using getDisplayMedia() to obtain a stream for screen sharing.

* cursor

    A ConstrainDOMString which specifies whether or not to include the mouse cursor in the generated track, and if so, whether or not to hide it while not moving. The value may be a single one of the following strings, or an array of them to allow the browser flexibility in deciding what to do about the cursor.

    - always
        The mouse is always visible in the video content of the {domxref("MediaStream"), unless the mouse has moved outside the area of the content.
    - motion
        The mouse cursor is always included in the video if it's moving, and for a short time after it stops moving.
    - never
        The mouse cursor is never included in the shared video.

* displaySurface

    A ConstrainDOMString which specifies the types of display surface that may be selected by the user. This may be a single one of the following strings, or a list of them to allow multiple source surfaces:

    - application
        The stream contains all of the windows of the application chosen by the user rendered into the one video track.
    - browser
        The stream contains the contents of a single browser tab selected by the user.
    - monitor
        The stream's video track contains the entire contents of one or more of the user's screens.
    - window
        The stream contains a single window selected by the user for sharing.

* logicalSurface

    A ConstrainBoolean value which may contain a single Boolean value or a set of them, indicating whether or not to allow the user to choose source surfaces which do not directly correspond to display areas. These may include backing buffers for windows to allow capture of window contents that are hidden by other windows in front of them, or buffers containing larger documents that need to be scrolled through to see the entire contents in their windows. 

### video MediaTrackConstraints


* width
* height
* frameRate


# Adapter

adapter.js 相当于一种垫片，用于使应用程序免受WebRTC中的规格更改和前缀差异的影响。

前缀差异如今已基本消失，但浏览器之间的行为差异仍然存在。详见 https://caniuse.com/rtcpeerconnection

https://github.com/webrtc/adapter/


* Chrome
* Edge
* Firefox
* Safari
* IE
* Opera




