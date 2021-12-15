/*
some utilities got from https://github.com/cisco/libsrtp
*/

#ifndef MEDIA_UTIL_H
#define MEDIA_UTIL_H

#include <cstdint>
#include <string>
#include <fstream>

#ifndef WORDS_BIGENDIAN

typedef struct {
  uint16_t cc:4;	/* CSRC count             */
  uint16_t x:1;		/* header extension flag  */
  uint16_t p:1;		/* padding flag           */
  uint16_t version:2;	/* protocol version       */
  uint16_t pt:7;	/* payload type           */
  uint16_t m:1;		/* marker bit             */
  uint16_t seq;		/* sequence number        */
  uint32_t ts;		/* timestamp              */
  uint32_t ssrc;	/* synchronization source */
} srtp_hdr_t;

#else /*  BIG_ENDIAN */

typedef struct {
  uint16_t version:2;	/* protocol version       */
  uint16_t p:1;		/* padding flag           */
  uint16_t x:1;		/* header extension flag  */
  uint16_t cc:4;	/* CSRC count             */
  uint16_t m:1;		/* marker bit             */
  uint16_t pt:7;	/* payload type           */
  uint16_t seq;		/* sequence number        */
  uint32_t ts;		/* timestamp              */
  uint32_t ssrc;	/* synchronization source */
} srtp_hdr_t;

#endif

typedef struct {
  uint16_t profile_specific;    /* profile-specific info               */
  uint16_t length;              /* number of 32-bit words in extension */
} srtp_hdr_xtnd_t;

#ifndef WORDS_BIGENDIAN

typedef struct {
  unsigned char rc:5;		/* reception report count */
  unsigned char p:1;		/* padding flag           */
  unsigned char version:2;	/* protocol version       */
  unsigned char pt:8;		/* payload type           */
  uint16_t len;			/* length                 */
  uint32_t ssrc;	       	/* synchronization source */
} srtcp_hdr_t;

typedef struct {
  unsigned int index:31;    /* srtcp packet index in network order! */
  unsigned int e:1;         /* encrypted? 1=yes */
  /* optional mikey/etc go here */
  /* and then the variable-length auth tag */
} srtcp_trailer_t;


#else /*  BIG_ENDIAN */

typedef struct {
  unsigned char version:2;	/* protocol version       */
  unsigned char p:1;		/* padding flag           */
  unsigned char rc:5;		/* reception report count */
  unsigned char pt:8;		/* payload type           */
  uint16_t len;			/* length                 */
  uint32_t ssrc;	       	/* synchronization source */
} srtcp_hdr_t;

typedef struct {
  unsigned int version:2;  /* protocol version                     */
  unsigned int p:1;        /* padding flag                         */
  unsigned int count:5;    /* varies by packet type                */
  unsigned int pt:8;       /* payload type                         */
  uint16_t length;         /* len of uint32s of packet less header */
} rtcp_common_t;

typedef struct {
  unsigned int e:1;         /* encrypted? 1=yes */
  unsigned int index:31;    /* srtcp packet index */
  /* optional mikey/etc go here */
  /* and then the variable-length auth tag */
} srtcp_trailer_t;

#endif

std::string dump_rtp_packet(uint8_t* packet, uint32_t packet_len);

std::string dump_rtcp_packet(uint8_t* packet, uint32_t packet_len);

int dump_rtp_to_file(uint8_t* packet, uint32_t packet_len, std::ofstream* pOfs);

#endif