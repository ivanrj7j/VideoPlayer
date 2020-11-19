var container = document.querySelector('.contatiner');
var controls = document.querySelector('.controls');
var play_pause = document.getElementById('play');
var video = document.getElementById('vid');
var timestamp = document.getElementById('timestamp');
var ranger = document.getElementById('range');
var title = document.getElementById('title');
var slide = document.getElementById('slide');

backfollowspeed(slide)

var file_with_ext = video.src.split('/');
file_with_ext = file_with_ext[file_with_ext.length - 1];
var file = file_with_ext.split('.');
file.pop(0);
// console.log(file);
var file_name = '';
for (let index = 0; index < file.length; index++) {
    const element = file[index];
    if (index != 0) {
        file_name = file_name + '.' + element;
    }else{
        file_name = file_name + element;

    }

}
file_name = file_name.replaceAll('%20', ' ')

title.innerHTML = file_name

document.addEventListener('keyup', function (e) {
    if (e.keyCode == 32) {
        playpause()
    }
    if (e.keyCode == 39) {
        skip(true);
    }
    if (e.keyCode == 37) {
        skip(false)
    }
})

container.addEventListener('mouseover', function () {
    controls.style.transiton = 'none';
    controls.style.opacity = 1;
    controls.style.transiton = '0.7s ease';
    controls.style.transform = 'translateY(-70px)';
});

container.addEventListener('mouseout', function () {
    controls.style.transiton = 'none';
    controls.style.opacity = 0;
    controls.style.transiton = '0.7s ease';
    controls.style.transform = 'translateY(-4px)';

});

play_pause.addEventListener('click', playpause);
video.addEventListener('timeupdate', showstamp)

function playpause() {
    if (vid.paused) {
        video.play();
        play_pause.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    } else {
        video.pause();
        play_pause.innerHTML = '<i class="fa fa-play-circle" aria-hidden="true"></i>';
    }
}

function showstamp() {
    var durmins = Math.floor(video.duration / 60);
    var dursec = Math.floor(video.duration - durmins * 60);
    var curmins = Math.floor(video.currentTime / 60);
    var cursec = Math.floor(video.currentTime - curmins * 60);
    if (durmins < 10) {
        durmins = "0" + durmins
    }

    if (dursec < 10) {
        dursec = "0" + dursec
    }
    if (curmins < 10) {
        curmins = "0" + curmins
    }

    if (cursec < 10) {
        cursec = "0" + cursec
    }
    timestamp.innerHTML = curmins + ':' + cursec + '/' + durmins + ':' + dursec
}

ranger.addEventListener('input', function(){
    backfollow(ranger)
}, false);
video.addEventListener('timeupdate', function(){
    backfollow(ranger)
}, false)
slide.addEventListener('input', function(){
    backfollowspeed(slide)
}, false);
video.addEventListener('timeupdate', function(){
    backfollowspeed(slide)
}, false)
function backfollow(elem) {
    elem.style.background = 'linear-gradient(to right, #25bdeb 0%, #25bdeb ' + elem.value + '%, #fff ' + elem.value + '%, white 100%)';
};
function backfollowspeed(elem) {
    var value = elem.value - 0.25;
    value = (value / 1.75) * 100;
    elem.style.background = 'linear-gradient(to right, #25bdeb 0%, #25bdeb ' + value + '%, #fff ' + value + '%, white 100%)';
    elem.title = elem.value
};

ranger.addEventListener('input', changet);

function changet() {
    video.currentTime = video.duration * (ranger.value / 100);
}

video.addEventListener('timeupdate', playtime);

function playtime() {
    ranger.value = video.currentTime * (100 / video.duration)
}

function skip(forward) {
    if (forward) {
        vid.currentTime = vid.currentTime + 5;
    } else {
        vid.currentTime = vid.currentTime - 5;

    }
}

slide.addEventListener('input', changespeed);
function changespeed() {
    video.playbackRate = slide.value;
}