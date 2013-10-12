ZombieWorld.Components.actor = Crafty.c('Zombie', {
  init: function(){
    this.addComponent('2D,Canvas, Solid, Mouse, SpriteAnimation')
    .bind('Click', function(e) {
      ZombieWorld.currentZombie = this._entityName;
    })

  }

});
