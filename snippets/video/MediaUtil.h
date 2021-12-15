#ifndef __MEDIA_UTIL_H__
#define __MEDIA_UTIL_H__

#include <string>
#include <vector>
#include <stdint.h>
#include <map>
#include <list>
#include <iostream>


#define debug_trace(msg)  do { if(0) {	std::cout<<__FILE__<<","<<__LINE__<<": " << msg <<std::endl; } } while(0)

#define msg_trace(msg)	std::cout<<__FILE__<<","<<__LINE__<<": " << msg <<std::endl

#define err_trace(msg)	std::cout<<"[ERROR] "<<__FILE__<<","<<__LINE__<<": " << msg <<std::endl

using namespace std;

typedef struct rtpHeader {
    uint8_t  version;
    uint8_t  payloadType;
    uint16_t seqNo;
    uint32_t timestamp;
    uint32_t mediaSSRC;
    uint8_t  payload[1];
} rtpHeader_t;


typedef struct {
    char tag[4];
    uint32_t len;
} dump_rtp_hdr;

typedef struct RtpInfo {
    void put(string key, string value) {
        items[key] = value;
    }
    string get(string key) {
        return items[key];
    }

    static void printTitles(std::ostream& os) {
        os << "size, pt, ssrc, m, sn, ts, nalType, subNalType, start, end " << endl;
    }
    void printValues(std::ostream& os) {
        os << get("size") << ", "
        << get("pt") << ", " 
        << get("ssrc") << ", " 
        << get("m") << ", " 
        << get("sn") << ", " 
        << get("ts") << ", " 
        << get("nalType") << ", " 
        << get("subNalType") << ", " 
        << get("start") << ", "
        << get("end") << ", " 
        << endl;

    }

    friend std::ostream& operator<<(std::ostream& os, const RtpInfo& obj) {
        std::map<std::string, string>::const_iterator it = obj.items.begin();
        for(; it != obj.items.end(); ++it )
        {
            os << it->first <<"=" << it->second << " ";
        }
        return os;
    };

    std::map<std::string, std::string> items;
} rtp_info_t;

struct NALU {

    enum Type {
        kUnspecified = 0,
        kNonIDRSlice = 1,
        kSliceDataA = 2,
        kSliceDataB = 3,
        kSliceDataC = 4,
        kIDRSlice = 5,
        kSEIMessage = 6,
        kSPS = 7,
        kPPS = 8,
        kAUD = 9,
        kEOSeq = 10,
        kEOStream = 11,
        kFiller = 12,
        kSPSExt = 13,
        kReserved14 = 14,
        kReserved15 = 15,
        kReserved16 = 16,
        kReserved17 = 17,
        kReserved18 = 18,
        kCodedSliceAux = 19,
        kCodedSliceExtension = 20,
  };

  NALU(uint8_t* pData, uint32_t size, int nri, int type)
    :buf(NULL), len(size),nal_ref_idc(nri),nal_unit_type(type)  {
      buf = new uint8_t[size];
      memcpy(pData, buf, size);
  }

  ~NALU() {
      if (buf) {
        delete [] buf;
        buf = NULL;
      }
  }

  uint8_t* buf;
  uint32_t len;
  int nal_ref_idc;
  int nal_unit_type;
};


class MediaFileParser {
public:
    MediaFileParser(string& filename);
    ~MediaFileParser();

    MediaFileParser() = delete;
    MediaFileParser(const MediaFileParser&) = delete;
    MediaFileParser& operator=(const MediaFileParser&) = delete;


    int parse_stream();

    int handle_packet(uint8_t* pPacket, int len, rtp_info_t& rtpInfo);
    int handle_nalu(uint8_t* pPacket, int len, rtp_info_t& rtpInfo);
    
    int handle_stap(uint8_t* pPacket, int len, rtp_info_t& rtpInfo);
    int handle_fu(uint8_t* pPacket, int len, rtp_info_t& rtpInfo);

    int merge_fu();
    int write_nalu(uint8_t* pPacket, int len);

private:
    string m_filename;
    size_t m_filesize;
    string m_h264_file;
    size_t m_nalu_count;

    FILE* m_input_file;
    FILE* m_output_file;
    
    list<NALU*> m_list_fu;

};



#endif