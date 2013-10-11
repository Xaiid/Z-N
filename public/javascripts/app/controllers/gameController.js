ZombieWorld.gameController = {

  getConfiguration: function(cb){
    $.get('/configuration').done(function(configuration){
      ZombieWorld.Land = configuration;
      return cb();
    });
  },

  generateLevel: function(){
    //Ask server for level
    Crafty.background('rgb(141,131,121)');
  }

};
