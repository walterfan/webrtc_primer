# Overview

# Tester

## RTP packets dump from UDP port

1. mkdir bld; cmake ..; make;

2. ./udpserver

3. ffmpeg -re -i ../../material/sintel.ts -f rtp_mpegts udp://127.0.0.1:8880

# Tools

* gstreamer
* ffmpeg
* captool
* rtptool

## library

* boost
* libsrtp
* libavcodec
* lua

```
curl -R -O http://www.lua.org/ftp/lua-5.4.3.tar.gz
tar zxf lua-5.4.3.tar.gz
cd lua-5.4.3
make all test
```

## FAQ

### How to cature packets from ip1:port1 to ip2:port2

```
tcpdump -i en0 src host 192.168.1.27 and src port 10000 and dst host 192.168.1.28 and dst port 20000 -w today.pcap
```

### How to push rtp stream to socket from ts file

```
ffmpeg -re -i ../../material/sintel.ts -f rtp_mpegts udp://127.0.0.1:8880

```

### How to concat several wav files to one?

* Method 1:

It's the recommended method

```
ffmpeg -f concat -i mylist.txt -c copy output.wav 
```

mylist.txt:

```
file 'a1.wav'
file 'a2.wav'
```

* Method 2:


```
ffmpeg -i a1.wav -i a2.wav -filter_complex '[0:0][1:0]concat=n=2:v=0:a=1[out]' -map '[out]' a1_a2.wav

```


### How to conver avi to wav

```
ffmpeg -i 1secs_output.avi -vn -acodec pcm_s16le -ar 8000 -ac 1 1secs_output.wav

```

### How to draw a text on a video file
```
ffmpeg -i "a1.mp4" -vf drawtext="fontfile=xxx.ttf: text=Hello World: \
fontcolor=black: fontsize=40: x=10: y=10" -codec:a copy -y "a2.mp4"
```