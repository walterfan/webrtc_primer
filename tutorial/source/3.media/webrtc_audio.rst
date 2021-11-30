################
WebRTC 音频
################

.. toctree::
   :maxdepth: 1
   :caption: 目录

   audio_basic
   audio_level
   audio_api
   audio_qos
   audio_aec
   audio_agc
   audio_ans
   
   audio_quality
   audio_analysis
   opus


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** Web 音频
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::



Overview
===================

.. figure:: ../_static/audio_pipeline.png
   :alt: Audio Pipeline


* Audio Capture by OS framework
* Audio data processing: AEC, ANR, AGC, etc.
* Audio data transimission




Reference
===================
* `RFC7874`_ "WebRTC Audio Codec and Processing Requirements" 