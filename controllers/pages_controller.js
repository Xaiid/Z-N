module.exports = {
  index: function(req, res){
    res.render('index');
  },

  signup: function(req, res){
    res.render('signup');
  },

  game: function(req, res){
    res.render('game');
  }
};
