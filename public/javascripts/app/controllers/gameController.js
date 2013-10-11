ZombieWorld.gameController = function(){
  var getConfiguration = $.get('/configuration');

  getConfiguration.done(function(configuration){
    ZombieWorld.Land = configuration;
  });

};

ZombieWorld.gameController();
