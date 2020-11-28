var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('text_chat message', 'welcome');
  socket.broadcast.emit('hi, welcome');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('text_chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('text_chat message', msg);
  });
});
http.listen(3000, () => {
  console.log('listening on *:3000');
});