########################
tcpdump
########################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** SoX
**Authors**  Walter Fan
**Status**   v1
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:


简介
=========================

This dumps everything from eth0 into a file with details useful with wireshark.

.. code-block::

    tcpdump -i eth0 -Xvnp -s0 -w /tmp/tcpdump.pcap

                     

To capture 10 instances of a particular mini-carousel:

.. code-block::
    
    tcpdump -i eth0 -Xvnp -c 10 -s 0 dst host 232.1.0.15

 

To capture all traffic to and from a particular QAM and save to a capture file:

.. code-block::

    tcpdump  -i eth1 -Xvnp -s 0 host 172.16.4.45 -w /tmp/QAMLongCap.pcap

                          

To see a particular port:

.. code-block::

    tcpdump -i eth0 port 677

                      

To capture 10 - 5 M files for discovery services:

.. code-block::

    tcpdump -ni eth0 -s0 udp dst port 13819 -c5 -w10 -w /tmp/wireshark.pcap

-G # will also set the time for the recording in seconds

-S will not convert the port number to the most commonly used assignment  (this means the host/dest will display as 10.18.11.20.995 instead of 10.18.11.20.pop3s)

Here is a good primer on TCPDump usage.  https://danielmiessler.com/study/tcpdump/

