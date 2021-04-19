
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
        'wasm_server': { type: "file", filename: "wasm_server.log" } 
  },
  categories: { default: { 
      appenders: ["stdout","screen_share"], 
      level: "info" } 
  }
});
 
const logger = log4js.getLogger("screen_share");

const options = {
    index: "screen_share_demo.html"
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

logger.info(`screen shares server listen on https://localhost:${httpsPort}`);
httpsServer.listen(httpsPort);