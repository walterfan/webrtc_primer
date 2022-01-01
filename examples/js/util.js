function weblog() {
    
    var arrMsg = [];
    for (var i = 0; i < arguments.length; i++) {
        arrMsg.push(arguments[i]);
    }
    console.log(arrMsg);
    message = arrMsg.join(' ');

    let logContent = document.getElementById('logContent');
    let elem = document.createElement("li");
    elem.innerHTML = "[" + (performance.now() / 1000).toFixed(3) + "] <code>" + message + "</code>";
    logContent.appendChild(elem);
}

function listUserDevices() {
   if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
     weblog("enumerateDevices() not supported.");
     return;
   }

   // List cameras and microphones.
   navigator.mediaDevices.enumerateDevices()
       .then(function(devices) {
            var i = 0;
            devices.forEach(function(device) {
               var msg  = (++i) + ". device kind=" + device.kind + ", label=" + device.label + ", id=" + device.deviceId;
               weblog(msg);
         });
       })
       .catch(function(err) {
           var errMsg = err.name + ": " + err.message
           weblog(errMsg);
       });
}

function getSupportConstraints() {
   let supportedConstraints = navigator.mediaDevices.getSupportedConstraints();

   for (let constraint in supportedConstraints) {
     if (supportedConstraints.hasOwnProperty(constraint)) {
       weblog("<code>" + constraint + "</code>");

     }
   }
}

function getUserDevice(cbStream, cbError) {
   if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
      weblog("navigator.mediaDevices not defined");
   }

   const constraints = {
       'video': true,
       'audio': true
   }

   navigator.mediaDevices.getUserMedia(constraints)
       .then(stream => {
           weblog("Got MediaStream " + stream);
           cbStream(streeam)
       })
       .catch(error => {
           weblog("Got MediaStream " + ": " + error.name + ",  " + error.message);
           cbError(error)
       });

}

async function getConnectedDevices(type) {
   const devices = await navigator.mediaDevices.enumerateDevices();
   return devices.filter(device => device.kind === type)
}


async function createOffer(offerOptions) {
    try {
        const offer = await peerConnection.createOffer(offerOptions);
        await peerConnection.setLocalDescription(offer);
        console.log(offer.sdp);
        return offer;
      } catch (e) {
        console.log(`Failed to create offer: ${e}`);
        return null;
      }
}

function getBrowserName(brownserInfo) {
  /* jshint maxcomplexity: 16 */
  //var nVer = navigator.appVersion;
  var nAgt = navigator.userAgent;
  var browserName = navigator.appName;
  var fullVersion = '' + parseFloat(navigator.appVersion);
  var majorVersion = parseInt(navigator.appVersion, 10);
  var nameOffset, verOffset, ix;

  // In Opera 15+, the true version is after "OPR/"
  if ((verOffset = nAgt.indexOf("OPR/")) !== -1) {
      browserName = "Opera";
      fullVersion = nAgt.substring(verOffset + 4);
1
      // In older Opera, the true version is after "Opera" or after "Version"
  } else if ((verOffset = nAgt.indexOf("Opera")) !== -1) {
      browserName = "Opera";
      fullVersion = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf("Version")) !== -1) {
          fullVersion = nAgt.substring(verOffset + 8);
      }

      // In MSIE, the true version is after "MSIE" in userAgent
  } else if ((verOffset = nAgt.indexOf("MSIE")) !== -1) {
      browserName = "IE";
      fullVersion = nAgt.substring(verOffset + 5);

      // In Chrome, the true version is after "Chrome"
  } else if ((verOffset = nAgt.indexOf("Chrome")) !== -1) {
      browserName = "Chrome";
      fullVersion = nAgt.substring(verOffset + 7);
      if (nAgt.indexOf("CrOS") >= 0) {
          browserName = "Chromebook";
      }

      // In Safari, the true version is after "Safari" or after "Version"
  } else if ((verOffset = nAgt.indexOf("Safari")) !== -1) {
      browserName = "Safari";
      fullVersion = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf("Version")) !== -1) {
          fullVersion = nAgt.substring(verOffset + 8);
      }

      // In Firefox, the true version is after "Firefox"
  } else if ((verOffset = nAgt.indexOf("Firefox")) !== -1) {
      browserName = "Firefox";
      fullVersion = nAgt.substring(verOffset + 8);

      // In most other browsers, "name/version" is at the end of userAgent
  } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
      (verOffset = nAgt.lastIndexOf('/'))) {
      browserName = nAgt.substring(nameOffset, verOffset);
      fullVersion = nAgt.substring(verOffset + 1);
      if (browserName.toLowerCase() === browserName.toUpperCase()) {
          browserName = navigator.appName;
      }
  }

  // trim the fullVersion string at semicolon/space if present
  if ((ix = fullVersion.indexOf(";")) !== -1) {
      fullVersion = fullVersion.substring(0, ix);
  }
  if ((ix = fullVersion.indexOf(" ")) !== -1) {
      fullVersion = fullVersion.substring(0, ix);
  }
  majorVersion = parseInt('' + fullVersion, 10);
  if (isNaN(majorVersion)) {
      fullVersion = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
  }

  //  check if we get the browser info right
  if (isNaN(majorVersion)) {
      this._trace.error("_getDefaultbrownserInfo: failed to get browser information");
      return null;
  }

  brownserInfo.browserName = browserName;
  brownserInfo.browserFullVer = fullVersion;
  brownserInfo.browserMajorVersion = majorVersion;
  console.log("browserName=", browserName,
      "browserFullVer=", fullVersion,
      "majorVersion=", majorVersion);
}

createVideoElement = function(elementId, parentId, width) {
    
    var element = window.document.createElement('video');
    element.id = elementId;
    element.width = width || 480;
    element.autoplay = true;
    element.setAttribute('controls', true);

    var container = document.getElementById(parentId);
    container.appendChild(element);
    return element;
}

attachMediaStream = function(element, stream) {
    console.log("Attaching media stream to ", element);

    element.srcObject = stream;
    element.play();
    return element;
}

parseSDP = function(sdp) {
    arrayOfLines = sdp.match(/[^\r\n]+/g);
    return arrayOfLines.join("<br/>");
}


function setPixel(imageData, x, y, r, g, b, a){

    var index = (x + y * imageData.width);
    imageData.data[index * 4 + 0] = r;
    imageData.data[index * 4 + 1] = g;
    imageData.data[index * 4 + 2] = b;
    imageData.data[index * 4 + 3] = a;
}

function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
  }