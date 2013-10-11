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
  socket.username   = username;
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
    socket.username = data.username;

    Players[data.username] = {
      username: data.username,
      zombieController: true,
      level: 1
    }
  }

  if(!socket.username){ 
    this.createPlayer({socket: socket, data: data}, function(error, ready){
      if(error){ return socket.emit('Error', error); }
      socket.emit('Load players', Players);
    });  
  }else{
    socket.emit('Load players', Players);
  }

};
