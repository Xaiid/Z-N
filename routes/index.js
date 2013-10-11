var pagesController = require('../controllers/pages_controller');

module.exports = function(app){
  app.get('/', pagesController.index.bind(pagesController));
  app.get('/signup', pagesController.signup.bind(pagesController));
  app.get('/game', pagesController.game.bind(pagesController));
};
