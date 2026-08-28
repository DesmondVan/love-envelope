/* ============================================================
   🎆 CELEBRATION.JS — Màn 6: Celebration & Confetti
   ============================================================ */

class CelebrationScene {
  constructor(effectsEngine) {
    this.effects = effectsEngine;
    this.scene = document.getElementById('scene-celebration');
    this.confettiLoaded = false;
  }

  init() {
    if (!this.scene) return;

    // Load canvas-confetti from CDN
    this.loadConfettiLib();

    // Set day counter
    this.updateDayCounter();
  }

  loadConfettiLib() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
    script.onload = () => {
      this.confettiLoaded = true;
    };
    script.onerror = () => {
      console.warn('Could not load confetti library');
    };
    document.head.appendChild(script);
  }

  updateDayCounter() {
    const counterValue = this.scene.querySelector('.counter-value');
    if (!counterValue || !CONFIG.startDate) return;

    const start = new Date(CONFIG.startDate);
    const now = new Date();
    const diffTime = Math.abs(now - start);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    counterValue.textContent = diffDays;
  }

  activate() {
    this.updateDayCounter();

    // Speed up gradient
    const bg = document.getElementById('bg-gradient');
    if (bg) {
      bg.style.animationDuration = '5s';
    }

    // Fire confetti
    setTimeout(() => this.fireConfetti(), 300);

    // Spawn floating hearts
    if (this.effects) {
      this.effects.spawnCelebrationHearts(35);
    }

    // Keep spawning hearts periodically
    this.heartInterval = setInterval(() => {
      if (this.effects) {
        this.effects.spawnCelebrationHearts(8);
      }
    }, 5000);
  }

  fireConfetti() {
    if (!this.confettiLoaded || typeof confetti !== 'function') return;

    // Initial big burst
    const colors = ['#FF85C0', '#FFB3D9', '#FF5CA8', '#FFE4A0', '#E8D5F5', '#FB7185', '#FFFFFF'];

    // Center burst
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { x: 0.5, y: 0.5 },
      colors: colors,
      startVelocity: 35,
      gravity: 0.8,
      ticks: 200,
    });

    // Left burst
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors,
        startVelocity: 40,
      });
    }, 300);

    // Right burst
    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors,
        startVelocity: 40,
      });
    }, 600);

    // Follow-up bursts
    let burstCount = 0;
    const burstInterval = setInterval(() => {
      burstCount++;
      if (burstCount > 5) {
        clearInterval(burstInterval);
        return;
      }

      confetti({
        particleCount: 30,
        angle: 60 + Math.random() * 60,
        spread: 50 + Math.random() * 30,
        origin: { x: Math.random(), y: 0.4 + Math.random() * 0.3 },
        colors: colors,
        startVelocity: 25,
        gravity: 1,
      });
    }, 1500);
  }

  deactivate() {
    // Restore gradient speed
    const bg = document.getElementById('bg-gradient');
    if (bg) {
      bg.style.animationDuration = '20s';
    }

    if (this.heartInterval) {
      clearInterval(this.heartInterval);
    }
  }
}
