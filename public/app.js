$(document).ready(function() {

  var socket = io();

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
    var name = $('.name').val();
    socket.emit('name', name);
    $('.name-form').hide();
    $('.messaging').show();
  });

  socket.on('chat message', function(msg) {
    $('#messages').append($('<li>').text(msg));
  });


  $('.messaging').hide();

});