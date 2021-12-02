##########################
Voice Activity Detector
##########################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** Voice Activity Detector
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

Overview
===================

Voice activity detection (VAD), also known as speech activity detection or speech detection, is the detection of the presence or absence of human speech, used in speech processing.

The main uses of VAD are in speech coding and speech recognition. It can facilitate speech processing, and can also be used to deactivate some processes during non-speech section of an audio session: it can avoid unnecessary coding/transmission of silence packets in Voice over Internet Protocol (VoIP) applications, saving on computation and on network bandwidth.

VAD is an important enabling technology for a variety of speech-based applications. 

Therefore, various VAD algorithms have been developed that provide varying features and compromises between latency, sensitivity, accuracy and computational cost. 

Some VAD algorithms also provide further analysis, for example whether the speech is voiced, unvoiced or sustained. Voice activity detection is usually independent of language.



VAD in codec
===================


VAD in Opus determines whether a frame is sent out as empty (DTX) or not.

If speech is classified as silence (false negative), the frame will be empty and speech will be lost
False negative rate(FNR) needs to be as close to zero as possible when DTX is enabled
the different VAD in opus codec under different complexity, VAD ON will tigger DTX ON（400ms）,and VAD's decision will decide whether we should play CNG on playback.

the RNN-VAD is used when complexity setting >=7(float),which means when complexity <7,we use traditional VAD.


CNG
========================


There is a Real-time Transport Protocol (RTP) Payload for Comfort Noise (CN).
(refer to RFC 3389 )

The payload format provides a minimum interoperability specification for communication of comfort noise parameters.  The comfort noise analysis and synthesis as well as the Voice Activity Detection (VAD) and DT

Two popular types of VAD/CNG schemes are included in G.711.

The noise power levels in both VAD/CNG methods are expressed in −dBov to interoperate with each other.

The unit “dBov” is the dB level relative to the overload of the system. It is not a Volts reference for dBV.

For example, in the case of μ-law-based coding, the maximum sine wave signal power without distortion is 3.17 dBm with amplitude ±8159. Square wave power is 3 dB more than sine wave power. The maximum possible power of signal from a square wave with an amplitude of ±8159 is 0 dBov as reference, which corresponds to a 6.17-dBm power level in the μ-law system. Hence, 0 dBov = 6.17 dBm is used in μ-law system. Sine and square wave power levels and signal amplitudes are shown in Fig. 4.1(c). Representation relative to the overload point of a system is particularly useful for digital implementations, because one does not need to know the relative calibration of the analog circuitry.


VAD definition
========================
* SILK VAD(SNR based)
 
SILK VAD is based on SNR, which estimates the noise level to determine speech activity
The Voice Activity Detector (VAD) generates a measure of speech activity by combining the signal-to-noise ratios (SNRs) from 4 separate frequency bands. In each band the background noise level is estimated by smoothing the inverse energy over time frames.
Multiplying this smoothed inverse energy with the subband energy gives the SNR.

* Opus VAD(RNN based)

Opus VAD uses recursive neural network based on GRU units to perform both speech/music and speech/silence classification:


Algorithm
===================

1. There may first be a noise reduction stage, e.g. via spectral subtraction.
2. Then some features or quantities are calculated from a section of the input signal.
3. A classification rule is applied to classify the section as speech or non-speech – often this classification rule finds when a value exceeds a certain threshold.

There may be some feedback in this sequence, in which the VAD decision is used to improve the noise estimate in the noise reduction stage, or to adaptively vary the threshold(s). These feedback operations improve the VAD performance in non-stationary noise (i.e. when the noise varies a lot).[citation needed]

A representative set of recently published VAD methods formulates the decision rule on a frame by frame basis using instantaneous measures of the divergence distance between speech and noise.[citation needed] The different measures which are used in VAD methods include spectral slope, correlation coefficients, log likelihood ratio, cepstral, weighted cepstral, and modified distance measures.[citation needed]

Independently from the choice of VAD algorithm, a compromise must be made between having voice detected as noise, or noise detected as voice (between false positive and false negative). A VAD operating in a mobile phone must be able to detect speech in the presence of a range of very diverse types of acoustic background noise. In these difficult detection conditions it is often preferable that a VAD should fail-safe, indicating speech detected when the decision is in doubt, to lower the chance of losing speech segments. The biggest difficulty in the detection of speech in this environment is the very low signal-to-noise ratios (SNRs) that are encountered. It may be impossible to distinguish between speech and noise using simple level detection techniques when parts of the speech utterance are buried below the noise.




Reference
===================
* https://en.wikipedia.org/wiki/Voice_activity_detection
* https://github.com:wiseman/py-webrtcvad.gits
* https://github.com/snakers4/silero-vad
* https://colab.research.google.com/github/snakers4/silero-vad/blob/master/silero-vad.ipynb
* https://chromium.googlesource.com/external/webrtc/+/518c683f3e413523a458a94b533274bd7f29992d/webrtc/modules/audio_processing/vad/voice_activity_detector.h
* https://www.mathworks.com/matlabcentral/fileexchange/78895-google-webrtc-voice-activity-detection-vad-module
