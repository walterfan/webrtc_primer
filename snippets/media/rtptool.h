#ifndef __RTP_TOOL_H__
#define __RTP_TOOL_H__

#include <cstdint>

typedef struct stSecurityPolicy {
    bool switchingRTPPacket;
    bool stripSRTPTagsAfterUnprotect;
    bool allowReplayedPacket;
} SecurityPolicy;


typedef struct stToolConfig {
    std::string filter_expression;
    SecurityPolicy security_policy;
    wrtp::SecurityConfiguration security_config;
    wrtp::StreamDirection stream_direction;
    srtp_policy_t* srtp_policy;
    srtp_ctx_t * srtp_context;
} ToolConfig;

struct ltstr
{
    bool operator()(const char* s1, const char* s2) const {
        return strcmp(s1, s2) < 0;
    }
};

class CPcapHandler 
{
public:
    CPcapHandler(const char* input_file, const char* output_file);
    ~CPcapHandler();
    int HandlePcapPacket(struct pcap_pkthdr* pHeader, uint8_t* pkt_data);
private:    
    int Init();
    FILE* m_output_fp;
    FILE* m_input_fp;
};


int handle_menu();

int handle_args(int argc, char* argv[]);

int init(int argc, char* argv[]);

uint8_t* protect_rtp_packet(srtp_hdr_t* pHdr, uint32_t& nLen);

uint8_t* unprotect_rtp_packet(srtp_hdr_t* pHdr, uint32_t& nLen);

uint8_t* protect_rtcp_packet(srtcp_hdr_t* pHdr, uint32_t& nLen);

uint8_t* unprotect_rtcp_packet(srtcp_hdr_t* pHdr, uint32_t& nLen);


#endif
