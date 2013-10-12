ZombieWorld.socketController = {
  init: function(){
    ZombieWorld.socket = io.connect();

    var username = 'Narciso' + Math.ceil(Math.random()*100);

    localStorage.setItem('Player', JSON.stringify({username: username, type: 'player1'}));
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

    ZombieWorld.socket.on('Move player', function(user){
      var Player = _.find(ZombieWorld.Players, function(player){ return player.username === user.username; }).Entity;

      if(!Player){ return false; }

      Player.x = user.x;
      Player.y = user.y;

      if(user.to === "LEFT_ARROW") {
        if(!Player.isPlaying("walk_left")){
          Player.stop().animate("walk_left", 10);
        }

      } else if(user.to === "RIGHT_ARROW") {
        if(!Player.isPlaying("walk_right")){
          Player.stop().animate("walk_right", 10);
        }

      } else if(user.to === "UP_ARROW") {
        if(!Player.isPlaying("walk_up")){
          Player.stop().animate("walk_up", 10);
        }

      } else if(user.to === "DOWN_ARROW") {
        if(!Player.isPlaying("walk_down")){
          Player.stop().animate("walk_down", 10);
        }
      }

    });

    ZombieWorld.socket.on('Error', function(error){
      alert(error);
    });
  }
};
