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



Explain
=========================

Problem to be solved
---------------------------
We need an API for processing media that:

* Allows the processing to be specified by the user, not the browser
* Allows the processed data to be handled by the browser as if it came through the normal pipeline
* Allows the use of techniques like WASM to achieve effective processing
* Allows the use of techniques like Workers to avoid blocking on the main thread
* Does not negatively impact security or privacy of current communications


Reference
=========================
* `webrtc-encoded-transform`_
* `Insertable Stream Explain`_