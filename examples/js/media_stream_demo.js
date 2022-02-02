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

function createMediaDevicesList(devices) {
  const camSpanElement =  document.querySelector('#camListSpan');
  const camSelectList = document.createElement("select");
  camSelectList.id = "camList";
  camSpanElement.appendChild(camSelectList);

  const micSpanElement =  document.querySelector('#micListSpan');
  const micSelectList = document.createElement("select");
  micSelectList.id = "micList";
  micSpanElement.appendChild(micSelectList);

  var option0 = document.createElement("option");
  option0.value = '';
  option0.text =  "---- not select ----";
  micSelectList.appendChild(option0);

  //Create and append the options
  for (var device of devices) {
      console.log("append option of device: ", device);
      var option = document.createElement("option");
      option.value = device.deviceId;
      option.text =  device.label;
      weblog(device.kind, device.deviceId, device.label);
      if(/audioinput/i.test(device.kind)) {
        micSelectList.appendChild(option);
      } else if(/videoinput/i.test(device.kind)) {
        camSelectList.appendChild(option);
      }

     
  }


}

async function openMedia(e) {


  const constraints = window.constraints = {
    audio: false,
    video: {}
  };

  const micSelect = document.querySelector('select#micList');
  var selectedMicId = micSelect.value;
  selectedMicId && (constraints.audio = {
    echoCancellation: true,
    autoGainControl: true,
    noiseSuppression: true
  }) && (constraints.audio.deviceId = selectedMicId);


  
  
  const resSelect = document.querySelector('select#resolution');
  var selectedRes = resSelect.value;

  console.log("selectedRes=", selectedRes);
  
  var frameWidth = 1024;
  var frameHeight = 768;

  switch(selectedRes) {
    case "90p":
      frameWidth = 160;
      frameHeight = 90;
      break;
    case "180p":
      frameWidth = frameWidth * 2;
      frameHeight = frameHeight * 2
      break;
    case "360p":
      frameWidth = frameWidth * 4;
      frameHeight = frameHeight * 4;
      break;
    
    case "720p":
      frameWidth = frameWidth * 8;
      frameHeight = frameHeight * 8;
      break;
    case "1080p":
      frameWidth = frameWidth * 12;
      frameHeight = frameHeight * 12;  
      break;
    default:
      frameWidth = 1024;
      frameHeight = 768;
      break;
  } ;
  constraints.video = {
    width: {ideal: frameWidth},
    height: {ideal: frameHeight},
    frameRate: {min: 30}
  }
  const camSelect = document.querySelector('select#camList');
  var selectedCamId = camSelect.value;
  selectedCamId && (constraints.video.deviceId = selectedCamId);

  const filterSelect = document.querySelector('select#filter');
  filterSelect.onchange = function() {
    const video = document.querySelector('video');
    video.className = filterSelect.value;
  };

  try {
    weblog("getUserMedia, constraints: ", JSON.stringify(constraints, null, 2));
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    
    handleSuccess(stream);
    e.target.disabled = true;
    document.querySelector('#close').disabled = false;
  } catch (ex) {
    handleError(ex);
  }
}

function closeMedia(e) {
    const videoElem = document.querySelector('video');
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();
    e.target.disabled = true;
    if(!tracks) return;
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

