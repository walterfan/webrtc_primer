################################
Automatic Noise Suppression
################################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==============================
**Abstract** Automatic Noise Suppression
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==============================

.. |date| date::

.. contents::
   :local:

概述
===================

背景噪声抑制（ANS）指的是将声音中的背景噪声识别并进行消除的处理。

背景噪声分为平衡噪声和瞬时噪声两类，平稳噪声的频谱稳定，瞬时噪声的频谱能量方差小，利用噪声的特点，对音频数据添加反向波形处理，即可消除噪声。