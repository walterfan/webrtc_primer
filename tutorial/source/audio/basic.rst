#############
Audio Basic
#############

Audio codec
======================================

.. code-block:: c

    typedef enum janus_audiocodec {
        JANUS_AUDIOCODEC_NONE,
        JANUS_AUDIOCODEC_OPUS,
        JANUS_AUDIOCODEC_MULTIOPUS,
        JANUS_AUDIOCODEC_PCMU,
        JANUS_AUDIOCODEC_PCMA,
        JANUS_AUDIOCODEC_G722,
        JANUS_AUDIOCODEC_ISAC_32K,
        JANUS_AUDIOCODEC_ISAC_16K
    } janus_audiocodec;
    const char *janus_audiocodec_name(janus_audiocodec acodec);
    janus_audiocodec janus_audiocodec_from_name(const char *name);
    int janus_audiocodec_pt(janus_audiocodec acodec);