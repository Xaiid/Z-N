var playerIo = require('./player/playerIo');
var zombieIo = require('./zombie/zombieIo');
var chatIo = require('./chat/chatIo');

module.exports = function(socket){
  console.log('Someone just connected');

  playerIo.socket = socket;
  zombieIo.socket = socket;
  chatIo.socket = socket;

  socket.on('Player list', playerIo.list.bind(playerIo));
  socket.on('Move player', playerIo.move.bind(playerIo));
  socket.on('Next level', playerIo.next_level.bind(playerIo));
  socket.on('Shoot player', playerIo.shoot.bind(playerIo));
  socket.on('Kill player', playerIo.killPlayer.bind(playerIo));

  socket.on('Create Zombies', zombieIo.createZombie.bind(playerIo));
  socket.on('Load zombies', zombieIo.loadZombies.bind(zombieIo));
  socket.on('Move zombie', zombieIo.moveZombie.bind(zombieIo));
  socket.on('Kill Zombie', zombieIo.killZombie.bind(zombieIo));

  socket.on('Send message', chatIo.sendMessage.bind(chatIo));

  socket.on('disconnect', playerIo.kill.bind(playerIo));
};
