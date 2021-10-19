########################
Web Codecs
########################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** Web Codecs
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:


Overview
=========================

在WebRTC中，音频使用 opus codec 来做音频的编解码，视频使用 vp8 或 h.264 等库来做视频的编解码。

以下两篇规范对于 WebRTC 所需要的 codec 有详细要求

`RFC7874`_ "WebRTC Audio Codec and Processing Requirements" 
`RFC7742`_ "WebRTC Video Processing and Codec Requirements" 


浏览器用户在以前是没有办法来触及底层的编解码过程的， 直到 Web codec 和 

it defines interfaces to codecs for encoding and decoding of audio, video, and images.

Spec: https://w3c.github.io/webcodecs/


The WebCodecs API gives web developers low-level access to the individual frames of a video stream and chunks of audio. 

It is useful for web applications that require full control over the way media is processed. For example, video or audio editors, and video conferencing.

Interface
============================

* AudioDecoder
 
Decodes EncodedAudioChunk objects.

* VideoDecoder

Decodes EncodedVideoChunk objects.

* AudioEncoder

Encodes AudioData objects.

* VideoEncoder

Encodes VideoFrame objects.

* EncodedAudioChunk

Represents codec-specific encoded audio bytes.

* EncodedVideoChunk

Represents codec-specific encoded video bytes.

* AudioData

Represents unencoded audio data.

* VideoFrame

Represents a frame of unencoded video data.

* VideoColorSpace

Represents the color space of a video frame.

* ImageDecoder

Unpacks and decodes image data, giving access to the sequence of frames in an animated image.

* ImageTrackList

Represents the list of tracks available in the image.

* ImageTrack

Represents an individual image track.


AudioDecoder Interface
-----------------------------

.. code-block:: JavaScript

    [Exposed=(Window,DedicatedWorker), SecureContext]
    interface AudioDecoder {
        constructor(AudioDecoderInit init);

        readonly attribute CodecState state;
        readonly attribute long decodeQueueSize;

        undefined configure(AudioDecoderConfig config);
        undefined decode(EncodedAudioChunk chunk);
        Promise<undefined> flush();
        undefined reset();
        undefined close();

        static Promise<AudioDecoderSupport> isConfigSupported(AudioDecoderConfig config);
    };

    dictionary AudioDecoderInit {
        required AudioDataOutputCallback output;
        required WebCodecsErrorCallback error;
    };

    callback AudioDataOutputCallback = undefined(AudioData output);



VideoDecoder Interface
-----------------------------

.. code-block:: JavaScript

    [Exposed=(Window,DedicatedWorker), SecureContext]
    interface VideoDecoder {
        constructor(VideoDecoderInit init);

        readonly attribute CodecState state;
        readonly attribute long decodeQueueSize;

        undefined configure(VideoDecoderConfig config);
        undefined decode(EncodedVideoChunk chunk);
        Promise<undefined> flush();
        undefined reset();
        undefined close();

        static Promise<VideoDecoderSupport> isConfigSupported(VideoDecoderConfig config);
    };

    dictionary VideoDecoderInit {
        required VideoFrameOutputCallback output;
        required WebCodecsErrorCallback error;
    };

    callback VideoFrameOutputCallback = undefined(VideoFrame output);



AudioEncoder Interface
-------------------------------

.. code-block:: JavaScript

    [Exposed=(Window,DedicatedWorker), SecureContext]
    interface AudioEncoder {
        constructor(AudioEncoderInit init);

        readonly attribute CodecState state;
        readonly attribute long encodeQueueSize;

        undefined configure(AudioEncoderConfig config);
        undefined encode(AudioData data);
        Promise<undefined> flush();
        undefined reset();
        undefined close();

        static Promise<AudioEncoderSupport> isConfigSupported(AudioEncoderConfig config);
    };

    dictionary AudioEncoderInit {
        required EncodedAudioChunkOutputCallback output;
        required WebCodecsErrorCallback error;
    };

    callback EncodedAudioChunkOutputCallback =
        undefined (EncodedAudioChunk output,
                optional EncodedAudioChunkMetadata metadata = {});




VideoEncoder Interface
-----------------------------


.. code-block:: JavaScript

    [Exposed=(Window,DedicatedWorker), SecureContext]
    interface VideoEncoder {
        constructor(VideoEncoderInit init);

        readonly attribute CodecState state;
        readonly attribute long encodeQueueSize;

        undefined configure(VideoEncoderConfig config);
        undefined encode(VideoFrame frame, optional VideoEncoderEncodeOptions options = {});
        Promise<undefined> flush();
        undefined reset();
        undefined close();

        static Promise<boolean> isConfigSupported(VideoEncoderConfig config);
    };

    dictionary VideoEncoderInit {
        required EncodedVideoChunkOutputCallback output;
        required WebCodecsErrorCallback error;
    };

    callback EncodedVideoChunkOutputCallback =
        undefined (EncodedVideoChunk chunk,
                optional EncodedVideoChunkMetadata metadata = {});


AudioDecoderConfig
-------------------------------------

.. code-block:: JavaScript

    dictionary AudioDecoderConfig {
        required DOMString codec;
        [EnforceRange] required unsigned long sampleRate;
        [EnforceRange] required unsigned long numberOfChannels;
        BufferSource description;
    };

VideoDecoderConfig
-------------------------------------

.. code-block:: JavaScript

    dictionary VideoDecoderConfig {
        required DOMString codec;
        BufferSource description;
        [EnforceRange] unsigned long codedWidth;
        [EnforceRange] unsigned long codedHeight;
        [EnforceRange] unsigned long displayAspectWidth;
        [EnforceRange] unsigned long displayAspectHeight;
        VideoColorSpaceInit colorSpace;
        HardwareAcceleration hardwareAcceleration = "no-preference";
        boolean optimizeForLatency;
    };

AudioEncoderConfig
-------------------------------------

.. code-block:: JavaScript

    dictionary AudioEncoderConfig {
        required DOMString codec;
        [EnforceRange] unsigned long sampleRate;
        [EnforceRange] unsigned long numberOfChannels;
        [EnforceRange] unsigned long long bitrate;
    };



VideoEncoderConfig
-------------------------------------

.. code-block:: JavaScript

    dictionary VideoEncoderConfig {
        required DOMString codec;
        [EnforceRange] required unsigned long width;
        [EnforceRange] required unsigned long height;
        [EnforceRange] unsigned long displayWidth;
        [EnforceRange] unsigned long displayHeight;
        [EnforceRange] unsigned long long bitrate;
        [EnforceRange] double framerate;
        HardwareAcceleration hardwareAcceleration = "no-preference";
        AlphaOption alpha = "discard";
        DOMString scalabilityMode;
        BitrateMode bitrateMode = "variable";
        LatencyMode latencyMode = "quality";
    };

Example
=========================
https://w3c.github.io/webcodecs/samples/


Reference
========================
https://web.dev/webcodecs/


.. _WebRTC Video Processing and Codec Requirements: https://datatracker.ietf.org/doc/html/rfc7742
