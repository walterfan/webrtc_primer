// declare web elements
var logDiv = document.getElementById('logDiv');
var statsDiv = document.getElementById('statsDiv');
var statsDiv2 = document.getElementById('statsDiv2');

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

var wait = function(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

var repeat = function(ms, func) {
    return new Promise((resolve) => {
        setInterval(func, ms);
        wait(ms).then(resolve);
    });
};

var log = function(msg) { 
    console.log(msg); 
    logDiv.innerHTML = logDiv.innerHTML + msg + "<br>";  
};

var update = (div, msg) => div.innerHTML = msg;

var statsInterval ;
var metricsNames;
var statsTypes;

log("---------- <b>Web Logs</b> ----------");
var browserInfo = {};
getBrowserName(browserInfo);
log(`Browser: ${browserInfo.browserName}.${browserInfo.browserFullVer}`);
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
    var bAudio = enableAudio();
    var bVideo = enableVideo();
    var constraints = {
        audio: bAudio, 
        video: bVideo
    }

    if(bVideo) {
        constraints.video = {
            width: {
                max: 1920
            },
            height: {
                max: 1080
            },
            frameRate: {
              max: 60
            }
        }
    }

    log("start media: ", constraints);
    navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => (pc1.addStream(v1.srcObject = stream), pc1.createOffer()))
    .then(offer => offer && (offer.sdp = offer.sdp.replace(/VP8/g, "H264") && pc1.setLocalDescription(offer))
    .then(() => pc2.setRemoteDescription(pc1.localDescription))
    .then(() => pc2.createAnswer())
    .then(answer => pc2.setLocalDescription(answer))
    .then(() => pc1.setRemoteDescription(pc2.localDescription))
    .then(() => repeat(statsInterval, () => Promise.all([pc1.getStats(), pc2.getStats()])
    .then(([s1, s2]) => {
        var statsString = "";
        statsString += filterStats(s1);
        update(statsDiv, "<small>" + statsString + "</small>");

        var statsString2 = "";
        statsString2 += filterStats(s2);
        update(statsDiv2, "<small>" + statsString2 + "</small>");

    })))
    .catch(e => log(e)));
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

            statsOutput += `<hr/><h2>Report: ${report.type}</h2>\n<strong>ID:</strong> ${report.id}<br>\n` +
                     `<strong>Timestamp:</strong> ${report.timestamp}<br>\n`;


            Object.keys(report).forEach(statName => {
                if (statName !== "id" && statName !== "timestamp" && statName !== "type") {
                    statsOutput += `<strong>${statName}:</strong> ${report[statName]}<br>\n`;
                    console.log(`[stats] ${statName}=${report[statName]}`)
                }
            });

            if(report.type === 'inbound-rtp' || report.type === 'outbound-rtp') {
                var trackObj = stats.get(report.trackId);
                if(trackObj) {
                    statsOutput += `<hr/><h4>Track Stats</h4><strong>trackId:</strong> ${report.trackId}<br>\n`;
                    Object.keys(trackObj).forEach(itemName => {
                        //if (statName !== "id" && statName !== "timestamp" && statName !== "type") {
                        statsOutput += `<strong>${itemName}:</strong> ${trackObj[itemName]}<br>\n`;
                        //}
                    });
                }
            }

        }

    });

    return statsOutput;
}
