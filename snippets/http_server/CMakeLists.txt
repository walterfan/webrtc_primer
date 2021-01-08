cmake_minimum_required(VERSION 2.6)
PROJECT(text-chat-example)

# Usage: 
#   cmake .. -DCMAKE_INCLUDE_PATH=/usr/local/include 
#            -DCMAKE_LIBRARY_PATH=/usr/local/lib
#           -DBOOST_INCLUDE_DIR=~/Documents/workspace/cpp/boost_1_74_0 
#           -DBOOST_LIBRARY_DIR=~/Documents/workspace/cpp/boost_1_74_0/stage/lib
#

set (CMAKE_CXX_STANDARD 11)
SET(Boost_USE_STATIC_LIBS OFF)
SET(Boost_USE_MULTITHREAD ON)
FIND_PACKAGE(Boost 1.74.0 REQUIRED COMPONENTS system thread regex)
IF(Boost_FOUND)
  INCLUDE_DIRECTORIES(${Boost_INCLUDE_DIRS})
  LINK_DIRECTORIES(${Boost_LIBRARY_DIRS})
ENDIF(Boost_FOUND)

message("boost lib: ${Boost_LIBRARIES}")
message("boost inc:${Boost_INCLUDE_DIR}")

SET(USED_LIBS ${Boost_SYSTEM_LIBRARY} ${Boost_THREAD_LIBRARY} ${Boost_REGEX_LIBRARY})

ADD_EXECUTABLE(http_server connection.cpp
    connection_manager.cpp
    main.cpp
    mime_types.cpp
    reply.cpp
    request_handler.cpp
    request_parser.cpp
    server.cpp)
TARGET_LINK_LIBRARIES(http_server ${USED_LIBS})
