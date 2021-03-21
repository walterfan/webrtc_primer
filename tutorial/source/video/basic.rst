###############
Video Basic
###############


图像压缩
========================

RGB24 -> YUV420



视频帧 Video Frame
==========================

| A video is an action sequence formed by a series of images, and each image in the series succeeds the previous one in the timeline of the action sequence to displayed . These still images are called video frames.

视频是由一系列图像组成的动作序列，并且该序列中的每个图像都将在要显示的动作序列的时间轴中接替前一个图像。 这些静止图像称为视频帧。

| the smaller the time difference is between each video frame, the higher the refresh rate is and the more naturally movement is represented in the video.

每个视频帧之间的时间差越小，刷新率就越高，并且视频中的运动表现得越自然。

| this is because there are more video frames generated per second to be displayed as part of the action sequence, therefore changes in the images between frames are slighter and movement appears smoother.

这是因为每秒有更多的视频帧要显示为动作序列的一部分，因此帧之间图像的变化较小，并且运动看起来更平滑。


I-frame 信息帧
---------------------
信息帧用帧内压缩，用作关键帧


P-frame
---------------------
预测帧 Predictive Frame 用帧间压缩，反映之前的 I-frame 的变化



B-frame
---------------------
双向预测帧 Bidirectional Predictive Frames 使得总体压缩更高， 它参考了之前的 I-frame 和之后的 P-frame
 



视频压缩 Video compress
===========================

由于视频是由图像的时间序列组成，视频压缩可以看作具有时间分量的图像压缩。

大多数视频压缩方案都利用了时间相关性来消除冗余。

预测帧与当前帧之间的差异称为预测误差或残差             


Intra-Frame 帧内压缩

Inter-Frame 帧间压缩


H.264
===========================

Compression and media resilliency feature

* Error feedback mechanism
* Enhanced motion estimation
* Improved entropy coding
* Intra-prediction coding for I-frame
* 4*4 Display Channel Table (DCT)
* Network Abstraction Layer
* Gradual Decoder Refresh(GDR) frame
* Long-Term Reference Picture (LTRP) frame

* 错误反馈机制
* 增强的运动估计
* 改进的熵编码
* I帧的帧内预测编码
* 4 * 4 显示频道表（DCT）
* 网络抽象层
* 渐进式解码器刷新（GDR）帧
* 长期参考图片（LTRP）帧


 





.. code-block::

    typedef enum janus_videocodec {
        JANUS_VIDEOCODEC_NONE,
        JANUS_VIDEOCODEC_VP8,
        JANUS_VIDEOCODEC_VP9,
        JANUS_VIDEOCODEC_H264,
        JANUS_VIDEOCODEC_AV1,
        JANUS_VIDEOCODEC_H265
    } janus_videocodec;
    const char *janus_videocodec_name(janus_videocodec vcodec);
    janus_videocodec janus_videocodec_from_name(const char *name);
    int janus_videocodec_pt(janus_videocodec vcodec);