$(function(){
    $('.container-controls').on('click',function(){
    });

    $('.player').on('click',function(){
        var av = $(this).data('player')
        $("#avatar-player li img").attr('src','/images/'+av+'.png');
        switch(av.split('_')[1]){
          case '1':
            dir = 'gun';
            break;
          case '2':
            dir = 'shotgun';
            break;
          case '3':
            dir = 'rocket';
            break;
        }
        var clickSound = new Audio('/sounds/'+dir+'/select.mp3');
        clickSound.play();
    });
});
