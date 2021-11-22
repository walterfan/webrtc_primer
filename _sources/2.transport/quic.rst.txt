########################
QUIC 协议
########################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** QUIC protocol
**Authors**  Walter Fan
**Status**   WIP as draft
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

简介
=======================================
QUIC provides applications with flow-controlled streams for structured communication, low-latency connection establishment, and network path migration.  
   
QUIC includes security measures that ensure  confidentiality, integrity, and availability in a range of deployment circumstances.  

Accompanying documents describe the integration of TLS for key negotiation, loss detection, and an exemplary congestion control algorithm.


协议文档结构
=======================================

Streams are the basic service abstraction that QUIC provides.

* Section 2 describes core concepts related to streams,
* Section 3 provides a reference model for stream states, and
* Section 4 outlines the operation of flow control.

Connections are the context in which QUIC endpoints communicate.

* Section 5 describes core concepts related to connections,
* Section 6 describes version negotiation,
* Section 7 details the process for establishing connections,
* Section 8 describes address validation and critical denial-of-service mitigations,
* Section 9 describes how endpoints migrate a connection to a new network path,
* Section 10 lists the options for terminating an open connection, and
* Section 11 provides guidance for stream and connection error handling.

Packets and frames are the basic unit used by QUIC to communicate.

* Section 12 describes concepts related to packets and frames,
* Section 13 defines models for the transmission, retransmission, and acknowledgment of data, and
* Section 14 specifies rules for managing the size of datagrams carrying QUIC packets.

Finally, encoding details of QUIC protocol elements are described in:

* Section 15 (versions),
* Section 16 (integer encoding),
* Section 17 (packet headers),
* Section 18 (transport parameters),
* Section 19 (frames), and
* Section 20 (errors).



Reference
=======================================
* https://datatracker.ietf.org/doc/html/rfc9000


* `RFC 9000 QUIC: A UDP-Based Multiplexed and Secure Transport <https://www.rfc-editor.org/rfc/rfc9000.html>`_
* `RFC 9001 Using TLS to Secure QUIC <https://www.rfc-editor.org/rfc/rfc9001.html>`_
* `RFC 9002 QUIC Loss Detection and Congestion Control  <https://www.rfc-editor.org/rfc/rfc9002.html>`