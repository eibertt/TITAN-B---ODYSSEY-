// MOTOR DE NAVEGACIÓN GALÁCTICA - TITAN B
const canvas = document.getElementById('galaxy-bg');
const ctx = canvas.getContext('2d');

let stars = [];
const STAR_COUNT = 150;

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5,
            speed: Math.random() * 0.4 + 0.1, // Movimiento constante
            opacity: Math.random()
        });
    }
}

function animate() {
    // Fondo negro espacial
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujar cada estrella
    stars.forEach(s => {
        ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();

        // Movimiento vertical (Efecto de viaje)
        s.y += s.speed;
        if (s.y > canvas.height) {
            s.y = 0;
            s.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', init);
init();
animate();
console.log("🌌 Motor Galáctico: ONLINE");
