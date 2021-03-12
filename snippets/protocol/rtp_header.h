#ifndef RTP_HEADER_H
#define RTP_HEADER_H

#include <stdint.h>

#ifndef WORDS_BIGENDIAN

typedef struct {
    unsigned char cc : 4;      /* CSRC count             */
    unsigned char x : 1;       /* header extension flag  */
    unsigned char p : 1;       /* padding flag           */
    unsigned char version : 2; /* protocol version       */
    unsigned char pt : 7;      /* payload type           */
    unsigned char m : 1;       /* marker bit             */
    uint16_t seq;              /* sequence number        */
    uint32_t ts;               /* timestamp              */
    uint32_t ssrc;             /* synchronization source */
} srtp_hdr_t;

#else /*  BIG_ENDIAN */

typedef struct {
    unsigned char version : 2; /* protocol version       */
    unsigned char p : 1;       /* padding flag           */
    unsigned char x : 1;       /* header extension flag  */
    unsigned char cc : 4;      /* CSRC count             */
    unsigned char m : 1;       /* marker bit             */
    unsigned char pt : 7;      /* payload type           */
    uint16_t seq;              /* sequence number        */
    uint32_t ts;               /* timestamp              */
    uint32_t ssrc;             /* synchronization source */
} srtp_hdr_t;

#endif


#ifndef WORDS_BIGENDIAN

typedef struct {
    unsigned char rc : 5;      /* reception report count */
    unsigned char p : 1;       /* padding flag           */
    unsigned char version : 2; /* protocol version       */
    unsigned char pt : 8;      /* payload type           */
    uint16_t len;              /* length                 */
    uint32_t ssrc;             /* synchronization source */
} srtcp_hdr_t;

typedef struct {
    unsigned int index : 31; /* srtcp packet index in network order!  */
    unsigned int e : 1;      /* encrypted? 1=yes                      */
                             /* optional mikey/etc go here            */
                             /* and then the variable-length auth tag */
} srtcp_trailer_t;

#else /*  BIG_ENDIAN */

typedef struct {
    unsigned char version : 2; /* protocol version       */
    unsigned char p : 1;       /* padding flag           */
    unsigned char rc : 5;      /* reception report count */
    unsigned char pt : 8;      /* payload type           */
    uint16_t len;              /* length                 */
    uint32_t ssrc;             /* synchronization source */
} srtcp_hdr_t;

typedef struct {
    unsigned int e : 1;      /* encrypted? 1=yes                      */
    unsigned int index : 31; /* srtcp packet index                    */
                             /* optional mikey/etc go here            */
                             /* and then the variable-length auth tag */
} srtcp_trailer_t;

#endif

#endif