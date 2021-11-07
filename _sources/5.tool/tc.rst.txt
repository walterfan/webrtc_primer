########################
Linux Traffic Control
########################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** Linux Traffic Control
**Authors**  Walter Fan
**Status**   v1
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:


简介
=========================

常用命令
=========================

* 延迟 100 ms:    :code:`tc qdisc add dev eth0 root netem delay 100ms`

* 延迟 100ms ± 10ms (90 ~ 110 ms ):    :code:`tc qdisc add dev eth0 root netem delay 100ms 10ms`

* 随机丢包 1%:    :code:`tc qdisc add dev eth0 root netem loss 1%``

* 模拟包重复:    :code:`tc qdisc add dev eth0 root netem duplicate 1%``

* 模拟数据包损坏:    :code:`tc qdisc add dev eth0 root netem corrupt 0.2%``

* 模拟数据包乱序：    :code:`tc qdisc change dev eth0 root netem delay 10ms reorder 25% 50%``

* 查看已经配置的网络条件：   :code:`tc qdisc show dev eth0`

* 删除网卡上面的相关配置:    :code:`tc qdisc del dev enp0s3 root`

* 对指定 ip 做限制:

.. code-block::

    tc qdisc del dev enp0s3 root

    tc qdisc add dev enp0s3  root handle 1: prio

    tc filter add dev enp0s3 parent 1:0 protocol ip prio 1 u32 match ip dst 172.27.25.3 flowid 2:1

    tc qdisc add dev enp0s3  parent 1:1 handle 2: netem delay 1500ms  loss 1%

参考资料
==========================
* https://netbeez.net/blog/how-to-use-the-linux-traffic-control/
* https://man7.org/linux/man-pages/man8/tc.8.html