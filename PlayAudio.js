var sound = document.getElementById("myAudio");
var audio_index = 0;
var playlist_count = 0;

function startUp(){
  $.getJSON('http://5dd1894f15bbc2001448d28e.mockapi.io/playlist', function(data) {
    // Loop Json Array
    var index;
    for(index in data){
      appendMusicItem(data[index]);
      playlist_count++;
    }
});

}

function appendMusicItem(item){
	$("#music-list").append(
    $('<li></li>',{
      "class":"MusicList",
      "src":item.file
    }).append(
      $('<img />',{
		    "src":item.albumCover,
		    "alt":item.track
      }),
      $('<div />',{
		    "class":"MusiclistMeta"
	    }).append(
        $("<h3></h3>").text(item.track),
        $("<p></p>").text(item.artist)
      )
    )
  );

  $(document).on('click', '.MusicList' , function (){
    audio_index = $(this).prevAll().length;
    sound.pause();
    var new_src =  $(this).attr("src");
    document.getElementById("myAudioSrc").setAttribute('src', new_src);
    sound.load();
    sound.play();
    // change image cover
    var img = $(this).find('img');
    $("#Cover-image").attr({
      "src": img.attr("src"),
      "alt": img.attr("alt")
    });
    var track = $(this).find('h3')[0].outerText;
    $("#TrackData").find('h3').text(track);
    var artist = $(this).find('p')[0].outerText;
    $("#TrackData").find('p').text(artist);
   });
}

function playRandom() {
  audio_index = Math.floor(Math.random() * playlist_count);
  changeSongAndPlay(audio_index);
} 

function playAudio(){
  sound.play();

}
function pauseAudio(){
  sound.pause();

}
function playRepeat(){
  sound.pause();
  sound.load();
  sound.play();
}

function playNext(){  
  audio_index = (audio_index+1) % (playlist_count);
  changeSongAndPlay(audio_index);
}

function playPrevious() {
  if(audio_index==0)
    audio_index = playlist_count-1;
  else
    audio_index -= 1;
  changeSongAndPlay(audio_index);
} 

function changeSongAndPlay(song_index){
  sound.pause();
  var list_of_songs = document.getElementById("music-list").childNodes;
  var new_src = list_of_songs[song_index].attributes.src.value;
  document.getElementById("myAudioSrc").setAttribute('src', new_src);
  sound.load();
  sound.play();
  // change image cover
  var img = list_of_songs[song_index].getElementsByTagName("img")[0];
  $("#Cover-image").attr({
    "src": img.attributes.src.value,
    "alt": img.attributes.alt.value
  });
  var track = list_of_songs[song_index].getElementsByTagName("h3")[0].outerText;
  $("#TrackData").find('h3').text(track);
  var artist = list_of_songs[song_index].getElementsByTagName("p")[0].outerText;
  $("#TrackData").find('p').text(artist);
}