/*
 * h264demo.h
 *
 *  Created on: 2021-3-12
 *      Author: Walter Fan
 */

#ifndef SNIPPETS_VIDEO_ROOM_H264DEMO_H_
#define SNIPPETS_VIDEO_ROOM_H264DEMO_H_

#include <string>
#include <stdint.h>

typedef enum {
	NALU_TYPE_SLICE    = 1,
	NALU_TYPE_DPA      = 2,
	NALU_TYPE_DPB      = 3,
	NALU_TYPE_DPC      = 4,
	NALU_TYPE_IDR      = 5,
	NALU_TYPE_SEI      = 6,
	NALU_TYPE_SPS      = 7,
	NALU_TYPE_PPS      = 8,
	NALU_TYPE_AUD      = 9,
	NALU_TYPE_EOSEQ    = 10,
	NALU_TYPE_EOSTREAM = 11,
	NALU_TYPE_FILL     = 12,
} NaluType;

enum H264ProfileIDC {
	kProfileIDCBaseline = 66,
	kProfileIDCConstrainedBaseline = kProfileIDCBaseline,
	kProfileIDCMain = 77,
	kProfileIDScalableBaseline = 83,
	kProfileIDScalableHigh = 86,
	kProfileIDCHigh = 100,
	kProfileIDHigh10 = 110,
	kProfileIDSMultiviewHigh = 118,
	kProfileIDHigh422 = 122,
	kProfileIDStereoHigh = 128,
	kProfileIDHigh444Predictive = 244,
};

  enum H264LevelIDC : uint8_t {
    kLevelIDC1p0 = 10,
    kLevelIDC1B = 9,
    kLevelIDC1p1 = 11,
    kLevelIDC1p2 = 12,
    kLevelIDC1p3 = 13,
    kLevelIDC2p0 = 20,
    kLevelIDC2p1 = 21,
    kLevelIDC2p2 = 22,
    kLevelIDC3p0 = 30,
    kLevelIDC3p1 = 31,
    kLevelIDC3p2 = 32,
    kLevelIDC4p0 = 40,
    kLevelIDC4p1 = 41,
    kLevelIDC4p2 = 42,
    kLevelIDC5p0 = 50,
    kLevelIDC5p1 = 51,
    kLevelIDC5p2 = 52,
    kLevelIDC6p0 = 60,
    kLevelIDC6p1 = 61,
    kLevelIDC6p2 = 62,
  };

typedef enum {
	NALU_PRIORITY_DISPOSABLE = 0,
	NALU_PRIRITY_LOW         = 1,
	NALU_PRIORITY_HIGH       = 2,
	NALU_PRIORITY_HIGHEST    = 3
} NaluPriority;


typedef struct
{
	int startcodeprefix_len;      //! 4 for parameter sets and first slice in picture, 3 for everything else (suggested)
	unsigned len;                 //! Length of the NAL unit (Excluding the start code, which does not belong to the NALU)
	unsigned max_size;            //! Nal Unit Buffer size
	int forbidden_bit;            //! should be always FALSE
	int nal_reference_idc;        //! NALU_PRIORITY_xxxx
	int nal_unit_type;            //! NALU_TYPE_xxxx
	char *buf;                    //! contains the first byte followed by the EBSP
} NALU_t;

class VideoPacket {
public:
	VideoPacket();
	~VideoPacket();

private:
	uint8_t* m_buffer;
	uint8_t* m_prev;
	uint8_t* m_next;


};

class h264demo {
public:
	h264demo(const std::string& fileName);
	virtual ~h264demo();
	
	h264demo(h264demo &&other);
	h264demo& operator=(const h264demo &other);

	h264demo& operator=(h264demo &&other);
	h264demo(const h264demo &other);
private:
	std::string m_fileName;
};

#endif /* SNIPPETS_VIDEO_ROOM_H264DEMO_H_ */
