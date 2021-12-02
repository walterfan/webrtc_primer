################################################
Interactive Connectivity Establishment
################################################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ =========================================
**Abstract** Interactive Connectivity Establishment 
**Authors**  Walter Fan
**Status**   WIP as draft
**Updated**  |date|
============ =========================================

.. |date| date::

.. contents::
   :local:


Ovewview
================
`RFC8445`_ Interactive Connectivity Establishment (ICE) 交互式连接建立是一个网络地址转换 NAT 穿透的协议


NAT
======================
NAT 是指路由器把本地私有子网IP地址转换称公网 IP 地址的过程。
ICE/STUN/TURN 主要是解决如何在各自内网中的客户端之间如何连接

根据最少限制性到最多限制性来排序可以分为：

* Full cone（全锥型）
* Address-restricted cone （地址限制型锥形）
* Port-restricted cone（端口限制型锥型）
* Symmetric（对称型）


Reference
================

* `RFC8445`_: Interactive Connectivity Establishment (ICE): A Protocol for Network Address Translator (NAT) Traversal 

* _RFC8445: https://datatracker.ietf.org/doc/html/rfc8445