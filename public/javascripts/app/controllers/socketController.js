ZombieWorld.socketController = {
  init: function(){
    ZombieWorld.socket = io.connect();

    var username = 'Narciso' + Math.ceil(Math.random()*100);

    localStorage.setItem('Player', JSON.stringify({username: username, type: 'player1'}));
    var myPlayer = JSON.parse(localStorage.getItem('Player'));

    if(!myPlayer){ 
      alert('Wooow!, you need a player'); 
      setTimeout(function(){
        window.location.assign('/');
      }, 400);
    }

    ZombieWorld.socket.emit('Player list', myPlayer);
    ZombieWorld.socket.on('Load players', ZombieWorld.gameController.setPlayers);

    ZombieWorld.socket.on('Error', function(error){
      alert(error);
    });
  }
};
