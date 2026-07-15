// 1. Song Data Array (Updated with your exact sillyphon tracks)
const songs = [
  { name: "out of you", artist: "lily's puff", img: "img04", audio: "music1" },
  { name: "waves (v.d.g.g. tribute)", artist: "lily's puff", img: "img05", audio: "music2" },
  { name: "february the 1st", artist: "lily's puff", img: "img03", audio: "music3" },
  { name: "find a way", artist: "lily's puff", img: "img06", audio: "music4" },
  { name: "floating", artist: "lily's puff", img: "img10", audio: "music5" },
  { name: "shelter doom", artist: "lily's puff", img: "img08", audio: "music6" },
  { name: "is this we make?", artist: "lily's puff", img: "img07", audio: "music7" },
  { name: "steel light", artist: "lily's puff", img: "img09", audio: "music8" },
  { name: "stone leaves", artist: "lily's puff", img: "img02", audio: "music9" },
  { name: "heartbroken", artist: "lily's puff", img: "img02", audio: "music10" },
  { name: "theme II", artist: "lily's puff", img: "img02", audio: "music11" },
  { name: "orpheus", artist: "lily's puff", img: "img02", audio: "music12" },
  { name: "danny lee", artist: "lily's puff", img: "img02", audio: "music13" },
  { name: "electromadness", artist: "lily's puff", img: "img02", audio: "music14" },
  { name: "growtime", artist: "lily's puff", img: "img02", audio: "music15" },
  { name: "embrace", artist: "lily's puff", img: "img02", audio: "music16" },
  { name: "wasted", artist: "lily's puff", img: "img02", audio: "music17" },
  { name: "nebula", artist: "lily's puff", img: "img02", audio: "music18" },
  { name: "dumb", artist: "lily's puff", img: "img02", audio: "music19" },
  { name: "prelude", artist: "lily's puff", img: "img01", audio: "music20" },
  { name: "the rope", artist: "lily's puff", img: "img01", audio: "music21" },
  { name: "distant walking", artist: "lily's puff", img: "img01", audio: "music22" },
  { name: "under city lights", artist: "lily's puff", img: "img01", audio: "music23" },
  { name: "kitchen elements", artist: "lily's puff", img: "img01", audio: "music24" },
  { name: "serpentine", artist: "lily's puff", img: "img01", audio: "music25" },
  { name: "all same words", artist: "lily's puff", img: "img01", audio: "music26" },
  { name: "a song", artist: "lily's puff", img: "img01", audio: "music27" },
  { name: "kitchen elements II", artist: "lily's puff", img: "img01", audio: "music28" },
  { name: "wake up", artist: "lily's puff", img: "img01", audio: "music29" }
];

// 2. DOM Elements
const content = document.querySelector(".content"),
  Playimage = content.querySelector(".music-image img"),
  musicName = content.querySelector(".music-titles .name"),
  musicArtist = content.querySelector(".music-titles .artist"),
  Audio = document.querySelector(".main-song"),
  playBtn = content.querySelector(".play-pause"),
  playBtnIcon = content.querySelector(".play-pause span"),
  prevBtn = content.querySelector("#prev"),
  nextBtn = content.querySelector("#next"),
  progressBar = content.querySelector(".progress-bar"),
  progressDetails = content.querySelector(".progress-details"),
  repeatBtn = content.querySelector("#repeat"),
  Shuffle = content.querySelector("#shuffle"),
  playlist = document.getElementById('playlist');

let index = 1; // 1-based index to map with songs array (index - 1)

// 3. Load Data Function
function loadData(indexValue) {
  musicName.innerHTML = songs[indexValue - 1].name;
  musicArtist.innerHTML = songs[indexValue - 1].artist;
  Playimage.src = "images/" + songs[indexValue - 1].img + ".jpg";
  Audio.src = "music/" + songs[indexValue - 1].audio + ".mp3";
  updatePlaylistUI(indexValue);
}

// 4. Update Playlist Highlight
function updatePlaylistUI(activeIndex) {
  const tracks = playlist.querySelectorAll('.track');
  tracks.forEach((track, i) => {
    if (i === activeIndex - 1) {
      track.classList.add('active');
    } else {
      track.classList.remove('active');
    }
  });
}

// 5. Play / Pause Controls
function playSong() {
  content.classList.add("paused");
  playBtnIcon.innerHTML = "pause";
  Audio.play().catch(e => console.log("Playback interrupted or asset missing:", e));
}

function pauseSong() {
  content.classList.remove("paused");
  playBtnIcon.innerHTML = "play_arrow";
  Audio.pause();
}

playBtn.addEventListener("click", () => {
  const isMusicPlaying = content.classList.contains("paused");
  isMusicPlaying ? pauseSong() : playSong();
});

// 6. Next & Previous Track Logic
function nextSong() {
  index++;
  if (index > songs.length) index = 1;
  loadData(index);
  playSong();
}

function prevSong() {
  index--;
  if (index <= 0) index = songs.length;
  loadData(index);
  playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// 7. Time & Progress Bar Updates
Audio.addEventListener("timeupdate", (e) => {
  const initialTime = e.target.currentTime;
  const finalTime = e.target.duration || 0;
  let BarWidth = finalTime > 0 ? (initialTime / finalTime) * 100 : 0;
  progressBar.style.width = BarWidth + "%";

  // Current Time display calculation
  let currentTimeData = content.querySelector(".current");
  let currentMinutes = Math.floor(initialTime / 60);
  let currentSeconds = Math.floor(initialTime % 60);
  if (currentSeconds < 10) currentSeconds = "0" + currentSeconds;
  currentTimeData.innerText = currentMinutes + ":" + currentSeconds;
});

// Click on progress bar to scrub through song
progressDetails.addEventListener("click", (e) => {
  let progressValue = progressDetails.clientWidth;
  let clickedOffsetX = e.offsetX;
  let MusicDuration = Audio.duration;
  if (MusicDuration) {
    Audio.currentTime = (clickedOffsetX / progressValue) * MusicDuration;
  }
});

// Update final duration display once metadata loads
Audio.addEventListener("loadedmetadata", () => {
  let finalTimeData = content.querySelector(".final");
  let AudioDuration = Audio.duration;
  let finalMinutes = Math.floor(AudioDuration / 60);
  let finalSeconds = Math.floor(AudioDuration % 60);
  if (finalSeconds < 10) finalSeconds = "0" + finalSeconds;
  finalTimeData.innerText = finalMinutes + ":" + finalSeconds;
});

// 8. Repeat, Shuffle & Audio Ended Logic
repeatBtn.addEventListener("click", () => {
  Audio.currentTime = 0;
  playSong();
});

Shuffle.addEventListener("click", () => {
  let randIndex;
  do {
    randIndex = Math.floor(Math.random() * songs.length) + 1;
  } while (randIndex === index && songs.length > 1);
  
  index = randIndex;
  loadData(index);
  playSong();
});

Audio.addEventListener("ended", nextSong);

// 9. Playlist Interaction (Syncs perfectly with the main engine)
playlist.addEventListener('click', (e) => {
  const clickedTrack = e.target.closest('.track');
  if (!clickedTrack) return;

  const trackIndex = parseInt(clickedTrack.getAttribute('data-index'));
  index = trackIndex;
  loadData(index);
  playSong();
});

// 10. Initial Load
window.addEventListener("load", () => {
  loadData(index);
});