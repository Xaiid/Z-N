ZombieWorld.Components.player = Crafty.c('Player', {
  init: function(){
    this.addComponent('Actor, Controls, Fourway, Socket');
  },

  bullet: function(remote){
    if(!this.shoot){
      this.shoot = true;

      var bullet, range;
      var self = this;

      setTimeout(function(){
        self.shoot = false;
      }, 100);

      switch(this.type || ZombieWorld.currentPlayer.type){
        case 'player1':
          range = _.range(20);
        break;
        case 'player2':
          range = _.range(10);
        break;
        case 'player3':
          range = _.range(5);
        break;
      }

      bullet = Crafty.e('Bullet').attr({
        x: this.x,
        y: this.y,
        w: 5,
        h: 2
      }).color('rgb(250,0,0)');

      var position = this.__pos || 'left';

      switch(position){

        case 'left':
          bullet.y +=7;
          _.each(range, function(x, i){
            setTimeout(function(){
              bullet.x -=x;
              if(i === range.length -1){
                bullet.destroy();
              }
            }, 20 + x);
          });
        break;

        case 'right':
          bullet.y +=30;
          bullet.x +=30;
          _.each(range, function(x, i){
            setTimeout(function(){
              bullet.x +=x;
              if(i === range.length -1){
                bullet.destroy();
              }
            }, 20 + x);
          });
        break;

        case 'up':
          bullet.x +=30;
          bullet.w = 2;
          bullet.h = 5;
          _.each(range, function(y, i){
            setTimeout(function(){
              bullet.y -=y;
              if(i === range.length -1){
                bullet.destroy();
              }
            }, 20 + y);
          });
        break;

        case 'down':
          bullet.x +=8;
          bullet.y +=35;
          bullet.w = 2;
          bullet.h = 5;
          _.each(range, function(y, i){
            setTimeout(function(){
              bullet.y +=y;
              if(i === range.length -1){
                bullet.destroy();
              }
            }, 20 + y);
          });
        break;
      }

    }

  }
});
