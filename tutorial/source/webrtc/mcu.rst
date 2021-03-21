###################
MCU Server
###################


Overview
====================

Multiple Control Unit



Janus as an example
=====================

refer to https://janus.conf.meetecho.com/docs/audiobridge.html
it is a MCU only for audio: mix audio using libopus

audio room description:

.. code-block::

    room-<unique room ID>: {
            description = This is my awesome room
            is_private = true|false (private rooms don't appear when you do a 'list' request)
            secret = <optional password needed for manipulating (e.g. destroying) the room>
            pin = <optional password needed for joining the room>
            sampling_rate = <sampling rate> (e.g., 16000 for wideband mixing)
            audiolevel_ext = true|false (whether the ssrc-audio-level RTP extension must be
                    negotiated/used or not for new joins, default=true)
            audiolevel_event = true|false (whether to emit event to other users or not, default=false)
            audio_active_packets = 100 (number of packets with audio level, default=100, 2 seconds)
            audio_level_average = 25 (average value of audio level, 127=muted, 0='too loud', default=25)
            default_prebuffering = number of packets to buffer before decoding each participant (default=DEFAULT_PREBUFFERING)
            record = true|false (whether this room should be recorded, default=false)
            record_file =   /path/to/recording.wav (where to save the recording)

                    [The following lines are only needed if you want the mixed audio
                    to be automatically forwarded via plain RTP to an external component
                    (e.g., an ffmpeg script, or a gstreamer pipeline) for processing.
                    By default plain RTP is used, SRTP must be configured if needed]
            rtp_forward_id = numeric RTP forwarder ID for referencing it via API (optional: random ID used if missing)
            rtp_forward_host = host address to forward RTP packets of mixed audio to
            rtp_forward_host_family = ipv4|ipv6; by default, first family returned by DNS request
            rtp_forward_port = port to forward RTP packets of mixed audio to
            rtp_forward_ssrc = SSRC to use to use when streaming (optional: stream_id used if missing)
            rtp_forward_codec = opus (default), pcma (A-Law) or pcmu (mu-Law)
            rtp_forward_ptype = payload type to use when streaming (optional: only read for Opus, 100 used if missing)
            rtp_forward_srtp_suite = length of authentication tag, if SRTP is needed (32 or 80)
            rtp_forward_srtp_crypto = key to use as crypto, if SRTP is needed (base64 encoded key as in SDES)
            rtp_forward_always_on = true|false, whether silence should be forwarded when the room is empty (optional: false used if missing)
    }


operations:
    create , edit , destroy , exists, allowed, kick, list, mute , unmute , mute_room , unmute_room , listparticipants , resetdecoder , rtp_forward, stop_rtp_forward , list_forwarders , play_file , is_playing and stop_file are synchronous requests, 