(function(RTC, $){
    inputTxt = document.getElementById("input");
    outputTxt = document.getElementById("output");

    RTC.input = inputTxt.value;
    RTC.output = outputTxt.value;
    RTC.audioContext;

    RTC.init = function(e) {
        console.log('--- init ---');


        RTC.audioContext = new AudioContext();
    };

}( window.RTC = window.RTC || {}, jQuery));
