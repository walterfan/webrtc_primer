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

int main(int argc, char** argv) {
    
	uint32_t ssrc = 3452258945l;
	cout << "little, big, little endian" << endl;
	cout << ssrc << ", " << htonl(ssrc)<< ", " << ntohl(htonl(ssrc)) << endl;
    return 0;
}