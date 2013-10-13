var Coords  = require('./coords');
var _       = require('underscore');

var Zombies = {};

module.exports.createZombie = function(data){
  var zombies = [];

  for(var i=0; i < data.level * 2; i++){
    zombies.push({
      level: data.level,
      from: data.from,
      type: _.random(1, 3),
      name: _.uniqueId('zombie'),
      x: Coords["level" + data.level]['pos' + i].x,
      y: Coords["level" + data.level]['pos' + i].y,
    });
    Zombies[zombies[i].name] = zombies[i];
  }

  this.socket.emit('Create Zombies', zombies);
  this.socket.broadcast.to("level" + data.level).emit('Create Zombies', zombies);
};

module.exports.loadZombies = function(level){
  this.socket.emit('Create Zombies', Zombies);
};

module.exports.moveZombie = function(zombie){
  if(Zombies[zombie.who.name]){
    Zombies[zombie.who.name].x = zombie.x;
    Zombies[zombie.who.name].y = zombie.y;
  }
  this.socket.emit('Move zombie', zombie);
  this.socket.broadcast.to("level" + zombie.who.level).emit('Move zombie', zombie);
};

module.exports.killZombie = function(zombie){
  delete Zombies[zombie.name];
  this.socket.emit('Kill Zombie', zombie.name);
  this.socket.broadcast.to("level" + zombie.level).emit('Kill Zombie', zombie.name);
};
