ZombieWorld.socketController = {
  init: function(){
    ZombieWorld.socket = io.connect();

    ZombieWorld.socket.emit('Player list', {username: 'Narciso', type: 'player1'});
    ZombieWorld.socket.on('Load players', ZombieWorld.gameController.loadPlayers);

    ZombieWorld.socket.on('Error', function(error){
      alert(error);
    });
  }
};
