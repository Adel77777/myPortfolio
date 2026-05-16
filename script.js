/* =========================================
 NETWORK & TELECOM ENGINEER PORTFOLIO - Script;js
 ===========================================*/

 /* PAGES TRANSITIONS */

 const links = document.querySelectorAll('nav a, .btn-solid')
 const sections = document.querySelectorAll('section')
links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (!target) return; // safety check

        sections.forEach(s => s.classList.remove('active'));
        target.classList.add('active');

        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

const sectionIds = ['intro', 'about', 'education', 'projects', 'contact'];

function getCurrentIndex() {
    return sectionIds.findIndex(id =>
        document.getElementById(id).classList.contains('active')
    );
}

function goToSection(index) {
    if (index < 0 || index >= sectionIds.length) return;

    const targetId = sectionIds[index];
    const target = document.getElementById(targetId);

    sections.forEach(s => s.classList.remove('active'));
    target.classList.add('active');

    // sync nav active state
    links.forEach(l => {
        l.classList.remove('active');
        if (l.getAttribute('href') === '#' + targetId) l.classList.add('active');
    });
}

// Wheel scroll
let isScrolling = false; // cooldown to prevent too fast skipping

window.addEventListener('wheel', e => {
    if (isScrolling) return;
    isScrolling = true;
    setTimeout(() => isScrolling = false, 900); // cooldown matches animation

    const current = getCurrentIndex();
    if (e.deltaY > 0) goToSection(current + 1); // scroll down → next
    else goToSection(current - 1);               // scroll up → previous
});

//////////////////////////////////////////////////////////

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
links.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
    });
});

/*CANVAS BACKGROUND*/

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const CYAN  = '0, 229, 255';
const NODE_COUNT = 40;
const MAX_DIST = 130;

const nodes = Array.from({ length: NODE_COUNT }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() > 0.85 ? 3 : 1.5,
    pulse: Math.random() * Math.PI * 2
}));

function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        n.pulse += 0.02;
    })

    // Drawing connections
    for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MAX_DIST) {
                const alpha = (1 - dist / MAX_DIST) * 0.5;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(${CYAN},${alpha})`;
                ctx.lineWidth = 1;
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x,nodes[j].y);
                ctx.stroke();
            }
            
        }
    }

    // Drawing nodes
    nodes.forEach(n => {
        const glow = 0.5 + 0.5 * Math.sin(n.pulse);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + glow, 0, Math.PI * 2);
        ctx.fillStyle = n.r > 2 ? `rgba(${CYAN}, ${0.6 + 0.4 * glow})` : `rgba(${CYAN}, 0.45)`;
        ctx.fill();
    })
    requestAnimationFrame(draw);
}
draw();

