console.log("Welcome to Spotify");

// Songs array
const songs = [
    {songName: "Tu Hai Kahan", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Perfect", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Pee Loon", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Shikayat", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Tune Kya Kiya", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Zaalima", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Tujhe kitna chahne lage hum", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Zara Sa", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Pehla Pyaar", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
];

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio(songs[songIndex].filePath); // Initialize with the first song
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let nextButton = document.getElementById('next');
let prevButton = document.getElementById('previous');
let waveform = document.getElementById('waveform');
let songCover = document.getElementById('songCover');

// Define the updateSongInfo function here
const updateSongInfo = (index) => {
    document.querySelector('.songInfo .songName').innerText = songs[index].songName;
    document.querySelector('#songCover').src = songs[index].coverPath;
};

// Define the loadSong function here
const loadSong = (index) => {
    console.log(`Loading song: ${songs[index].filePath}`);
    audioElement.src = songs[index].filePath;
    audioElement.currentTime = 0;
    audioElement.play().then(() => {
        console.log(`Playing: ${songs[index].filePath}`);
    }).catch(error => {
        console.error(`Error playing song: ${error}`);
    });
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    waveform.style.display = "block"; // Show waveform
    songCover.style.display = "block"; // Show song cover
    updateSongInfo(index); // Update song name and cover
};

// Dynamically generate song list
const songListContainer = document.querySelector('.songItemContainer');
songs.forEach((song, i) => {
    const songItem = document.createElement('div');
    songItem.classList.add('songItem');
    songItem.innerHTML = `
        <img src="${song.coverPath}" alt="${i + 1}">
        <span class="songName">${song.songName}</span>
        <span class="songlistplay">
            <span class="timestamp">04:52 <i class="far fa-play-circle" id="play-${i}"></i></span>
        </span>
    `;
    songListContainer.appendChild(songItem);

    // Add click event listener to play song
    songItem.addEventListener('click', () => {
        console.log(`Playing song index: ${i}`);
        songIndex = i;
        loadSong(songIndex);
    });
});

// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        waveform.style.display = "block"; // Show waveform
        songCover.style.display = "block"; // Show song cover
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        waveform.style.display = "none"; // Hide waveform
        songCover.style.display = "none"; // Hide song cover
    }
});

// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// Event listeners for next and previous buttons
nextButton.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
});

prevButton.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
});

// Auto play next song when current song ends
audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
});
