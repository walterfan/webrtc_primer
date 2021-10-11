########################
Insertable Stream
########################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** WebRTC Insertable Stream
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:


Overview
=========================

It is new WebRTC API manipulating the bits on MediaStreamTracks being sent via an RTCPeerConnection.

Problem to be solved
---------------------------
We need an API for processing media that:

* Allows the processing to be specified by the user, not the browser
* Allows the processed data to be handled by the browser as if it came through the normal pipeline
* Allows the use of techniques like WASM to achieve effective processing
* Allows the use of techniques like Workers to avoid blocking on the main thread
* Does not negatively impact security or privacy of current communications

API
===========================

It uses an additional API on RTCRtpSender and RTCRtpReceiver to insert the processing into the pipeline.

.. code-block::

    // New dictionary
    dictionary RTCInsertableStreams {
        ReadableStream readable;
        WritableStream writable;
    };

    typedef (SFrameTransform or RTCRtpScriptTransform) RTCRtpTransform;

    // New methods for RTCRtpSender and RTCRtpReceiver
    partial interface RTCRtpSender {
        attribute RTCRtpTransform? transform;
    };

    partial interface RTCRtpReceiver {
        attribute RTCRtpTransform? transform;
    };

由上面的定义可知， RTCRtpTransform 有两种实现 SFrameTransform 和 RTCRtpScriptTransform

SFrameTransform
-----------------------
接口定义如下

.. code-block:: WebIDL

    enum SFrameTransformRole {
        "encrypt",
        "decrypt"
    };

    dictionary SFrameTransformOptions {
        SFrameTransformRole role = "encrypt";
    };

    typedef [EnforceRange] unsigned long long SmallCryptoKeyID;
    typedef (SmallCryptoKeyID or bigint) CryptoKeyID;

    [Exposed=(Window,DedicatedWorker)]
    interface SFrameTransform {
        constructor(optional SFrameTransformOptions options = {});
        Promise<undefined> setEncryptionKey(CryptoKey key, optional CryptoKeyID keyID);
        attribute EventHandler onerror;
    };
    SFrameTransform includes GenericTransformStream;

    enum SFrameTransformErrorEventType {
        "authentication",
        "keyID",
        "syntax"
    };

    [Exposed=(Window,DedicatedWorker)]
    interface SFrameTransformErrorEvent : Event {
        constructor(DOMString type, SFrameTransformErrorEventInit eventInitDict);

        readonly attribute SFrameTransformErrorEventType errorType;
        readonly attribute CryptoKeyID? keyID;
        readonly attribute any frame;
    };

    dictionary SFrameTransformErrorEventInit : EventInit {
        required SFrameTransformErrorEventType errorType;
        required any frame;
        CryptoKeyID? keyID;
    };


RTCRtpScriptTransform
---------------------------


.. code-block:: WebIDL

    // New enum for video frame types. Will eventually re-use the equivalent defined
    // by WebCodecs.
    enum RTCEncodedVideoFrameType {
        "empty",
        "key",
        "delta",
    };

    dictionary RTCEncodedVideoFrameMetadata {
        long long frameId;
        sequence<long long> dependencies;
        unsigned short width;
        unsigned short height;
        long spatialIndex;
        long temporalIndex;
        long synchronizationSource;
        sequence<long> contributingSources;
    };

    // New interfaces to define encoded video and audio frames. Will eventually
    // re-use or extend the equivalent defined in WebCodecs.
    [Exposed=(Window,DedicatedWorker)]
    interface RTCEncodedVideoFrame {
        readonly attribute RTCEncodedVideoFrameType type;
        readonly attribute unsigned long long timestamp;
        attribute ArrayBuffer data;
        RTCEncodedVideoFrameMetadata getMetadata();
    };

    dictionary RTCEncodedAudioFrameMetadata {
        long synchronizationSource;
        sequence<long> contributingSources;
    };

    [Exposed=(Window,DedicatedWorker)]
    interface RTCEncodedAudioFrame {
        readonly attribute unsigned long long timestamp;
        attribute ArrayBuffer data;
        RTCEncodedAudioFrameMetadata getMetadata();
    };


    // New interfaces to expose JavaScript-based transforms.

    [Exposed=DedicatedWorker]
    interface RTCTransformEvent : Event {
        readonly attribute RTCRtpScriptTransformer transformer;
    };

    partial interface DedicatedWorkerGlobalScope {
        attribute EventHandler onrtctransform;
    };

    [Exposed=DedicatedWorker]
    interface RTCRtpScriptTransformer {
        readonly attribute ReadableStream readable;
        readonly attribute WritableStream writable;
        readonly attribute any options;
    };

    [Exposed=Window]
    interface RTCRtpScriptTransform {
        constructor(Worker worker, optional any options, optional sequence<object> transfer);
    };




Stream Standards
==========================

The Streams Standard provides a common set of APIs for creating and interfacing with such streaming data, embodied in readable streams, writable streams, and transform streams.

These APIs have been designed to efficiently map to low-level I/O primitives, including specializations for byte streams where appropriate. 

They allow easy composition of multiple streams into pipe chains, or can be used directly via readers and writers. Finally, they are designed to automatically provide backpressure and queuing.

use cases
---------------
* Video effects: piping a readable video stream through a transform stream that applies effects in real time.

* Decompression: piping a file stream through a transform stream that selectively decompresses files from a .tgz archive, turning them into img elements as the user scrolls through an image gallery.

* Image decoding: piping an HTTP response stream through a transform stream that decodes bytes into bitmap data, and then through another transform that translates bitmaps into PNGs.

Model
-----------------

A chunk is a single piece of data that is written to or read from a stream. It can be of any type; streams can even contain chunks of different types. 

A chunk will often not be the most atomic unit of data for a given stream; for example a byte stream might contain chunks consisting of 16 KiB Uint8Arrays, instead of single bytes.




Reference
=========================
* `webrtc-encoded-transform`_
* `Insertable Stream Explain`_
* `Streams API`_