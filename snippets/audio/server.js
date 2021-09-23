const fs = require('fs');
const http = require('http');
const https = require('https');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');

const log4js = require("log4js");
log4js.configure({
  appenders: {
    'stdout': { type: 'stdout' },
    'rtcapp': {
      filename: "audio_metrics.log",
      type: 'dateFile',
      pattern: "yyyy-MM-dd",
      keepFileExt: true,
      maxLogSize: 1024 * 1024 * 10, //1024 * 1024 * 1 = 10M
      backups: 2,
      alwaysIncludePattern: true,
      daysToKeep: 7,
      layout: {
        type    : "pattern",
        pattern : "%d{ABSOLUTE} %[%-5p%] %c %x{singleLine}",
        tokens: {
          singleLine : function(logEvent) {
            // logEvent.data is an array that contains the arguments to the log.info() call
            return  JSON.stringify(logEvent.data[0]);
          }
        }
      }
    }
  },
  categories: { default: {
      appenders: ["stdout","rtcapp"],
      level: "info" }
  }
});

const logger = log4js.getLogger("rtcapp");

const express = require('express');
const app = express();
const path = require('path');

const options = {
  index: "index.html"
};


const db = new sqlite3.Database('./telemetry.db', (err) => {
  if (err) {
    console.error("Erro opening database " + err.message);
  } else {

    db.run(`CREATE TABLE telemetry( 
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            type NVARCHAR(32)  NOT NULL,
            category  NVARCHAR(32),
            label     NVARCHAR(64),
            report TEXT  NOT NULL,
            time Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP 
        )`, (err) => {
      if (err) {
        console.log("Table already exists.");
      }
      let insert = 'INSERT INTO telemetry (type, category, label, report) VALUES (?,?, ? ,?)';
      db.run(insert, ["event",  "system", "PT", "startup"]);
    });
  }
});

app.use('/', express.static(path.join(__dirname, '/'), options));

// parse requests of content-type - application/x-www-form-urlencoded and application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/v1/ping', (req, res) => {
  res.json({"message": "Healthy", "serviceState": "online"});
});

app.post('/api/v1/events', function(request, response) {
  console.log("received event: ", request.body);      // your JSON
  response.send({"result": "OK"});
  logger.info(request.body);
});

const httpPort = 2008;
const httpsPort = 2009;

const certificate = fs.readFileSync('./domain.crt', 'utf8');
const privateKey  = fs.readFileSync('./domain.key', 'utf8');

const credentials = {key: privateKey, cert: certificate};


const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
console.log(`Running local tool http page on ${httpPort} ${httpsPort}`);
//console.log('Running local tool https page on 8043');
httpServer.listen(httpPort);
httpsServer.listen(httpsPort);
