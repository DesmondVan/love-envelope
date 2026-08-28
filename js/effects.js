/* ============================================================
   ✨ EFFECTS.JS — Particle Effects Engine
   Hoa rơi, bong bóng, tim bay, sparkle, petal
   ============================================================ */

class EffectsEngine {
  constructor() {
    this.activeEffects = [];
    this.globalParticles = [];
    this.animFrameId = null;
    this.canvas = null;
    this.ctx = null;
  }

  init() {
    this.canvas = document.getElementById('particles-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.startGlobalParticles();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  // ── Global sparkle particles (always running) ──
  startGlobalParticles() {
    // Create initial sparkle particles (reduced count for performance)
    for (let i = 0; i < 15; i++) {
      this.globalParticles.push(this.createSparkleParticle());
    }
    this.animateGlobal();
  }

  createSparkleParticle() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random(),
      opacityDir: Math.random() > 0.5 ? 1 : -1,
      color: this.getRandomPastelColor(),
    };
  }

  getRandomPastelColor() {
    const colors = [
      'rgba(255, 182, 193, ',  // pink
      'rgba(255, 218, 185, ',  // peach
      'rgba(232, 213, 245, ',  // lavender
      'rgba(255, 228, 160, ',  // gold
      'rgba(214, 238, 255, ',  // sky
      'rgba(255, 255, 255, ',  // white
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  animateGlobal() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw global sparkles
    this.globalParticles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.opacity += p.opacityDir * 0.008;

      if (p.opacity >= 1) p.opacityDir = -1;
      if (p.opacity <= 0.1) p.opacityDir = 1;

      // Wrap around
      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + p.opacity + ')';
      this.ctx.fill();
    });

    // Draw active chapter effects
    this.activeEffects.forEach(effect => {
      effect.particles.forEach((p, index) => {
        effect.update(p);
        effect.draw(this.ctx, p);

        // Remove dead particles
        if (p.dead) {
          effect.particles.splice(index, 1);
          // Respawn
          if (effect.active) {
            effect.particles.push(effect.create());
          }
        }
      });
    });

    this.animFrameId = requestAnimationFrame(() => this.animateGlobal());
  }

  // ── Start a chapter-specific effect ──
  startEffect(type) {
    this.stopAllEffects();

    const effect = {
      type,
      active: true,
      particles: [],
      create: null,
      update: null,
      draw: null,
    };

    switch (type) {
      case 'sakura':
        effect.create = () => this.createSakura();
        effect.update = (p) => this.updateSakura(p);
        effect.draw = (ctx, p) => this.drawSakura(ctx, p);
        for (let i = 0; i < 15; i++) { // reduced from 20
          effect.particles.push(this.createSakura());
        }
        break;

      case 'bubbles':
        effect.create = () => this.createBubble();
        effect.update = (p) => this.updateBubble(p);
        effect.draw = (ctx, p) => this.drawBubble(ctx, p);
        for (let i = 0; i < 10; i++) { // reduced from 15
          effect.particles.push(this.createBubble());
        }
        break;

      case 'hearts':
        effect.create = () => this.createHeart();
        effect.update = (p) => this.updateHeart(p);
        effect.draw = (ctx, p) => this.drawHeart(ctx, p);
        for (let i = 0; i < 8; i++) { // reduced from 12
          effect.particles.push(this.createHeart());
        }
        break;

      case 'sparkle':
        effect.create = () => this.createSparkle();
        effect.update = (p) => this.updateSparkle(p);
        effect.draw = (ctx, p) => this.drawSparkle(ctx, p);
        for (let i = 0; i < 15; i++) { // reduced from 25
          effect.particles.push(this.createSparkle());
        }
        break;

      default:
        return;
    }

    this.activeEffects.push(effect);
  }

  stopAllEffects() {
    this.activeEffects.forEach(e => e.active = false);
    this.activeEffects = [];
  }

  // ── 🌸 Sakura (Cherry Blossom) ──
  createSakura() {
    return {
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * window.innerHeight,
      size: Math.random() * 12 + 6,
      speedY: Math.random() * 1.5 + 0.5,
      speedX: (Math.random() - 0.5) * 1,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 3,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.03 + 0.01,
      opacity: Math.random() * 0.5 + 0.5,
      dead: false,
    };
  }

  updateSakura(p) {
    p.y += p.speedY;
    p.wobble += p.wobbleSpeed;
    p.x += p.speedX + Math.sin(p.wobble) * 0.8;
    p.rotation += p.rotSpeed;
    if (p.y > window.innerHeight + 20) p.dead = true;
  }

  drawSakura(ctx, p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = p.opacity;

    // Petal shape
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, ${160 + Math.random() * 40}, ${180 + Math.random() * 30}, ${p.opacity})`;
    ctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Small inner detail
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 200, 210, ${p.opacity * 0.5})`;
    ctx.ellipse(0, 0, p.size * 0.5, p.size * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // ── 🫧 Bubbles ──
  createBubble() {
    return {
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 20 + Math.random() * window.innerHeight * 0.5,
      size: Math.random() * 20 + 8,
      speedY: -(Math.random() * 1.2 + 0.3),
      speedX: (Math.random() - 0.5) * 0.5,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      opacity: Math.random() * 0.4 + 0.2,
      dead: false,
    };
  }

  updateBubble(p) {
    p.y += p.speedY;
    p.wobble += p.wobbleSpeed;
    p.x += p.speedX + Math.sin(p.wobble) * 0.5;
    p.opacity -= 0.001;
    if (p.y < -30 || p.opacity <= 0) p.dead = true;
  }

  drawBubble(ctx, p) {
    ctx.save();
    ctx.globalAlpha = p.opacity;

    // Outer circle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(200, 220, 255, ${p.opacity})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Shine
    ctx.beginPath();
    ctx.arc(p.x - p.size * 0.3, p.y - p.size * 0.3, p.size * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.8})`;
    ctx.fill();

    // Inner gradient
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
    gradient.addColorStop(0, `rgba(232, 213, 245, ${p.opacity * 0.1})`);
    gradient.addColorStop(0.8, `rgba(214, 238, 255, ${p.opacity * 0.05})`);
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // ── 💗 Hearts ──
  createHeart() {
    return {
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 20 + Math.random() * window.innerHeight * 0.3,
      size: Math.random() * 14 + 6,
      speedY: -(Math.random() * 1 + 0.4),
      speedX: (Math.random() - 0.5) * 0.8,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.02 + 0.01,
      rotation: (Math.random() - 0.5) * 30,
      opacity: Math.random() * 0.6 + 0.3,
      color: ['#FF85C0', '#FB7185', '#FF5CA8', '#FFB3D9', '#FF6B9D'][Math.floor(Math.random() * 5)],
      dead: false,
    };
  }

  updateHeart(p) {
    p.y += p.speedY;
    p.wobble += p.wobbleSpeed;
    p.x += p.speedX + Math.sin(p.wobble) * 0.6;
    p.opacity -= 0.002;
    if (p.y < -30 || p.opacity <= 0) p.dead = true;
  }

  drawHeart(ctx, p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = p.opacity;

    const s = p.size;
    ctx.beginPath();
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(-s, -s * 0.3, -s, s * 0.6, 0, s);
    ctx.bezierCurveTo(s, s * 0.6, s, -s * 0.3, 0, s * 0.3);
    ctx.fillStyle = p.color;
    ctx.fill();

    ctx.restore();
  }

  // ── ✨ Sparkle Burst ──
  createSparkle() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      life: 0,
      maxLife: Math.random() * 120 + 60,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      color: ['#FFE4A0', '#FFD060', '#FFFFFF', '#FF85C0', '#FFB3D9'][Math.floor(Math.random() * 5)],
      dead: false,
    };
  }

  updateSparkle(p) {
    p.life++;
    p.x += p.speedX;
    p.y += p.speedY;
    p.speedX *= 0.99;
    p.speedY *= 0.99;
    if (p.life >= p.maxLife) p.dead = true;
  }

  drawSparkle(ctx, p) {
    const progress = p.life / p.maxLife;
    const opacity = progress < 0.5
      ? progress * 2
      : (1 - progress) * 2;

    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.translate(p.x, p.y);
    ctx.rotate((p.life * 3 * Math.PI) / 180);

    // Star shape
    const s = p.size * (0.5 + Math.sin(p.life * 0.1) * 0.5);
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(angle) * s, Math.sin(angle) * s);
    }
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Center dot
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    ctx.restore();
  }

  // ── Celebration: spawn floating hearts via DOM ──
  spawnCelebrationHearts(count = 30) {
    const hearts = ['💖', '💕', '💗', '💓', '❤️', '💘', '🩷', '🌸', '✨'];
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
        heart.style.setProperty('--duration', (Math.random() * 3 + 3) + 's');
        document.body.appendChild(heart);

        heart.addEventListener('animationend', () => heart.remove());
      }, i * 200);
    }
  }

  destroy() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    this.stopAllEffects();
  }
}
