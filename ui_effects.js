/** TITAN B - HUD NOTIFICATIONS */
window.showTacticalMsg = (text, type = 'info') => {
    const msg = document.createElement('div');
    msg.style = `
        position: fixed; top: 20px; right: 20px;
        background: rgba(0,0,0,0.8); color: ${type === 'alert' ? '#ff00de' : '#00e5ff'};
        padding: 15px; border-left: 4px solid;
        font-family: monospace; z-index: 10000;
        box-shadow: 0 0 15px rgba(0,229,255,0.2);
        animation: slideIn 0.3s ease-out;
    `;
    msg.innerText = `> STATUS: ${text}`;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 4000);
};

// Estilo de animación
const style = document.createElement('style');
style.innerHTML = "@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }";
document.head.appendChild(style);
