module.exports.sendMessage = function(data){
  this.socket.emit('Send message', data);
  this.socket.broadcast.to("level" + data.level).emit('Send message', data);
};

