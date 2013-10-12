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
    ZombieWorld.socket.on('Create Zombies', ZombieWorld.gameController.createZombies);

    ZombieWorld.socket.on('Shoot player', function(user){
      var _Player = _.find(ZombieWorld.Players, function(player){ return player.username === user.username; });

      if(!_Player){ return false; }
      Player = _Player.Entity;
      Player.type = _Player.type; 
      Player.__pos = user.pos;

      Player.animate("walk_" + user.pos, 4, user.frame, 4);
      Player.animate("walk_" + user.pos, 1, 1);
      Player.bullet();
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

    ZombieWorld.socket.on('Move zombie', function(zombie){
      var localZombie = ZombieWorld.Zombies[zombie.who.name];

      if(localZombie){
        localZombie.entity.x = zombie.x;
        localZombie.entity.y = zombie.y;
        localZombie.entity.animate(zombie.to, 50);
      }
    });

    ZombieWorld.socket.on('Kill Zombie', function(zombie){
      if(!ZombieWorld.Zombies[zombie]){ return false; }
      ZombieWorld.Zombies[zombie].entity.destroy();
      delete ZombieWorld.Zombies[zombie];
    });

    ZombieWorld.socket.on('Send message', function(data){
      if(data.player === ZombieWorld.currentPlayer.username){
        $('#chat').append('<p> Me: ' + data.msg +'</p>');
      }else{
        $('#chat').append('<p>' + data.player +": "+ data.msg +'</p>');
      }
    });

    ZombieWorld.socket.on('Next Level', function(player){
      console.log('Current Level: ', ZombieWorld.Level);

      if(ZombieWorld.Players[player.username]){
        ZombieWorld.Players[player.username].level = player.level;
      }

      if(!ZombieWorld.currentPlayer.zombieController){
        ZombieWorld.currentPlayer.level = player.level;
      }

      var left = _.find(ZombieWorld.Players, function(Player){ 
        return Player.level === ZombieWorld.Level && !Player.zombieController;
      });

      if(!left){
        if(ZombieWorld.currentPlayer.zombieController){
          ZombieWorld.currentPlayer.level = player.level;
        }

        ZombieWorld.Level = player.level;

        $.get('/configuration?level='+player.level).done(function(configuration){
          console.log(configuration);
          delete ZombieWorld.Land;
          ZombieWorld.Land  = configuration;
          ZombieWorld.gameController.generateLevel(function(){
            ZombieWorld.gameController.loadPlayers();
          });
        });
      }

    });

    ZombieWorld.socket.on('Error', function(error){
      alert(error);
    });
  }
};
