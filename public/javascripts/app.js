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

      Crafty.init(width,height);

      ZombieWorld.gameController.generateLevel(function(){
        ZombieWorld.gameController.loadPlayers();
      });
    });
  }

};

