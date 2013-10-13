ZombieWorld.Components.player = Crafty.c('Player', {
  init: function(){
    this.addComponent('Actor, Controls, Fourway, Socket');
  },

  bullet: function(remote){
    if(!this.shoot){
      this.shoot = true;

      Crafty.audio.play(ZombieWorld.currentPlayer.type+'_shot');

      var bullet, range, w, h, speed, time, hit;
      var self = this;


      switch(this.type || ZombieWorld.currentPlayer.type){
        case 'player1':
          range = _.range(30);
          w = 3;
          h = 3;
          hit = 1;
          speed = 10;
          time = 50;
        break;
        case 'player2':
          range = _.range(13);
          w = 8;
          h = 4;
          hit = 5;
          speed = 30;
          time = 100;
        break;
        case 'player3':
          range = _.range(100);
          w = 15;
          h = 6;
          hit = 10;
          speed = 80;
          time = 300;
        break;
      }

      setTimeout(function(){
        self.shoot = false;
      }, time * 10);

      bullet = Crafty.e('Bullet').attr({
        x: this.x,
        y: this.y,
        w: w,
        h: h
      }).color('rgb(250,0,0)').onHit('Zombie', function(arg){
        var zombie = _.findWhere(ZombieWorld.Zombies, {entity: arg[0].obj});
        if(!zombie){return false;}
        zombie.entity.__life -= hit;
        if(zombie.entity.__life === 0){
          Crafty.audio.play(ZombieWorld.currentPlayer.type+'_kill');
          ZombieWorld.socket.emit('Kill Zombie', {name: zombie.name, level: zombie.level});
          zombie.entity.destroy();
        }
        this.destroy();
      });

      var position = this.__pos || 'left';

      switch(position){

        case 'left':
          bullet.y +=7;
          var i1 = 10;
          _.each(range, function(x, index){
            i1+=speed;
            setTimeout(function(){
              bullet.x -=x;
              if(index === range.length -1){
                bullet.destroy();
              }
            }, i1);
          });
        break;

        case 'right':
          bullet.y +=30;
          bullet.x +=30;
          var i2 = 10;
          _.each(range, function(x, i){
            i2+=speed;
            setTimeout(function(){
              bullet.x +=x;
              if(i === range.length -1){
                bullet.destroy();
              }
            }, i2);
          });
        break;

        case 'up':
          bullet.x +=30;
          bullet.w = h;
          bullet.h = w;
          var i3 = 10;
          _.each(range, function(y, i){
            i3+=speed;
            setTimeout(function(){
              bullet.y -=y;
              if(i === range.length -1){
                bullet.destroy();
              }
            }, i3);
          });
        break;

        case 'down':
          bullet.x +=8;
          bullet.y +=35;
          bullet.w = h;
          bullet.h = w;
          var i4 = 10;
          _.each(range, function(y, i){
            i4+=speed;
            setTimeout(function(){
              bullet.y +=y;
              if(i === range.length -1){
                bullet.destroy();
              }
            }, i4);
          });
        break;
      }

    }

  }
});
