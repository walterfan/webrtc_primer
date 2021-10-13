##########
FFmpeg
##########


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** FFmpeg
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

ffmpeg 是什么?
==============

ffmpeg 是一个跨平台的音视频录制,转换和流式传输的完整解决方案，它是一套软件库, 也是一套工具集。

组件
====

命令行工具
----------

-  `ffmpeg`_: 音视频编码和解码工具
-  `ffplay`_: 媒体播放器
-  `ffprobe`_:  媒体文件特性探查器
-  `ffserver`_:  基于 HTTP 和 RTSP 协议的多媒体流播放服务器

FFmpeg 的共享库
---------------

============= ==================
库            说明
============= ==================
libavcodec    用于各种多媒体编码
libavdevice   用于各种设备
libavfilter   包含一些过滤器
libavformat   音视频媒体格式
libavutil     包含一些实用例程
libpostproc   用于后期处理
libswresample 用于音频重采样
libswscale    用于媒体扩展
============= ==================

ffmpeg flow
==============

ffmpeg调用libavformat库（包含demuxers）来读取输入文件，并从中获取包含编码数据的数据包。
当有多个输入文件时，ffmpeg尝试通过跟踪任何活动输入流上的最低时间戳来保持同步。

然后将编码的数据包传递给解码器（除非为流选择了streamcopy，请参阅进一步的描述）。
解码器产生未经压缩的帧（原始视频/ PCM音频/
…），可以通过过滤进一步处理（见下一节）。
滤波后，帧被传送到编码器，对编码器进行编码并输出编码的数据包。
最后，这些被传递给复制器，它将编码的数据包写入输出文件。

.. figure:: http://upload-images.jianshu.io/upload_images/1598924-ab4b442d6af1c101.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240
   :alt: ffmpeg flow

在编码之前，ffmpeg可以使用libavfilter库中的过滤器来处理原始音频和视频帧。
几个链式过滤器形成一个过滤器图。

ffmpeg区分两种类型的过滤器图：

* 简单过滤器图
* 复杂过滤器图。



用法
====

命令行的基本用法如下

::

ffmpeg [global_options] [input_file_options] -i input_file
[output_file_options] output_file

比如

::

   ffmpeg -i 1secs.avi -vn -acodec pcm_s16le -ar 8000 -ac 1 1secs.wav


ffmpeg 支持很多格式和编码，可通过如下命令查看

::
    ffmpeg -formats
    ffmpeg -codecs



FAQ
==============

从视频文件 mp4 中提取音频文件 wav
-----------------------------------
.. code-block:: bash

    fmpeg -i input.mp4 -ab 160k -ac 2 -ar 44100 -vn output.wav


转换 mp4 到 avi
------------------------
```
ffmpeg -i input.mp4 output.avi
```

如何根据图片和音频制作视频文件
------------------------------

::

   def make_avi(image_file, wave_file, avi_file):
       cmd = "ffmpeg -i %s -i %s -c copy %s " % (image_file, wave_file, avi_file)
       print(cmd)
       return os.system(cmd)

如何连接两个音频文件？
----------------------

::

   ffmpeg -f concat -i mylist.txt -c copy output.wav 

mylist.txt:

::

   file '4815.wav'
   file '4816.wav'

如何将mp3 转换为 wav 文件
-------------------------

-  采样率为8000 Hz, 编码为 pcm, 采样深度为16bit

::

   ffmpeg -i 4898.mp3 -acodec pcm_s16le -ac 1 -ar 8000 4898.wav

参考资料
========

-  官网: https://ffmpeg.org/
-  官方文档: http://ffmpeg.org/documentation.html
-  官方书籍: ffmpeg basic - http://ffmpeg.tv/

.. _CC-BY: https://creativecommons.org/licenses/by/4.0/
.. _ffmpeg: https://ffmpeg.org/ffmpeg.html
.. _ffplay: https://ffmpeg.org/ffplay.html
.. _ffprobe: https://ffmpeg.org/ffprobe.html
.. _ffserver: https://ffmpeg.org/ffserver.html



