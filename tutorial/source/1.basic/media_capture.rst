################################
WebRTC API 之 Media Capture
################################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** Media Capture
**Authors**  Walter Fan
**Status**   WIP as draft
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
    :local:

Overview
==========================


WebRTC（Web 实时通信）是一种技术，它使 Web 应用程序和站点能够捕获和可选地流式传输音频和/或视频媒体，以及在不需要中介的情况下在浏览器之间交换任意数据。 包含 WebRTC 的一组标准使得共享数据和执行点对点电话会议成为可能，而无需用户安装插件或任何其他第三方软件。

WebRTC 有多种用途；它们与 Media Capture 和 Streams API 一起为 Web 提供强大的多媒体功能，包括支持音频和视频会议、文件交换、屏幕共享、身份管理以及与传统电话系统的接口，包括支持发送 DTMF（按键拨号）信号。可以在不需要任何特殊驱动程序或插件的情况下建立对等点之间的连接，并且通常可以在没有任何中间服务器的情况下建立。

WebRTC 所提供的 API 可分为如下三大类

1. Media Capture and Streams API

媒体流捕获相关的 API

媒体流可以由任意数量的媒体信息轨道组成；轨道由基于 MediaStreamTrack 接口的对象表示，可能包含多种类型的媒体数据之一，包括音频、视频和文本（例如字幕甚至章节名称）。大多数流至少包含一个音频轨道，可能还有一个视频轨道，可用于发送和接收实时媒体或存储的媒体信息（例如流媒体电影）。


2. RTCPeerConnection

两个对等点之间的连接由 RTCPeerConnection 接口表示。一旦使用 RTCPeerConnection 建立并打开连接，就可以将媒体流 (MediaStreams) 和/或数据通道 (RTCDataChannels) 添加到连接中。

3. RTCDataChannel
   
您还可以使用两个对等点之间的连接，使用 RTCDataChannel 接口交换任意二进制数据。这可用于反向通道信息、元数据交换、游戏状态数据包、文件传输，甚至可用作数据传输的主要通道。


enumerateDevices
==========================
与媒体捕获和播放有关的设备有输入和输出设备之分

1. 输入

* video_input: Camera
* audio_input: Mic

2. 输出

* audio_output: Speaker or headset


接口原型为

.. code-block::

    [Exposed=Window, SecureContext]
    interface MediaDevices : EventTarget {
        attribute EventHandler ondevicechange;
        Promise<sequence<MediaDeviceInfo>> enumerateDevices();
    };

    [Exposed=Window, SecureContext]
    interface MediaDeviceInfo {
        readonly attribute DOMString deviceId;
        readonly attribute MediaDeviceKind kind;
        readonly attribute DOMString label;
        readonly attribute DOMString groupId;
        [Default] object toJSON();
    };

    enum MediaDeviceKind {
        "audioinput",
        "audiooutput",
        "videoinput"
    };

GUM-getUserMedia
==========================

接口原型为 

.. code-block::

    partial interface MediaDevices {
        MediaTrackSupportedConstraints getSupportedConstraints();
        Promise<MediaStream> getUserMedia(optional MediaStreamConstraints constraints = {});
    };

输入参数为 MediaStreamConstraints 

.. code-block:: WebIDL

    dictionary MediaStreamConstraints {
        (boolean or MediaTrackConstraints) video = false;
        (boolean or MediaTrackConstraints) audio = false;
    };

    dictionary MediaTrackConstraints : MediaTrackConstraintSet {
        sequence<MediaTrackConstraintSet> advanced;
    };

    dictionary MediaTrackConstraintSet {
        ConstrainULong width;
        ConstrainULong height;
        ConstrainDouble aspectRatio;
        ConstrainDouble frameRate;
        ConstrainDOMString facingMode;
        ConstrainDOMString resizeMode;
        ConstrainULong sampleRate;
        ConstrainULong sampleSize;
        ConstrainBoolean echoCancellation;
        ConstrainBoolean autoGainControl;
        ConstrainBoolean noiseSuppression;
        ConstrainDouble latency;
        ConstrainULong channelCount;
        ConstrainDOMString deviceId;
        ConstrainDOMString groupId;
    };

返回值是一个 Promise, 成功执行后返回 MediaStream

.. code-block:: WebIDL

    [Exposed=Window]
    interface MediaStream : EventTarget {
        constructor();
        constructor(MediaStream stream);
        constructor(sequence<MediaStreamTrack> tracks);
        readonly attribute DOMString id;
        sequence<MediaStreamTrack> getAudioTracks();
        sequence<MediaStreamTrack> getVideoTracks();
        sequence<MediaStreamTrack> getTracks();
        MediaStreamTrack? getTrackById(DOMString trackId);
        undefined addTrack(MediaStreamTrack track);
        undefined removeTrack(MediaStreamTrack track);
        MediaStream clone();
        readonly attribute boolean active;
        attribute EventHandler onaddtrack;
        attribute EventHandler onremovetrack;
    };


The MediaStreamTrack object represents media of a single type that originates from one media source in the User Agent, e.g. video produced by a web camera. A MediaStream is used to group several MediaStreamTrack objects into one unit that can be recorded or rendered in a media element.

Each MediaStream can contain zero or more MediaStreamTrack objects. All tracks in a MediaStream are intended to be synchronized when rendered. This is not a hard requirement, since it might not be possible to synchronize tracks from sources that have different clocks. Different MediaStream objects do not need to be synchronized.

.. code-block:: WebIDL

    [Exposed=Window]
    interface MediaStreamTrack : EventTarget {
        readonly attribute DOMString kind;
        readonly attribute DOMString id;
        readonly attribute DOMString label;
        attribute boolean enabled;
        readonly attribute boolean muted;
        attribute EventHandler onmute;
        attribute EventHandler onunmute;
        readonly attribute MediaStreamTrackState readyState;
        attribute EventHandler onended;
        MediaStreamTrack clone();
        undefined stop();
        MediaTrackCapabilities getCapabilities();
        MediaTrackConstraints getConstraints();
        MediaTrackSettings getSettings();
        Promise<undefined> applyConstraints(optional MediaTrackConstraints constraints = {});
    };



Example
--------------------------



.. code-block:: JavaScript

    const constraints = {
        video: {
            deviceId: localStorage.camId,
            width: {min: 640, ideal: 1280, max: 1280},
            height: {min: 480, ideal: 720},
            aspectRatio: 3/2,
            frameRate: {min: 20}
        },
        audio: {
            deviceId: localStorage.micId,
            channelCount: 2
        }
    };

    function handleSuccess(stream) {
        document.querySelector('video').srcObject = stream;
    }

    function handleError(error) {
        console.log('getUserMedia error: ', error);
    }

    navigator.mediaDevices.getUserMedia(constraints)
            .then(handleSuccess)
            .catch(handleError);




参考资料
====================
* `MDN WebRTC API`_
* `W3C Media Capture and Streams Spec`_