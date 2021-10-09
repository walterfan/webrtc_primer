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
it defines interfaces to codecs for encoding and decoding of audio, video, and images.

Spec: https://w3c.github.io/webcodecs/


https://github.com/w3c/webcodecs


Interface
============================


AudioDecoder Interface
-----------------------------

.. code-block:: WebIDL

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

.. code-block:: WebIDL

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

.. code-block:: WebIDL

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


.. code-block:: WebIDL

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

.. code-block:: WebIDL

    dictionary AudioDecoderConfig {
        required DOMString codec;
        [EnforceRange] required unsigned long sampleRate;
        [EnforceRange] required unsigned long numberOfChannels;
        BufferSource description;
    };

VideoDecoderConfig
-------------------------------------

.. code-block:: WebIDL

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

.. code-block:: WebIDL

    dictionary AudioEncoderConfig {
        required DOMString codec;
        [EnforceRange] unsigned long sampleRate;
        [EnforceRange] unsigned long numberOfChannels;
        [EnforceRange] unsigned long long bitrate;
    };



VideoEncoderConfig
-------------------------------------

.. code-block:: WebIDL

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