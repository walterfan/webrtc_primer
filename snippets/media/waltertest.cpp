#include <arpa/inet.h>
#ifdef __MACH__
#include <machine/endian.h>
#elif defined(__FreeBSD__)
#include <sys/endian.h>
#else
#include <endian.h>
#endif
#include <inttypes.h>
#include <string.h>

#include <arpa/inet.h>
#ifdef __MACH__
#include <machine/endian.h>
#elif defined(__FreeBSD__)
#include <sys/endian.h>
#else
#include <endian.h>
#endif
#include <inttypes.h>
#include <stdint.h>
#include <string.h>
#include <iostream>
#include <string>

using namespace std;

/*! \brief RTCP Packet Types (http://www.networksorcery.com/enp/protocol/rtcp.htm) */
typedef enum {
    RTCP_FIR = 192,
    RTCP_SR = 200,
    RTCP_RR = 201,
    RTCP_SDES = 202,
    RTCP_BYE = 203,
    RTCP_APP = 204,
    RTCP_RTPFB = 205,
    RTCP_PSFB = 206,
    RTCP_XR = 207,
} rtcp_type;
typedef rtcp_type janus_rtcp_type;


/*! \brief RTCP Header (http://tools.ietf.org/html/rfc3550#section-6.1) */
typedef struct rtcp_header
{
#if __BYTE_ORDER == __BIG_ENDIAN
	uint16_t version:2;
	uint16_t padding:1;
	uint16_t rc:5;
	uint16_t type:8;
#elif __BYTE_ORDER == __LITTLE_ENDIAN
	uint16_t rc:5;
	uint16_t padding:1;
	uint16_t version:2;
	uint16_t type:8;
#endif
	uint16_t length:16;
} rtcp_header;


/*! \brief RTCP Sender Information (http://tools.ietf.org/html/rfc3550#section-6.4.1) */
typedef struct sender_info
{
	uint32_t ntp_ts_msw;
	uint32_t ntp_ts_lsw;
	uint32_t rtp_ts;
	uint32_t s_packets;
	uint32_t s_octets;
} sender_info;


/*! \brief RTCP Report Block (http://tools.ietf.org/html/rfc3550#section-6.4.1) */
typedef struct report_block
{
	uint32_t ssrc;
	uint32_t flcnpl;
	uint32_t ehsnr;
	uint32_t jitter;
	uint32_t lsr;
	uint32_t delay;
} report_block;


/*! \brief RTCP Sender Report (http://tools.ietf.org/html/rfc3550#section-6.4.1) */
typedef struct rtcp_sr
{
	rtcp_header header;
	uint32_t ssrc;
	sender_info si;
	report_block rb[1];
} rtcp_sr;


/*! \brief RTCP Receiver Report (http://tools.ietf.org/html/rfc3550#section-6.4.2) */
typedef struct rtcp_rr
{
	rtcp_header header;
	uint32_t ssrc;
	report_block rb[1];
} rtcp_rr;


/*! \brief RTCP SDES (http://tools.ietf.org/html/rfc3550#section-6.5) */
typedef struct rtcp_sdes_chunk
{
	uint32_t ssrc;
} rtcp_sdes_chunk;


typedef struct rtcp_sdes_item
{
	uint8_t type;
	uint8_t len;
	char content[1];
} rtcp_sdes_item;


typedef struct rtcp_sdes
{
	rtcp_header header;
	rtcp_sdes_chunk chunk;
	rtcp_sdes_item item;
} rtcp_sdes;


/*! \brief RTCP BYE (http://tools.ietf.org/html/rfc3550#section-6.6) */
typedef struct rtcp_bye
{
	rtcp_header header;
	uint32_t ssrc[1];
} rtcp_bye;


/*! \brief RTCP APP (http://tools.ietf.org/html/rfc3550#section-6.7) */
typedef struct rtcp_app
{
	rtcp_header header;
	uint32_t ssrc;
	char name[4];
} rtcp_app;
typedef rtcp_app janus_rtcp_app;

/*! \brief RTCP NACK (http://tools.ietf.org/html/rfc4585#section-6.2.1) */
typedef struct rtcp_nack
{
	/*! \brief Packet ID */
	uint16_t pid;
	/*! \brief bitmask of following lost packets */
	uint16_t blp;
} rtcp_nack;

/*! \brief RTCP REMB (http://tools.ietf.org/html/draft-alvestrand-rmcat-remb-03) */
typedef struct rtcp_remb
{
	/*! \brief Unique identifier ('R' 'E' 'M' 'B') */
	char id[4];
	/*! \brief Num SSRC, Br Exp, Br Mantissa (bit mask) */
	uint32_t bitrate;
	/*! \brief SSRC feedback (we expect at max three SSRCs in there) */
	uint32_t ssrc[3];
} rtcp_remb;



/*! \brief RTCP FIR (http://tools.ietf.org/search/rfc5104#section-4.3.1.1) */
typedef struct rtcp_fir
{
	/*! \brief SSRC of the media sender that needs to send a key frame */
	uint32_t ssrc;
	/*! \brief Sequence number (only the first 8 bits are used, the other 24 are reserved) */
	uint32_t seqnr;
} rtcp_fir;



/*! \brief RTCP-FB (http://tools.ietf.org/html/rfc4585) */
typedef struct rtcp_fb
{
	/*! \brief Common header */
	rtcp_header header;
	/*! \brief Sender SSRC */
	uint32_t ssrc;
	/*! \brief Media source */
	uint32_t media;
	/*! \brief Feedback Control Information */
	char fci[1];
} rtcp_fb;


/*! \brief RTCP Extended Report Block (https://tools.ietf.org/html/rfc3611#section-3) */
typedef struct extended_report_block
{
	/*! \brief Block type (BT) */
	uint8_t blocktype;
	/*! \brief Type-specific */
	uint8_t typesp;
	/*! \brief Block length */
	uint16_t length;
	/*! \brief Content (variable length) */
	char content[1];

} extended_report_block;


/*! \brief RTCP Extended Report (https://tools.ietf.org/html/rfc3611#section-2) */
typedef struct rtcp_xr
{
	rtcp_header header;
	uint32_t ssrc;
	extended_report_block erb[1];
} rtcp_xr;


/*! \brief Internal RTCP state context (for RR/SR) */
typedef struct rtcp_context
{
	/* Whether we received any RTP packet at all (don't send RR otherwise) */
	uint8_t rtp_recvd:1;
	uint32_t rtp_last_inorder_ts;
	int64_t rtp_last_inorder_time;

	uint16_t max_seq_nr;
	uint16_t seq_cycle;
	uint16_t base_seq;
	/* Payload type */
	uint16_t pt;

	/* RFC 3550 A.8 Interarrival Jitter */
	int64_t transit;
	double jitter, jitter_remote;
	/* Timestamp base (e.g., 48000 for opus audio, or 90000 for video) */
	uint32_t tb;

	/* Last SR received */
	uint32_t lsr;
	/* Monotonic time of last SR received */
	int64_t lsr_ts;

	/* Last RR/SR we sent */
	int64_t last_sent;

	/* Estimated round-trip time */
	uint32_t rtt;

	/* RFC 3550 A.3 */
	uint32_t received;
	uint32_t received_prior;
	uint32_t expected;
	uint32_t expected_prior;
	uint32_t lost, lost_remote;

	uint32_t retransmitted;
	uint32_t retransmitted_prior;

	/* Inbound RR process */
	int64_t rr_last_ts;
	uint32_t rr_last_ehsnr;
	uint32_t rr_last_lost;
	uint32_t rr_last_nack_count;
	uint32_t sent_packets_since_last_rr;
	uint32_t nack_count;

	/* Link quality estimations */
	double in_link_quality;
	double in_media_link_quality;
	double out_link_quality;
	double out_media_link_quality;

	/* TODO Incoming transport-wide CC feedback*/

} rtcp_context;


/*! \brief Stores transport wide packet reception statistics */
typedef struct rtcp_transport_wide_cc_stats
{
	/*! \brief Transwport wide sequence number */
	uint32_t transport_seq_num;
	/*! \brief Reception time */
	uint64_t timestamp;
} rtcp_transport_wide_cc_stats;



int main(int argc, char** argv) {
    
	uint32_t ssrc = 3452258945l;
	cout << "little, big, little endian" << endl;
	cout << ssrc << ", " << htonl(ssrc)<< ", " << ntohl(htonl(ssrc)) << endl;
    return 0;
}