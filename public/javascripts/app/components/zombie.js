ZombieWorld.Components.actor = Crafty.c('Zombie', {
  init: function(){
    this.__life = 10;
    this.addComponent('Actor, Mouse')
    .bind('Click', function(e) {
      if(ZombieWorld.currentPlayer.zombieController){
        var zombie = _.findWhere(ZombieWorld.Zombies, {entity: this});
        ZombieWorld.currentZombie = zombie.name;
      }else{console.log("Sorry but you can't control zombies :()");}
    });
  }

});
