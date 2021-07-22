########################
HTML5 for WebRTC
########################

.. contents::
    :local:


Audio Element
======================

.. code-block:: html

    <audio src="xxx.mp3" controls autoplay> </audio>


Audio Context
---------------------

Video Element
=======================

.. code-block:: html

    <video src="xxx.mp4" controls autoplay width="400" height="300"> </video>

methods
-----------------------

* play
* pause


property
-----------------------
* playbackRate
* currentTime
* duration
* srcObject


File format and codec
-----------------------


.. list-table::
  :widths: 15 10 25 50
  :header-rows: 1

  * - format
    - description
    - extension
    - mime type
  * - mp3
    - compressed music file
    - mp3
    - audio/mp3
  * - wav
    - raw audio file
    - wav
    - audio/wav
  * - ogg vobis
    - compressed audio file
    - ogg
    - audio/ogg
  * - ogg theora
    - compressed audio file
    - ogv
    - video/ogg
  * - H.264
    - compressed video file
    - mp4
    - video/mp4
  * - WebM
    - compressed video file
    - webm
    - video/webm


Canvas
======================

.. code-block:: html

    <canvas id="myCanvas" width="640" height="480"> </canvas>


Canvas Context
---------------------

.. code-block:: javascript

    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");

    context.lineWidth = 10;
    context.strokeStyle = "#3366ff";

    context.moveTo(10, 10);
    context.lineTo(400,10);
    context.lineCap = "butt";
    context.stroke();


Canvas library:

* Fabric.js
* KineticJS


Canvas data
-----------------------

.. code-block:: javascript

    var url = canvas.toDataURL("image/jpeg");


Canvas and image
-----------------------

.. code-block:: javascript

    var img = new Image();
    img.src = "smile.png";

    img.onload = function() {
        var url = canvas.drawImage(img, 10, 10, 200, 2000);
        context.font = "20px Arial";
        context.textBaseline = "top";
        context.fillStyle = "black";
        context.fillText("I'm happy on web");
    }
