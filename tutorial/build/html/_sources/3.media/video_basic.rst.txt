###############
Video Basic
###############

.. contents::
   :local:


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
--------------

1. 色相：也称色调，由光波波长的长短决定的视觉我，是区别不同颜色的标准
2. 亮度：lightness, brightness, 反映颜色的明暗程度
3. 纯度: purity, saturation，反映颜色的深浅程度或者鲜艳程度


颜色模型
==================

RGB
-------------------------

.. code-block:: python

    import cv2
    img = cv2.imread("../../material/xjl.png")
    print(img)



YUV
------------------------

Y 指亮度信号
U 和 V 指色度信号（色相加纯度）: 它指某种颜色与同一亮度的白色之间的差别

.. code-block:: c

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

图像压缩
========================

RGB24 -> YUV420

* 帧内压缩
* 帧间压缩


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