var playerIo = require('./player/playerIo');

module.exports = function(socket){
  console.log('Someone just connected');

  socket.on('Create player', playerIo.createPlayer.bind(playerIo));
};
