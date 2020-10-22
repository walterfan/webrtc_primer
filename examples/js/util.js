function weblog(message) {
    console.log(message);
    let logContent = document.getElementById('logContent');
    let elem = document.createElement("li");
    elem.innerHTML =  "<code>" + message + "</code>";
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

