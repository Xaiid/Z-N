ZombieWorld.Components.actor = Crafty.c('Zombie', {
  init: function(){
    this.addComponent('Actor, Solid, Mouse, Color')
    .color('rgb(112,123,123)') 
    .bind('Click', function(e) {
      console.log("You clicked a zombie")
    });
  }

});
