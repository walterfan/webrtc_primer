##############
MediaSoup
##############


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** MediaSoup
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

Overview
===============

Mediasoup is a opensource project, its server and client side libraries are designed to accomplish with the following goals:

* Be a SFU (Selective Forwarding Unit).
* Support both WebRTC and plain RTP input and output.
* Be a Node.js module in server side.
* Be a tiny JavaScript and C++ libraries in client side.
* Be minimalist: just handle the media layer.
* Be signaling agnostic: do not mandate any signaling protocol.
* Be super low level API.
* Support all existing WebRTC endpoints.
* Enable integration with well known multimedia libraries/tools.


Example
================


* https://github.com/versatica/mediasoup-demo


.. code-block:: bash

    $ git clone https://github.com/versatica/mediasoup-demo.git
    $ cd mediasoup-demo
    $ git checkout v3




Reference
===============

* `MediaSoup offical site`_

.. _MediaSoup offical site: https://mediasoup.org/