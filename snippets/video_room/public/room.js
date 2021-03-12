'use strict';
var Room = (function(Room) {
    console.log("--- room ---");

    Room = Room ||  function(name, eventCb) {
        if (!(this instanceof Room)) {return new Room(name, eventCb);}
        this._init(name, eventCb);
    };

    Room.prototype._init = function(name, eventCb) {
        console.log("Room._init", name, eventCb);
        this.name = name;
        this.eventCb = eventCb;
        this.users = [];

        // counter for Room module created 
        if (! this.roomCount) {
            this.constructor.prototype.roomCount = 0;
        }
        this.constructor.prototype.roomCount++;
    }

    Room.instanceId = Math.floor(Math.random() * 100); //a random number in 0 - 100, to generate the instance id

    /**
     * redefine toString()
     * @returns {string}
     */
    Room.prototype.toString = function() {
        return "Room: a multiple user chat room";
    };
    return(Room);
})(Room);

/*jshint unused:false*/
var CreateRoom=Room;    //jshint ignore:line
