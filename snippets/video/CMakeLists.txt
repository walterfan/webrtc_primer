cmake_minimum_required(VERSION 2.6)
PROJECT(video-demo)

# Usage: 
#   cmake .. -DCMAKE_INCLUDE_PATH=/usr/local/include 
#            -DCMAKE_LIBRARY_PATH=/usr/local/lib
#           -DBOOST_INCLUDE_DIR=~/Documents/workspace/cpp/boost_1_74_0 
#           -DBOOST_LIBRARY_DIR=~/Documents/workspace/cpp/boost_1_74_0/stage/lib
#

include_directories(${CMAKE_SOURCE_DIR}/inc)
link_directories(/usr/lib/x86_64-linux-gnu)

set (CMAKE_CXX_STANDARD 17)
SET(Boost_USE_STATIC_LIBS OFF)
SET(Boost_USE_MULTITHREAD ON)

add_compile_definitions(BOOST_LOG_DYN_LIN)
ADD_DEFINITIONS(-DBOOST_LOG_DYN_LINK)

FIND_PACKAGE(Boost 1.74.0 REQUIRED COMPONENTS system thread regex log program_options)

IF(Boost_FOUND)
  INCLUDE_DIRECTORIES(${Boost_INCLUDE_DIRS})
  LINK_DIRECTORIES(${Boost_LIBRARY_DIRS})
ENDIF(Boost_FOUND)

message("boost lib: ${Boost_LIBRARIES}")
message("boost inc:${Boost_INCLUDE_DIR}")

ADD_EXECUTABLE(video_demo h264demo.cpp main.cpp)
TARGET_LINK_LIBRARIES( video_demo LINK_PUBLIC ${Boost_LIBRARIES} )
