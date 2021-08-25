#include <inttypes.h>
#include <stdint.h>
#include <string.h>
#include <iostream>
#include <string>
#include <iostream>
#include "BMP.h"

using namespace std;

int main(int argc, char** argv) {
    string image_file;
	string copy_file;
	if(argc > 1) {
		image_file = argv[1];
		if(image_file.size() < 4 
			|| image_file.substr(image_file.size() - 3, image_file.size()) != "bmp") {
				printf("imag_file should be *.bmp");
			exit(1);
		} 
		
		copy_file = image_file.substr(0, image_file.size() - 4) + "_copy.bmp";
		
	} else {
		printf("usage: %s <imag_file>\n", argv[0]);
		exit(1);
	}
	
	BMP bmp(image_file.c_str());
	cout << image_file << "'s width=" << bmp.bmp_info_header.width
	 	 << ", height="<< bmp.bmp_info_header.height
		 << ", bit_count="<< bmp.bmp_info_header.bit_count
	 	 << endl;
	cout << "list some points' color" << endl;
	cout << "[x, y] B, G, R" << endl;
	uint32_t channels = bmp.bmp_info_header.bit_count / 8;
	for (uint32_t y = 0; y < bmp.bmp_info_header.height; ++y) {
            for (uint32_t x = 0; x < bmp.bmp_info_header.width; ++x) {
                uint8_t B = bmp.data[channels * (y * bmp.bmp_info_header.width + x) + 0];
                uint8_t G = bmp.data[channels * (y * bmp.bmp_info_header.width + x) + 1];
                uint8_t R = bmp.data[channels * (y * bmp.bmp_info_header.width + x) + 2];
                uint8_t A = 0;
				if (channels == 4) {
                    A = bmp.data[channels * (y * bmp.bmp_info_header.width + x) + 3];
                }
				if(x % 10 == 0)
					printf("[%d,%d] %d, %d, %d\n", x, y, B, G, R);
            }
			break;
        }
	//x, y, w, h, r, g, b, a
	bmp.fill_region(0, 0, 50, 50, 0, 0, 255, 255);
	bmp.fill_region(150, 0, 100, 150, 0, 255, 0, 255);
	cout << "write " << copy_file << endl;
	bmp.write(copy_file.c_str());

	return 0;
}