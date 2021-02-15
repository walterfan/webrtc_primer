'use strict';

var Session = (function(Session) {

    Session = Session ||  function(eventCb) {
        if (!(this instanceof Session)) {return new Session(eventCb);}
        this._init(eventCb);
    };

    Session.prototype._init = function(eventCb) {
        console.log("Session._init");
    } 

    return(Session);
})(Session);

var CreateSession = Session;