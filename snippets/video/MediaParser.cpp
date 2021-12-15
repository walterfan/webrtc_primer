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

