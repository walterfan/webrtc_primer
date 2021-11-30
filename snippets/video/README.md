# show frames of video file

```
ffprobe -v error -show_frames input.mp4

ffprobe -v error -show_frames ../../material/obama_talk.mp4
```

# count frame of video file

```
ffprobe -v error -count_frames -select_streams v:0 -show_entries stream=nb_frames -of default=nokey=1:noprint_wrappers=1 ../../material/obama_talk.mp4

1269
```

ffprobe -v error -skip_frame nokey -select_streams v:0 -show_entries frame=pkt_pts_time -of csv=print_section=0 ../../material/obama_talk.mp4

# check keyframes of video file

```
ffprobe -v error -show_frames ../../material/obama_talk.mp4 | grep pict_type

ffprobe -v error -select_streams v -show_frames -show_entries frame=pict_type -of csv ../../material/obama_talk.mp4 | grep -n I | cut -d ':' -f 1
```

# covert mp4 to 264 by ffmpeg

```
ffmpeg -i input.mp4 -codec copy -bsf: h264_mp4toannexb -f h264 output.h264
```

e.g.

```
ffmpeg -i ../../material/obama_talk.mp4 -codec copy -bsf: h264_mp4toannexb -f h264 ../../material/obama_talk.h264
```


# reference
* https://trac.ffmpeg.org/wiki/Encode/H.264