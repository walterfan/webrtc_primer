##########################
JavaScript Can Do More 
##########################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref

============ ==========================
**Abstract** JavaScript Can Do More 
**Authors**  Walter Fan
**Status**   WIP
**Updated**  |date|
============ ==========================

.. |date| date::

.. contents::
   :local:

概述
=============

JavaScript 早已今非昔比，浏览器的功能越来越丰富，几乎成为了第二个操作系统类的开发平台，而 JavaScript 作为每个浏览器都支持的脚本语言在近年来也发扬光大，伴随着nodejs的发展， 它也从一门依附于浏览器的脚本语言发展成为了一门全栈语言。

我曾经写过一篇吐槽的文章："`C++程序员眼中丑陋的 JS`_", 从 C++ 程序员的角度，历数 JavaScript 的种种不是。现在看来，观点有点偏激，在充分了解了 JS 这几年的发展之后，不得不对它刮目相看。

例如，在 "|ModernJS|" 中提到过的 Top features


* The let keyword
* The const keyword
* JavaScript Arrow Functions
* JavaScript Classes
* Template literals
* Freeze Objects
* Destructuring
* Promises



类与模块的完善
==========================

异步功能
==========================


使用回调 callback
--------------------------

.. code-block:: JavaScript

   setTimeout(aJobFunction, aJobIntervalMs);

   let jobId = setInterval(aJobFunction, aJobIntervalMs);

   function stopJob() {
      clearInterval(jobId);
   }

使用期约 Promise
--------------------------

.. code-block:: JavaScript

   new Promise(function (resolve, reject) {
      var a = 0;
      var b = 1;
      if (b == 0) reject("Divide zero");
      else resolve(a / b);
   }).then(function (value) {
      console.log("a / b = " + value);
   }).catch(function (err) {
      console.log(err);
   }).finally(function () {
      console.log("End");
   });

async and await
--------------------------

.. code-block:: JavaScript

   async function asyncFunc() {
      await print(1000, "First");
      await print(4000, "Second");
      await print(3000, "Third");
   }
   asyncFunc();

多线程
==========================


参考资料
=============

* `Modern JavaScript Features That Every Programmer Must Know <ModernJS_>`_ 

.. |ModernJS| replace:: Modern JavaScript Features That Every Programmer Must Know..!
.. _ModernJS: https://medium.com/devtechtoday/modern-javascript-features-that-every-programmer-must-know-83a1f37af2f2
.. _C++程序员眼中丑陋的 JS: https://www.jianshu.com/p/e301932c5b6d