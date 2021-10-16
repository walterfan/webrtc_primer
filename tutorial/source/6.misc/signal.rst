#################
信号处理基础
#################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** WebRTC Signal Process
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

信号
=========

信号代表一个随时间变化的量。这个定义很抽象，我们用声音信号来作为一个更具体的例子。 
声音是空气压力的变化产生的，声音信号则代表着空气压力随时间的变化。


信号的分类
----------------
* 按其表示方式可分为模拟信号和数字信号
  
* 按其连续性可分为连续信号和离散信号

* 按其随机性可分为确定信号和随机信号

- 其中确定信号按其周期性还可分为周期性信号和非周期性信号
- 随机信号按是否平稳可分为平稳随机信号和非平稳随机信号




以语音信号为例

.. code-block::

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



傅立叶变换 FT
================

以时间为自变量的信号和以频率为自变量的频谱函数之间的某种变换关系

连续傅立叶变换 FT

离散傅立叶变换 DFT

快速傅立叶变换 FFT


离散余弦变换 DCT
================

离散余弦变换 (Discrete Cosine Transform)本质上也是离散傅里叶变换 (Discrete Fourier Transform)，但是只有实数部分。 有这样一个性质：如果信号 在给定区间内满足狄利赫里条件，且为实对称函数，则可以展开成仅含有余弦项的傅里叶级数，即离散余弦变换。


参考资料
=================

* `傅里叶变换、拉普拉斯变换、Z 变换的联系是什么？`_

.. _傅里叶变换、拉普拉斯变换、Z 变换的联系是什么？:  https://www.zhihu.com/question/22085329/answer/774074211


* `傅里叶变换推导详解`_
  
.. _傅里叶变换推导详解: https://zhuanlan.zhihu.com/p/77345128

* `离散傅里叶变换DFT详解及应用`_

.. _离散傅里叶变换DFT详解及应用: https://zhuanlan.zhihu.com/p/77347644