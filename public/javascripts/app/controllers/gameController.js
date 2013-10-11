ZombieWorld.gameController = {

  loadSprites: function(){
      ZombieWorld.sprites = {

        players: Crafty.sprite(32, "/images/power-tanger.png", {
          player1: [0,0]
        })

      };
  },

  getConfiguration: function(cb){
    var self = this;
    $.get('/configuration').done(function(configuration){
      ZombieWorld.Land = configuration;
      self.loadSprites();
      return cb();
    });
  },

  generateLevel: function(){
    //Ask server for level
    Crafty.background('rgb(141,131,121)');
    drawGrid(ZombieWorld.Land.map.Grid, function(){
      console.log('Map drawn');
    });
  },


  loadPlayers: function(players){

    console.log(players);

    // var speed  = ZombieWorld.Land.players.player1.speed;
    // var player = 'player1';

    // Crafty.e('Player, ' + player)
    //     .attr({
    //       x: 15,
    //       y: 15
    //     })
    //     .requires('Keyboard')
    //     .animate("walk_left", 0 , 1,  2)
    //     .animate("walk_right", 0 , 2 ,2)
    //     .animate("walk_up", 0,  3, 2)
    //     .animate("walk_down", 0, 0 , 2)
    //     .fourway(speed)
    //     .bind('NewDirection', function(data) {
    //       if (data.x > 0) {
    //         this.animate('walk_right', speed, -1);
    //       } else if (data.x < 0) {
    //         this.animate('walk_left', speed, -1);
    //       } else if (data.y > 0) {
    //         this.animate('walk_down', speed, -1);
    //       } else if (data.y < 0) {
    //         this.animate('walk_up', speed, -1);
    //       } else {
    //         this.stop();
    //       }
    //     });
    
  }

};

var drawGrid = function(grid, cb){
  _.each(grid, function(x, xIndex){
    _.each(x, function(y, yIndex){

      var coordinates = {
        x: xIndex * ZombieWorld.Land.map.tile.width,
        y: yIndex * ZombieWorld.Land.map.tile.height
      };

      switch(grid[xIndex][yIndex]){
        case 0:
          break;
        case 1:
          Crafty.e('Wall').attr({
          x: coordinates.x,
          y: coordinates.y,
          w: ZombieWorld.Land.map.tile.width,
          h: ZombieWorld.Land.map.tile.height 
        });
          break;
        case 2:
          Crafty.e('Barrel').attr({
          x: coordinates.x,
          y: coordinates.y,
          w: ZombieWorld.Land.map.tile.width,
          h: ZombieWorld.Land.map.tile.height 
        });
          break;
      }
    });
  });

  return cb();
};
