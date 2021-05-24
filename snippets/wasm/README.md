[TOC]

# WASM

WebAssembly (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications.

## Advantage
* Efficient and fast
* Safe
* Open and debuggable
* Part of the open web platform


# Install Emscripten Tool Chain

Get the Emscripten SDK, using these instructions: https://emscripten.org/docs/getting_started/downloads.html

Emscripten is a complete compiler toolchain to WebAssembly, using LLVM, with a special focus on speed, size, and the Web platform


```shell script

# Get the emsdk repo
git clone https://github.com/emscripten-core/emsdk.git
 
# Enter that directory
cd emsdk
 
# Fetch the latest version of the emsdk (not needed the first time you clone)
git pull
 
# Download and install the latest SDK tools.
./emsdk install latest
 
# Make the "latest" SDK "active" for the current user. (writes .emscripten file)
./emsdk activate latest
 
# Activate PATH and other environment variables in the current terminal
source ./emsdk_env.sh
 
emcc -v

```

## Build by emsdk

* make

```
emcc -O2 fibonacci.c -s WASM=1 -o fibonacci.html

```

## wabt toolkit

```
$ git clone --recursive https://github.com/WebAssembly/wabt
$ cd wabt
$ mkdir build
$ cd build
$ cmake ..
$ cmake --build .
```

example:

```
npm install
wat2wasm get_module_size.wat -o get_module_size.wasm
node wasm_server.js
```

open http://localhost:9080/get_module_size.html

# Reference
* [c program to wasm](https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm)
* [wasm spec](https://webassembly.org/specs/)