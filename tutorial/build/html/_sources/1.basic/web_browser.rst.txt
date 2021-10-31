################################
Web Browser for RTC
################################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** Web Browser
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:


简介
=========================



Browser Model
---------------------------

.. code-block::

                     +------------------------+  On-the-wire
                     |                        |  Protocols
                     |      Servers           |--------->
                     |                        |
                     |                        |
                     +------------------------+
                                 ^
                                 |
                                 |
                                 | HTTPS/
                                 | WebSockets
                                 |
                                 |
                   +----------------------------+
                   |    JavaScript/HTML/CSS     |
                   +----------------------------+
                Other  ^                 ^ RTC
                APIs   |                 | APIs
                   +---|-----------------|------+
                   |   |                 |      |
                   |                 +---------+|
                   |                 | Browser ||  On-the-wire
                   | Browser         | RTC     ||  Protocols
                   |                 | Function|----------->
                   |                 |         ||
                   |                 |         ||
                   |                 +---------+|
                   +---------------------|------+
                                         |
                                         V
                                    Native OS Services

                          Figure 1: Browser Model


Browser RTC Trapezoid
----------------------------

.. code-block::

           +-----------+                  +-----------+
           |   Web     |                  |   Web     |
           |           |                  |           |
           |           |------------------|           |
           |  Server   |  Signaling Path  |  Server   |
           |           |                  |           |
           +-----------+                  +-----------+
                /                                \
               /                                  \ Application-defined
              /                                    \ over
             /                                      \ HTTPS/WebSockets
            /  Application-defined over              \
           /   HTTPS/WebSockets                       \
          /                                            \
    +-----------+                                +-----------+
    |JS/HTML/CSS|                                |JS/HTML/CSS|
    +-----------+                                +-----------+
    +-----------+                                +-----------+
    |           |                                |           |
    |           |                                |           |
    |  Browser  |--------------------------------|  Browser  |
    |           |          Media Path            |           |
    |           |                                |           |
    +-----------+                                +-----------+

                      Figure 2: Browser RTC Trapezoid


Web browser RTC functionality
====================================

* Data transport:  For example, TCP and UDP, and the means to securely
      set up connections between entities, as well as the functions for
      deciding when to send data: congestion management, bandwidth
      estimation, and so on.

* Data framing:  RTP, the Stream Control Transmission Protocol (SCTP),
    DTLS, and other data formats that serve as containers, and their
    functions for data confidentiality and integrity.

* Data formats:  Codec specifications, format specifications, and
    functionality specifications for the data passed between systems.
    Audio and video codecs, as well as formats for data and document
    sharing, belong in this category.  In order to make use of data
    formats, a way to describe them (e.g., a session description) is
    needed.

* Connection management:  For example, setting up connections, agreeing
    on data formats, changing data formats during the duration of a
    call.  SDP, SIP, and Jingle/XMPP belong in this category.

* Presentation and control:  What needs to happen in order to ensure
    that interactions behave in an unsurprising manner.  This can
    include floor control, screen layout, voice-activated image
    switching, and other such functions, where part of the system
    requires cooperation between parties.  Centralized Conferencing
    (XCON) [RFC6501] and Cisco/Tandberg's Telepresence
    Interoperability Protocol (TIP) were some attempts at specifying
    this kind of functionality; many applications have been built
    without standardized interfaces to these functions.

* Local system support functions:  Functions that need not be specified
    uniformly, because each participant may implement these functions
    as they choose, without affecting the bits on the wire in a way
    that others have to be cognizant of.  Examples in this category
    include echo cancellation (some forms of it), local authentication
    and authorization mechanisms, OS access control, and the ability
    to do local recording of conversations.

参考资料
=========================
* `RFC8825`_: Overview: Real-Time Protocols for Browser-Based Applications