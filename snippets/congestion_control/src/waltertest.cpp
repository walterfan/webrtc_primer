#include <inttypes.h>
#include <stdint.h>
#include <string.h>
#include <iostream>
#include <string>
#include <iostream>
#include "detector.h"
#include "estimator.h"

using namespace std;

int main(int argc, char** argv) {
    string command;

	if(argc > 1) {
		printf("execute command %s\n", argv[1]);
		
		
	} else {
		printf("usage: %s <command>\n", argv[0]);
		exit(1);
	}
	

	return 0;
}