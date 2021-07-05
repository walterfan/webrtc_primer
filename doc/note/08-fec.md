# Forward Error Correction


# Terminology

* Media Payload: The raw, unprotected user data that are transmitted
from the sender.  The media payload is placed inside of an RTP
packet.

* Media Header: The RTP header for the packet containing the media
payload.

* Media Packet: The combination of a media payload and media header is
called a media packet.

* FEC Packet: The FEC algorithms at the transmitter take the media
packets as an input.  They output both the media packets that they
are passed, and newly generated packets called FEC packets, which
contain redundant media data used for error correction.  The FEC
packets are formatted according to the rules specified in this
document.

* FEC Header: The header information contained in an FEC packet.

* FEC Level Header: The header information contained in an FEC packet
for each level.

* FEC Payload: The payload of an FEC packet.  It may be divided into
multiple levels.

* Associated: A FEC packet is said to be "associated" with one or more
media packets (or vice versa) when those media packets are used to
generate the FEC packet (by use of the exclusive-or operation).  It
refers to only those packets used to generate the level 0 FEC
payload, if not explicitly stated otherwise.


# Reference

* [RTP Payload Format for Generic Forward Error Correction](http://www.rfcreader.com/#rfc5109)