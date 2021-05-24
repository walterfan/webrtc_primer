/*
H.264 type and utitilies
refer to https://blog.csdn.net/leixiaohua1020/article/details/50534369
*/

#ifndef H264_UTIL_H
#define H264_UTIL_H

typedef enum {
	NALU_TYPE_NONE     = 0,
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

    NALU_TYPE_SVC_PREFIX = 14,
    NALU_TYPE_SVC_SPS    = 15,
    NALU_TYPE_AUX_VCL    = 19,
    NALU_TYPE_SVC_VCL    = 20,
    NALU_TYPE_STAP_A     = 24,
    NALU_TYPE_FU         = 28,

} NaluType;
 
typedef enum {
	NALU_PRIORITY_DISPOSABLE = 0,
	NALU_PRIRITY_LOW         = 1,
	NALU_PRIORITY_HIGH       = 2,
	NALU_PRIORITY_HIGHEST    = 3
} NaluPriority;

typedef enum {
	SLICE_I = 0,
	SLICE_P = 1,
	SLICE_B = 2
} SliceType;

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



#endif