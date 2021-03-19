
const fs = require('fs');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
//const sqlite3 = require('sqlite3');

const moment = require('moment');
const express = require('express');
const path = require('path');

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
 
const logger = log4js.getLogger("video_chat");

const options = {
    index: "video_chat_demo.html"
  };
  
const httpPort = 8181;
const httpsPort = 8183;

const certificate = fs.readFileSync('./domain.crt', 'utf8');
const privateKey  = fs.readFileSync('./domain.key', 'utf8');

const credentials = {key: privateKey, cert: certificate};

const app = express();

app.use('/', express.static(path.join(__dirname, '/'), options));

// parse requests of content-type - application/x-www-form-urlencoded and application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/v1/ping', (req, res) => {
  res.json({"message": "Healthy", "serviceState": "online"});
});

app.post('/api/v1/events', function(request, response) {
    console.log("received event: ", request.body); 
    response.send({"result": "OK"});
    logger.info(request.body);
  });


const httpsServer = https.createServer(credentials, app);

console.log(`video chart serve on https://localhost:${httpsPort}`);
httpsServer.listen(httpsPort);

// Use socket.io JavaScript library for real-time web applications

var io = require('socket.io')(httpsServer);

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