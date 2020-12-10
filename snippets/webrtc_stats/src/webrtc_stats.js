'use strict';
var Statistician = (function(Statistician) {
    console.log("--- Statistician ---");

    var DEFAULT_STATISTIC_PERIOD = 1000; // 1 second 

    Statistician = Statistician ||  function(name, eventCb) {
        if (!(this instanceof Statistician)) {return new Statistician(name, eventCb);}
        this._init(name, eventCb);
    };

    Statistician.prototype._init = function(name, eventCb) {
        console.log("Statistician._init", name, eventCb);
        this.name = name;
        this.eventCb = eventCb;
        this.peers = {};
        this.statisticCount = 0;

        // counter for Statistician module created 
        if (! this.instanceCount) {
            this.constructor.prototype.instanceCount = 0;
        }
        this.constructor.prototype.instanceCount++;
    }

    Statistician.instanceId = Math.floor(Math.random() * 100); //a random number in 0 - 100, to generate the instance id

 
    /**
     * redefine toString()
     * @returns {string}
     */
    Statistician.prototype.toString = function() {
        return "Statistician: a WebRTC statistician";
    };

    Statistician.prototype.getStatisticCount = function() {
        return this.statisticCount;
    };

    Statistician.prototype.increaseStatisticCount = function() {
        return ++this.statisticCount;
    };

    return(Statistician);
})(Statistician);

/*jshint unused:false*/
var CreateStatistician=Statistician;    //jshint ignore:line

module.exports = CreateStatistician;