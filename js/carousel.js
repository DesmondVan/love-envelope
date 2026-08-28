/* ============================================================
   📸 CAROUSEL.JS — Màn 4: Album Ảnh Carousel 3D
   ============================================================ */

class CarouselScene {
  constructor(onComplete) {
    this.onComplete = onComplete;
    this.scene = document.getElementById('scene-gallery');
    this.currentSlide = 0;
    this.slides = [];
    this.autoPlayTimer = null;
    this.isAutoPlaying = false;
    this.touchStartX = 0;
  }

  init() {
    if (!this.scene) return;
    this.buildCarousel();
    this.setupControls();
    this.setupTouchSwipe();
  }

  buildCarousel() {
    const track = this.scene.querySelector('.carousel-track');
    const dotsContainer = this.scene.querySelector('.carousel-dots');
    const captionEl = this.scene.querySelector('.carousel-caption');

    if (!track || !dotsContainer) return;

    const gallery = CONFIG.gallery;

    gallery.forEach((item, index) => {
      // Create slide
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.dataset.index = index;

      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.caption || `Ảnh ${index + 1}`;
      img.loading = 'lazy';
      img.onerror = function () {
        this.style.display = 'none';
        const placeholder = document.createElement('div');
        placeholder.className = 'slide-placeholder';
        placeholder.textContent = '📸';
        this.parentNode.appendChild(placeholder);
      };
      slide.appendChild(img);
      track.appendChild(slide);
      this.slides.push(slide);

      // Create dot
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
      dot.dataset.index = index;
      dot.setAttribute('aria-label', `Ảnh ${index + 1}`);
      dot.addEventListener('click', () => this.goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    // Position slides
    this.positionSlides();
  }

  positionSlides() {
    const total = this.slides.length;
    if (total === 0) return;

    this.slides.forEach((slide, i) => {
      slide.className = 'carousel-slide';

      const diff = i - this.currentSlide;

      if (diff === 0) {
        slide.classList.add('center');
      } else if (diff === -1 || (diff === total - 1 && total > 2)) {
        slide.classList.add('left');
      } else if (diff === 1 || (diff === -(total - 1) && total > 2)) {
        slide.classList.add('right');
      } else if (diff < -1) {
        slide.classList.add('far-left');
      } else {
        slide.classList.add('far-right');
      }
    });

    // Update caption
    const captionEl = this.scene.querySelector('.carousel-caption');
    if (captionEl) {
      captionEl.style.opacity = '0';
      setTimeout(() => {
        captionEl.textContent = CONFIG.gallery[this.currentSlide]?.caption || '';
        captionEl.style.opacity = '1';
      }, 200);
    }

    // Update dots
    const dots = this.scene.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentSlide);
    });
  }

  setupControls() {
    const prevArrow = this.scene.querySelector('.carousel-arrow-prev');
    const nextArrow = this.scene.querySelector('.carousel-arrow-next');
    const continueBtn = this.scene.querySelector('#gallery-continue-btn');

    if (prevArrow) prevArrow.addEventListener('click', () => this.prev());
    if (nextArrow) nextArrow.addEventListener('click', () => this.next());
    if (continueBtn) continueBtn.addEventListener('click', () => {
      this.stopAutoPlay();
      this.onComplete();
    });
  }

  setupTouchSwipe() {
    const track = this.scene.querySelector('.carousel-track');
    if (!track) return;

    track.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.stopAutoPlay();
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - this.touchStartX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) this.next();
        else this.prev();
      }
      this.startAutoPlay();
    }, { passive: true });
  }

  prev() {
    const total = this.slides.length;
    this.currentSlide = (this.currentSlide - 1 + total) % total;
    this.positionSlides();
  }

  next() {
    const total = this.slides.length;
    this.currentSlide = (this.currentSlide + 1) % total;
    this.positionSlides();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.positionSlides();
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.isAutoPlaying = true;
    this.autoPlayTimer = setInterval(() => this.next(), 3500);
  }

  stopAutoPlay() {
    this.isAutoPlaying = false;
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  activate() {
    this.startAutoPlay();
  }

  deactivate() {
    this.stopAutoPlay();
  }
}
