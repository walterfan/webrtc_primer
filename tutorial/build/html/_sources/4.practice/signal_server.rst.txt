#################
Signal Server
#################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** Signal Server
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents:: Contents
   :local:

概述
==============
Signal Server 即我们通常所说的信令服务器，在 WebRTC 应用中它通常是一个 Web Server, 提供 Web App 的访问和下载。而且，它主要还有如下功能

1. 用户的注册和登录
2. SDP 的交换
3. ICE 候选者的交换
4. 通信实体的管理，例如如下实体创建，结束，加入，离开
   - 会议
   - 会话
   - 与会者
   - 设备





示例
==============

nginx + flask + mysql


Reference
==============