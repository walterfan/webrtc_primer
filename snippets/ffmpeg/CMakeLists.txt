cmake_minimum_required(VERSION 3.11)
project(ffmpeg_test)

set(CMAKE_CXX_STANDARD 17)

SET(Boost_USE_STATIC_LIBS OFF)
SET(Boost_USE_MULTITHREAD ON)

FIND_PACKAGE(Boost 1.74.0 REQUIRED COMPONENTS filesystem system thread regex)

IF(Boost_FOUND)
  INCLUDE_DIRECTORIES(${Boost_INCLUDE_DIRS})
  LINK_DIRECTORIES(${Boost_LIBRARY_DIRS})
ENDIF(Boost_FOUND)

message("boost lib: ${Boost_LIBRARIES}")
message("boost inc: ${Boost_INCLUDE_DIR}")

add_executable(udpserver udpserver.cpp rtputil.cpp)
add_executable(rtptool rtptool.cpp)

target_link_libraries( rtptool PRIVATE Boost::filesystem)