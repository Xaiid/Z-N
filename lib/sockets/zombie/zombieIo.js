module.exports.createZombie = function(level){
  this.socket.emit('Create Zombies', level);
  this.socket.broadcast.to("level" + level).emit('Create Zombies', level);
};

module.exports.moveZombie = function(zombie){
  console.log("broadcasting", zombie);
  this.socket.broadcast.to("level" + zombie.who.level).emit('Move zombie', zombie);
};
