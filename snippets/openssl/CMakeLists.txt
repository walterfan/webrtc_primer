cmake_minimum_required(VERSION 3.11)

project(X509Certificate)

if (APPLE)
  SET(OPENSSL_ROOT_DIR /usr/local/opt/openssl)
  SET(OPENSSL_INCLUDE_DIR ${OPENSSL_ROOT_DIR})
  include_directories(${OPENSSL_ROOT_DIR}/include)
  link_directories(${OPENSSL_ROOT_DIR}/lib)
endif (APPLE)

find_package(OpenSSL REQUIRED)

include_directories(${OPENSSL_INCLUDE_DIR})

add_executable(X509Certificate X509Certificate.cpp)
target_link_libraries(X509Certificate ${OPENSSL_LIBRARIES})

install(TARGETS X509Certificate RUNTIME DESTINATION bin)