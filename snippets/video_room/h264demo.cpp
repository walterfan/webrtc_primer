/*
 * h264demo.cpp
 *
 *  Created on: 2021Äê3ÔÂ12ÈÕ
 *      Author: fanya
 */

#include "h264demo.h"
#include <cstdio>
#include <cstddef>
#include <cstdlib>
#include <boost/log/trivial.hpp>
#include <boost/program_options.hpp>
#include <boost/assert.hpp>


using namespace std;
using namespace boost::program_options;

h264demo::h264demo() {
	// TODO Auto-generated constructor stub

}

h264demo::~h264demo() {
	// TODO Auto-generated destructor stub
}

h264demo::h264demo(h264demo &&other) {
	// TODO Auto-generated constructor stub


}

h264demo& h264demo::operator=(const h264demo &other) {
	// TODO Auto-generated method stub
	return *this;

}

h264demo& h264demo::operator=(h264demo &&other) {
	// TODO Auto-generated method stub
	return *this;

}

h264demo::h264demo(const h264demo &other) {
	// TODO Auto-generated constructor stub


}

int h264_demo(const variables_map& vm) {

	NALU_t *n;

	int buffersize=100000;

	if (!vm.count("input")) {
		BOOST_LOG_TRIVIAL(trace) << "error: please specify input_file";
		return -1;
	}

	string input_file = vm["input"].as<string>();
	BOOST_LOG_TRIVIAL(trace) << "read " << input_file;

	FILE *fpInput = NULL;
	FILE *fpOutput = stdout;

	fpInput = fopen(input_file.c_str(), "rb+");
	if (fpInput==NULL){
		printf("Open file error\n");
		return -1;
	}

	while(!feof(fpInput)) {
		//TODO
		break;
	}

	fclose(fpInput);
	return 0;
}
