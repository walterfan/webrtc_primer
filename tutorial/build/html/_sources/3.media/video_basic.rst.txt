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

.. code-block:: python

    import cv2
    img = cv2.imread("../../material/xjl.png")
    print(img)



YUV
------------------------

Y 指亮度信号
U 和 V 指色度信号（色相加纯度）: 它指某种颜色与同一亮度的白色之间的差别

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



Tools
=================================

* sips

sips - scriptable image processing system.
This tool is used to query or modify raster image files and ColorSync ICC profiles.
Its functionality can also be used through the "Image Events" AppleScript suite.

.. code-block::

    sips -s format bmp input.jpg --out output.bmp