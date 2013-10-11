ZombieWorld.socketController = {
  init: function(){
    ZombieWorld.socket = io.connect();

    ZombieWorld.socket.emit('Player list');
    ZombieWorld.socket.on('Load players', ZombieWorld.gameController.loadPlayers);
  }
};
