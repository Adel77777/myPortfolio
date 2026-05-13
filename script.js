/* =========================================
 NETWORK & TELECOM ENGINEER PORTFOLIO - Script;js
 ===========================================*/

 /* CANVAS BACKGROUND ANIMATION */
 /*const canvas = document.getElementById('bg-canvas');
 const ctx = canvas.getcontext('2d');
 let W, H, nodes = [];

 function init() {
    nodes = Array.from({length: 42}, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 1.2,
    }))
 }
 function draw() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            
    }
    }
}*/
 /* PAGES TRANSITIONS */
 const links = document.querySelectorAll('nav a')
 const sections = document.querySelectorAll('section')
 links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        
        sections.forEach(s => s.classList.remove('active'));

        document.getElementById(targetId).classList.add('active');

        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
 });
