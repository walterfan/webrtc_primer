cmake_minimum_required(VERSION 3.11)
project(media_test)

set(CMAKE_CXX_STANDARD 17)

SET(Boost_USE_STATIC_LIBS OFF)
SET(Boost_USE_MULTITHREAD ON)

FIND_PACKAGE(Boost 1.74.0 REQUIRED COMPONENTS filesystem system thread regex)

IF(Boost_FOUND)
  INCLUDE_DIRECTORIES(${Boost_INCLUDE_DIRS})
  LINK_DIRECTORIES(${Boost_LIBRARY_DIRS})
ENDIF(Boost_FOUND)

  
if (APPLE)
  SET(XCODE_SDK_ROOT /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk)
  include_directories(${XCODE_SDK_ROOT}/usr/include)
  link_directories(${XCODE_SDK_ROOT}/usr/lib)
endif (APPLE)

message("boost lib: ${Boost_LIBRARIES}")
message("boost inc: ${Boost_INCLUDE_DIR}")

add_executable(udpserver udpserver.cpp rtputil.cpp)
add_executable(rtptool rtptool.cpp)
add_executable(waltertest waltertest.cpp)

target_link_libraries( rtptool PRIVATE Boost::filesystem)
