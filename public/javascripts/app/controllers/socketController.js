ZombieWorld.socketController = {
  init: function(){
    ZombieWorld.socket = io.connect();
    var myPlayer = JSON.parse(localStorage.getItem('Player'));

    if(!myPlayer){ 
      alert('Wooow!, you need a player'); 
      setTimeout(function(){
        window.location.assign('/');
      }, 400);
    }

    ZombieWorld.socket.emit('Player list', myPlayer);
    ZombieWorld.socket.on('Load players', ZombieWorld.gameController.setPlayers);
    ZombieWorld.socket.on('New player', ZombieWorld.gameController.newPlayer);
    ZombieWorld.socket.on('Remove player', ZombieWorld.gameController.removePlayer);

    ZombieWorld.socket.on('Shoot player', function(user){
      var Player = _.find(ZombieWorld.Players, function(player){ return player.username === user.username; });

      if(!Player){ return false; }
      Player = Player.Entity;

      Player.animate("walk_" + user.pos, 4, user.frame, 4);
      Player.animate("walk_" + user.pos, 1, 1);
    });

    ZombieWorld.socket.on('Move player', function(user){
      var Player = _.find(ZombieWorld.Players, function(player){ return player.username === user.username; });

      if(!Player){ return false; }
      Player = Player.Entity;

      Player.x = user.x;
      Player.y = user.y;

      Player.animate("walk_left", 0 , 1,  3)
      .animate("walk_right", 0 , 2 ,3)
      .animate("walk_up", 0,  3, 3)
      .animate("walk_down", 0, 0 , 3);

      if(user.to === "LEFT_ARROW") {
        if(!Player.isPlaying("walk_left")){
          Player.stop().animate("walk_left", 15, 1);
        }

      } else if(user.to === "RIGHT_ARROW") {
        if(!Player.isPlaying("walk_right")){
          Player.stop().animate("walk_right",15, 1);
        }

      } else if(user.to === "UP_ARROW") {
        if(!Player.isPlaying("walk_up")){
          Player.stop().animate("walk_up",15, 1);
        }

      } else if(user.to === "DOWN_ARROW") {
        if(!Player.isPlaying("walk_down")){
          Player.stop().animate("walk_down",15, 1);
        }
      }

    });

    ZombieWorld.socket.on('Error', function(error){
      alert(error);
    });
  }
};
