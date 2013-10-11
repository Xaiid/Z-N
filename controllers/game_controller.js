//Set up configuration
module.exports.getConfiguration = function(req, res){
  var level = req.query.level;
  var configuration = require('../configuration/game').map(level);

  res.send(configuration);
};
