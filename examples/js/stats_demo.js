// declare web elements
var logDiv = document.getElementById('logDiv');
var statsDiv = document.getElementById('statsDiv');

var intervalBox = document.getElementById('interval');
var metricsNamesBox = document.getElementById('metricsNames');
var selectList = document.getElementById('statsTypes');


var startButton = document.getElementById('startButton');
var stopButton = document.getElementById('stopButton');

// define behaviour here
startButton.addEventListener('click', startMedia);
stopButton.addEventListener('click', stopMedia);
intervalBox.addEventListener('change', getStatsInterval);
metricsNamesBox.addEventListener('change', getMetricsNames);
selectList.addEventListener('change', getStatsTypes);

var wait = ms => new Promise(r => setTimeout(r, ms));
var repeat = (ms, func) => new Promise(r => (setInterval(func, ms), wait(ms).then(r)));
var log = msg => { console.log(msg); logDiv.innerHTML = logDiv.innerHTML + msg + "<br>";  };
var update = (div, msg) => div.innerHTML = msg;

var statsInterval ;
var metricsNames;
var statsTypes;

log("----- Web Logs ------");
getStatsTypes();
getStatsInterval();
getMetricsNames();

function getStatsInterval() {
    log("interval: " + intervalBox.value);
    statsInterval = intervalBox.value;
}

function getMetricsNames() {
    log("metricsNames: " + metricsNamesBox.value);
    metricsNames = metricsNamesBox.value;
}

function getStatsTypes() {
    var result = [];
    var options = selectList && selectList.options;
    var opt;

    for (var i=0, iLen=options.length; i<iLen; i++) {
        opt = options[i];

        if (opt.selected) {
        result.push(opt.value || opt.text);
        }
    }
    log("statsTypes:"+ result);
    statsTypes = result;
}

function filterStatsType(theType) {
    return statsTypes.includes(theType);
}


function filterMetricsName(theName) {
    return metricsNames.includes(theName || metricsNames.includes("All"));
}

function enableAudio() {
    var ret = document.getElementById("enableAudio").checked;
    log("enableAudio:" + ret);
    return !!ret;
}

function enableVideo() {
    var ret = document.getElementById("enableVideo").checked;
    log("enableVideo:" + ret);
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

function startMedia() {
    log("start media");
    navigator.mediaDevices.getUserMedia({
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
}

function stopTracks(e) {
    const stream = e.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(function(track) {
        track.stop();
    });
    e.srcObject = null;
}

function stopMedia(e) {
    stopTracks(v1);
    stopTracks(v2);
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
