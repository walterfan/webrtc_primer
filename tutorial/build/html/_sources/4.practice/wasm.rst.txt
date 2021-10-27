######################
WebAssebly
######################


简介
===================

WebAssembly 的基本想法就是让浏览器加载由其他语言编译而成的二进制模块,并高效地解释和执行, 从而提高性能。

Javascript 之所以慢，一个重要原因就是它是解释执行的，

WebAssembly 简称 wasm 是一种新型的二进制代码格式， 浏览器可以用类似模块加载的方式来加载，解析和执行 wasm 文件。

wasm 描述一个内存安全的沙箱执行环境，可在 JavaScript 虚拟机中实现， 并遵循与 Web 应用一致的同源策略来保证其安全性。

相对 wasm 的二进制文件格式，它还有对应的 wat 可读文本格式。

.. figure:: ../_static/v8_pipeline_wasm.png
   :scale: 100 %
   :alt: V8 Pipeline Design + WASM


所有变量存储的数据类型都是在程序运行之前就已经确定，并在后续运行过程中无法更改。



核心原理
==================

Web 接口



Reference
==================


* `WebAssembly Getting Started`_

.. _WebAssembly Getting Started: https://webassembly.org/getting-started/developers-guide/

* `Compiling an Existing C Module to WebAssembly`_

.. _Compiling an Existing C Module to WebAssembly: https://developer.mozilla.org/en-US/docs/WebAssembly/existing_C_to_wasm

* `Compiling a New C/C++ Module to WebAssembly`_

.. _Compiling a New C/C++ Module to WebAssembly: https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm


* `A comparison with WebAssembly`_.

.. _A comparison with WebAssembly: https://blog.sessionstack.com/how-javascript-works-a-comparison-with-webassembly-why-in-certain-cases-its-better-to-use-it-d80945172d79