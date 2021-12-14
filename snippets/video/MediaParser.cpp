#include <stdio.h>
#include <stdint.h>
#include <iostream>
#include <stdio.h>
#include <string.h>
#include <time.h>
#include <sys/time.h>
#include <assert.h>
#include <unistd.h>


#include "MediaUtil.h"

using namespace std;


typedef uint16_t sequence_number_t;   /* 16 bit sequence number  */
typedef uint32_t rollover_counter_t;   /* 32 bit rollover counter */

#define seq_num_median (1 << (8*sizeof(sequence_number_t) - 1))
#define seq_num_max    (1 << (8*sizeof(sequence_number_t)))

extern int show_bytes_test(int argc, char *argv[]);
extern int protobuf_read(int argc, char *argv[]);
extern int protobuf_write(int argc, char *argv[]);
extern int rtp_util_test(int argc, char *argv[]);
extern void show_bytes(uint8_t* start, int len);

void list_file (string i) {  // function:
  std::cout << i  << endl;
}

struct FileLister {           // function object type:
  void operator() (string i) {std::cout << i << endl;}
} myobject;


int main(int argc, char *argv[])
{
	msg_trace("--- Walter test program ---");
	
  int nRet = 0;  
  if(argc > 1) {
     msg_trace("--- read media file ---");
     string media_file = argv[1];
     MediaFileParser* pParser = new MediaFileParser(media_file);
     pParser->parse_stream();
     delete pParser;
     msg_trace("--- byebye ---");
	} else {
     msg_trace("Usage: " << argv[0] << " <media_file>");
  }
	return nRet;
}

