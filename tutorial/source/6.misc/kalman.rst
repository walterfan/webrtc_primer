###################
卡尔曼滤波笔记
###################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** 卡尔曼滤波笔记
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

简介
=====================

卡尔曼滤波（Kalman filtering）是一种算法，用于在不确定的观测数据中估算出最优结果的算法。它利用线性系统状态方程，通过系统输入输出观测数据，对系统状态进行最优估计。由于观测数据中包括系统中的噪声和干扰的影响，所以最优估计也可看作是滤波过程。

数据滤波是去除噪声还原真实数据的一种数据处理技术，Kalman滤波在测量方差已知的情况下能够从一系列存在测量噪声的数据中，估计动态系统的状态。由于它便于计算机编程实现，并能够对现场采集的数据进行实时的更新和处理，Kalman滤波是目前应用最为广泛的滤波方法，在通信，导航，制导与控制等多领域得到了较好的应用。


.. math::

  最优结果 = 估算值 + \frac{估计误差}{估计误差 + 测量误差} \times (测量值 - 估算值)

  最优结果_n = 最优估计值_{n-1} + \frac{1}{n} \times (测量值_n - 最优结果_{n-1})
  
  
.. math::

  最优估计值_n = 最优估计值_{n-1} + K_n \times (测量值_n = 最优估计值_{n-1})

如果测量得非常准，:math:`K_n = 1， 最优估计值_n = 测量值_n`

如果估计得非常准，:math:`K_n = 0， 最优估计值_n = 最优估计值值_{n-1}`


K_n 称为卡尔曼增益

.. math::

  K_n = \frac{最优估计值误差_{n_1}}{最优估计值误差_{n_1} + 测量值误差_n}

.. math::

  最优估计值_n = 最优估计值_{n-1} + K_n \times (测量值_n - 最优估计值_{n-1})

.. math::

  最优估计值误差_{n-1} = (1 - K_{n-1}) \times 最优估计值误差_{n-2}


写一个 Python 程序来根据测量值，测量误差，体重估计来得到一个最优估计值
总共测量了半个月的体重，体重秤误差为 3kg, 最终估计 79.74，接近真实体重 80kg

.. code-block::

  %matplotlib inline
  import matplotlib.pyplot as plt
  plt.style.use('seaborn-whitegrid')
  import numpy as np
  from tabulate import tabulate
  measure_count = 15
  measure_values = [81,83,79,78,81,79,80,78,81,79,80,78,81,79,82]
  measure_error = [3] * 15
  pre_estimate_value = 75
  pre_estimate_error = 5
  estimate_values = np.zeros(measure_count)
  estimate_errors = np.zeros(measure_count)
  K_values = np.zeros(measure_count)

  for i in range(measure_count):
      # K_n = \frac{最优估计值误差_{n_1}}{最优估计值误差_{n_1} + 测量值误差_n}
      K_values[i] = pre_estimate_error/(pre_estimate_error + measure_error[i])
      # 最优估计值_n = 最优估计值_{n-1} + K_n \times (测量值_n - 最优估计值_{n-1})
      estimate_values[i] = pre_estimate_value + K_values[i] * (measure_values[i] - pre_estimate_value)
      # 最优估计值误差_{n-1} = (1 - K_{n-1}) \times 最优估计值误差_{n-2}
      estimate_errors[i] = (1 - K_values[i]) * pre_estimate_error

      pre_estimate_value = estimate_values[i]
      pre_estimate_error = estimate_errors[i]
      
  #print("K_values=",K_values)
  #print("estimate_values=", estimate_values)
  #print("estimate_errors=", estimate_errors)

  table = [['#', 'measure_values', 'estimate_values', "K_values"]]
  for i in range(measure_count):
      table.append([i, measure_values[i], estimate_values[i], K_values[i]])
  print(tabulate(table, headers='firstrow', tablefmt='fancy_grid'))

  fig = plt.figure(figsize=[9,5])
  ax = plt.axes()

  x = np.linspace(1, 15, 15)
  _ = ax.plot(x, measure_values, label="measure_values", color='red')
  _ = ax.plot(x, estimate_values, label="estimate_values", color='green')

  _=plt.legend(loc='upper right')
  plt.show()

预备知识
====================
* 微积分

* 线性代数
  - 向量，矩阵，矩阵运算

* 线性系统
  
.. math::

    X = Ax + Bu
    y = Cx

* 非线性系统

.. math::

    X = f(x, u, 2)
    y = h(x, v)

w 表示过程噪声
v 表示测量噪声

* 离散化
* 仿真
* 稳定性
* 能控性和能观性

概率论
--------------------
* 概率
  - 贝叶斯公式
  - 概率分布函数 PDF(Probability Distribution Function)
  - 概率密度函数 PDF(Probability Density Function), 即上述函数的微分
* 随机变量
  - 期望也就是随机变量的平均值 :math:`E(X) = \frac{1}{n} \displaystyle \sum_{n-1}^{m} A_i n_i`
  - 方差，偏度
  - 分布，正态分布
* 随机变量的函数变换
* 随机过程
* 白噪声和有色噪声

最小二乘估计
--------------------
* 常量估计
* 加权及递推最小二乘估计

状态和协方差
--------------------
* 离散时间系统
* 抽样数据系统
* 连接时间系统

术语
====================
* 随机变量是一个定义在样本空间上的实值函数，把样本点映射成一个实数。每个样本点都有不同的概率出现，意味着随机变量的取值也是随机的，并且服从某个分布(distribution)。

* 一个随机变量 [公式] 的distribution是由 累积分布函数(cumulative distribution function,CDF)，或者简称distribution function来刻画的，是以一个实数为自变量的函数

* 对于连续取值的随机变量，distribution function可以由概率密度函数(probability density functioin,PDF) 来表示

* 数学期望(expected value)
* 方差(variance): 
  - The variance is the average of the squared deviations from the mean
  - i.e., var = mean(x), where x = abs(a - a.mean())**2.

* 均方误差：它是"误差"的平方的期望值（误差就是每个估计值与真实值的差），也就是多个样本的时候，均方误差等于每个样本的误差平方再乘以该样本出现的概率的和。

* 方差：方差是描述随机变量的离散程度，是变量离期望值的距离。
  
* 协方差: 

.. code-block::

  numpy.cov(m, y=None, rowvar=True, bias=False, ddof=None, fweights=None, aweights=None, *, dtype=None)
  
  Estimate a covariance matrix, given data and weights.


离散卡尔曼滤波
====================


* 状态方程

.. math::
  
  x_k = A x_{k-1} + Bu_k + w_k

* 观测方程

.. math::
  
  y_k = Cx_k + v_k