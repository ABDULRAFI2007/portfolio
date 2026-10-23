const canvas = document.getElementById('neural-network');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// Resize Canvas
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = 'rgba(0, 243, 255, 0.5)'; // Cyan
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Init Particles
function initParticles() {
    particles = [];
    const numParticles = Math.min(window.innerWidth / 10, 100); // Responsive count
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}
initParticles();

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw Connections
    for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const distance = Math.hypot(p1.x - p2.x, p1.y - p2.y);

            if (distance < 150) {
                ctx.strokeStyle = `rgba(0, 243, 255, ${1 - distance / 150})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}
animate();


/* Glitch Typing Effect */
const glitchText = document.querySelector('.glitch');
if (glitchText) {
    const originalText = glitchText.getAttribute('data-text');
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    glitchText.onmouseover = event => {
        let iteration = 0;
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");

            if (iteration >= originalText.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);
    }
}