var configuration = require('../../../configuration/game');
var _             = require('underscore');

var Players = {};
var Coords  = require('./coords');

module.exports.createPlayer = function(options, cb){
  if(!options.data || !options.data.username || !options.data.type){ 
    return cb('Missing data');
  }
  var socket   = options.socket;
  var username = options.data.username;
  var type     = options.data.type;

  console.log('Lets build the player: ', username);

  if(Players[username]){ return cb('Player all ready exists'); }

  //Build da PLAYER
  Players[username] = {

    //ASK CLIENT
    username: username,
    type: type,

    //ASK GRID
    x: Coords.level1.pos1.x,
    y: Coords.level1.pos1.y,

    //ASK CONFIGURATION
    speed: configuration[type].speed,

    //DEFAULT
    level: 1

  };

  return cb(null, 'Ready');
};

module.exports.list = function(data){
  var socket = this.socket;

  socket.room = socket.room || 'level1';
  socket.join(socket.room);

  if(_.isEmpty(Players)){
    socket.username = socket.username || data.username;
    Players[data.username] = {
      username: data.username,
      zombieController: true,
      level: 1
    };
  }

  if(!socket.username){ 
    this.createPlayer({socket: socket, data: data}, function(error, ready){
      if(error){ return socket.emit('Error', error); }
      socket.emit('Load players', Players);
      socket.broadcast.to(socket.room).emit('New player', Players[data.username]);
    });  
  }else{
    socket.emit('Load players', Players);
  }

  socket.username = socket.username || data.username;
};

module.exports.move = function(user){
  Players[user.username].x = user.x;
  Players[user.username].y = user.y;
  this.socket.emit('Move player', user);
  this.socket.broadcast.to(this.socket.room).emit('Move player', user);
};

module.exports.kill = function(){
  if(_.isEmpty(Players) || !Players[this.socket.username]){ return false; }

  delete Players[this.socket.username];

  this.socket.broadcast.to(this.socket.room).emit('Remove player', this.socket.username); 
  this.socket.leave(this.socket.room);
};

module.exports.next_level = function(data){
  //TODO next level logic
  console.log('Processing....');
};
