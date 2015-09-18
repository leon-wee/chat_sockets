var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var names = [];

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile('/index.html');
});

io.on('connection', function(socket) {
  socket.broadcast.emit('chat message', 'A user has connected');

  socket.on('name', function(name) {
    names.push(name);
  });

  socket.on('chat message', function(msg) {
    io.emit('chat message', names[0] + ': ' + msg);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});