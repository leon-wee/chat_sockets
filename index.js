var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {};

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile('/index.html');
});

io.on('connection', function(socket) {

  socket.on('name', function(name) {
    users[socket.id] = name
    socket.broadcast.emit('chat message', users[socket.id] + ' has connected');
    io.to(socket.id).emit('chat message', 'Welcome ' + users[socket.id])
  });

  socket.on('chat message', function(msg) {
    io.emit('chat message', users[socket.id] + ': ' + msg);
  });

  socket.on('typing', function(name) {
    socket.broadcast.emit('typing', name + ' is typing ... ')
  });

  socket.on('not typing', function(string) {
    socket.broadcast.emit('not typing', string)
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});