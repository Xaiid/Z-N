ZombieWorld.Components.free = Crafty.c('Free', {
  init: function(){
    this.addComponent('2D, Canvas, Mouse')
    .bind('Click', function(e){
      this.name = ZombieWorld.currentZombie;
      var Zombie  = _.findWhere(ZombieWorld.Zombies, {name: this.name});
      if(!Zombie){return false;}
      var zombie = Zombie.entity;
      zombie.shouldMove = true;

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
              zombie.animate(animation, 50, -1);
              start[pos] -= 1;
              zombie[pos] = start[pos]; 
              ZombieWorld.socket.emit('Move zombie', {x: start.x, y: start.y, to: animation, who: { name: self.name, level: Zombie.level}});
              if(zombie[pos] > self[pos] && zombie.shouldMove){
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
              zombie.animate(animation, 50, -1);
              start[pos] += 1;
              zombie[pos] = start[pos];
             ZombieWorld.socket.emit('Move zombie', {x: start.x, y: start.y, to: animation, who: { name: self.name, level: Zombie.level}});

              if(zombie[pos] < self[pos] && zombie.shouldMove){
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
