ZombieWorld.Components.free = Crafty.c('Free', {
  init: function(){
    this.addComponent('2D, Canvas, Mouse')
    .bind('Click', function(e){
      var zombieName = ZombieWorld.currentZombie;
      var zombie  = _.findWhere(ZombieWorld.Zombies, {_entityName: zombieName});

      if(!zombie){return false;}

      if(!zombie.moving){

        zombie.moving = true;

        var start  = {
          x: zombie.x,
          y: zombie.y
        }
        var self    = this;

        var remove = function(pos, animation, cb){
          if(zombie[pos] <= self[pos]){ return cb(); }

          var move = function(){
            setTimeout(function(){
              zombie.animate(animation, 10, -1);
              start[pos] -= 1;
              zombie[pos] = start[pos] 
              if(zombie[pos] > self[pos]){
                move();
              }else{return cb()}
            }, 30);
          }
          move();
        };

        var add = function(pos, animation, cb){
          if(zombie[pos] >= self[pos]){ return cb(); }

          var move = function(){
            setTimeout(function(){
              zombie.animate(animation, 10, -1);
              start[pos] += 1;
              zombie[pos] = start[pos] 
              if(zombie[pos] < self[pos]){
                move();
              }else{return cb()}
            }, 30);
          }
          move();
        };

        var count = 0;
        var ready = function(){
          count += 1;

          if(count === 4){
            zombie.moving = false;
            zombie.stop();
          }
        };

        remove('x', 'walk_left', ready);
        add('x', 'walk_right', ready);

        remove('y','walk_up', ready);
        add('y', 'walk_down', ready);
      }

    });
  }
});
