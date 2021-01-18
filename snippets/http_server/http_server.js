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

var fs = require("fs");
var http = require("http");
var args = require('yargs');
const staticServer = require('node-static');

var argv = args.argv;
var port = argv.port || 9001;

// Create a node-static server instance
const fileServer = new(staticServer.Server)();

// We use the http module's createServer function and
// rely on our instance of node-static to  serve the files
logger.info("http server listen on " + port);

var httpServer = http.createServer(function (req, res) {
    fileServer.serve(req, res);
}).listen(port);

