###################
SFU Server
###################


Overview
====================

An SFU (Selective Forwarding Unit) receives audio and video streams from endpoints and relays them to everyone else (endpoints send one and receive many). Each receiver endpoint can select which streams and spatial/temporal layers it receives. Compared to a mixer or MCU (Multipoint Control Unit) this design leads to a better performance, higher throughput and less latency. It's highly scalable and requires much less resources given that it does not transcode or mix media.

Since endpoints get the other endpoints' media separately, they can have a personalized layout and choose which streams to render and how to display them.


It is Audio/video router

Pattern: publish/subscribe

#####################
Reactor
#####################

Reactor pattern


library
=================

* libevent:

  - example: https://github.com/eddieh/libevent-echo-server/blob/master/echo-server.c

* libuv

  - example: https://github.com/eddieh/libuv-echo-server/blob/master/echo-server.c


Features
====================
- create , destroy , edit , exists, list, allowed, kick and listparticipants are synchronous requests, 

- join , joinandconfigure , configure , publish , unpublish , start , pause , switch and leave requests instead are all asynchronous

Janus as an example
====================

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