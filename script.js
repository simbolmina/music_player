const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 1;

const loadSong = function (song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
};

loadSong(songs[songIndex]);

const playSong = function () {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
};

const pauseSong = function () {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
};

const prevSong = function () {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
};

const nextSong = function () {
  songIndex++;

  if (songIndex >= songs.length) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
};

const updateProgress = function (e) {
  const { duration, currentTime } = e.srcElement;

  const progressPercent = (currentTime / duration) * 100;

  progress.style.width = `${progressPercent}%`;
};

const setProgress = function (e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;

  console.log(width);
  console.log(clickX);
};

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);
