/**
 * CATechShield — CATechnologyShield.js
 * Ca · Tech · Shield | Seguridad · Confianza · Tecnología
 */

console.log("CATechShield listo para dominar 🔥");
console.log("%cCATS TECH SHIELD", "color:#00f0ff;font-size:2rem;font-weight:bold;text-shadow:0 0 10px #00f0ff");
console.log("%cSistemas activos · Versión 2.0", "color:#00c8e0;font-size:0.9rem;letter-spacing:0.2em");

/* ── CUSTOM CURSOR ── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
});

// Cursor ring follows with slight lag
(function animateCursorRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    cursorRing.style.left = rx + 'px';
    cursorRing.style.top  = ry + 'px';
    requestAnimationFrame(animateCursorRing);
})();

// Cursor scale on interactive elements
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform     = 'translate(-50%,-50%) scale(1.8)';
        cursorRing.style.transform = 'translate(-50%,-50%) scale(1.4)';
        cursorRing.style.borderColor = 'rgba(0,240,255,0.8)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform     = 'translate(-50%,-50%) scale(1)';
        cursorRing.style.transform = 'translate(-50%,-50%) scale(1)';
        cursorRing.style.borderColor = 'rgba(0,240,255,0.45)';
    });
});

/* ── PARTICLE CANVAS ── */
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');
let W, H, pts = [];

function resizeCanvas() {
    const hero = document.querySelector('.hero');
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
}

function initParticles() {
    pts = [];
    const count = Math.floor((W * H) / 14000);
    for (let i = 0; i < count; i++) {
        pts.push({
            x:  Math.random() * W,
            y:  Math.random() * H,
            vx: (Math.random() - 0.5) * 0.28,
            vy: (Math.random() - 0.5) * 0.28,
            r:  Math.random() * 1.5 + 0.4,
            a:  Math.random() * 0.7 + 0.1,
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,240,255,${p.a * 0.55})`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < pts.length; j++) {
            const q = pts[j];
            const d = Math.hypot(p.x - q.x, p.y - q.y);
            if (d < 130) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(q.x, q.y);
                ctx.strokeStyle = `rgba(0,240,255,${(1 - d / 130) * 0.1})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(drawParticles);
}

resizeCanvas();
initParticles();
drawParticles();

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

/* ── TYPEWRITER ── */
const phrases = [
    'Instalación de CCTV profesional',
    'Redes empresariales seguras',
    'Consultoría IT personalizada',
    'Automatización inteligente',
    'Equipo tecnológico de calidad',
    'Cableado estructurado avanzado',
];

let phraseIdx  = 0;
let charIdx    = 0;
let deleting   = false;
const twEl     = document.getElementById('typewriter');

function typeWriter() {
    const phrase = phrases[phraseIdx];

    if (!deleting) {
        twEl.textContent = phrase.slice(0, charIdx++);
        if (charIdx > phrase.length) {
            deleting = true;
            setTimeout(typeWriter, 1800);
            return;
        }
    } else {
        twEl.textContent = phrase.slice(0, charIdx--);
        if (charIdx < 0) {
            deleting   = false;
            phraseIdx  = (phraseIdx + 1) % phrases.length;
            charIdx    = 0;
            setTimeout(typeWriter, 400);
            return;
        }
    }

    setTimeout(typeWriter, deleting ? 38 : 62);
}

setTimeout(typeWriter, 1400);

/* ── NAV SCROLL STATE ── */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll('.card, .pillar, .contact-item, .section-header');
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger children of same parent
            const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, idx * 90);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ── SMOOTH SCROLL HELPERS ── */
function scrollToServices() {
    document.getElementById('servicios').scrollIntoView({ behavior: 'smooth' });
}

function scrollToContact() {
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
}

/* ── CARD GLOW TRACKING ── */
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect  = card.getBoundingClientRect();
        const x     = e.clientX - rect.left;
        const y     = e.clientY - rect.top;
        card.style.background = `
            radial-gradient(circle at ${x}px ${y}px,
                rgba(0,240,255,0.07) 0%,
                transparent 60%),
            linear-gradient(135deg, #0b1829, #0d2040)
        `;
    });
    card.addEventListener('mouseleave', () => {
        card.style.background = '';
    });
});

/* ── ANIMATED COUNTERS (stats) ── */
function animateCounter(el, target, suffix = '', duration = 1400) {
    const start = performance.now();
    const isFloat = String(target).includes('.');

    (function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const value    = isFloat
            ? (eased * target).toFixed(1)
            : Math.floor(eased * target);
        el.textContent = (progress < 1 ? '+' : '+') + value + suffix;
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = (target >= 100 ? '' : target === 4 ? '' : '+') + target + suffix;
    })(start);
}

const statsObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const nums = entry.target.querySelectorAll('.stat-num');
            nums.forEach(num => {
                const raw = num.textContent.trim();
                // Extract numeric value
                const val = parseFloat(raw.replace(/[^0-9.]/g, ''));
                const suffix = raw.replace(/[0-9+.]/g, '');
                if (!isNaN(val)) animateCounter(num, val, suffix);
            });
            statsObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObs.observe(heroStats);
