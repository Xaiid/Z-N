var ZombieWorld = {

  Land: {},
  socket: null,
  Components: {},
  Entities: {},
  currentPlayer: null,
  Players: {},
  Zombies: {},
  Sprites: {},
  
  Initialize: function(){

    ZombieWorld.socketController.init();

    ZombieWorld.gameController.getConfiguration(function(){
      //Crafty init
      var width = ZombieWorld.Land.map.width * ZombieWorld.Land.map.tile.width;
      var height = ZombieWorld.Land.map.height* ZombieWorld.Land.map.tile.height;

      Crafty.init(width,height,'game-area');

      ZombieWorld.gameController.loadSounds();

      var generate = function(){
        ZombieWorld.gameController.generateLevel(function(){
          ZombieWorld.gameController.loadPlayers();
        });
      };

      Crafty.scene('Level1', generate);
      Crafty.scene('Level2', generate);
      Crafty.scene('Level3', generate);
      Crafty.scene('Victory', function(){
        Crafty.background("url('/images/victory.png')");

        createEntities();
      });

      Crafty.scene('Level'+ZombieWorld.Level);
    });
  }
};

var createEntities = function(){
  var car = Crafty.e('Car, Tween').attr({
    x: 900,
    y: 230,
    w: 140,
    h: 140
  }).tween({
    x: 0,
    y: 230
  }, 160).bind('TweenEnd', function(){
    Crafty('*').destroy();
    Crafty.background("url('/images/victory2.png')");
  });

  for(var c = 30; c <= 500; c += 14){
    var x = Math.floor(Math.random() * 1030) + 900;
    var random = _.sample([1,2,3]);
    Crafty.e('Zombie, Tween, ' + 'zombie' + random)
    .attr({x: x, y: c, w: 40, h: 40})
    .animate("walk_left", 0 , 1,  1)
    .animate("walk_right", 0 , 2 ,1)
    .animate("walk_up", 0,  3, 1)
    .animate("walk_down", 0, 0 , 1)
    .tween({ x: 0, y: c }, 440)
    .animate("walk_left", 20, -1);
  }
};
