const log4js = require("log4js");
log4js.configure({
  appenders: { 
        'stdout': { type: 'stdout' },  
        'video_chat': { type: "file", filename: "video_chat.log" } 
  },
  categories: { default: { 
      appenders: ["stdout","video_chat"], 
      level: "info" } 
  }
});
 
const logger = log4js.getLogger("video_chat")

const staticServer = require('node-static');
const http = require('http');
const moment = require('moment');

const port = 8181;

// Create a node-static server instance
const fileServer = new(staticServer.Server)();

// We use the http module's createServer function and
// rely on our instance of node-static to  serve the files
logger.info("video chart server listen on " + port);
var httpServer = http.createServer(function (req, res) {
    fileServer.serve(req, res);
}).listen(port);

// Use socket.io JavaScript library for real-time web applications

var io = require('socket.io')(httpServer);

function getParticipantsOfRoom(roomId, namespace) {
    
    var count = 0;
    var ns = io.of(namespace||"/");    // the default namespace is "/"
 
    for (let [key, value] of ns.adapter.rooms) {
        
        if(key === roomId) {
            count += value.size;
        } 
    }
    
    return count;
}

// Let's start managing connections...
io.sockets.on('connection', function (socket){

    	// Handle 'message' messages
        socket.on('message', function (message) {
                log('Server --> got message: ', message);
                logger.info('will broadcast message:', message);
                // channel-only broadcast...
                //socket.broadcast.to(socket.channel).emit('message', message);
                socket.broadcast.emit('message', message);

        });

        // Handle 'create or join' messages
        socket.on('create or join', function (room) {

                var numClients =  getParticipantsOfRoom(room);

                log('Server --> Room ' + room + ' has ' + numClients + ' client(s)');
                log('Server --> Request to create or join room', room);

                // First client joining...
                if (numClients == 0){
                        socket.join(room);
                        socket.emit('created', room);
                        logger.info(room + " created: " + numClients);
                } else if (numClients == 1) {
                        // Second client joining...
                        io.sockets.in(room).emit('join', room);
                        socket.join(room);
                        socket.emit('joined', room);
                        logger.info(room + " joined: " + numClients);
                } else { // max two clients
                        socket.emit('full', room);
                        logger.info(room + " full: " + numClients);
                }
        });

        function log(){
            var array = ["* " + moment().format() + ">>> "];
            for (var i = 0; i < arguments.length; i++) {
            	array.push(arguments[i]);
            }
            socket.emit('log', array);
        }
});