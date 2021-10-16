#################
数字信号处理
#################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** DSP
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

信号是什么
==============
信号就是随一个参数变化的某种物理量，例如电压电流信号，语音信号，振动信号，等等

我们在实时通信中所说的信号代表一般都是指一个随时间变化的量。

以声音信号为例，声音是空气压力的变化产生的，声音信号则代表着空气压力随时间的变化。


信号的分类
----------------
* 按其表示方式可分为模拟信号和数字信号

* 按其连续性可分为连续信号和离散信号

* 按其随机性可分为确定信号和随机信号

- 其中确定信号按其周期性还可分为周期性信号和非周期性信号
- 随机信号按是否平稳可分为平稳随机信号和非平稳随机信号




以语音信号为例

.. code-block:: python

    import matplotlib.pyplot as plt
    import numpy as np
    import scipy.io

    from os.path import dirname, join as pjoin
    from scipy.io import wavfile
    from scipy import signal


    wav_fname = "../../material/StarWars3.wav"
    sample_rate, samples = wavfile.read(wav_fname)

    length = samples.shape[0] / sample_rate

    print(f"length = {length}s, sample_rate={sample_rate}")
    if len(samples.shape) > 1:
        print(f"number of channels = {samples.shape[1]}")

    fig, axs = plt.subplots(2)
    fig.suptitle('Wave file analysiis')

    time = np.linspace(0., length, samples.shape[0])
    axs[0].plot(time, samples[:], label="1st channel")
    axs[0].legend()
    axs[0].set(xlabel='Time [s]', ylabel='Amplitude')


    frequencies, times, Zxx = signal.stft(samples, fs=sample_rate,  nperseg=1000)

    cmap = plt.get_cmap('viridis')
    axs[1].pcolormesh(times, frequencies, np.abs(Zxx), cmap=cmap)
    axs[1].set(xlabel='Time [sec]', ylabel='Frequency [Hz]')

    plt.show()


信号处理中用到的统计值
==============================================

* 平均值 mean

.. math::

    \bar{\mu}=\frac{1}{N}\sum_{i=0}^{N-1} x_{i}

* 方差 var

.. math::

    \sigma^2 = \frac{1}{N-1}\sum_{i = 0}^{N-1} {\left( {x_i - \bar \mu} \right)^2 }

* 标准差 std

.. math::

    \sigma = \sqrt {\frac{1}{N-1}\sum_{i = 0}^{N-1} {\left( {x_i - \bar \mu} \right)^2 } }

* 均方根 rms

.. math::

     RMS = \sqrt{\frac{1}{n}\Sigma_{i=1}^{n}{x^2}}

.. code-block::

    import numpy as np

    my_array = np.array([ [1, 2], [3, 4] ])

    print(np.mean(my_array, axis = 0))        #Output : [ 2.  3.]
    print(np.mean(my_array, axis = 1))        #Output : [ 1.5  3.5]
    print(np.mean(my_array)                  #Output : 2.5

    print(np.var(my_array, axis = 0))         #Output : [ 1.  1.]
    print(np.var(my_array, axis = 1))         #Output : [ 0.25  0.25]
    print(np.var(my_array))                   #Output : 1.25

    print(np.std(my_array, axis = 0))         #Output : [ 1.  1.]
    print(np.std(my_array, axis = 1))         #Output : [ 0.5  0.5]
    print(np.std(my_array))                   #Output : 1.11803398875
    #root mean square:  sum square, mean and sqrt
    rms = np.sqrt(np.mean(my_array**2))

什么是数字信号处理
============================
数字信号处理是利用计算机或专用设备，以数值计算的方法对信号进行采集，变换，合成与识别等加工处理，
借以达到提取信息和应用信息的目的。

* 信号分析： 对时域，频域及其他变换域内的特性进行分析
* 信息处理： 对信号进行处理，以利于应用，例如压缩，滤波，等等


数字信号处理所牵涉到的理论
---------------------------------------------
* 通信理论
* 数值分析
* 概率统计
* 模拟信号处理
* 决策理论
* 数字电子学
* 模拟电子学

数字信号处理在实时通信中的应用
---------------------------------------------
* 语音数据压缩
* 视频数据压缩
* 回声消除
* 信号增强或减弱
* 降噪
* 滤波
* 语音合成
* 语音识别



数字信号处理的关键技术
=============================================

经典信号处理
---------------------------------------------
时频分析
频频分析

* `傅立叶变换`_ FT(Fourier Transform)

现代信号处理
----------------------------

* 短时傅立叶变换 STFT(Short Time Fourier Transform)
* 窗函数：高斯窗，汉明窗
* 小波分析和变换 wavelet
* 希尔伯特-黄变换HHT（Hilbert-Huang Transform）
  
  经验模态分解（Empirical Mode Decomposition，简称 EMD）和 Hilbert 变换（Hilbert transform，简称 HT）两个内容构成
  
随机信号处理
----------------------------
* 自适应滤波器

  - 最小均方自适应滤波器（LMS，Least Mean Square）
  - 归一化最小均方自适应滤波器（NLMS，Normalized Least Mean Square)




.. _傅立叶变换: dsp_ft.html