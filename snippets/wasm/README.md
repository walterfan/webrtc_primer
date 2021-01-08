# Install Emscripten Tool Chain


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

# Build by emsdk

* make