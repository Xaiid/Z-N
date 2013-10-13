ZombieWorld.gameController = {

  loadSprites: function(){
      ZombieWorld.sprites = {

        players1: Crafty.sprite(40, "/images/player_1.png", {
          player1: [0,0]
        }),

        players2: Crafty.sprite(40, "/images/player_2.png", {
          player2: [0,0]
        }),

        players3: Crafty.sprite(40, "/images/player_3.png", {
          player3: [0,0]
        }),

        zombies1: Crafty.sprite(40, "/images/zombie_1.png", {
          zombie1: [0,0]
        }),

        zombies2: Crafty.sprite(40, "/images/zombie_2.png", {
          zombie2: [0,0]
        }),

        zombies3: Crafty.sprite(40, "/images/zombie_3.png", {
          zombie3: [0,0]
        }),

        car: Crafty.sprite(140, "images/car.png", {
          car: [0,0]
        })

      };
  },

  loadSounds: function(){
    Crafty.audio.add({
      player1_init:       ['/sounds/gun/init.mp3'],
      player1_shot:       ['/sounds/gun/shot.mp3'],
      player1_kill:       ['/sounds/gun/kill.mp3'],
      player2_init:       ['/sounds/shotgun/init.mp3'],
      player2_shot:       ['/sounds/shotgun/shot.mp3'],
      player2_kill:       ['/sounds/shotgun/kill.mp3'],
      player3_init:       ['/sounds/rocket/init.mp3'],
      player3_shot:       ['/sounds/rocket/shot.mp3'],
      player3_kill:       ['/sounds/rocket/kill.mp3'],
      car:                ['/sounds/car.mp3']
    });
  },

  getConfiguration: function(cb){
    var self = this;

    var timer = setInterval(function(){
      //Wait for level of current player
      if(ZombieWorld.currentPlayer){ 
        clearInterval(timer); 
        var level = ZombieWorld.currentPlayer.level;
        $.get('/configuration?level='+level).done(function(configuration){
          ZombieWorld.Level = level;
          ZombieWorld.Land  = configuration;
          self.loadSprites();
          return cb();
        });
      }
    }, 200);

  },

  generateLevel: function(cb){
    //Ask server for level
    Crafty.background("url('/images/level "+ZombieWorld.Level+".png')");
    drawGrid(ZombieWorld.Land.map.Grid, function(){
      console.log('Map drawn');
      return cb();
    });
  },

  setPlayers: function(players){
    var myPlayer = JSON.parse(localStorage.getItem('Player'));

    if(!players[myPlayer.username]){
      return alert('You are not on the server');
    }

    _.each(players, function(player){
      if(player.username === myPlayer.username){
        //Set up my player
        ZombieWorld.currentPlayer = players[myPlayer.username];
      }else{
        //Rest of the players
        ZombieWorld.Players[player.username] = player;
      }
    });
  },

  newPlayer: function(player){
    
    //TODO [partial bug] WAIT FOR LAND!!!
    setTimeout(function(){

    ZombieWorld.Players[player.username] = player;

    ZombieWorld.Players[player.username].Entity = Crafty.e('Player, ' + player.type)
        .attr({
          x: player.x,
          y: player.y
        })
        .requires('Keyboard')
        .animate("walk_left", 0 , 1,  2)
        .animate("walk_right", 0 , 2 ,2)
        .animate("walk_up", 0,  3, 2)
        .animate("walk_down", 0, 0 , 2);


      var totalPlayers = _.keys(ZombieWorld.Players).length;
      var totalZombies = _.keys(ZombieWorld.Zombies).length;

      if(_.findWhere(ZombieWorld.Zombies, {from: player.username})){
        ZombieWorld.socket.emit('Load zombies', player.level);
      }else{
        ZombieWorld.socket.emit('Create Zombies', {level: player.level, from: player.username});
      }

    }, 500);
  },

  removePlayer: function(player){
    if(!ZombieWorld.Players[player]){ return false; }
    ZombieWorld.Players[player].Entity.destroy();
    delete ZombieWorld.Players[player];
  },

  loadPlayers: function(){
    ZombieWorld.gameController.loadTeam();
    ZombieWorld.gameController.myPlayer();
  },

  loadTeam: function(){
    _.each(ZombieWorld.Players, function(player){
      if(!player.zombieController && !player.Entity && !player.dead){
        player.Entity = Crafty.e('Player, ' + player.type)
        .attr({
          x: player.x,
          y: player.y
        })
        .requires('Keyboard')
        .animate("walk_left", 0 , 1,  2)
        .animate("walk_right", 0 , 2 ,2)
        .animate("walk_up", 0,  3, 2)
        .animate("walk_down", 0, 0 , 2);
      }
    });
  },
  
  myPlayer: function(){
    var player = ZombieWorld.currentPlayer;
    var dead = JSON.parse(localStorage.getItem('Player')).dead;
    if(!player.zombieController && !dead){

      Crafty.audio.play(player.type+'_init');
      player.Entity = Crafty.e('Player, ' + player.type)
      .attr({
        x: player.x,
        y: player.y
      })
      .requires('Keyboard')
      .animate("walk_left", 0 , 1,  3)
      .animate("walk_right", 0 , 2 ,3)
      .animate("walk_up", 0,  3, 3)
      .animate("walk_down", 0, 0 , 3)
      .fourway(player.speed)
      .bind('NewDirection', function(data) {
        this.stop();
        if (data.x > 0) {
          this.animate('walk_right', 20, -1);
        } else if (data.x < 0) {
          this.animate('walk_left', 20, -1);
        } else if (data.y > 0) {
          this.animate('walk_down', 20, -1);
        } else if (data.y < 0) {
          this.animate('walk_up', 20, -1);
        } else {
          this.stop();
        }
      })
      .bind("EnterFrame", function(e) {
        if(this.isDown("LEFT_ARROW")) {
          this.__pos = 'left';
          this.__frame = 1;
          this.emit('Move player', {x: this.x, y: this.y, to: "LEFT_ARROW", username: player.username});
        } else if(this.isDown("RIGHT_ARROW")) {
          this.__pos = 'right';
          this.__frame = 2;
          this.emit('Move player', {x: this.x, y: this.y, to: "RIGHT_ARROW", username: player.username});
        } else if(this.isDown("UP_ARROW")) {
          this.__pos = 'up';
          this.__frame = 3;
          this.emit('Move player', {x: this.x, y: this.y, to: "UP_ARROW", username: player.username});
        } else if(this.isDown("DOWN_ARROW")) {
          this.__pos = 'down';
          this.__frame = 0;
          this.emit('Move player', {x: this.x, y: this.y, to: "DOWN_ARROW", username: player.username});
        }

        if(this.isDown("SPACE")){
          if(!this.shoot){
            Crafty.audio.play(ZombieWorld.currentPlayer.type+'_shot');
          }

          this.animate("walk_" + this.__pos, 4, this.__frame, 4);
          this.animate("walk_" + this.__pos, 1, 1);
          this.stop();
          this.x -= this._movement.x;
          this.y -= this._movement.y;
          this.bullet();

          this.emit('Shoot player', {pos: this.__pos, frame: this.__frame, username: player.username});

        }else{
          this.animate("walk_" + this.__pos, 0, this.__frame, 3);
        }

      })
      .onHit('Solid', function(){
        this.x -= this._movement.x;
        this.y -= this._movement.y;
      })
      .onHit('Next', function(){
        this.destroy();
        this.emit('Next level', player.username);
      });
    }
  },

  createZombies: function(zombies){
    _.each(zombies, function(zombie){
      ZombieWorld.Zombies[zombie.name] = zombie; 
      ZombieWorld.Zombies[zombie.name].entity = Crafty.e('Zombie, ' + 'zombie' + zombie.type)
      .attr({
        x: zombie.x,
        y: zombie.y,
        alpha: ZombieWorld.currentPlayer.zombieController ? 0.6 : 1
      })
      .animate("walk_left", 0 , 1,  1)
      .animate("walk_right", 0 , 2 ,1)
      .animate("walk_up", 0,  3, 1)
      .animate("walk_down", 0, 0 , 1)
      .collision()
      .onHit('Solid', function(e){
        this.shouldMove = false;
        if(e[0].obj.x > this.x){
          this.x -=1;
        }
        if(e[0].obj.x < this.x){
          this.x +=1;
        }
        if(e[0].obj.y > this.y){
          this.y -=1;
        }
        if(e[0].obj.y < this.y){
          this.y +=1;
        }
      }).onHit('Next', function(e){
        this.shouldMove = false;
        if(e[0].obj.x > this.x){
          this.x -=1;
        }
        if(e[0].obj.x < this.x){
          this.x +=1;
        }
        if(e[0].obj.y > this.y){
          this.y -=1;
        }
        if(e[0].obj.y < this.y){
          this.y +=1;
        }
      }).onHit('Player', function(e){
        var player = _.findWhere(ZombieWorld.Players, {Entity: e[0].obj});
        if(player){
          player.dead = true;
          ZombieWorld.socket.emit('Kill player', player.username);
          ZombieWorld.socket.emit('Next level', player.username, true);
        }else if(ZombieWorld.currentPlayer.Entity === e[0].obj){
          var myPlayer = JSON.parse(localStorage.getItem('Player'));
          myPlayer.dead = true;
          localStorage.setItem('Player', JSON.stringify(myPlayer));
          ZombieWorld.currentPlayer.dead = true;
          ZombieWorld.socket.emit('Kill player', ZombieWorld.currentPlayer.username);
          ZombieWorld.socket.emit('Next level', ZombieWorld.currentPlayer.username, true);
        }
        e[0].obj.destroy();
      });
    });
  }
};

var drawGrid = function(grid, cb){
  _.each(grid, function(x, xIndex){
    _.each(x, function(y, yIndex){

      var properties = {
        x: xIndex * ZombieWorld.Land.map.tile.width,
        y: yIndex * ZombieWorld.Land.map.tile.height,
        w: ZombieWorld.Land.map.tile.width,
        h: ZombieWorld.Land.map.tile.height 
      };

      switch(grid[xIndex][yIndex]){
        case 0:
          Crafty.e('Free').attr(properties);
          break;
        case 1:
          Crafty.e('Limit').attr(properties);
          break;
        case 2:
          Crafty.e('Barrel').attr(properties);
          break;
        case 4:
          Crafty.e('Next').attr(properties);
          break;
      }
    });
  });

  return cb();
};
