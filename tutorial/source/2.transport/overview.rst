######################
WebRTC 传输概论
######################



.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref


.. contents::
    :local:


概论
============
WebRTC 进行传输最重要的要搞清楚两点：一是协商媒体传输通道， 二是协商媒体传输参数

* 协商媒体传输通道是通过 ICE(Interactive Connectiviby Establishment) 框架来实现的。

它综合运用了 STUN（Session Traversal Using Relays around NAT） 
和 TURN(Traversal Using Relays around NAT) 协议来

* 协商媒体传输参数是通过交换 SDP（Session Description Protocol）来实现的


所以，针对这两点，在客户端会维护两个状态机机

1. Signal State Machine 信令状态机

.. raw:: html

    <object data="../_static/peerstates.svg" type="image/svg+xml"></object>

2. ICE Connection State Machine 互通连接状态机

.. raw:: html

    <object data="../_static/icetransportstate.svg" type="image/svg+xml"></object>