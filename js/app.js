/* ============================================================
   🎯 APP.JS — Main Application Orchestrator
   ============================================================ */

class App {
  constructor() {
    this.currentScene = 'password';
    this.scenes = {};
    this.effects = null;
    this.music = null;
    this.sceneOrder = [
      'password',
      'envelope',
      'typewriter',
      'gallery',
      'yesno',
      'celebration',
    ];
  }

  init() {
    // Setup dynamic content from config FIRST
    this.setupDynamicContent();

    // Initialize effects engine
    this.effects = new EffectsEngine();
    this.effects.init();

    // Initialize music controller
    this.music = new MusicController();
    this.music.init();

    // Initialize scenes
    this.scenes.password = new PasswordScene(() => {
      // On password success → start music → go to envelope
      this.music.play();
      this.transitionTo('envelope');
    });

    this.scenes.envelope = new EnvelopeScene(() => {
      this.transitionTo('typewriter');
    });

    this.scenes.typewriter = new TypewriterScene(() => {
      this.transitionTo('gallery');
    }, this.effects);

    this.scenes.gallery = new CarouselScene(() => {
      this.transitionTo('yesno');
    });

    this.scenes.yesno = new YesNoScene(() => {
      this.transitionTo('celebration');
    });

    this.scenes.celebration = new CelebrationScene(this.effects);

    // Initialize all scenes
    Object.values(this.scenes).forEach(scene => scene.init());

    // Show password scene
    this.showScene('password');

    // Prevent accidental page close
    window.addEventListener('beforeunload', (e) => {
      if (this.currentScene !== 'password') {
        e.preventDefault();
        e.returnValue = '';
      }
    });

    console.log('💖 WEB TÁN GÁI — Ready!');
    console.log('Made with ❤️');
  }

  setupDynamicContent() {
    // Password hint
    const hintEl = document.getElementById('password-hint');
    if (hintEl) hintEl.innerHTML = '💡 Gợi ý: ' + CONFIG.passwordHint;

    // Yes/No question
    const questionEl = document.getElementById('yesno-question');
    if (questionEl) questionEl.textContent = CONFIG.question;

    // Celebration texts
    const celebTitle = document.getElementById('celebration-title');
    const celebSub = document.getElementById('celebration-subtitle');
    if (celebTitle) celebTitle.textContent = CONFIG.celebrationTitle;
    if (celebSub) celebSub.textContent = CONFIG.celebrationSubtitle;
  }

  showScene(name) {
    // Hide all scenes
    document.querySelectorAll('.scene').forEach(el => {
      el.classList.remove('active');
    });

    // Show target scene
    const sceneEl = document.getElementById(`scene-${name}`);
    if (sceneEl) {
      sceneEl.classList.add('active');
    }

    this.currentScene = name;
  }

  transitionTo(name) {
    const currentEl = document.getElementById(`scene-${this.currentScene}`);
    const nextEl = document.getElementById(`scene-${name}`);

    // Deactivate current scene
    const currentSceneObj = this.scenes[this.currentScene];
    if (currentSceneObj && currentSceneObj.deactivate) {
      currentSceneObj.deactivate();
    }

    // Fade out current
    if (currentEl) {
      currentEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      currentEl.style.opacity = '0';
      currentEl.style.transform = 'scale(0.96)';
    }

    setTimeout(() => {
      // Hide current
      if (currentEl) {
        currentEl.classList.remove('active');
        currentEl.style.opacity = '';
        currentEl.style.transform = '';
      }

      // Show next
      if (nextEl) {
        nextEl.style.opacity = '0';
        nextEl.style.transform = 'scale(1.04)';
        nextEl.classList.add('active');

        // Force reflow
        void nextEl.offsetWidth;

        nextEl.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        nextEl.style.opacity = '1';
        nextEl.style.transform = 'scale(1)';
      }

      this.currentScene = name;

      // Activate next scene
      const nextSceneObj = this.scenes[name];
      if (nextSceneObj && nextSceneObj.activate) {
        nextSceneObj.activate();
      }
    }, 600);
  }
}

// ── Launch! ──
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
