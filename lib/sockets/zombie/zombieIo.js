module.exports.createZombie = function(level){
  this.socket.emit('Create Zombies', level);
  this.socket.broadcast.to("level" + level).emit('Create Zombies', level);
};

module.exports.moveZombie = function(zombie){
  this.socket.emit('Move zombie', zombie);
  this.socket.broadcast.to("level" + zombie.who.level).emit('Move zombie', zombie);
};

module.exports.killZombie = function(zombie){
  this.socket.emit('Kill Zombie', zombie.name);
  this.socket.broadcast.to("level" + zombie.level).emit('Kill Zombie', zombie.name);
};
