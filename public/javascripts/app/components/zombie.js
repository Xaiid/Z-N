ZombieWorld.Components.actor = Crafty.c('Zombie', {
  init: function(){
    this.addComponent('Zombie, 2D, Canvas, Solid, Collision, SpriteAnimation, Mouse')
    .bind('Click', function(e) {
      var zombie = _.findWhere(ZombieWorld.Zombies, {entity: this});
      ZombieWorld.currentZombie = zombie.name;
    });
  }

});
