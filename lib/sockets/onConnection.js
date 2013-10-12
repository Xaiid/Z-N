var playerIo = require('./player/playerIo');
var zombieIo = require('./zombie/zombieIo');

module.exports = function(socket){
  console.log('Someone just connected');

  playerIo.socket = socket;
  zombieIo.socket = socket;

  socket.on('Player list', playerIo.list.bind(playerIo));
  socket.on('Move player', playerIo.move.bind(playerIo));
  socket.on('Next level', playerIo.next_level.bind(playerIo));
  socket.on('Shoot player', playerIo.shoot.bind(playerIo));

  socket.on('Create Zombies', zombieIo.createZombie.bind(playerIo));
  socket.on('Move zombie', zombieIo.moveZombie.bind(zombieIo));

  socket.on('disconnect', playerIo.kill.bind(playerIo));
};
