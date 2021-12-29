/*
 *  Copyright (c) 2018 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
'use strict';

// Polyfill in Firefox.
// See https://blog.mozilla.org/webrtc/getdisplaymedia-now-available-in-adapter-js/
if (adapter.browserDetails.browser == 'firefox') {
  adapter.browserShim.shimGetDisplayMedia(window, 'screen');
}

if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    weblog("enumerateDevices() not supported.");
} else {
  navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      devices.forEach(function(device) {
        weblog("Device: ", device.kind, device.label);
      });
    })
    .catch(function(err) {
      weblog(err.name + ": " + err.message);
    });
}

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const videoElement = document.getElementById('localVideo');


function getGdmOptions() {
  const textOfOptions = document.getElementById('gdmOptions');
    return JSON.parse(textOfOptions.value);
}

startButton.addEventListener('click', () => {

  var gdmOptions = getGdmOptions();

  const textOfDelay = document.getElementById('gdmDelay');
  var delayMs = +textOfDelay.value;
  weblog("getDisplayMedia after ", delayMs);
  setTimeout(function () {
    navigator.mediaDevices.getDisplayMedia(gdmOptions)
      .then(handleSuccess, handleError);
    }, +delayMs);
  
});

stopButton.addEventListener('click', () => {
  
  const stream = videoElement.srcObject;
  const tracks = stream.getTracks();
  tracks.forEach(function(track) {
      track.stop();
  });
  videoElement.srcObject = null;
  startButton.disabled = false;
});


if ((navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices)) {
  startButton.disabled = false;
} else {
  weblog('getDisplayMedia is not supported');
}

function handleSuccess(stream) {
  startButton.disabled = true;
 
  videoElement.srcObject = stream;
  var gdmOptions = getGdmOptions();
  var trackConstraints =  {
    width: 1920,
    height: 1080,
    frameRate: 5
  };

  weblog("trackConstraints: ", JSON.stringify(trackConstraints));

  const videoTracks = stream.getVideoTracks();
  const audioTracks = stream.getAudioTracks();
  if (videoTracks.length > 0) {
    var videoTrack = videoTracks[0];
    
    videoTrack.applyConstraints(trackConstraints)
    .then(() => {
      weblog("applyConstraints success");
    })
    .catch(e => {
      weblog("applyConstraints failed", e);
    });

    var trackWidth = videoTrack.getSettings().width;
    var trackHeight = videoTrack.getSettings().height;
    weblog(`Got Video track: ${videoTracks[0].label}, width: ${trackWidth}, height: ${trackHeight}`);
  }
  if (audioTracks.length > 0) {
    weblog(`Got Audio track: ${audioTracks[0].label}`);
  }

  // demonstrates how to detect that the user has stopped
  // sharing the screen via the browser UI.
  stream.getVideoTracks()[0].addEventListener('ended', () => {
    weblog('The user has ended sharing the screen');
    startButton.disabled = false;
  });
}

function handleError(error) {
  weblog(`getDisplayMedia error: ${error.name}`, error);
}

