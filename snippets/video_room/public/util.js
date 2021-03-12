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
        this._log("error: ", arg);
    },
    warn : function(arg) {
        this._log("warn: ", arg);
    },
    info : function(arg) {
        this._log("info: ", arg);
    },
    _log : function() {
        var args = Array.prototype.slice.call(arguments);
        var date = new Date();
        var strTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
        var prefix = strTime + ' ';
        args.unshift(prefix);
        console.log.apply(console, args);
    }

};


module.exports=tracer;




