ZombieWorld.Components.actor = Crafty.c('Zombie', {
  init: function(){
    this.__life = 10;
    this.addComponent('Actor, Mouse')
    .bind('Click', function(e) {
      if(ZombieWorld.currentPlayer.zombieController){
        _.each(ZombieWorld.Zombies, function(zombie){
          zombie.entity._alpha = .6;
        });
        this._alpha = 1;
        var zombie = _.findWhere(ZombieWorld.Zombies, {entity: this});
        ZombieWorld.currentZombie = zombie ? zombie.name : null;
      }else{console.log("Sorry but you can't control zombies :(");}
    });
  }

});
