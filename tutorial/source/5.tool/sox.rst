########################
SoX
########################


.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** SoX
**Authors**  Walter Fan
**Status**   v1
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:


简介
=========================
SoX 是一款强大音频文件工具箱,是音频操作方面的瑞士军刀, 转码， 播放，
录制，以及查看音频文件格式都很方便， 其中主要包含四个命令行小工具:

-  sox 音频格式转换
-  soxi 音频格式信息查询
-  play 播放音频文件
-  rec 录制音频文件

音频格式转换工具 sox
--------------------

可以从 http://sox.sourceforge.net/ 下载安装 MacOS 上直接用 brew install
sox 安装

用法如下

``sox [global-options] [format-options] infile1 [[format-options] infile2] ... [format-options] outfile [effect [effect-options]] ...``

输入输出参数选项 :

-  −b BITS, −−bits BITS (采样的比特位数)
-  −c CHANNELS, −−channels CHANNELS (声道个数)
-  −e ENCODING, −−encoding ENCODING (音频编码 a-law, u-law )
-  −L, −−endian little (小端)
-  −r, −−rate RATE[k] (比特率)
-  −t, −−type FILE-TYPE (文件类型, 比如 raw, mp3)

sox 的强大在于它能给音频文件添加各种音效和处理,
各种效果可以链式排列逐个对音频文件进行处理

例如 gain 效果， 可对于某些声道放大或减小音频信号

.. raw:: html
   
    gain [−e|−B|−b|−r] [−n] [−l|−h] [gain-dB] 
   

注意使用任一 −e, −B, −b, −r, 或 −n 参数都需要额外的磁盘空间,
对于流媒体不太适用

没有其他参数的 gain-dB 用来根据给定的分贝数值调整信号强度水平
正值为放大, 负值为减小

带有其他参数的 gain-dB 是在相应处理过程之后进行分贝的放大或减小

-  -e 意为equalised, 用来均衡，
   也就是把多通道音频文件中的所有通道达到相同的峰值电平

-  −B (balance) 此选项与-e类似，但是它使用RMS电平而不是峰值电平。
   -B可用于纠正由不正确的磁带转录引起的立体声不平衡。请注意，不像-e，-B可能会导致一些对原文件的削剪

-  −b
   与-B类似，但具有削波保护，即如果需要在平衡时防止削波，则对所有信道应用衰减。但是请注意，结合-n，-B和-b是同义词
     \* -r选项与以前使用-h选项调用增益结合使用   \*
   -n选项将音频标准化为0dB
   FSD;它通常与负增益dB结合使用，使得音频被归一化到低于0dB的给定电平

-  loudness [gain `reference`_] 响度控制 -
   类似于增益效应，但为人类听觉系统提供均衡。
   有关响度的详细说明，请访问http://en.wikipedia.org/wiki/Loudness。
   增益通过给定的增益参数（通常为负）进行调整，信号根据ISO 226
   w.r.t.进行均衡。
   参考电平为65dB，尽管如果原始音频已经被平衡以达到某个其他最佳电平，则可以给出替代参考电平。
   如果没有给出增益值，则使用默认增益为-10dB。

-  norm [dB-level] 规范音频。 规范只是获得-n的别名;
   有关详细信息，请参阅增益效果。

-  oops 异相立体声效果。
   将立体声混合为双声道，其中每个单声道通道包含左右立体声通道之间的差异。
   这有时被称为“卡拉OK”效果，因为它通常具有从录音中删除大部分或全部声乐的效果。
   相当于混音1,2i 1,2i

示例
~~~~

-  转换音频文件为 采样大小为16bit, 采样频率 8KHz, 单声道

.. code-block:: bash

    sox test.wav -L -b16 -r 8000 -c 1 new-test.wav
      

-  转换音频文件为 G.711 u-law 编码, 采样频率 8KHz, 单声道

.. code-block:: bash

      
    sox src.wav -r 8000 -c 1 -e u-law dest.wav
      

音频格式查询工具 soxi
---------------------

-  示例

.. code-block:: bash

   soxi -V 1000.wav

   input File     : '1000.wav'
   Channels       : 1
   Sample Rate    : 8000
   Precision      : 14-bit
   Duration       : 00:00:02.14 = 17090 samples ~ 160.219 CDDA sectors
   File Size      : 17.1k
   Bit Rate       : 64.2k
   Sample Encoding: 8-bit u-law

音频播放工具 play
-----------------

play [global-options] [format-options] infile1 [[format-options]
infile2] … [format-options] [effect [effect-options]] …

.. code-block:: bash

   play 1000.wav
   

音频录制工具 rec
----------------

rec [global-options] [format-options] outfile [effect [effect-options]]
…

.. _示例-1:

示例
~~~~

-  指定录制的采样率和采样位数

.. code-block:: bash

    rec -r 8000 -b 16 
      

-  指定录制的声道,目标文件, 并只截取前30分钟

.. code-block:: bash
      
    rec −c 2 radio.aiff trim 0 30:00
      

-  指定录制的文件, 并只录一分钟

.. code-block:: bash
   
    rec music.wav trim 0 1
      

libsox
------

libsox is a library of sound sample file format readers/writers and
sound effects processors. It is mainly developed for use by SoX but is
useful for any sound application.

libsox是一个对于声音采样文件格式的读写和音效处理器库。
它主要用于工具SoX，对于其他声音应用程序都很有用。但是它的 license 是
GPL/LGPL , 在商业产品代码中使用要注意

例如：

.. code-block:: cpp

   #ifdef NDEBUG /* N.B. assert used with active statements so enable always. */
   #undef NDEBUG /* Must undef above assert.h or other that might include it. */
   #endif

   #include "sox.h"
   #include <stdlib.h>
   #include <stdio.h>
   #include <assert.h>

   /*
    * Reads input file, applies vol & flanger effects, stores in output file.
    * E.g. example1 monkey.au monkey.aiff
    */
   int main(int argc, char * argv[])
   {
     static sox_format_t * in, * out; /* input and output files */
     sox_effects_chain_t * chain;
     sox_effect_t * e;
     char * args[10];

     assert(argc == 3);

     /* All libSoX applications must start by initialising the SoX library */
     assert(sox_init() == SOX_SUCCESS);

     /* Open the input file (with default parameters) */
     assert(in = sox_open_read(argv[1], NULL, NULL, NULL));

     /* Open the output file; we must specify the output signal characteristics.
      * Since we are using only simple effects, they are the same as the input
      * file characteristics */
     assert(out = sox_open_write(argv[2], &in->signal, NULL, NULL, NULL, NULL));

     /* Create an effects chain; some effects need to know about the input
      * or output file encoding so we provide that information here */
     chain = sox_create_effects_chain(&in->encoding, &out->encoding);

     /* The first effect in the effect chain must be something that can source
      * samples; in this case, we use the built-in handler that inputs
      * data from an audio file */
     e = sox_create_effect(sox_find_effect("input"));
     args[0] = (char *)in, assert(sox_effect_options(e, 1, args) == SOX_SUCCESS);
     /* This becomes the first `effect' in the chain */
     assert(sox_add_effect(chain, e, &in->signal, &in->signal) == SOX_SUCCESS);
     free(e);

     /* Create the `vol' effect, and initialise it with the desired parameters: */
     e = sox_create_effect(sox_find_effect("vol"));
     args[0] = "3dB", assert(sox_effect_options(e, 1, args) == SOX_SUCCESS);
     /* Add the effect to the end of the effects processing chain: */
     assert(sox_add_effect(chain, e, &in->signal, &in->signal) == SOX_SUCCESS);
     free(e);

     /* Create the `flanger' effect, and initialise it with default parameters: */
     e = sox_create_effect(sox_find_effect("flanger"));
     assert(sox_effect_options(e, 0, NULL) == SOX_SUCCESS);
     /* Add the effect to the end of the effects processing chain: */
     assert(sox_add_effect(chain, e, &in->signal, &in->signal) == SOX_SUCCESS);
     free(e);

     /* The last effect in the effect chain must be something that only consumes
      * samples; in this case, we use the built-in handler that outputs
      * data to an audio file */
     e = sox_create_effect(sox_find_effect("output"));
     args[0] = (char *)out, assert(sox_effect_options(e, 1, args) == SOX_SUCCESS);
     assert(sox_add_effect(chain, e, &in->signal, &in->signal) == SOX_SUCCESS);
     free(e);

     /* Flow samples through the effects processing chain until EOF is reached */
     sox_flow_effects(chain, NULL, NULL);

     /* All done; tidy up: */
     sox_delete_effects_chain(chain);
     sox_close(out);
     sox_close(in);
     sox_quit();
     return 0;
   }

Reference
---------

-  主页: http://sox.sourceforge.net/
-  文档: http://sox.sourceforge.net/sox.html
-  代码: git clone git://git.code.sf.net/p/sox/code sox

.. _reference: #reference
