################
WebRTC 的信令
################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref


.. contents::
    :local:


overview
==============
signal 在英语中有两个不同的意思，一是信令，一是信号，这里我们主要讲信令。

信令的意思是呼叫流程的控制，包括媒体通道的搭建，媒体参数的协商，媒体流的控制。

在 WebRTC 中，信令控制主要的协议是 4 个

1. `WebRTC 1.0`_: Real-Time Communication Between Browsers， 即浏览器之间的实时通信标准

2. `JSEP`_ (Javascript Session Establishment Protocol) ， 即 Javascript 会话建立协议。

3. `SDP`_ (Session Decscription Protocol), 即会话描述协议

4. `ICE`_ (Interactive Connectivity Establishment)， 即交互式连接建立协议

前两者主要是描述了如何通过浏览器提供的 API 实现实时的音视频通讯，主要的接口，实体和方法是通过 `WebIDL`_ 来定义的


WebIDL
==================
WebIDL 是一种接口定义语言，用来定义由浏览器实现的接口。`Web IDL`_ 是一个 IDL 变体，具有许多特性，允许更容易地指定 Web 平台中常见脚本对象的行为。

其中的 IDL Fragment 接口定义语言片段有如下类型的定义：

* interfaces
* partial interface definitions
* interface mixins
* partial mixin definitions
* callback functions
* callback interfaces
* namespaces
* partial namespace definitions
* dictionaries
* partial dictionary definitions
* typedefs
* includes statements


每个定义（匹配 Definition）前面都可以有一个扩展属性列表（匹配 ExtendedAttributeList），它可以控制如何在语言绑定中处理定义

reference
==============

* `Signaling and video calling`_

* `WebIDL Checker`_