# compile and install opencv

https://gitee.com/walterfan/opencv.git

mkdir bld
cd bld
cmake ..
make
make install


# YUV format

1. YUV 4:4:4采样，每一个Y对应一组UV分量8+8+8 = 24bits,3个字节。

2. YUV 4:2:2采样，每两个Y共用一组UV分量,一个YUV占8+4+4 = 16bits 2个字节。

3. YUV 4:2:0采样，每四个Y共用一组UV分量一个YUV占8+2+2 = 12bits  1.5个字节

```
#ffmpeg  -i ../../media/lena.jpg -pix_fmt yuv420p  lena.yuv

```