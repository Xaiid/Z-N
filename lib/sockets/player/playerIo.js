var configuration = require('../../../configuration/game');
var _             = require('underscore');

var Players = {};
var Level   = 1;
var Coords  = require('./coords');

module.exports.createPlayer = function(options, cb){
  if(!options.data || !options.data.username || !options.data.type){ 
    return cb('Missing data');
  }
  var socket   = options.socket;
  var username = options.data.username;
  var type     = options.data.type;

  console.log('Lets build the player: ', username);

  if(Players[username]){ return cb('Player already exists'); }

  var position = Object.keys(Players).length;

  var currentLevel = 'level' + Level;

  //Build da PLAYER
  Players[username] = {

    P: position,

    //ASK CLIENT
    username: username,
    type: type,

    //ASK GRID
    x: Coords[currentLevel]['pos'+position].x,
    y: Coords[currentLevel]['pos'+position].y,

    //ASK CONFIGURATION
    speed: configuration[type].speed,

    level: Level

  };

  return cb(null, 'Ready');
};

module.exports.list = function(data){
  var socket = this.socket;

  socket.room = socket.room || 'level' + Level;
  socket.join(socket.room);

  if(Players[data.username]){ return socket.emit('Error', "Player already exists"); }

  if(_.isEmpty(Players)){
    socket.username = socket.username || data.username;
    Players[data.username] = {
      username: data.username,
      zombieController: true,
      level: Level
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

module.exports.shoot = function(user){
  this.socket.emit('Shoot player', user);
  this.socket.broadcast.to(this.socket.room).emit('Shoot player', user);
};

module.exports.kill = function(){
  if(_.isEmpty(Players) || !Players[this.socket.username]){ return false; }

  delete Players[this.socket.username];

  this.socket.broadcast.to(this.socket.room).emit('Remove player', this.socket.username); 
  this.socket.leave(this.socket.room);
};

module.exports.next_level = function(username){
  var level = Players[username].level + 1;
  Level = level;
  Players[username].level = level;
  Players[username].x = Coords['level' + level]['pos' + Players[username].P].x;
  Players[username].y = Coords['level' + level]['pos' + Players[username].P].y;
  console.log(Players[username]);

  // var level = configuration.map(Players[username].level);
  this.socket.emit('Next Level', Players[username]);
  this.socket.broadcast.to(this.socket.room).emit('Next Level', Players[username]); 
};
