class MusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.isPlaying = false;
        this.currentSongIndex = 0;

        // List of songs (add your AI-generated songs here)
        this.songs = [
            {
                title: "Midnight Protocol",
                file: "assets/music/Midnight Protocol.mp3"
            },
            {
                title: "AI Rock Fusion",
                file: "assets/music/song2.mp3"
            },
            {
                title: "AI Electronic Beat",
                file: "assets/music/song3.mp3"
            }
        ];

        // Get DOM elements
        this.playPauseBtn = document.getElementById('play-pause');
        this.prevBtn = document.getElementById('prev');
        this.nextBtn = document.getElementById('next');
        this.songTitle = document.querySelector('.song-title');
        this.progressBar = document.querySelector('.progress');
        this.progressArea = document.querySelector('.progress-bar');
        this.currentTime = document.querySelector('.current');
        this.duration = document.querySelector('.duration');

        this.initializePlayer();
        this.addEventListeners();
    }

    initializePlayer() {
        this.loadSong(this.currentSongIndex);
        this.updatePlayIcon();
    }

    loadSong(index) {
        const song = this.songs[index];
        this.audio.src = song.file;
        this.songTitle.textContent = song.title;
        this.progressBar.style.width = '0%';
        this.currentTime.textContent = '0:00';
    }

    togglePlayPause() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.isPlaying = true;
        this.audio.play();
        this.updatePlayIcon();
    }

    pause() {
        this.isPlaying = false;
        this.audio.pause();
        this.updatePlayIcon();
    }

    prevSong() {
        this.currentSongIndex--;
        if (this.currentSongIndex < 0) {
            this.currentSongIndex = this.songs.length - 1;
        }
        this.loadSong(this.currentSongIndex);
        if (this.isPlaying) this.play();
    }

    nextSong() {
        this.currentSongIndex++;
        if (this.currentSongIndex >= this.songs.length) {
            this.currentSongIndex = 0;
        }
        this.loadSong(this.currentSongIndex);
        if (this.isPlaying) this.play();
    }

    updatePlayIcon() {
        const icon = this.playPauseBtn.querySelector('i');
        icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    updateProgress(e) {
        const { duration, currentTime } = this.audio;
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            this.progressBar.style.width = `${progressPercent}%`;
            this.currentTime.textContent = this.formatTime(currentTime);
            this.duration.textContent = this.formatTime(duration);
        }
    }

    setProgress(e) {
        const width = this.progressArea.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audio.duration;
        this.audio.currentTime = (clickX / width) * duration;
    }

    addEventListeners() {
        // Play/Pause button
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());

        // Previous and Next buttons
        this.prevBtn.addEventListener('click', () => this.prevSong());
        this.nextBtn.addEventListener('click', () => this.nextSong());

        // Time update
        this.audio.addEventListener('timeupdate', (e) => this.updateProgress(e));

        // Click on progress bar
        this.progressArea.addEventListener('click', (e) => this.setProgress(e));

        // Song ends
        this.audio.addEventListener('ended', () => this.nextSong());
    }
}

// Initialize player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const player = new MusicPlayer();
});