################################
WebRTC API 之 Screen Capture
################################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** Screen Capture
**Authors**  Walter Fan
**Status**   WIP as draft
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
    :local:

简介
============

通过对 getUserMedia API 的扩展，getDisplayMedia API 能够以视频流的形式获取用户所显示屏幕或其部分内容。在某些情况下，系统、应用程序或窗口音频也会被捕获，以音轨的形式呈现。 这使许多共享的应用程序成为可能，包括使用 WebRTC 进行的屏幕或桌面共享。

此功能具有重大的安全隐患。 使用此 API 访问向用户显示的信息的应用程序可以访问到来自其他来源的机密信息，即使这些该信息在应用程序的控制之下。 这样，本应由用户代理沙箱机制提供的保护而无法访问的内容也可能被看到。


术语
===========


Screen capture 包括几种不同的基于屏幕表面的内容捕获，它们统称为 “display surfaces”，共有如下类型

* A monitor display surface represents a physical display. Some systems have multiple monitors, which can be identified separately. Multiple monitors might also be aggregated into a single logical monitor. An aggregated display surface is captured as a single MediaStreamTrack.
* A window display surface is a single contiguous surface that is used by a single application.
* A single application might have several windows available to it, and those can be aggregated into a single application surface, representing all the windows available to that application and therefore presented as a single MediaStreamTrack.
* A browser display surface is the rendered form of a browsing context. This is not strictly limited to HTML [HTML] documents, though the discussion in this document will address some specific concerns with the capture of HTML.
This document draws a distinction between two variants of each type of display surface:

A logical display surface is the surface that an operating system makes available to an application for the purposes of rendering.
a visible display surface is the portion of a logical display surface that is rendered to a monitor.
Some operating systems permit windows from different applications to occlude other windows, in whole or part, so the visible display surface is a strict subset of the logical display surface.

The source pixel ratio of a display surface is 1/96th of 1 inch divided by its vertical pixel size.

The devicechange event is defined in [GETUSERMEDIA].

屏幕捕获包括对几种不同类型的基于屏幕的表面的捕获。这些统称为显示表面，本文档定义了以下类型：

* monitor display surface: 监视器显示表面代表物理显示。有些系统有多个监视器，可以单独识别。多个监视器也可以聚合到一个逻辑监视器中。聚合的显示表面被捕获为单个 MediaStreamTrack。
* window display surface: 窗口显示表面是由单个应用程序使用的单个连续表面。
* application window: 一个应用程序可能有多个可用的窗口，这些窗口可以聚合到一个应用程序表面中，代表该应用程序可用的所有窗口，因此显示为单个 MediaStreamTrack。
* browser display surface: 浏览器显示表面是浏览上下文的呈现形式。这并不严格限于 HTML 文档，尽管本文档中的讨论将解决一些与 HTML 捕获有关的特定问题。


标准文档对每种 display surface 显示表面的两种变体进行了区分：

* logical display surface: 逻辑显示表面是操作系统为呈现目的而提供给应用程序的表面。
* visible display surface: 可见显示表面是呈现给监视器的逻辑显示表面的一部分。

一些操作系统允许来自不同应用程序的窗口全部或部分地遮挡其他窗口，因此可见显示表面是逻辑显示表面的严格子集。

Display surface 显示表面的 source pixel ratio 源像素比是 1 英寸的 1/96 除以其垂直像素大小。



接口
=========================

.. code-block:: WebIDL

    partial interface MediaDevices {
        Promise<MediaStream> getDisplayMedia(optional DisplayMediaStreamConstraints constraints = {});
    };

    dictionary DisplayMediaStreamConstraints {
        (boolean or MediaTrackConstraints) video = true;
        (boolean or MediaTrackConstraints) audio = false;
    };

    dictionary MediaTrackConstraints : MediaTrackConstraintSet {
        sequence<MediaTrackConstraintSet> advanced;
    };

    dictionary MediaTrackConstraintSet {
        ConstrainULong width;
        ConstrainULong height;
        ConstrainDouble aspectRatio;
        ConstrainDouble frameRate;
        ConstrainDOMString facingMode;
        ConstrainDOMString resizeMode;
        ConstrainULong sampleRate;
        ConstrainULong sampleSize;
        ConstrainBoolean echoCancellation;
        ConstrainBoolean autoGainControl;
        ConstrainBoolean noiseSuppression;
        ConstrainDouble latency;
        ConstrainULong channelCount;
        ConstrainDOMString deviceId;
        ConstrainDOMString groupId;
    };


    partial dictionary MediaTrackSupportedConstraints {
        boolean displaySurface = true;
        boolean logicalSurface = true;
        boolean cursor = true;
        boolean restrictOwnAudio = true;
        boolean suppressLocalAudioPlayback = true;
    };

    enum DisplayCaptureSurfaceType {
        "monitor",
        "window",
        "application",
        "browser"
    };

    enum CursorCaptureConstraint {
        "never",
        "always",
        "motion"
    };


getDisplayMedia 实例
==========================

.. code-block::

    <script>
        const constraints = {
            "video": {
                "cursor": "always"
            },
            "audio": {
                "echoCancellation": true,
                "noiseSuppression": true,
                "sampleRate": 44100
            }
        }

        function handleSuccess(stream) {
            document.querySelector('video').srcObject = stream;
        }

        function handleError(error) {
            console.log('getDisplayMedia error: ', error);
        }

        navigator.mediaDevices.getDisplayMedia(constraints)
                .then(handleSuccess)
                .catch(handleError);
    </script>


参考资料
============

* `W3C Screen Capture Spec`_