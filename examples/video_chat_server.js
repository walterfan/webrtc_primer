var static = require('node-static');
var http = require('http');
var moment = require('moment');
// Create a node-static server instance
var file = new(static.Server)();
const port = 8181;
// We use the http module�s createServer function and
// rely on our instance of node-static to  serve the files
console.log("video chart server listen on " + port);
var httpServer = http.createServer(function (req, res) {
  file.serve(req, res);
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
                console.log('will broadcast message:', message);
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
                        console.log(room + " created: " + numClients);
                } else if (numClients == 1) {
                        // Second client joining...
                        io.sockets.in(room).emit('join', room);
                        socket.join(room);
                        socket.emit('joined', room);
                        console.log(room + " joined: " + numClients);
                } else { // max two clients
                        socket.emit('full', room);
                        console.log(room + " full: " + numClients);
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