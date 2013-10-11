var playerIo = require('./player/playerIo');

module.exports = function(socket){
  console.log('Someone just connected');

  playerIo.socket = socket;

  socket.on('Player list', playerIo.createPlayer.bind(playerIo));
};
