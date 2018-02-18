
let playIcon = $('#play-icon');
let pauseIcon = $('#pause-icon');
let player = $('#player');
let mediaType = $('#media-type');
let nowPlaying = $('#now-playing');
let controls = $('#media-controls');
let currentMediaType = "song";

let currentSongIndex = 0;
let currentFunnyIndex = 0;
let playing = false;


let songs = ["John Mayer - XO.mp3",
"Disclosure - Latch.mp3",
"Calvin Harris - How Deep Is Your Love.mp3",
"Justin Bieber - Where Are You Now.mp3",
"The Weeknd - Can't Feel My Face.mp3",
"feel-my-face.mp3"];

let funnies = ["Muriel Gifford's Sea shells .aac",
"belly scratches.aac",
"circumcision.aac",
"five for a sixer.aac",
"flap flap bastards.aac",
"freebacon! .aac",
"ghosties down the u-bend.aac",
"jackets and trouser legs.aac",
"like a lady! .aac",
"making a balls of the news.aac",
"morning sitcom.aac",
"nobody needs knickers! .aac",
"one-armed man.aac",
"satisfying piss.aac"]


$(document).ready(()=>{
	console.log('page loaded, magic ensues');

	// Put first song in array into src attr of audio element
	player.attr('src', "music/"+songs[currentSongIndex]);
	nowPlaying.text(cleanName(songs[currentSongIndex]));

	playing = false;

})

function handleBold(el){
	$(".media-select .button").removeClass('selected')
	$(el).addClass('selected');
}

// Listen for media-select button presses
function playSong(el){

	currentMediaType = 'song'
	console.log("emmy wants to play a song");

	handleBold(el)

	mediaType.text('Song Mode')

	nowPlaying.text(cleanName(songs[currentSongIndex]));

	player[0].pause()

	player.attr('src', "music/"+songs[currentSongIndex]);

	pausePlayer();

	controls.show();
}

function playFunnyTime(el){
	console.log("emmy wants to use her blog");
	window.location.href="http://emmys-diary.cosmicapp.co"

	currentMediaType = "funny"

	/*handleBold(el)

	controls.show()

	mediaType.text("emmy's blog")

	nowPlaying.text(cleanName(funnies[currentFunnyIndex]));

	pausePlayer();

	player.attr('src', "funnytimes/"+funnies[currentFunnyIndex]);*/
	
}

function freakout(el){
	console.log("emmy is freaking out");
	handleBold(el)
	mediaType.text("u annoyed derek, don't worry")

	player[0].pause()

	nowPlaying.text('')

	controls.hide()

	sendPush();
}

function playPauseClicked(el){
	console.log("emmy pressed play/pause");
	// console.log('el:', el);

	// find icon that ISN'T hidden
	let clicked = $(el).find('img').not(".hidden")[0];
	clicked = $(clicked).attr('id');
	// console.log("element clicked was:", clicked);

	if (clicked === "play-icon") {
		// emmy wants to play the media
		player[0].play();

		// show media-playing
		// $('#media-playing').visible();

		if (currentMediaType === "song") {
			nowPlaying.text(cleanName(songs[currentSongIndex]))
		} else {
			nowPlaying.text(cleanName(funnies[currentFunnyIndex]));
		}
		

		playing = true

		// hide play-icon, show pause-icon
		playIcon.addClass('hidden');
		pauseIcon.removeClass('hidden');

	} else {

		// emmy is pausing
		player[0].pause();

		playing = false;

		playIcon.removeClass('hidden')
		pauseIcon.addClass('hidden');
	}
}

function nextClicked(){
	console.log('emmy clicked next');

	if (currentMediaType === "song") {
			// incrememnt currentSongIndex
			currentSongIndex++
			currentSongIndex > songs.length ? currentSongIndex = 0 : true;
			player.attr('src', "music/"+songs[currentSongIndex]);
			nowPlaying.text(cleanName(songs[currentSongIndex]));
		} else {
			currentFunnyIndex++;
			currentFunnyIndex > funnies.length ? currentFunnyIndex = 0 : true;
			player.attr('src', "funnytimes/"+funnies[currentFunnyIndex]);
			nowPlaying.text(cleanName(funnies[currentFunnyIndex]));
		}

	if (playing === true) {
		// things are playing
		player[0].play();
	}
	
}

function prevClicked(){
	console.log("emmy clicked previous")

	if (currentMediaType === "song"){
		currentSongIndex--;
		currentSongIndex < 0 ? currentSongIndex = 0 : true;

		player.attr('src', "music/"+songs[currentSongIndex]);
		nowPlaying.text(cleanName(songs[currentSongIndex]));
	} else {
		currentFunnyIndex--;
		currentFunnyIndex < 0 ? currentFunnyIndex = 0 : true;
		player.attr('src', "funnytimes/"+funnies[currentFunnyIndex]);
		nowPlaying.text(cleanName(funnies[currentFunnyIndex]));
	}
	

	if (playing === true) {
		// things are playing
		player[0].play();
	}

}



player.on("ended", ()=>{
	console.log("player has ended, hide play button, show pause");
	pausePlayer();
})

function pausePlayer(){
	player[0].pause()
	pauseIcon.addClass('hidden');
	playIcon.removeClass('hidden');
	playing = false;
}


function sendPush(){
	let push = {
		"active": "true",
		"type": "note",
		"title": "HELP",
		"body": "Emmy says wyd",
		"email": "the.calm.flow@gmail.com"
	}

	let headers = {
		'Content-Type': 'application/json'
	}
	$.ajax({
	         url: "https://api.pushbullet.com/v2/pushes",
	         data: JSON.stringify(push),
	         type: "POST",
	         beforeSend: function(xhr){xhr.setRequestHeader('Access-Token', 'o.vRUpN204IRR2aioVULbz6Y2MELn13ZXI').setRequestHeader('Content-Type','application/json');},
	         success: function() { alert("emmy says wyd"); }
	      });
}

// Replace placeholder texts and urls with your own values:

//https://joinjoaomgcd.appspot.com/_ah/api/messaging/v1/sendPush?
// title=If%20this%20is%20set%20will%20create%20notification&icon=http://example.com/icon.png&
// text==:=command text=:=etc&
//  url=http://example.com&
// clipboard=Some+Text&
// file=http://publicurl.com/image.jpg,http://publicurl.com/image2.jpg&
// deviceId=9916eb2045544b20a9b3c3af1f0e0b3e&
// apikey=




function cleanName(name){
	name = name.replace('.mp3', '')
	name = name.replace('.aac', '')
	return name
}


jQuery.fn.visible = function() {
    return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function() {
    return this.css('visibility', 'hidden');
};

jQuery.fn.visibilityToggle = function() {
    return this.css('visibility', function(i, visibility) {
        return (visibility == 'visible') ? 'hidden' : 'visible';
    });
};

function changeMe()
{
  document.getElementById("changeMe").src = "images/" + getRandomImage();
}

//JQuery
$(document).ready(function(){
  $("#changeMe").src("emmaspics/" + getRandomImage());
});

function getRandomImage() {
	var images = ["emmaspics/0175.png","emmaspics/0765.jpg","emmas/pics/0774.jpg",
				  "emmaspics/0825.png","emmaspics/0854.jpg","emmas/pics/0884.jpg",
				  "emmaspics/0972.png","emmaspics/7179.jpg","emmas/pics/icon-template.png",
				  "emmas/pics/mainpic.jpg"];
  
	return images[Math.floor(Math.random() * images.length)];
  }