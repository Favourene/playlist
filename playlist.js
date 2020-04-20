window.Formaweb = window.Formaweb || {};
window.onload = function(){
window.Formaweb.Player = function() {
  'use strict';
  
  var audio;
  var playlist;
  var len;
  var current;

  init();
  function init(){
    current = 0;
    audio = $('audio')[0];
    
    playlist = [
      {name: 'Belly Ache', path: 'belly.mp3', id: 'belly'},
      {name: 'Bury a friend', path: 'bury.mp3', id: 'bury'},
      {name: 'Oceans Eyes', path: 'ocean.mp3', id: 'ocean'},
      {name: 'Irobot', path: 'irobot.mp3', id: 'irobot'},
      {name: 'Guillotine', path: 'guilo.mp3', id: 'guilo'},
      {name: 'Rare', path: 'rare.mp3', id: 'rare'}
    ];
    
    len = playlist.length - 1;
    // audio.volume = 0.10;
    run(playlist[0], audio);

    audio.addEventListener('ended', function(e){
      next();
      run(playlist[current], audio);
    });
    
    $('.audio.next').on('click', function(){
      next();
      run(playlist[current], audio);
      
      return false;
    });
    
    $('.audio.prev').on('click', function(){
      prev();
      run(playlist[current], audio);
      
      return false;
    });
    
    $('.audio.play').on('click', function(){
      var music_id = $(this).attr('data-music-id');
      
      if(music_id != undefined){
        playById(music_id);
      }
      
      return false;
    });
  }
  
  function run(music, player) {
    $('.audio.name').text(music.name);
    player.src = music.path;
    
    audio.load();
    audio.play();
  }
  
  function next(){
    current++;
    if(current > len) current = 0;
  }
  
  function prev(){
    current--;
    if(current < 0) current = 0;
  }
  
  function playById(id){
    var playlist_id = undefined;
    
    $.each(playlist, function(index, value){
      if(value.id == id){
        playlist_id = index;
      }
    });
    
    if(playlist_id != undefined){
      current = playlist_id;
      run(playlist[current], audio);
    }
  }
  
}

$(document).ready(function(){
  var player = window.Formaweb.Player();
});
}