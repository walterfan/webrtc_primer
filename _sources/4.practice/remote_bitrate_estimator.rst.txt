:orphan:

##############################
Remote Bitrate Estimator 
##############################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** Remote Bitrate Estimator 
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

   class RemoteBitrateEstimator : public CallStatsObserver, public Module {
    public:
        ~RemoteBitrateEstimator() override {}
        // 在接收每一个包时调用，更新接收荷载比特率估计和过度使用检测器
        // 如果检测到了过度使用，远端比特率估计将被更新
        // 注意 `payload_size` 是指不包含包头的包长度
        // 注意 `arrival_time_ms` 可以基于任何时间基准

        virtual void IncomingPacket(int64_t arrival_time_ms,
                                size_t payload_size,
                                const RTPHeader& header) = 0;

        // 移除 `ssrc` 所标识的流的所有数据
        virtual void RemoveStream(uint32_t ssrc) = 0;

        // Returns true if a valid estimate exists and sets `bitrate_bps` to the
        // estimated payload bitrate in bits per second. `ssrcs` is the list of ssrcs
        // currently being received and of which the bitrate estimate is based upon.
        virtual bool LatestEstimate(std::vector<uint32_t>* ssrcs,
                                uint32_t* bitrate_bps) const = 0;

        virtual void SetMinBitrate(int min_bitrate_bps) = 0;

    protected:
        static const int64_t kProcessIntervalMs = 500;
        static const int64_t kStreamTimeOutMs = 2000;
    };



* refer to https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/modules/congestion_controller/


Reference
==================
* https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/video/adaptation/encode_usage_resource.h
* https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/video/adaptation/overuse_frame_detector.h

