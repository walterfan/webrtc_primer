(function(RTC, $){
    RTC.audioContext;
    RTC.audioBuffer;
    RTC.sourceNode;
    RTC.analyserNode;
    RTC.javascriptNode;

    RTC.audioData = null;
    RTC.audioPlaying = false;
    RTC.sampleSize = 1024;  // number of samples to collect before analyzing data
    RTC.amplitudeArray;     // array to hold time domain data

    // This must be hosted on the same server as this page - otherwise you get a Cross Site Scripting error
    RTC.audioUrl = "viper.mp3";
    // Global variables for the Graphics
    RTC.canvasWidth  = 512;
    RTC.canvasHeight = 256;
    RTC.ctx;

    window.AudioContext = (function(){
        return  window.webkitAudioContext || window.AudioContext || window.mozAudioContext;
    })();

    RTC.init = function(e) {
        console.log('--- init ---');

        RTC.ctx = document.querySelector('#canvas').getContext('2d');
        RTC.audioContext = new AudioContext();
    };

    RTC.start = function(e) {
        console.log('--- start ---');
        e.preventDefault();
        // Set up the audio Analyser, the Source Buffer and javascriptNode
        RTC.setupAudioNodes();
        // setup the event handler that is triggered every time enough samples have been collected
        // trigger the audio analysis and draw the results
        RTC.javascriptNode.onaudioprocess = function () {
            // get the Time Domain data for this sample
            RTC.analyserNode.getByteTimeDomainData(RTC.amplitudeArray);
            // draw the display if the audio is playing
            if (RTC.audioPlaying == true) {
                requestAnimFrame(RTC.drawTimeDomain);
            }
        }
        // Load the Audio the first time through, otherwise play it from the buffer
        if(RTC.audioData == null) {
            RTC.loadSound(RTC.audioUrl);
        } else {
            RTC.playSound(RTC.audioData);
        }

    };

    RTC.stop = function(e) {
        console.log('--- stop ---');

        e.preventDefault();
        RTC.sourceNode.stop(0);
        RTC.audioPlaying = false;

    };

    RTC.setupAudioNodes=function() {
        RTC.sourceNode     =  RTC.audioContext.createBufferSource();
        RTC.analyserNode   = RTC.audioContext.createAnalyser();
        RTC.javascriptNode = RTC.audioContext.createScriptProcessor(RTC.sampleSize, 1, 1);

        // Create the array for the data values
        RTC.amplitudeArray = new Uint8Array(RTC.analyserNode.frequencyBinCount);
        // Now connect the nodes together
        RTC.sourceNode.connect(RTC.audioContext.destination);
        RTC.sourceNode.connect(RTC.analyserNode);
        RTC.analyserNode.connect(RTC.javascriptNode);
        RTC.javascriptNode.connect(RTC.audioContext.destination);
    }

    RTC.loadSound = function(audioUrl) {
        document.getElementById('msg').textContent = "Loading audio...";
        let request = new XMLHttpRequest();
        request.open('GET', audioUrl, true);
        request.responseType = 'arraybuffer';
        // When loaded, decode the data and play the sound
        request.onload = function () {
            RTC.audioContext.decodeAudioData(request.response, function (buffer) {
                document.getElementById('msg').textContent = "Audio sample download finished";
                RTC.audioData = buffer;
                RTC.playSound(RTC.audioData);
            }, onError);
        }
        request.send();
    };

    RTC.playSound = function(audioData) {
        RTC.sourceNode.buffer = audioData;
        RTC.sourceNode.start(0);    // Play the sound now
        RTC.sourceNode.loop = true;
        RTC.audioPlaying = true;
    };

    RTC.drawTimeDomain = function() {
        RTC.clearCanvas();
        for (let i = 0; i < RTC.amplitudeArray.length; i++) {
            let value = RTC.amplitudeArray[i] / 256;
            let y = RTC.canvasHeight - (RTC.canvasHeight * value) - 1;
            RTC.ctx.fillStyle = '#ffffff';
            RTC.ctx.fillRect(i, y, 1, 1);
        }
    }

    RTC.clearCanvas = function() {
        RTC.ctx.clearRect(0, 0, RTC.canvasWidth, RTC.canvasHeight);
    }

    function onError(e) {
        console.log(e);
    }

    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function(callback, element){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

}( window.RTC = window.RTC || {}, jQuery));
