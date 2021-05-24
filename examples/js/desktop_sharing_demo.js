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

const gdmOptions = {
  video: {
    cursor: "always"
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100
  }
}

var VideoRoom = function() {
  this._init.apply(this, arguments);
}

VideoRoom.prototype._init = function() {
  this.inputVideo = window.document.createElement('video');
  this.inputCanvas = window.document.createElement('canvas');
  this.inputContext = this.inputCanvas.getContext('2d');

  // get rgba data from input video
  this.inputContext.drawImage(this.inputVideo, 0, 0, this.picWidth, this.picHeight);
  var rgbaArray = this.inputContext.getImageData(0, 0, this.picWidth, this.picHeight).data;
}

function handleSuccess(stream) {
  startButton.disabled = true;
  const video = document.querySelector('video');
  video.srcObject = stream;


  const videoTracks = stream.getVideoTracks();
  const audioTracks = stream.getAudioTracks();
  if (videoTracks.length > 0) {
    weblog(`Using video device: ${videoTracks[0].label}`);
    var videoTrack = videoTracks[0];
    var trackWidth = videoTrack.getSettings().width;
    var trackHeight = videoTrack.getSettings().height;
    weblog(`video width: ${trackWidth}, height: ${trackHeight}`);
  }
  if (audioTracks.length > 0) {
    weblog(`Using audio device: ${audioTracks[0].label}`);
  }

  // demonstrates how to detect that the user has stopped
  // sharing the screen via the browser UI.
  stream.getVideoTracks()[0].addEventListener('ended', () => {
    errorMsg('The user has ended sharing the screen');
    startButton.disabled = false;
  });
}

function handleError(error) {
  errorMsg(`getDisplayMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector('#errorMsg');
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

const startButton = document.getElementById('startButton');
startButton.addEventListener('click', () => {
  navigator.mediaDevices.getDisplayMedia(gdmOptions)
      .then(handleSuccess, handleError);
});

if ((navigator.mediaDevices && 'getDisplayMedia' in navigator.mediaDevices)) {
  startButton.disabled = false;
} else {
  errorMsg('getDisplayMedia is not supported');
}
