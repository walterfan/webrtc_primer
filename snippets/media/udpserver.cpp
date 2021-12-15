#include <arpa/inet.h>
#include <netinet/in.h>
#include <stdio.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <unistd.h>
#include <stdlib.h> 
#include <string.h>

#include <iostream>
#include <string>
#include "rtputil.h"

#define BUFLEN 5120
#define PORT 8880
#define msg_trace(msg)	std::cout<<__FILE__<<","<<__LINE__<<": " << msg <<std::endl

using namespace std;


void exitWithMsg(const char *str)
{
    perror(str);
    exit(1);
}

int main(int argc, char *argv[])
{
	string rtpDumpFile = "rtp_dump.dat";
  int nPort =  PORT;
  int nCount = 10000;
  int nRet = 0;  
  if(argc > 2) {
    
     nPort = atoi(argv[1]);
     rtpDumpFile = argv[2];

     if(argc > 3)     nCount = atoi( argv[3]);

     msg_trace("To dump rtp packets to " << rtpDumpFile << " for " << nCount << " packets" << " from udp port " << nPort);
	} else {
    cout << "usage: " << argv[0] << "<port> <dump_file> [<dump_rtp_count>]" << endl;
    return -1;
  }

	  msg_trace("--- udp server as rtp receiver ---");
    struct sockaddr_in my_addr, cli_addr;
    int sockfd; 
    socklen_t slen=sizeof(cli_addr);
    uint8_t buf[BUFLEN];

    if ((sockfd = socket(AF_INET, SOCK_DGRAM, IPPROTO_UDP))==-1)
      exitWithMsg("socket error");
    else 
      printf("Server : Socket() successful\n");

    bzero(&my_addr, sizeof(my_addr));
    my_addr.sin_family = AF_INET;
    my_addr.sin_port = htons(nPort);
    my_addr.sin_addr.s_addr = htonl(INADDR_ANY);
    
    if (::bind(sockfd, (struct sockaddr* ) &my_addr, sizeof(my_addr))==-1)
      exitWithMsg("bind error");
    else
      printf("Server : bind() successful\n");

  
    ofstream ofs;
		ofs.open (rtpDumpFile, std::ofstream::out | std::ofstream::app | std::ofstream::binary);

    int pktCount = 0;
    while(nCount > 0)
    {
        int pktSize = recvfrom(sockfd, buf, BUFLEN, 0, (struct sockaddr*)&cli_addr, &slen);
        if(pktSize == -1) {
            exitWithMsg("recvfrom()");
        }
            
        printf("The %d packet received %d from %s:%d ", ++pktCount, pktSize, inet_ntoa(cli_addr.sin_addr), ntohs(cli_addr.sin_port));
        if(pktSize > 12) {
          cout << dump_rtp_packet(buf,  pktSize) <<endl;
          dump_rtp_to_file(buf,  pktSize, &ofs);
          nCount --;
        }
        
    }

    close(sockfd);
    return 0;
}

