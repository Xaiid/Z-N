ZombieWorld.Components.player = Crafty.c('Player', {
  init: function(){
    this.addComponent('Actor, Controls, Fourway, Socket');
  },

  bullet: function(remote){
    if(!this.shoot){
      this.shoot = true;

      var bullet, range, w, h, speed, time;
      var self = this;


      switch(this.type || ZombieWorld.currentPlayer.type){
        case 'player1':
          range = _.range(30);
          w = 2;
          h = 2;
          speed = 10;
          time = 50;
        break;
        case 'player2':
          range = _.range(13);
          w = 8;
          h = 4;
          speed = 30;
          time = 100;
        break;
        case 'player3':
          range = _.range(100);
          w = 15;
          h = 6;
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
      }).color('rgb(250,0,0)');

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
