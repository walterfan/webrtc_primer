###################
概率与统计
###################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** 概率与统计
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

Overview
=====================

* 平均值

.. math::

    \mu =\frac{1}{N}\sum_{0}^{n-1}x_i  

* 标准差和方差

.. math::

    \sigma ^ 2 = \frac{1}{N-1} \sum_{i=0}^{N-1}(x_i - \mu)^2  

标准差衡量的是信号离平均值有多远，方差衡量的是这种偏离的功率。
对于连续统计，方差可由如下公式计算：

.. math::

    \sigma ^ 2 = \frac{1}{N-1} \left [ \sum_{i=0}^{N-1} x_i^2 - \frac{1}{N}\left ( \sum_{i=0}^{N-1}  \right ) ^2   \right ]  

* 信噪比 SNR :math:`=\frac{\mu}{\sigma}`

* 直方图 Histgram, 
  
  假设 M 是每个采样点可能取值的数目，可用 :math:`H_i` 来表示直方图， i 在 0 到 M - 1 之间，:math:`H_{50}` 表示采样值是50的采样点的个数，采样点越多，图像就越平滑，直方图的统计噪声与所用采样点数的平方根成反比
  
直方图中所有值的总和等于信号的采样点总数：

  .. math::

      N = \sum_{i=0}^{M-1}H_i

利用直方图来计算平均值和标准差的公式如下

.. math::

    \mu =\frac{1}{N}\sum_{0}^{M-1}i H_i


* 累积分布函数 CDF（Cumulative Distribution Function），又叫分布函数，是概率密度函数的积分，能完整描述一个实随机变量X的概率分布。

对于随机变量 X, 如下定义的函数 F(x) 称为累积分布函数，简称分布函数，它等于该随机变量小于等于 x 的概率

.. math::
    
    F(x) = P \{ X \le x \} , - \infty < x < + \infty

* 概率质量函数 PMF（probability mass function）

对于一个离散型随机变量 X , 定义它在各个特定取值上的概率为概率质量函数 PMF

.. math::

    f(x) = P(X = x)

* 概率密度函数 PDF(probability density function） 也称概率分布函数

对于一个连续型随机变量 X 的累积分布函数 F(x), 如果存在一个定义在实轴上的非负函数 f(x), 使得对于任意实数 x, 有下式成立，则称其为概率密度函数 PDF(probability density function）

.. math::

    F(x) = \int_{-\infty }^{x} f(t)dt



协方差
--------------------

设随机变量 X, Y 的期望值分别为 :math:`\mu \nu`, 此时 X 和 Y 的协方差 convariance 定义如下

.. math::

    Cov [ X, Y ]  \equiv  E [(X - \mu) (Y - \nu)]