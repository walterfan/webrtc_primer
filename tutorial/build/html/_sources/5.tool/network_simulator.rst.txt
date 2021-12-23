######################
Network Simulator
######################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** Network Simulator
**Authors**  Walter Fan
**Category** Learning note
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

简介
====================
ns-3 is a discrete-event network simulator for Internet systems, targeted primarily for research and educational use. 
ns-3 is free, open-source software, licensed under the GNU GPLv2 license, and maintained by a worldwide community.


安装
====================

.. code-block::

    wget https://www.nsnam.org/release/ns-allinone-3.35.tar.bz2
    tar xjf ns-allinone-3.35.tar.bz2
    ./build.py --enable-examples --enable-tests
    ./test.py

测试
=====================

.. code-block::

    ./waf --run hello-simulator

waf usage
---------------------

waf is a python build tool

Conceptual Overview
==========================

参考资料
===============
* https://www.nsnam.org/docs/release/3.35/tutorial/html/getting-started.html#getting-started