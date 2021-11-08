###################
数理基础
###################

数学
======================

* 极限
* 微分中值定理
* 向量代数与场论
* 傅立叶级数及展开
* 泛函分析及变分法
* 概率论
* 统计推断
* 子带编码与小波变换
* 正交变换与图像压缩
* 高斯分布

概率统计
-------------------------
* 期望: 数学期望实际上是随机变量取值的加权平均（其权是取该值的概率），所以数学期望也称为均值。

.. math::

  E\xi = \sum_k x_k p_k 

* 方差: 方差是随机变量相对于它的平均值的距离平方的加权均值

.. math::

  D\xi = \sum_k(x_k - E\xi)^2 p_k

* 协方差

 对于两个随机变量 :math:`\xi` 和 :math:`\eta`, 它们的协方差为

.. math::

  cov(\xi, \eta) = E(\xi - E\xi)(\eta - E\eta) = E\xi\eta - E\xi E\eta

和相关系数

.. math::

  \rho(\xi, \eta) = \frac{cov(\xi, \eta)}{\sqrt{D\xi}\sqrt{D\eta}} 


傅立叶转换
----------------------
.. math::
   :name: Fourier transform

   (\mathcal{F}f)(y)
    = \frac{1}{\sqrt{2\pi}^{\ n}}
      \int_{\mathbb{R}^n} f(x)\,
      e^{-\mathrm{i} y \cdot x} \,\mathrm{d} x.