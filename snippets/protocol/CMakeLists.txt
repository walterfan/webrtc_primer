cmake_minimum_required(VERSION 2.6)
PROJECT(protocol-implementation)

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

ADD_EXECUTABLE(remb_test remb_test.cpp)
#TARGET_LINK_LIBRARIES(chat_client ${USED_LIBS})

