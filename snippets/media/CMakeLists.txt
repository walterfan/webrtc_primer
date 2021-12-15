cmake_minimum_required(VERSION 3.11)
project(media_test)

include_directories(${CMAKE_SOURCE_DIR}/inc)
link_directories(/usr/lib/x86_64-linux-gnu)
set(CMAKE_CXX_STANDARD 17)

SET(Boost_USE_STATIC_LIBS OFF)
SET(Boost_USE_MULTITHREAD ON)

add_compile_definitions(BOOST_LOG_DYN_LIN)
ADD_DEFINITIONS(-DBOOST_LOG_DYN_LINK)
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

ADD_EXECUTABLE(udpserver udpserver.cpp rtputil.cpp)
ADD_EXECUTABLE(rtptool rtptool.cpp)
ADD_EXECUTABLE(waltertest waltertest.cpp)

TARGET_LINK_LIBRARIES( rtptool PRIVATE Boost::filesystem)
