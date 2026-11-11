const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// Configuration
const config = {
  particleCount: 120,
  maxDistance: 130,
  mouseRadius: 150,
  particleColor: 'rgba(88, 166, 255, 0.8)', // GitHub Accent Blue
  lineColor: '139, 148, 158',                // GitHub Muted Text Gray
  bgColor: '#0d1117'                        // GitHub Dark Canvas BG
};

const mouse = {
  x: null,
  y: null,
  radius: config.mouseRadius
};

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('mouseleave', () => {
  mouse.x = null;
  mouse.y = null;
});

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 1.2;
    this.vy = (Math.random() - 0.5) * 1.2;
    this.radius = Math.random() * 2 + 1;
    this.baseRadius = this.radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = config.particleColor;
    ctx.fill();
  }

  update() {
    // Wall bounces
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // Mouse interaction
    if (mouse.x !== null && mouse.y !== null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let dist = Math.hypot(dx, dy);

      if (dist < mouse.radius) {
        let force = (mouse.radius - dist) / mouse.radius;
        let angle = Math.atan2(dy, dx);
        this.x -= Math.cos(angle) * force * 3;
        this.y -= Math.sin(angle) * force * 3;
        this.radius = this.baseRadius + force * 3;
      } else {
        this.radius = this.baseRadius;
      }
    }

    this.x += this.vx;
    this.y += this.vy;

    this.draw();
  }
}

function init() {
  particles = [];
  for (let i = 0; i < config.particleCount; i++) {
    particles.push(new Particle());
  }
}

function connect() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      let dx = particles[a].x - particles[b].x;
      let dy = particles[a].y - particles[b].y;
      let dist = Math.hypot(dx, dy);

      if (dist < config.maxDistance) {
        let opacity = 1 - dist / config.maxDistance;
        ctx.strokeStyle = `rgba(${config.lineColor}, ${opacity * 0.4})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.fillStyle = config.bgColor;
  ctx.fillRect(0, 0, width, height);

  for (let particle of particles) {
    particle.update();
  }
  connect();

  requestAnimationFrame(animate);
}

init();
animate();
