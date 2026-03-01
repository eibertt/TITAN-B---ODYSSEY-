/**
 * TITAN B - ODYSSEY | LÓGICA DE JUEGO
 * Gestión de minado, balance de T-Coins y progresión de nivel.
 */

let balance = 0;
let xp = 0;
let currentShipIndex = 0; // Empieza con la nave básica

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    cargarProgreso();
    iniciarMineriaAutomatica();
    actualizarUI();
});

// FUNCIÓN DE MINADO POR CLIC (Al tocar al robot)
window.handleRobotTap = function() {
    const naveActual = TITAN_CONFIG.SHIPS[currentShipIndex];
    
    // Ganancia por clic (proporcional a la nave)
    const ganancia = 1 + (naveActual.mining_rate_hourly / 1000);
    balance += ganancia;
    xp += 5;

    // Feedback visual y sonido (si lo hubiera)
    actualizarUI();
    console.log(`Minando con ${naveActual.name}: +${ganancia.toFixed(2)} T-Coins`);
    
    // Efecto visual en el robot
    if (window.aplicarVFX) window.aplicarVFX(); 
};

// MINERÍA PASIVA (Ganas monedas cada segundo)
function iniciarMineriaAutomatica() {
    setInterval(() => {
        const naveActual = TITAN_CONFIG.SHIPS[currentShipIndex];
        const gananciaPorSegundo = naveActual.mining_rate_hourly / 3600;
        
        balance += gananciaPorSegundo;
        actualizarUI();
    }, 1000);
}

// ACTUALIZAR LA INTERFAZ NEÓN
function actualizarUI() {
    const coinDisplay = document.getElementById('coin-balance');
    const xpBar = document.getElementById('xp-bar');
    const xpText = document.getElementById('xp-text');
    const rankDisplay = document.getElementById('rank-display');

    if (coinDisplay) coinDisplay.innerText = Math.floor(balance).toLocaleString();
    
    // Lógica de XP y Rangos
    let rango = "RECLUTA";
    if (xp > 1000) rango = "MINERO";
    if (xp > 5000) rango = "COMANDANTE";
    if (xp > 20000) rango = "LEYENDA TITÁN";

    if (rankDisplay) rankDisplay.innerText = rango;
    if (xpText) xpText.innerText = `${Math.floor(xp)} / 5000 XP`;
    
    // Barra de progreso (tope en 100%)
    let porcentaje = (xp / 5000) * 100;
    if (xpBar) xpBar.style.width = Math.min(porcentaje, 100) + "%";
}

// PERSISTENCIA (Guardar en el navegador)
function cargarProgreso() {
    const savedData = localStorage.getItem('TITAN_B_SAVE');
    if (savedData) {
        const data = JSON.parse(savedData);
        balance = data.balance || 0;
        xp = data.xp || 0;
        currentShipIndex = data.shipIndex || 0;
    }
}

function guardarProgreso() {
    const data = {
        balance: balance,
        xp: xp,
        shipIndex: currentShipIndex
    };
    localStorage.setItem('TITAN_B_SAVE', JSON.stringify(data));
}

// Guardar automáticamente cada 30 segundos
setInterval(guardarProgreso, 30000);
