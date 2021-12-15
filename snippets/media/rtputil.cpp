/*
some utilities got from https://github.com/cisco/libsrtp
*/

#include "rtputil.h"
using namespace std;

#define MAX_LOG_MSG_LEN 1024

char bit_string[MAX_LOG_MSG_LEN];

uint8_t nibble_to_hex_char(uint8_t nibble) {
  char buf[16] = {'0', '1', '2', '3', '4', '5', '6', '7',
		  '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' };
  return buf[nibble & 0xF];
}


char * octet_string_hex_string(const uint8_t *str, int length) {
  //const uint8_t *str = s;
  int i;
  
  /* double length, since one octet takes two hex characters */
  length *= 2;

  /* truncate string if it would be too long */
  if (length > MAX_LOG_MSG_LEN)
    length = MAX_LOG_MSG_LEN-1;
  
  for (i=0; i < length; i+=2) {
    bit_string[i]   = nibble_to_hex_char(*str >> 4);
    bit_string[i+1] = nibble_to_hex_char(*str++ & 0xF);
  }
  bit_string[i] = 0; /* null terminate string */
  return bit_string;
}


uint32_t rtp_header_extension_length(uint8_t* pkt_buffer)
{
    uint32_t length             = 0;
    srtp_hdr_t *hdr             = (srtp_hdr_t*)pkt_buffer;
    uint8_t* xtn_start          = NULL;  
    srtp_hdr_xtnd_t *xtn_hdr    = NULL;

    if (!pkt_buffer) {
        return 0;
    }

    length += 12;           // fixed header
    length += hdr->cc * 4;  // CSRC list

    if (hdr->x == 1) {
        xtn_start   = pkt_buffer + length;
        xtn_hdr     = (srtp_hdr_xtnd_t *)xtn_start;

        length += (ntohs(xtn_hdr->length) + 1) * 4;
    }

    return length;
}

string dump_rtp_packet(uint8_t* packet, uint32_t packet_len)
{
    char log_msg[MAX_LOG_MSG_LEN] = {'\0'};
    srtp_hdr_t *hdr         = (srtp_hdr_t*)packet;
    uint32_t header_ext_len = rtp_header_extension_length(packet);
    uint32_t tailer_len     = 64;
    int written_len         = 0;
    int remain_len          = MAX_LOG_MSG_LEN;
    char* writing_ptr       = log_msg;

    written_len = snprintf(writing_ptr, remain_len, "[rtp] dump_rtp_packet: ssrc=%u(0x%08X), seq=%u(0x%04X), pt=%u(0x%02X), ts=%u(0x%08X), hdr_ext_len=%u, pkt_len=%u, ",
        ntohl(hdr->ssrc), ntohl(hdr->ssrc), ntohs(hdr->seq), ntohs(hdr->seq), hdr->pt, hdr->pt, ntohl(hdr->ts), ntohl(hdr->ts), header_ext_len, packet_len);
    if (written_len < 0) {
        return string("");
    }
    writing_ptr += written_len;
    remain_len  -= written_len;

    if (packet_len > header_ext_len + tailer_len) {
        char* header_ext_str    = NULL;
        char* tailer_str        = NULL;

        header_ext_str  = octet_string_hex_string(packet, header_ext_len);
        written_len = snprintf(writing_ptr, remain_len, "hdr_ext: %s, ", header_ext_str);
        if (written_len < 0) {
            return string("");
        }
        writing_ptr += written_len;
        remain_len  -= written_len;

        tailer_str      = octet_string_hex_string(packet + packet_len - tailer_len, tailer_len);
        written_len = snprintf(writing_ptr, remain_len, "tailer: %s, tailer_len=%u", tailer_str, tailer_len);
    } else {
        written_len = snprintf(writing_ptr, remain_len, "packet: %s", octet_string_hex_string(packet, packet_len));
    }
    return string(log_msg);
}

string dump_rtcp_packet(uint8_t* packet, uint32_t packet_len)
{
    char log_msg[MAX_LOG_MSG_LEN] = {'\0'};
    srtcp_hdr_t *hdr         = (srtcp_hdr_t*)packet;
    int written_len         = 0;
    int remain_len          = MAX_LOG_MSG_LEN;
    char* writing_ptr       = log_msg;

    written_len = snprintf(writing_ptr, remain_len, "[srtp] dump_rtcp_packet: ssrc=%u(0x%08X), len=%u, pt=%u, pkt_len=%u, ",
        ntohl(hdr->ssrc), ntohl(hdr->ssrc), ntohs(hdr->len), hdr->pt, packet_len);
    if (written_len < 0) {
        return string("");
    }
    writing_ptr += written_len;
    remain_len  -= written_len;

    written_len = snprintf(writing_ptr, remain_len, "packet: %s", octet_string_hex_string(packet, packet_len));
    return string(log_msg);
}

int dump_rtp_to_file(uint8_t* packet, uint32_t packet_len, ofstream* pOfs) {
  
	if(!pOfs)	return -1;

	pOfs->write("DUMP", 4);
	pOfs->write((char*)&packet_len, sizeof(packet_len));

	for(uint32_t i=0; i<packet_len; i++) {
		uint8_t packetByte = *(packet + i);
		pOfs->write((char*)&packetByte, 1);

	}
    return 0;
}