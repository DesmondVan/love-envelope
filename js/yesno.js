/* ============================================================
   ❓ YESNO.JS — Màn 5: Câu Hỏi Yes/No (Nút Chạy Trốn)
   ============================================================ */

class YesNoScene {
  constructor(onYes) {
    this.onYes = onYes;
    this.scene = document.getElementById('scene-yesno');
    this.btnYes = null;
    this.btnNo = null;
    this.noCount = 0;
    this.container = null;
  }

  init() {
    if (!this.scene) return;

    this.btnYes = document.getElementById('btn-yes');
    this.btnNo = document.getElementById('btn-no');
    this.container = this.scene.querySelector('.yesno-container');

    // Yes button
    if (this.btnYes) {
      this.btnYes.addEventListener('click', () => this.handleYes());

      this.btnYes.addEventListener('mouseenter', () => {
        this.btnYes.textContent = '💖 YEEES! 💖';
      });
      this.btnYes.addEventListener('mouseleave', () => {
        this.btnYes.textContent = '💖 Có';
      });
    }

    // No button — run away!
    if (this.btnNo) {
      // Desktop: mouseenter
      this.btnNo.addEventListener('mouseenter', (e) => {
        e.preventDefault();
        this.handleNoHover();
      });

      // Mobile: touchstart
      this.btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.handleNoHover();
      });
    }
  }

  handleYes() {
    // Disable buttons
    this.btnYes.disabled = true;
    if (this.btnNo) this.btnNo.disabled = true;

    // Button celebration animation
    this.btnYes.textContent = '💖💖💖 YAY! 💖💖💖';
    this.btnYes.style.transform = 'scale(1.3)';
    this.btnYes.style.animation = 'none';

    setTimeout(() => {
      this.onYes();
    }, 800);
  }

  handleNoHover() {
    this.noCount++;
    const texts = CONFIG.noButtonTexts;

    if (this.noCount > texts.length) {
      // Button disappears!
      this.btnNo.classList.add('hiding');
      setTimeout(() => {
        this.btnNo.style.display = 'none';
      }, 500);
      return;
    }

    // On first hover: switch from flex flow to absolute positioning
    if (this.noCount === 1) {
      const btnRect = this.btnNo.getBoundingClientRect();
      const containerRect = this.container.getBoundingClientRect();
      this.btnNo.style.position = 'absolute';
      this.btnNo.style.left = (btnRect.left - containerRect.left) + 'px';
      this.btnNo.style.top = (btnRect.top - containerRect.top) + 'px';
      this.btnNo.style.margin = '0';
    }

    // Update text
    if (this.noCount <= texts.length) {
      this.btnNo.textContent = texts[this.noCount - 1];
    }

    // Shrink gradually
    const scale = Math.max(0.6, 1 - this.noCount * 0.08);

    // Move to random position
    this.moveNoButton(scale);
  }

  moveNoButton(scale = 1) {
    if (!this.container || !this.btnNo) return;

    const containerRect = this.container.getBoundingClientRect();
    const btnWidth = 120; // approximate
    const btnHeight = 44;

    // Random position within container bounds (with padding)
    const padding = 10;
    const maxX = containerRect.width - btnWidth - padding * 2;
    const maxY = containerRect.height - btnHeight - padding * 2;

    const randomX = padding + Math.random() * maxX;
    const randomY = padding + Math.random() * maxY;

    // Speed increases with each attempt
    const speed = Math.max(0.1, 0.3 - this.noCount * 0.03);

    this.btnNo.style.transition = `all ${speed}s ease`;
    this.btnNo.style.left = randomX + 'px';
    this.btnNo.style.top = randomY + 'px';
    this.btnNo.style.transform = `scale(${scale})`;
  }

  activate() {
    // Reset no button state
    this.noCount = 0;
    if (this.btnNo) {
      this.btnNo.style.display = '';
      this.btnNo.classList.remove('hiding');
      this.btnNo.textContent = CONFIG.noButtonTexts[0] || 'Không';
      this.btnNo.style.transform = 'scale(1)';
      this.btnNo.style.left = '';
      this.btnNo.style.top = '';
    }
  }
}
