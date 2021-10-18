###################
SFU Server
###################


Overview
====================

选择性转发单元 SFU（Selective Forwarding Unit）在各个端点之间交换音频和视频流。 每个接收器方可以选择它所要接收的流和层（空间/时间上）。 与 MCU（多点控制单元）相比，这种设计可以带来更好的性能、更高的吞吐量和更少的延迟。 鉴于它不做转码或合成媒体，所以它具有高度可扩展性，并且需要的资源少得多。

由于各个端点分别获取其他端点的媒体，因此它们可以具有个性化的布局，并选择自己所要呈现的媒体流，以及决定如何显示它们。

SFU 可以看作一个多媒体流的路由器，实践中可以应用发布订阅模式（ publish/subscribe pattern）

.. image:: ../_static/webrtc_sfu.webp





SFU 所需要的相关库
==========================

* libevent:

  - example: https://github.com/eddieh/libevent-echo-server/blob/master/echo-server.c

* libuv

  - example: https://github.com/eddieh/libuv-echo-server/blob/master/echo-server.c


Features
====================
- create , destroy , edit , exists, list, allowed, kick and listparticipants are synchronous requests, 

- join , joinandconfigure , configure , publish , unpublish , start , pause , switch and leave requests instead are all asynchronous

Example
====================

Janus
--------------------

refer to https://janus.conf.meetecho.com/docs/videoroom.html  

.. code-block::

    room-<unique room ID>: {
            description = This is my awesome room
            is_private = true|false (private rooms don't appear when you do a 'list' request, default=false)
            secret = <optional password needed for manipulating (e.g. destroying) the room>
            pin = <optional password needed for joining the room>
            require_pvtid = true|false (whether subscriptions are required to provide a valid private_id 
                                    to associate with a publisher, default=false)
            publishers = <max number of concurrent senders> (e.g., 6 for a video
                                    conference or 1 for a webinar, default=3)
            bitrate = <max video bitrate for senders> (e.g., 128000)
            bitrate_cap = <true|false, whether the above cap should act as a limit to dynamic bitrate changes by publishers, default=false>,
            fir_freq = <send a FIR to publishers every fir_freq seconds> (0=disable)
            audiocodec = opus|g722|pcmu|pcma|isac32|isac16 (audio codec to force on publishers, default=opus
                                    can be a comma separated list in order of preference, e.g., opus,pcmu)
            videocodec = vp8|vp9|h264|av1|h265 (video codec to force on publishers, default=vp8
                                    can be a comma separated list in order of preference, e.g., vp9,vp8,h264)
            vp9_profile = VP9-specific profile to prefer (e.g., "2" for "profile-id=2")
            h264_profile = H.264-specific profile to prefer (e.g., "42e01f" for "profile-level-id=42e01f")
            opus_fec = true|false (whether inband FEC must be negotiated; only works for Opus, default=false)
            video_svc = true|false (whether SVC support must be enabled; only works for VP9, default=false)
            audiolevel_ext = true|false (whether the ssrc-audio-level RTP extension must be
                    negotiated/used or not for new publishers, default=true)
            audiolevel_event = true|false (whether to emit event to other users or not, default=false)
            audio_active_packets = 100 (number of packets with audio level, default=100, 2 seconds)
            audio_level_average = 25 (average value of audio level, 127=muted, 0='too loud', default=25)
            videoorient_ext = true|false (whether the video-orientation RTP extension must be
                    negotiated/used or not for new publishers, default=true)
            playoutdelay_ext = true|false (whether the playout-delay RTP extension must be
                    negotiated/used or not for new publishers, default=true)
            transport_wide_cc_ext = true|false (whether the transport wide CC RTP extension must be
                    negotiated/used or not for new publishers, default=true)
            record = true|false (whether this room should be recorded, default=false)
            rec_dir = <folder where recordings should be stored, when enabled>
            lock_record = true|false (whether recording can only be started/stopped if the secret
                                    is provided, or using the global enable_recording request, default=false)
            notify_joining = true|false (optional, whether to notify all participants when a new
                                    participant joins the room. The Videoroom plugin by design only notifies
                                    new feeds (publishers), and enabling this may result extra notification
                                    traffic. This flag is particularly useful when enabled with require_pvtid
                                    for admin to manage listening only participants. default=false)
            require_e2ee = true|false (whether all participants are required to publish and subscribe
                                    using end-to-end media encryption, e.g., via Insertable Streams; default=false)
    }

Reference
=======================
* MediaSoup rtp-parameters-and-capabilities
  - https://mediasoup.org/documentation/v3/mediasoup/rtp-parameters-and-capabilities