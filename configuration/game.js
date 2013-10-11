var Grid1 = require('../grids/room');
var Grid2 = require('../grids/room');
var Grid3 = require('../grids/room');

var Levels = {
  1: Grid1,
  2: Grid2,
  3: Grid3
};

var Configuration = {
  width: 0,
  height: 0,
  title: {
    width: 0,
    heigth: 0
  }
};

//Send map configuration
module.exports.map = function(level){
  return{
    map: {
      Grid: Levels[level],
      width: Configuration.width,
      heigth: Configuration.heigth,
      title: Configuration.title
    }
  };
};
