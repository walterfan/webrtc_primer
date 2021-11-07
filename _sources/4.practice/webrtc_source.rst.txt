#################
WebRTC 源码分析
#################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** WebRTC Source
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

Overview
=============


Source code
=============
1. 安装 Chromium 软件库工具.
   
   参见 
   * `WebRTC 开发依赖软件 <webrtc-prerequisite-sw_>`_
   * `安装 WebRTC 开发工具  <webrtc-depot-tools_>`_
  
2. 下载 WebRTC 源码
       
.. code-block:: bash

   $ mkdir webrtc-checkout
   $ cd webrtc-checkout
   $ fetch --nohooks webrtc
   $ gclient sync


3. 更新源码到你自己的分支

.. code-block:: bash

   $ git checkout main
   $ git pull origin main
   $ gclient sync
   $ git checkout my-branch
   $ git merge main

4. 构建

先要安装 `ninja 构建工具 <ninja-tool_>`_ 这一构建工具, 通过它来生成构建脚本

.. code-block:: bash

   # generate project files using the defaults (Debug build)
   $ gn gen out/Default
   # clean all build artifacts in a directory but leave the current GN configuration untouched
   $ gn clean out/Default

1. 编译

.. code-block:: bash

   $ ninja -C out/Default

Modules
=============

* async_audio_processing
* audio_coding
* audio_device
* audio_mixer
* audio_processing
* congestion_controller
* desktop_capture
* include
* pacing
* remote_bitrate_estimator
* rtp_rtcp
* third_party
  - fft
  - g711
  - g722
  - portaudio
* utility
* video_capture
* video_coding
* video_processing


Treasure in code
========================

* `overuse_frame_detector`_
  - webrtc/video/adaptation

* `congestion control`
  - webrtc/modules/congestion_controller/

* remote_bitrate_estimator
  - webrtc/modules/remote_bitrate_estimator/

Reference
==========
* `Chromium Code Search`_
* `Webrtc video framerate/resolution 自适应 <https://xie.infoq.cn/article/50b7931b8a023f8ca7f25d4e9>`_
  
.. _Chromium Code Search: https://source.chromium.org/chromium/chromium/src
.. _ninja-tool: https://ninja-build.org/
.. _webrtc-prerequisite-sw: https://webrtc.googlesource.com/src/+/main/docs/native-code/development/prerequisite-sw/index.md
.. _webrtc-depot-tools: https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up

.. _overuse_frame_detector: ./webrtc_overuse_frame_decoder.html
.. _congestion control: ./webrtc_congestion_control.html