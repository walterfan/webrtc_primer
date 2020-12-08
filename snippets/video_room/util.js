function init_log(logDiv) {
    "use strict";

    var baseLogFunction = console.log;
    console.log = function(){
        baseLogFunction.apply(console, arguments);
        var lineDiv = document.createElement("div");
        var args = Array.prototype.slice.call(arguments);
        for(var i=0;i<args.length;i++){
            var node = createLogNode(args[i]);
            lineDiv.appendChild(node);

        }
        document.querySelector(logDiv).appendChild(lineDiv);
    }

    function createLogNode(message){
        var node = document.createElement("span");
        var textNode = document.createTextNode(JSON.stringify(message) + "  ");
        node.appendChild(textNode);
        return node;
    }

    window.onerror = function(message, url, linenumber) {
        console.log("JavaScript error: " + message + " on line " +
            linenumber + " for " + url);
    };
}

var tracer = {
    error :  function(arg) {
        return "error: " + arg;
    },
    warn : function(arg) {
        return "warn: " + arg;
    },
    info : function(arg) {
        return "info: " + arg;
    },
    log : function(arg) {
        return "log: " + arg;
    }
};