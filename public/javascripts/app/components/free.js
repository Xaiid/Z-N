ZombieWorld.Components.free = Crafty.c('Free', {
  init: function(){
    this.addComponent('2D, Canvas, Mouse')
    .bind('Click', function(e){
      //TODO click events
      console.log('Click', e);
    });
  }
});
