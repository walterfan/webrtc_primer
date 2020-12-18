var static = require('node-static');
var moment = require('moment');
var http = require('http');

// Create a node-static server instance listening on port 8181
var file = new(static.Server)();

var port= 8181;
// We use the http moduleÕs createServer function and
// use our instance of node-static to serve the files
var httpServer = http.createServer(function (req, res) {
  file.serve(req, res);
}).listen(port);

console.log('Listening on ' + port);

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
var isConnected = false;
// Let's start managing connections...
io.sockets.on('connection', function (socket) {
        if(!isConnected) {
            isConnected = true;
            console.log("connected");
        }
		// Handle 'message' messages
        socket.on('message', function (message) {
                console.log('Got message: ', message);
                log('Server --> Got message: ', message);
                socket.broadcast.to(message.channel).emit('message', message.message);
        });

		// Handle 'create or join' messages
        socket.on('create or join', function (channel) {
               var numClients =  getParticipantsOfRoom(channel);
                console.log('numclients = ' + numClients);

                // First client joining...
                if (numClients == 0){
                        socket.join(channel);
                        socket.emit('created', channel);
                        console.log("socket.rooms: ", socket.rooms);
                // Second client joining...
                } else if (numClients == 1) {
                        // Inform initiator...
                		io.sockets.in(channel).emit('remotePeerJoining', channel);
                		// Let the new peer join channel
                        socket.join(channel);

                        socket.broadcast.to(channel).emit('broadcast: joined', 'S --> \
                        		broadcast(): client ' + socket.id + ' joined channel ' + channel);
                } else { // max two clients
                		console.log("Channel full!");
                        socket.emit('full', channel);
                }
        });

        // Handle 'response' messages
        socket.on('response', function (response) {
            log('S --> Got response: ', response);

            // Just forward message to the other peer
            socket.broadcast.to(response.channel).emit('response', response.message);
        });

        // Handle 'Bye' messages
        socket.on('Bye', function(channel){
        	// Notify other peer
        	socket.broadcast.to(channel).emit('Bye');

        	// Close socket from server's side
        	socket.disconnect();
        });

        // Handle 'Ack' messages
        socket.on('Ack', function () {
            console.log('Got an Ack!');
            // Close socket from server's side
        	socket.disconnect();
        });

		// Utility function used for remote logging
		function log(){
			var array = ["* " + moment().format() + ": "];
			for (var i = 0; i < arguments.length; i++) {
				array.push(arguments[i]);
			}
			socket.emit('log', array);
		};
});
