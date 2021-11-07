cmake_minimum_required(VERSION 3.11)
project(rtc_cc_test)

set(CMAKE_CXX_STANDARD 17)
include_directories(inc)
add_executable(waltertest 
    src/waltertest.cpp
    inc/detector.h
    inc/estimator.h
)
