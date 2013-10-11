
//Set up configuration
module.exports.getConfiguration = function(req, res){

  //TODO ask for current level
  var level = 1;

  var configuration = require('../configuration/game').map(level);

  res.send(configuration);
};
