/*
 *  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */
'use strict';

// Put variables in global scope to make them available to the browser console.


function handleSuccess(stream) {
  const video = document.querySelector('video');
  const videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  if (error.name === 'ConstraintNotSatisfiedError') {
    const v = constraints.video;
    errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
  } else if (error.name === 'PermissionDeniedError') {
    errorMsg('Permissions have not been granted to use your camera and ' +
      'microphone, you need to allow the page access to your devices in ' +
      'order for the demo to work.');
  }
  errorMsg(`getUserMedia error: ${error.name}`, error);
}

function errorMsg(msg, error) {
  const errorElement = document.querySelector('#logDiv');
  errorElement.innerHTML += `<p>${msg}</p>`;
  if (typeof error !== 'undefined') {
    console.error(error);
  }
}

async function openCamera(e) {

  weblog("-------- Available User Devices -----------")
  listUserDevices();

  const constraints = window.constraints = {
    audio: false,
    video: true
  };

  const resSelect = document.querySelector('select#resolution');
  var selectedRes = resSelect.value;

  console.log("selectedRes=", selectedRes);
  switch(selectedRes) {
    case "90p":
      constraints.video = {
        mandatory: {
          maxWidth: 160,
          maxHeight: 90
        }
      }  
      break;
    case "180p":
      constraints.video = {
          mandatory: {
            maxWidth: 320,
            maxHeight: 180
          }
        }    
      break;
    case "360p":
      constraints.video = {
          mandatory: {
            maxWidth: 640,
            maxHeight: 360
          }
        }    
      break;
    
    case "720p":
      constraints.video = {
          mandatory: {
            maxWidth: 1280,
            maxHeight: 720
          }
        }    
      break;
    case "1080p":
      constraints.video = {
          mandatory: {
            maxWidth: 1920,
            maxHeight: 1080
          }
        }    
      break;
    default:
      constraints.video = {
          mandatory: {
            maxWidth: 1024,
            maxHeight: 768
          }
        }  
      
      break;
  }      
  
  const filterSelect = document.querySelector('select#filter');
  filterSelect.onchange = function() {
    const video = document.querySelector('video');
    video.className = filterSelect.value;
  };

  try {
    console.log("to getUserMedia, constraints: ", constraints);
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    
    handleSuccess(stream);
    e.target.disabled = true;
    document.querySelector('#close').disabled = false;
  } catch (ex) {
    handleError(ex);
  }
}

function closeCamera(e) {
    const videoElem = document.querySelector('video');
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();
    e.target.disabled = true;
    document.querySelector('#open').disabled = false;
    tracks.forEach(function(track) {
      track.stop();
    });
  
    videoElem.srcObject = null;
}

async function takeSnapshot(e) {
    console.log("take snapshot");
    try {
        const video = document.querySelector('video');
        const canvas = window.canvas = document.querySelector('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    } catch (ex) {
        handleError(ex);
    }
}

