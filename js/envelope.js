/* ============================================================
   💌 ENVELOPE.JS — Màn 2: Phong Bì + Thả Thính IT
   ============================================================ */

class EnvelopeScene {
  constructor(onComplete) {
    this.onComplete = onComplete;
    this.scene = document.getElementById('scene-envelope');
    this.envelope = null;
    this.pickupCard = null;
    this.pickupText = null;
    this.currentLine = 0;
    this.isOpen = false;
    this.autoRotateTimer = null;
  }

  init() {
    if (!this.scene) return;

    this.envelope = this.scene.querySelector('.envelope');
    this.pickupCard = this.scene.querySelector('.pickup-card');
    this.pickupText = this.scene.querySelector('.pickup-text');
    this.prevBtn = this.scene.querySelector('.pickup-prev');
    this.nextBtn = this.scene.querySelector('.pickup-next');
    this.continueBtn = this.scene.querySelector('#envelope-continue-btn');

    // Create pickup dots dynamically
    const dotsContainer = this.scene.querySelector('.pickup-dots');
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      CONFIG.pickupLines.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `pickup-dot ${i === 0 ? 'active' : ''}`;
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);
      });
    }
    this.dots = this.scene.querySelectorAll('.pickup-dot');

    // Envelope click
    if (this.envelope) {
      this.envelope.addEventListener('click', () => this.openEnvelope());
    }

    // Navigation
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevLine());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextLine());

    // Dots click
    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => this.goToLine(i));
    });

    // Continue button
    if (this.continueBtn) {
      this.continueBtn.addEventListener('click', () => {
        this.stopAutoRotate();
        this.onComplete();
      });
    }

    // Touch swipe
    this.setupSwipe();
  }

  openEnvelope() {
    if (this.isOpen) return;
    this.isOpen = true;

    // Open envelope animation
    this.envelope.classList.add('open');

    // Show pickup card after animation
    setTimeout(() => {
      this.envelope.style.display = 'none';
      this.scene.querySelector('.envelope-prompt')?.classList.add('hidden');
      this.pickupCard.classList.add('visible');
      this.showLine(0);
      this.startAutoRotate();
    }, 1200);
  }

  showLine(index) {
    this.currentLine = index;
    const lines = CONFIG.pickupLines;

    // Fade out
    this.pickupText.style.opacity = '0';
    this.pickupText.style.transform = 'translateY(10px)';

    setTimeout(() => {
      this.pickupText.textContent = lines[index];
      // Fade in
      this.pickupText.style.opacity = '1';
      this.pickupText.style.transform = 'translateY(0)';
    }, 300);

    // Update dots
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  nextLine() {
    const next = (this.currentLine + 1) % CONFIG.pickupLines.length;
    this.showLine(next);
    this.restartAutoRotate();
  }

  prevLine() {
    const prev = (this.currentLine - 1 + CONFIG.pickupLines.length) % CONFIG.pickupLines.length;
    this.showLine(prev);
    this.restartAutoRotate();
  }

  goToLine(index) {
    this.showLine(index);
    this.restartAutoRotate();
  }

  startAutoRotate() {
    this.autoRotateTimer = setInterval(() => {
      this.nextLine();
    }, 4000);
  }

  stopAutoRotate() {
    if (this.autoRotateTimer) {
      clearInterval(this.autoRotateTimer);
      this.autoRotateTimer = null;
    }
  }

  restartAutoRotate() {
    this.stopAutoRotate();
    this.startAutoRotate();
  }

  setupSwipe() {
    let startX = 0;
    let startY = 0;

    const card = this.pickupCard;
    if (!card) return;

    card.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const diffX = endX - startX;
      const diffY = endY - startY;

      // Horizontal swipe
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX < 0) {
          this.nextLine();
        } else {
          this.prevLine();
        }
      }
    }, { passive: true });
  }
}
