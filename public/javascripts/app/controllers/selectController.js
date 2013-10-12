ZombieWorld.selectController = function(){
  var User = {};

  localStorage.clear();

  $('form').submit(function(event){
    event.preventDefault();

    //Get user data
    User.username = $('.username').val();
    User.type     = $('.pick:checked').val();

    if(User.username && User.type){
      localStorage.setItem('Player', JSON.stringify(User));
      window.location.assign('/game');
      return false;
    }

    alert('Please select a player and write a username');
  });

};

$(function(){
  ZombieWorld.selectController();
});
