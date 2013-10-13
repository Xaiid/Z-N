$(function(){
    $('.container-controls').on('click',function(){
    });

    $('.player').on('click',function(){
        var av = $(this).data('player')
        $("#avatar-player li img").attr('src','/images/'+av+'.png');
    });
});
