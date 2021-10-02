################
WebRTC API
################

.. include:: ../links.ref
.. include:: ../tags.ref
.. include:: ../abbrs.ref


.. contents::
    :local:

RTCPeerConnection
==========================

Syntax

.. code-block::

    pc = new RTCPeerConnection([configuration]);

GUM-getUserMedia
==========================

audio
--------------------------

.. code-block::

    <script>
        const constraints = {
            audio: true
        };

        function handleSuccess(stream) {
            document.querySelector('audio').srcObject = stream;
        }

        function handleError(error) {
            console.log('getUserMedia error: ', error);
        }

        navigator.mediaDevices.getUserMedia(constraints)
                .then(handleSuccess)
                .catch(handleError);
    </script>


video
--------------------------

.. code-block::

    <script>
        const constraints = {
            video: true
        };

        function handleSuccess(stream) {
            document.querySelector('video').srcObject = stream;
        }

        function handleError(error) {
            console.log('getUserMedia error: ', error);
        }

        navigator.mediaDevices.getUserMedia(constraints)
                .then(handleSuccess)
                .catch(handleError);
    </script>

GDM-getDisplayMedia
==========================


share
--------------------------

.. code-block::

    <script>
        const constraints = {
            video: true
        };

        function handleSuccess(stream) {
            document.querySelector('video').srcObject = stream;
        }

        function handleError(error) {
            console.log('getDisplayMedia error: ', error);
        }

        navigator.mediaDevices.getDisplayMedia(constraints)
                .then(handleSuccess)
                .catch(handleError);
    </script>

