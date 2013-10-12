ZombieWorld.Components.actor = Crafty.c('Zombie', {
  init: function(){
    this.addComponent('2D,Canvas, Solid, Mouse')
    .bind('Click', function(e) {
      console.log("You clicked a zombie");
    });
  }

});
