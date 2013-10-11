module.exports.createPlayer = function(){
  this.socket.emit('Load players', []);
};
