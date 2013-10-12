var _ = require('underscore');

module.exports.createZombie = function(level){
  var type = _.random(1, 3);
  this.socket.emit('Create Zombies', level, type);
  this.socket.broadcast.to("level" + level).emit('Create Zombies', level, type);
};

module.exports.moveZombie = function(zombie){
  this.socket.emit('Move zombie', zombie);
  this.socket.broadcast.to("level" + zombie.who.level).emit('Move zombie', zombie);
};

module.exports.killZombie = function(zombie){
  this.socket.emit('Kill Zombie', zombie.name);
  this.socket.broadcast.to("level" + zombie.level).emit('Kill Zombie', zombie.name);
};
