#################
netcat
#################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** netcat
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

简介
====================
netcat 


Samples
====================

chat
--------------------
.. code-block::

    nc -l 2008
    nc 127.0.0.1 2008


file transfer
--------------------
.. code-block::

    # Server
    nc -l 1567 < file.txt

    # Client
    nc -n 172.31.100.7 1567 > file.txt