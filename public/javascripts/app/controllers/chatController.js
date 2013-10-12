$( function(){

  $('#msg').on('keyup', function(event){
    if(event.keyCode === 13){
      $('#chatForm').submit();
    }
  });

  $('#chatForm').submit(function(event){
    event.preventDefault();
    console.log(ZombieWorld.currentPlayer);
    var player = ZombieWorld.currentPlayer;
    var msg =  $('#msg');

    console.log(player.username);
    var data = {
      msg: msg.val(),
      player: player.username,
      level: player.level
    }

    ZombieWorld.socket.emit('Send message', data);
    msg.val('');
  });

});
