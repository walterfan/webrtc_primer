###############
Video Basic
###############

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** Video Basic
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

概述
========================


颜色
========================

光的三基色
--------------
Red, Green, Blue 红绿蓝称为三基色，它们按不同比例合成可以产生其他颜色

..code-block::
  
  R + G = Yellow 黄色
  G + B = Cyan 青色
  R + B = Magenta 品红

  R + Cyan = White
  G + Magenta = White
  B + Yellow = White

色彩三要素
-------------------------

1. 色相：也称色调，由光波波长的长短决定的视觉我，是区别不同颜色的标准
2. 亮度：lightness, brightness, 反映颜色的明暗程度
3. 纯度: purity, saturation，反映颜色的深浅程度或者鲜艳程度


颜色模型
========================

RGB
-------------------------


首先就是rgba系列的格式，RGBA色彩主要用于色彩的显示和描述。

常见的有RGBA/ARGB/BGRA/ABGR/RGB/BGR。这些格式都比较好理解了。

R、G、B、A分别表示红绿蓝及透明通道。
以RGBA为例，就是4个字节表示一个颜色值，排列方式就是RGBARGBARGBA这样排列。

而RGB，就是三个字节表示一个颜色值，没有透明通道，排列方式就是RGBRGBRGB。

在通常的视频中，也是没有透明通道的（也有例外，比如MOV格式，是可以包含透明通道的）。

所以当RGBA编码为视频色彩时，A是会被丢掉的。
当然，上面说的，是将每个色彩都用一个字节来表示的情况。

RGBA也有RGBA_8888，RGBA_4444,RGB565等等众多格式，也就是并不是每个颜色都用一个字节来表示。

* RGB24： B->G->R, 每个分量用 8bit 来表示

* RGB32：对每个像素增加 8bit 用来表示 alpha 通道（透明度）

* RGB565：用两个字节来表示RGB三个色彩，R占5位，G占6位，B占5位。

RGB565与RGB24相比，色彩上稍有损失，一般情况下，不细致对比，不容易发现这个损失，但是内存上会节约1/3的大小。

.. code-block:: python

    import cv2
    img = cv2.imread("../../material/xjl.png")
    print(img)



YUV
------------------


Y 指亮度信号, U 和 V 指色度信号（色相加纯度）: 它指某种颜色与同一亮度的白色之间的差别
Y 明亮度， U 色度， V 浓度, 参见 `YUV`_ 格式

.. _YUV: yuv.html

.. code-block:: python

    import numpy as np

    #input is a RGB numpy array with shape (height,width,3), can be uint,int, float or double, values expected in the range 0..255
    #output is a double YUV numpy array with shape (height,width,3), values in the range 0..255
    def RGB2YUV( rgb ):

        m = np.array([[ 0.29900, -0.16874,  0.50000],
                     [0.58700, -0.33126, -0.41869],
                     [ 0.11400, 0.50000, -0.08131]])

        yuv = np.dot(rgb,m)
        yuv[:,:,1:]+=128.0
        return yuv

    #input is an YUV numpy array with shape (height,width,3) can be uint,int, float or double,  values expected in the range 0..255
    #output is a double RGB numpy array with shape (height,width,3), values in the range 0..255
    def YUV2RGB( yuv ):

        m = np.array([[ 1.0, 1.0, 1.0],
                     [-0.000007154783816076815, -0.3441331386566162, 1.7720025777816772],
                     [ 1.4019975662231445, -0.7141380310058594 , 0.00001542569043522235] ])

        rgb = np.dot(yuv,m)
        rgb[:,:,0]-=179.45477266423404
        rgb[:,:,1]+=135.45870971679688
        rgb[:,:,2]-=226.8183044444304
        return rgb



* 从 RGBA 转换为 YUV: `opencv doc <https://docs.opencv.org/3.4/de/d25/imgproc_color_conversions.html>`_


YUV 采样格式的分类

* YUV444    3 bytes per pixel     (12 bytes per 4 pixels)
* YUV422    4 bytes per 2 pixels   (8 bytes per 4 pixels)
* YUV411    6 bytes per 4 pixels
* YUV420p   6 bytes per 4 pixels, reordered


.. math::

    Y = k_rR + k_gG + k_bB

    U = \frac{B - Y}{2(1-k_b)}

    V = \frac{R - Y}{2(1-k_r)}


.. code-block::

    import cv2


    def bgr2yuv(img):
        yuv_img = cv2.cvtColor(img, cv2.COLOR_BGR2YUV)
        y, u, v = cv2.split(yuv_img)

        return y, u, v


    def yuv2bgr(y, u, v):
        yuv_img = cv2.merge([y, u, v])
        bgr_img = cv2.cvtColor(yuv_img, cv2.COLOR_YUV2BGR)

        return bgr_img


    def main():
        orig_img = cv2.imread('test.png')

        y, u, v = bgr2yuv(orig_img)

        bgr_img = yuv2bgr(y, u, v)

        cv2.imshow('orig_img', orig_img)
        cv2.imshow('Y channel', y)
        cv2.imshow('U channel', u)
        cv2.imshow('V channel', v)
        cv2.imshow('bgr_img', bgr_img)
        cv2.waitKey(0)


    if __name__ == '__main__':
        main()





.. code-block:: c
  :linenos:
  
    void YUVfromRGB(double& Y, double& U, double& V, const double R, const double G, const double B)
    {
      Y =  0.257 * R + 0.504 * G + 0.098 * B +  16;
      U = -0.148 * R - 0.291 * G + 0.439 * B + 128;
      V =  0.439 * R - 0.368 * G - 0.071 * B + 128;
    }

    void RGBfromYUV(double& R, double& G, double& B, double Y, double U, double V)
    {
      Y -= 16;
      U -= 128;
      V -= 128;
      R = 1.164 * Y + 1.596 * V;
      G = 1.164 * Y - 0.392 * U - 0.813 * V;
      B = 1.164 * Y + 2.017 * U;
    }


数字图像
========================
* 黑白图像
* 灰度图像
* 彩色图像


显示分辨率
--------------------------

* 现代显示模式
  
===== ================
模式   分辨率
90p	  160 x 90
180p	320 x 180
240p	352 x 240
360p	640 x 360
720p	1280 x 720
1080p	1920 x 1080
2K    3840 × 2160
4K    7680 × 4320
===== ================


* 宽屏和标准PC屏幕模式

=====  ================
模式    分辨率
w288p	 512x288
w448p	 768x448
w576p	 1024x576
VGA	   640x480
SVGA	 800x600
XGA	   1024x768
SXGA	 1280x1024
=====  ================

* 旧的显示模式

=====  ================
模式    分辨率
CIF	   352x288
QCIF	 176x144
SQCIF	 128x96
4CIF	 704x576
16CIF	 1408x1152
=====  ================


视频编码的问题
================

图像格式
-----------------------
* JPG
* WEBP
* PNG


有哪些分辩率?
---------------------
* 90p
* 180p
* 320p
* VGA 640 * 480
* SVGA 800 * 600
* XGA
* 720P
* 1080P
* QHD
* 4K: 3840 * 2160


高宽比
---------------------
* 4:3
* 16:9
* 16:10


FrameDepth Bits
---------------------
* 8 bit
* 10 bit
* 12 bit
* 29 bit

Frame Rate 帧率
---------------------
* 24
* 25
* 30
* 60
* 120

视频压缩
====================

视频是由一系列时间上有序的图像帧所组成的，这些图像之间有许多的冗余信息。

视频压缩方法主要包括去除空间上，时间上，统计上以及感知上的冗余信息


术语
----------------------
* GOP: Group of Picture 代表一组连续的图像帧，通常其第一帧为 I 帧（关键帧 Intra-Frame），其后跟着 B 帧和 P 帧 (Inter-Frame)
* DTS: Decode Timestamp
* PTS: Presentation Timestamp
* IDR 帧：从 IDR 帧开始，所有后面的帧都不会参考 IDR 帧之前的帧
* ITU-T 国际电信联盟标准组织
* CCITT 国际电报电话咨询委员会

H.261
------------------

H.261 是 CCITT 在 1988 年提出的，于1990 年为 ITU-T 所采纳，它是为了在 ISDN 电话线路上进行可视电话，视频会议和提供其他视听服务而制定的。
该视频编码器只提供 p * 64 kbps 的码率（p 取值范围为 1 - 30），编码的延迟必须低于 150 ms。

H.262/MPEG-2 编码
---------------------

MPEG-2 编码即 H.262 使用了 DCT（Discrete Cosine Transform 离散余弦变换），运动补偿和霍夫曼编码，对数据从大到小定义了
sequence, GOP, Picture, Slice, MacroBlock (宏块)， Block 等多个层次

MPEG-2 中的宏块定义了4:2:0, 4:2:2, 4:4:4 不同的结构， Block 则代表了 8*8 个采样值。


H.263
--------------------

H.263 是一个经过改进的视频编码标准，主要用于 PSTN 网络上的视频会议或其他可视化服务，用于在低码率 （64kbps ）及以下进行通信。
H.264 于 1995 年被ITU-T 所采纳，类似于 H.261 在帧间编码中采用预测编码来减少时间冗余信息，对剩下的信号采用变换编码来减少空间冗余信息（如帧内编码及帧间预测的差分宏块）。

H.264
---------------------

H.264 是当下最流行的视频压缩标准，其第一版的草案于 2003 年 5 月完成，它也称为 MPEG-4 的第十部分或者 AVC(Advanced Video Codec 高级视频编码)。 H.264 规定了基于块的，支持运动补偿和变换编码的混合编码方案。同样，每个图像被分解为宏块 (16*16块)，并且任意大小的切片可将多个宏块分组为独立单元。

H.264 的详细介绍参见  `H.264 视频编码简介 <h264.html>`_



视频帧 Video Frame
==========================

| A video is an action sequence formed by a series of images, and each image in the series succeeds the previous one in the timeline of the action sequence to displayed . These still images are called video frames.

视频是由一系列图像组成的动作序列，并且该序列中的每个图像都将在要显示的动作序列的时间轴中接替前一个图像。 这些静止图像称为视频帧。

| the smaller the time difference is between each video frame, the higher the refresh rate is and the more naturally movement is represented in the video.

每个视频帧之间的时间差越小，刷新率就越高，并且视频中的运动表现得越自然。

| this is because there are more video frames generated per second to be displayed as part of the action sequence, therefore changes in the images between frames are slighter and movement appears smoother.

这是因为每秒有更多的视频帧要显示为动作序列的一部分，因此帧之间图像的变化较小，并且运动看起来更平滑。


I-frame 信息帧
---------------------
信息帧用帧内压缩，用作关键帧


P-frame
---------------------
预测帧 Predictive Frame 用帧间压缩，反映之前的 I-frame 的变化



B-frame
---------------------
双向预测帧 Bidirectional Predictive Frames 使得总体压缩更高， 它参考了之前的 I-frame 和之后的 P-frame
 



视频压缩 Video compress
===========================

由于视频是由图像的时间序列组成，视频压缩可以看作具有时间分量的图像压缩。

大多数视频压缩方案都利用了时间相关性来消除冗余。

预测帧与当前帧之间的差异称为预测误差或残差             


Intra-Frame 帧内压缩

Inter-Frame 帧间压缩


H.264
===========================
H.264 and MPEG-4 Video Compression: Video Coding for Next-generation Multimedia

视频是由一系列图像形成的动作序列，并且该系列中的每个图像在要显示的动作序列的时间线中与前一个图像相继。 这些静止图像称为视频帧。 每个视频帧之间的时间差越小，刷新率越高，在视频中表现出的的移动越自然。 这是因为每秒生成的视频帧数量更多，作为动作序列的一部分显示，因此帧之间图像的变化更小，移动看起来更平滑。

* IDR
  
An encoder sends an IDR (Instantaneous Decoder Refresh) coded picture (made up of I- or SI-slices) to clear the contents of the reference picture buffer. On receiving an IDR coded picture, the decoder marks all pictures in the reference buffer as ‘unused for reference’. All subsequent transmitted slices can be decoded without reference to any frame decoded prior to the IDR picture. The first picture in a coded video sequence is always an IDR picture.

* 视频帧 Video Frame

视频是由一系列图像组成的动作序列，并且该序列中的每个图像都将在要显示的动作序列的时间轴中接替前一个图像。 这些静止图像称为视频帧。


每个视频帧之间的时间差越小，刷新率就越高，并且视频中的运动表现得越自然。

这是因为每秒有更多的视频帧要显示为动作序列的一部分，因此帧之间图像的变化较小，并且运动看起来更平滑。

Compression and media resilliency feature

* Error feedback mechanism
* Enhanced motion estimation
* Improved entropy coding
* Intra-prediction coding for I-frame
* 4*4 Display Channel Table (DCT)
* Network Abstraction Layer
* Gradual Decoder Refresh(GDR) frame
* Long-Term Reference Picture (LTRP) frame

* 错误反馈机制
* 增强的运动估计
* 改进的熵编码
* I帧的帧内预测编码
* 4 * 4 显示频道表（DCT）
* 网络抽象层
* 渐进式解码器刷新（GDR）帧
* 长期参考图片（LTRP）帧



Tools
=================================

* sips

sips - scriptable image processing system.
This tool is used to query or modify raster image files and ColorSync ICC profiles.
Its functionality can also be used through the "Image Events" AppleScript suite.

.. code-block::

    sips -s format bmp input.jpg --out output.bmp

Reference
==============
* `scikit-image <https://scikit-image.org/>`_
  
