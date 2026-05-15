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
