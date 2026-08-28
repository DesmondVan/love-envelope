/* ============================================================
   ✍️ TYPEWRITER.JS — Màn 3: Thư Tình Typewriter
   ============================================================ */

class TypewriterScene {
  constructor(onComplete, effectsEngine) {
    this.onComplete = onComplete;
    this.effects = effectsEngine;
    this.scene = document.getElementById('scene-typewriter');
    this.currentChapter = 0;
    this.isTyping = false;
    this.typeTimer = null;
    this.chapters = CONFIG.chapters;
  }

  init() {
    if (!this.scene) return;
    this.buildChapters();
    this.buildProgressDots();
  }

  buildChapters() {
    const container = this.scene;
    
    this.chapters.forEach((chapter, index) => {
      const div = document.createElement('div');
      div.className = `chapter ${index === 0 ? 'active' : ''}`;
      div.dataset.chapter = index;

      // Background overlay for chapter-specific gradient
      const overlay = document.createElement('div');
      overlay.className = 'chapter-bg-overlay';
      overlay.style.background = `linear-gradient(135deg, ${chapter.gradient[0]}, ${chapter.gradient[1]})`;
      div.appendChild(overlay);

      // Chapter effects canvas (handled by effects engine)
      const effectsCanvas = document.createElement('canvas');
      effectsCanvas.className = 'chapter-effects-canvas';
      div.appendChild(effectsCanvas);

      // Inner layout
      const inner = document.createElement('div');
      inner.className = 'chapter-inner';

      // Image
      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'chapter-image-wrapper';

      const img = document.createElement('img');
      img.className = 'chapter-image';
      img.src = chapter.image;
      img.alt = chapter.title;
      img.loading = 'lazy';
      img.onerror = function () {
        // Show placeholder if image not found
        this.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.className = 'chapter-image-placeholder';
        placeholder.textContent = ['🌸', '💬', '💕', '💖'][index] || '📸';
        this.parentNode.appendChild(placeholder);
      };
      imgWrapper.appendChild(img);
      inner.appendChild(imgWrapper);

      // Content
      const content = document.createElement('div');
      content.className = 'chapter-content';

      const title = document.createElement('h2');
      title.className = 'chapter-title';
      title.textContent = chapter.title;
      content.appendChild(title);

      const text = document.createElement('div');
      text.className = 'chapter-text';
      text.id = `chapter-text-${index}`;
      content.appendChild(text);

      // Navigation button
      const nav = document.createElement('div');
      nav.className = 'chapter-nav';

      const isLast = index === this.chapters.length - 1;
      const btn = document.createElement('button');
      btn.className = 'btn-primary';
      btn.id = `chapter-btn-${index}`;

      if (isLast) {
        btn.innerHTML = 'Anh còn giữ những kỷ niệm nè 📸';
        btn.addEventListener('click', () => this.onComplete());
      } else {
        btn.innerHTML = 'Chương tiếp theo →';
        btn.addEventListener('click', () => this.goToChapter(index + 1));
      }
      nav.appendChild(btn);
      content.appendChild(nav);

      inner.appendChild(content);
      div.appendChild(inner);
      container.appendChild(div);
    });
  }

  buildProgressDots() {
    const progress = document.createElement('div');
    progress.className = 'chapter-progress';
    progress.id = 'chapter-progress';

    this.chapters.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.className = `chapter-progress-dot ${index === 0 ? 'active' : ''}`;
      dot.dataset.chapter = index;
      dot.addEventListener('click', () => {
        if (index <= this.currentChapter) {
          this.goToChapter(index);
        }
      });
      progress.appendChild(dot);
    });

    this.scene.appendChild(progress);
  }

  // Start the typewriter for the current chapter
  startChapter(index) {
    this.currentChapter = index;
    const chapter = this.chapters[index];
    const textEl = document.getElementById(`chapter-text-${index}`);
    const navEl = textEl?.parentNode.querySelector('.chapter-nav');

    if (!textEl) return;

    // Clear previous content
    textEl.innerHTML = '';
    if (navEl) navEl.classList.remove('visible');

    // Start chapter effect
    if (this.effects) {
      this.effects.startEffect(chapter.effect);
    }

    // Update progress dots
    this.updateProgressDots();

    // Start typing after a delay (wait for fade-in)
    setTimeout(() => {
      this.typeText(textEl, chapter.text, () => {
        // Show navigation button after typing is done
        if (navEl) {
          navEl.classList.add('visible');
        }
      });
    }, 1000);
  }

  typeText(element, text, onComplete) {
    if (this.typeTimer) clearInterval(this.typeTimer);
    this.isTyping = true;

    // Process text: replace \n with actual line breaks
    const processedText = text.replace(/\\n/g, '\n');
    let charIndex = 0;

    // Add cursor
    const cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';

    const textSpan = document.createElement('span');
    element.innerHTML = '';
    element.appendChild(textSpan);
    element.appendChild(cursor);

    this.typeTimer = setInterval(() => {
      if (charIndex < processedText.length) {
        const char = processedText[charIndex];
        if (char === '\n') {
          textSpan.innerHTML += '<br>';
        } else {
          textSpan.innerHTML += char;
        }
        charIndex++;

        // Auto-scroll if content overflows
        element.scrollTop = element.scrollHeight;
      } else {
        clearInterval(this.typeTimer);
        this.isTyping = false;
        // Remove cursor after done
        setTimeout(() => {
          cursor.style.animation = 'none';
          cursor.style.opacity = '0';
        }, 2000);

        if (onComplete) onComplete();
      }
    }, 45); // Speed: 45ms per character
  }

  goToChapter(index) {
    if (index < 0 || index >= this.chapters.length) return;
    if (this.typeTimer) clearInterval(this.typeTimer);

    // Fade out current chapter
    const current = this.scene.querySelector(`.chapter[data-chapter="${this.currentChapter}"]`);
    const next = this.scene.querySelector(`.chapter[data-chapter="${index}"]`);

    if (current) {
      current.classList.remove('active');
    }

    setTimeout(() => {
      if (next) {
        next.classList.add('active');
        this.startChapter(index);
      }
    }, 400);
  }

  updateProgressDots() {
    const dots = document.querySelectorAll('.chapter-progress-dot');
    dots.forEach((dot, i) => {
      dot.classList.remove('active', 'completed');
      if (i === this.currentChapter) {
        dot.classList.add('active');
      } else if (i < this.currentChapter) {
        dot.classList.add('completed');
      }
    });
  }

  // Called when scene becomes active
  activate() {
    const progress = document.getElementById('chapter-progress');
    if (progress) progress.classList.add('visible');
    this.startChapter(0);
  }

  // Called when scene becomes inactive
  deactivate() {
    const progress = document.getElementById('chapter-progress');
    if (progress) progress.classList.remove('visible');
    if (this.typeTimer) clearInterval(this.typeTimer);
    if (this.effects) this.effects.stopAllEffects();
  }
}
