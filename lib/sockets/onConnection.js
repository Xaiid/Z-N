var playerIo = require('./player/playerIo');

module.exports = function(socket){
  console.log('Someone just connected');

  playerIo.socket = socket;

  socket.on('Player list', playerIo.list.bind(playerIo));
  socket.on('Move player', playerIo.move.bind(playerIo));

  socket.on('disconnect', playerIo.kill.bind(playerIo));
};
