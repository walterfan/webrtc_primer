// common functions
var logDiv = document.getElementById('logDiv');
var stateDiv = document.getElementById('stateDiv');
var statsDiv = document.getElementById('statsDiv');

var wait = ms => new Promise(r => setTimeout(r, ms));
var repeat = (ms, func) => new Promise(r => (setInterval(func, ms), wait(ms).then(r)));
var log = msg => { console.log(msg); logDiv.innerHTML = logDiv.innerHTML + msg + "<br>";  };
var update = (div, msg) => div.innerHTML = msg;

var statsTypes = getStatsTypes();
var statsInterval = getStatsInterval();
var metricsNames = getMetricsNames();

function getStatsInterval() {
    var element = document.getElementById('interval');
    console.log("interval: ", element.value);
    return element.value
}

function getMetricsNames() {
    var element = document.getElementById('metricsNames');
    console.log("metricsNames: ", element.value);
    return element.value
}

function getStatsTypes() {
    var select = document.getElementById('statsTypes');
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];

        if (opt.selected) {
        result.push(opt.value || opt.text);
        }
    }
    console.log("statsTypes:", result);
    return result;
}

function filterStatsType(theType) {
    return statsTypes.includes(theType);
}


function filterMetricsName(theName) {
    return metricsNames.includes(theName || metricsNames.includes("All"));
}

function enableAudio() {
    var ret = document.getElementById("enableAudio").checked;
    console.log("enableAudio:", ret);
    return !!ret;
}

function enableVideo() {
    var ret = document.getElementById("enableVideo").checked;
    console.log("enableVideo:", ret);
    return !!ret;
}

var pc1 = new RTCPeerConnection();
var pc2 = new RTCPeerConnection();

var v1 = document.getElementById('v1');
var v2 = document.getElementById('v2');

var add = (pc, can) => can && pc.addIceCandidate(can).catch(log);
pc1.onicecandidate = e => add(pc2, e.candidate);
pc2.onicecandidate = e => add(pc1, e.candidate);

pc2.oniceconnectionstatechange = () => log("iceconnectionstate: " + pc2.iceConnectionState);
pc2.onaddstream = e => v2.srcObject = e.stream;

var mute = () => v1.srcObject.getTracks().forEach(t => t.enabled = !t.enabled);
var startMedia = () => navigator.mediaDevices.getUserMedia({
    video: enableAudio(),
    audio: enableVideo()
    })
    .then(stream => (pc1.addStream(v1.srcObject = stream), pc1.createOffer()))
    .then(offer => pc1.setLocalDescription(offer))
    .then(() => pc2.setRemoteDescription(pc1.localDescription))
    .then(() => pc2.createAnswer())
    .then(answer => pc2.setLocalDescription(answer))
    .then(() => pc1.setRemoteDescription(pc2.localDescription))
    .then(() => repeat(statsInterval, () => Promise.all([pc1.getStats(), pc2.getStats()])
    .then(([s1, s2]) => {
        var s = "";
        s += filterStats(s1);
        update(statsDiv, "<small>" + s + "</small>");
    })))
    .catch(e => log(e));

var stopMedia =  function(e) {
    const stream = v1.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(function(track) {
        track.stop();
    });
    v1.srcObject = null;

    e.target.disabled = true;
    //startButton.disabled = false;
    //stopButton.disabled = true;
}


function filterStats(stats) {
    let statsOutput = "";

    stats.forEach(report => {
        if(filterStatsType(report.type)) {
            statsOutput += `<h2>Report: ${report.type}</h3>\n<strong>ID:</strong> ${report.id}<br>\n` +
                     `<strong>Timestamp:</strong> ${report.timestamp}<br>\n`;

            Object.keys(report).forEach(statName => {
                if (statName !== "id" && statName !== "timestamp" && statName !== "type") {
                statsOutput += `<strong>${statName}:</strong> ${report[statName]}<br>\n`;
                }
            });
        }
      
    });

    return statsOutput;
}

function dumpStats(o) {
    var s = "Timestamp: " + new Date(o.timestamp).toTimeString() + " Type: " + o.type + "<br>";
    if (o.ssrc !== undefined) s += "SSRC: " + o.ssrc + " ";
    if (o.packetsReceived !== undefined) {
    s += "Recvd: " + o.packetsReceived + " packets";
    if (o.bytesReceived !== undefined) {
        s += " (" + (o.bytesReceived / 1024000).toFixed(2) + " MB)";
    }
    if (o.packetsLost !== undefined) s += " Lost: " + o.packetsLost;
    } else if (o.packetsSent !== undefined) {
    s += "Sent: " + o.packetsSent + " packets";
    if (o.bytesSent !== undefined) s += " (" + (o.bytesSent / 1024000).toFixed(2) + " MB)";
    } else {
    s += "<br><br>";
    }
    s += "<br>";
    if (o.bitrateMean !== undefined) {
    s += " Avg. bitrate: " + (o.bitrateMean / 1000000).toFixed(2) + " Mbps";
    if (o.bitrateStdDev !== undefined) {
        s += " (" + (o.bitrateStdDev / 1000000).toFixed(2) + " StdDev)";
    }
    if (o.discardedPackets !== undefined) {
        s += " Discarded packts: " + o.discardedPackets;
    }
    }
    s += "<br>";
    if (o.framerateMean !== undefined) {
    s += " Avg. framerate: " + (o.framerateMean).toFixed(2) + " fps";
    if (o.framerateStdDev !== undefined) {
        s += " (" + o.framerateStdDev.toFixed(2) + " StdDev)";
    }
    }

    if (o.droppedFrames !== undefined) s += " Dropped frames: " + o.droppedFrames;
    if (o.jitter !== undefined) s += " Jitter: " + o.jitter;
    return s;
}


// define behaviour here
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

startButton.addEventListener('click', startMedia);
stopButton.addEventListener('click', stopMedia);


//log("Please click start button to connect and statistics");
stopButton.disabled = true;
//log(getStatsInterval());
//log(getStatsTypes());
//log(getMetricsNames());