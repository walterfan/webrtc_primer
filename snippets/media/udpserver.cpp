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

using namespace std;

void exitWithMsg(const char *str)
{
    perror(str);
    exit(1);
}

int main(void)
{
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
    my_addr.sin_port = htons(PORT);
    my_addr.sin_addr.s_addr = htonl(INADDR_ANY);
    
    if (::bind(sockfd, (struct sockaddr* ) &my_addr, sizeof(my_addr))==-1)
      exitWithMsg("bind error");
    else
      printf("Server : bind() successful\n");

    int pktCount = 0;
    while(1)
    {
        int pktSize = recvfrom(sockfd, buf, BUFLEN, 0, (struct sockaddr*)&cli_addr, &slen);
        if(pktSize == -1) {
            exitWithMsg("recvfrom()");
        }
            
        printf("The %d packet received %d from %s:%d\n", ++pktCount, pktSize, inet_ntoa(cli_addr.sin_addr), ntohs(cli_addr.sin_port));
        if(pktSize > 12) {
          cout << dump_rtp_packet(buf,  pktSize) <<endl;
        }
    }

    close(sockfd);
    return 0;
}

