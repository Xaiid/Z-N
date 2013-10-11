var ZombieWorld = {

  Land: {},
  socket: null,
  Components: {},
  Entities: {},
  currentPlayer: null,
  Players: {},
  Zombies: {},
  // Scenes: {},

  Initialize: function(){
    ZombieWorld.socket = io.connect();
    ZombieWorld.gameController.getConfiguration(function(){
      //Crafty init
      var width = ZombieWorld.Land.map.width * ZombieWorld.Land.map.title.width;
      var height = ZombieWorld.Land.map.height* ZombieWorld.Land.map.title.height;

      Crafty.init(width,height);

      ZombieWorld.gameController.generateLevel();
    });
  }

};

