/* ============================================================
   🎵 MUSIC.JS — Background Music Controller
   ============================================================ */

class MusicController {
  constructor() {
    this.audio = null;
    this.btn = null;
    this.isPlaying = false;
    this.isReady = false;
  }

  init() {
    this.btn = document.getElementById('music-btn');
    if (!this.btn) return;

    // Create audio element
    this.audio = new Audio(CONFIG.musicSrc);
    this.audio.loop = true;
    this.audio.volume = 0.4;
    this.audio.preload = 'auto';

    // Event listeners
    this.audio.addEventListener('canplaythrough', () => {
      this.isReady = true;
    });

    this.audio.addEventListener('error', () => {
      console.warn('Nhạc nền không tải được. Kiểm tra file:', CONFIG.musicSrc);
      // Still show button but indicate no music
      this.btn.textContent = '🔇';
      this.btn.classList.add('visible');
      this.btn.title = 'Không tìm thấy file nhạc';
    });

    this.btn.addEventListener('click', () => this.toggle());
  }

  play() {
    if (!this.audio) return;

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isPlaying = true;
        this.btn.textContent = '🎵';
        this.btn.classList.add('playing', 'visible');
        this.btn.title = 'Tắt nhạc';
      }).catch(() => {
        // Auto-play blocked, show button for manual play
        this.btn.textContent = '🎵';
        this.btn.classList.add('visible');
        this.btn.title = 'Bật nhạc';
      });
    }
  }

  pause() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
    this.btn.textContent = '🔇';
    this.btn.classList.remove('playing');
    this.btn.title = 'Bật nhạc';
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  setVolume(vol) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, vol));
    }
  }

  // Smoothly fade volume (for celebration)
  fadeVolume(targetVol, duration = 1000) {
    if (!this.audio) return;
    const startVol = this.audio.volume;
    const diff = targetVol - startVol;
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      this.audio.volume = startVol + (diff * (step / steps));
      if (step >= steps) {
        clearInterval(interval);
        this.audio.volume = targetVol;
      }
    }, stepTime);
  }
}
