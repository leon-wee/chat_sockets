$(document).ready(function() {

  var socket = io();
  var name;
  var counter = 0;

  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  $('.name').keypress(function(event) {
    if (event.keyCode == 13) {
      $('.start').click();
    }
  });

  $('.start').click(function() {
    name = $('.name').val();
    socket.emit('name', name);
    $('.name-form').hide();
    $('.messaging').show();
  });

  $('#m').on('keydown', function(event) {
    if (counter < 1) {
      socket.emit('typing', name);
      counter += 1;
    }
  });

  console.log(counter);

  $('#m').keypress(function(event) {
    if (event.keyCode == 13) {
      counter = 0;
      socket.emit('not typing', "string");
    }
  });

  $('#m').on('keyup', function() {
    counter = 0;
    setTimeout(check, 5000);
  });

  socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
  });

  socket.on('typing', function(msg) {
    if ($('.typing').length === 0) {
      $('#messages').append($('<li class="typing">').text(msg));
    }
  });

  socket.on('not typing', function(string) {
    $('.typing').remove();
  });

function check() {
  if (counter == 0) {
    socket.emit('not typing', "string")
  }
}

  $('.messaging').hide();

});