#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <getopt.h>
#include <iostream>
#include <string>
#include <sstream>

using namespace std;

static const char* USAGE = "-c|--config <config_file> (default is ./srtp_config.lua) \n"
    "\t-i|--input <input file or string> \n"
    "\t[-o|--output <output file>] \n"
    "\t[-d|--decode or -e|--encode] (default is encode) \n"
    "\t[--fmt <base64|srtp>] (default is base64 if input string, or srtp if input file )\n"
    "\t[--verbose --brief --test --help] \n";

int handle_menu() {
    return 0;
}

int handle_args(int argc, char* argv[]) {
    return 0;
}

int init(int argc, char* argv[]) {
    return 0;
}

void clean() {

}

int main(int argc, char* argv[])
{
    int ret = init(argc, argv);
    if(ret) {
        cerr << "init error: " << ret << endl;
        return ret;
    }
    if(argc == 1) {
        printf("Usage: %s %s",argv[0], USAGE);
        ret = handle_menu();
    }
    else {
        ret = handle_args(argc, argv);
    }
    clean();
    return ret;
}
