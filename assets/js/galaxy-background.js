class GalaxyBackground {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.getElementById(container) : container;
    if (!this.container) {
      console.error('Container element not found');
      return;
    }

    this.options = Object.assign({
      starsCount: 200,
      smallStarsCount: 300,
      starColor: '#ffffff',
      starSize: { min: 1, max: 3 },
      twinkleSpeed: 3,
      movementSpeed: 0.5,
      backgroundColor: '#0f172a',
      nebulaColors: ['rgba(99, 102, 241, 0.1)', 'rgba(79, 70, 229, 0.1)', 'rgba(139, 92, 246, 0.1)'],
      interactive: true
    }, options);

    this.canvas = null;
    this.ctx = null;
    this.stars = [];
    this.smallStars = [];
    this.nebulae = [];
    this.width = 0;
    this.height = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.isRunning = false;
    this.animationFrame = null;

    this.init();
  }

  init() {
    this.createCanvas();
    this.createStars();
    this.createNebulae();
    this.bindEvents();
    this.start();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1';
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    
    this.createStars();
    this.createNebulae();
  }

  createStars() {
    this.stars = [];
    for (let i = 0; i < this.options.starsCount; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * (this.options.starSize.max - this.options.starSize.min) + this.options.starSize.min,
        twinkleSpeed: Math.random() * this.options.twinkleSpeed + 0.5,
        twinklePhase: Math.random() * Math.PI * 2,
        originalAlpha: Math.random() * 0.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.5,
        color: this.options.starColor
      });
    }
    
    this.smallStars = [];
    for (let i = 0; i < this.options.smallStarsCount; i++) {
      this.smallStars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 0.8 + 0.2,
        alpha: Math.random() * 0.3 + 0.1,
        color: this.options.starColor
      });
    }
  }

  createNebulae() {
    this.nebulae = [];
    const nebulaCount = 5;
    
    for (let i = 0; i < nebulaCount; i++) {
      this.nebulae.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * (this.width / 3) + (this.width / 6),
        color: this.options.nebulaColors[Math.floor(Math.random() * this.options.nebulaColors.length)],
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.0005 + 0.0002
      });
    }
  }

  bindEvents() {
    if (this.options.interactive) {
      window.addEventListener('resize', this.resize.bind(this));
      
      this.container.addEventListener('mousemove', (e) => {
        const rect = this.container.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
      });
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  animate() {
    if (!this.isRunning) return;
    
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    
    this.ctx.fillStyle = this.options.backgroundColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    
    this.drawNebulae();
    
    
    this.drawSmallStars();
    
    
    this.drawStars();
    
    
    if (this.options.interactive && this.mouseX && this.mouseY) {
      this.moveStars();
    }
    
    this.animationFrame = requestAnimationFrame(this.animate.bind(this));
  }

  drawNebulae() {
    for (let i = 0; i < this.nebulae.length; i++) {
      const nebula = this.nebulae[i];
      
      
      nebula.phase += nebula.speed;
      
      
      const gradient = this.ctx.createRadialGradient(
        nebula.x, nebula.y, 0,
        nebula.x, nebula.y, nebula.radius * (1 + 0.1 * Math.sin(nebula.phase))
      );
      
      gradient.addColorStop(0, nebula.color);
      gradient.addColorStop(1, 'transparent');
      
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(nebula.x, nebula.y, nebula.radius * (1 + 0.1 * Math.sin(nebula.phase)), 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  drawSmallStars() {
    for (let i = 0; i < this.smallStars.length; i++) {
      const star = this.smallStars[i];
      
      this.ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  drawStars() {
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      
      
      star.twinklePhase += star.twinkleSpeed * 0.01;
      
      
      star.alpha = star.originalAlpha * (0.5 + 0.5 * Math.sin(star.twinklePhase));
      
      
      this.drawStarGlow(star);
      
      
      this.ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
      
      
      if (star.size > this.options.starSize.max * 0.8 && Math.random() < 0.01) {
        this.drawLensFlare(star);
      }
    }
  }

  drawStarGlow(star) {
    
    const gradient = this.ctx.createRadialGradient(
      star.x, star.y, 0,
      star.x, star.y, star.size * 3
    );
    
    gradient.addColorStop(0, `rgba(255, 255, 255, ${star.alpha * 0.8})`);
    gradient.addColorStop(1, 'transparent');
    
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawLensFlare(star) {
    
    const flareSize = star.size * 15;
    const flareAlpha = star.alpha * 0.2;
    
   
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${flareAlpha})`;
    this.ctx.lineWidth = star.size * 0.5;
    this.ctx.beginPath();
    this.ctx.moveTo(star.x - flareSize, star.y);
    this.ctx.lineTo(star.x + flareSize, star.y);
    this.ctx.stroke();
    
    
    this.ctx.beginPath();
    this.ctx.moveTo(star.x, star.y - flareSize);
    this.ctx.lineTo(star.x, star.y + flareSize);
    this.ctx.stroke();
  }

  moveStars() {
   
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const moveX = (this.mouseX - centerX) / centerX * this.options.movementSpeed;
    const moveY = (this.mouseY - centerY) / centerY * this.options.movementSpeed;
    
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      star.x -= moveX;
      star.y -= moveY;
      
      
      if (star.x < 0) star.x = this.width;
      if (star.x > this.width) star.x = 0;
      if (star.y < 0) star.y = this.height;
      if (star.y > this.height) star.y = 0;
    }
    
    for (let i = 0; i < this.smallStars.length; i++) {
      const star = this.smallStars[i];
      star.x -= moveX * 0.3;
      star.y -= moveY * 0.3;
      
      
      if (star.x < 0) star.x = this.width;
      if (star.x > this.width) star.x = 0;
      if (star.y < 0) star.y = this.height;
      if (star.y > this.height) star.y = 0;
    }
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this.resize.bind(this));
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}
