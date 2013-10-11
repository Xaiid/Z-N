var configuration = require('../../../configuration/game');
var _             = require('underscore');

var Players = {};

module.exports.createPlayer = function(options, cb){
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
    x: 15,
    y: 15,

    //ASK CONFIGURATION
    speed: configuration[type].speed,

    //DEFAULT
    level: 1

  };

  return cb(null, 'Ready');
};

module.exports.list = function(data){
  var socket = this.socket;

  if(_.isEmpty(Players)){

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
    });  
  }else{
    socket.emit('Load players', Players);
  }

  //Setup socket information
  socket.username = data.username;
  socket.room     = socket.room || 'level1';
};

module.exports.kill = function(){
  if(_.isEmpty(Players) || !Players[this.socket.username]){ return false; }

  delete Players[this.socket.username];

  this.socket.broadcast.to(this.socket.room).emit('Remove player', this.socket.username); 
  this.socket.leave(this.socket.room);
};
