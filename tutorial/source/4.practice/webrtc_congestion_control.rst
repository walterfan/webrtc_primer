:orphan:

##############################
WebRTC Congestion Control
##############################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** WebRTC Congestion Control
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

Overview
=============

Code
=============


.. code-block:: c++

   enum class BandwidthUsage {
      kBwNormal = 0,
      kBwUnderusing = 1,
      kBwOverusing = 2,
      kLast
   };



* refer to https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/modules/congestion_controller/


main classes
==================

.. code-block::

   class DelayBasedBwe {
      public:
      struct Result {
         Result();
         ~Result() = default;
         bool updated;
         bool probe;
         DataRate target_bitrate = DataRate::Zero();
         bool recovered_from_overuse;
         bool backoff_in_alr;
      };

      explicit DelayBasedBwe(const WebRtcKeyValueConfig* key_value_config,
                              RtcEventLog* event_log,
                              NetworkStatePredictor* network_state_predictor);

      DelayBasedBwe() = delete;
      DelayBasedBwe(const DelayBasedBwe&) = delete;
      DelayBasedBwe& operator=(const DelayBasedBwe&) = delete;

      virtual ~DelayBasedBwe();

      Result IncomingPacketFeedbackVector(
            const TransportPacketsFeedback& msg,
            absl::optional<DataRate> acked_bitrate,
            absl::optional<DataRate> probe_bitrate,
            absl::optional<NetworkStateEstimate> network_estimate,
            bool in_alr);

      //...


      }


Reference
==================
* https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/video/adaptation/encode_usage_resource.h
* https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/video/adaptation/overuse_frame_detector.h

