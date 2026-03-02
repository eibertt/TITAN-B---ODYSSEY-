// ECONOMÍA TITAN B
let balance = 17.00; 
const miningRate = 0.000277; // Equivale a 1 T-Coin por hora aprox.

function startMining() {
    const balanceElement = document.getElementById('coin-balance');
    
    setInterval(() => {
        balance += miningRate;
        if(balanceElement) {
            balanceElement.innerText = balance.toFixed(4);
        }
        // Guardar progreso automáticamente
        localStorage.setItem('titan_balance', balance);
    }, 1000);
}

// Cargar saldo guardado al iniciar
window.addEventListener('load', () => {
    const savedBalance = localStorage.getItem('titan_balance');
    if(savedBalance) balance = parseFloat(savedBalance);
    startMining();
});
