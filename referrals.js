/** SISTEMA DE REFERIDOS TITAN B */
function abrirReferidos() {
    const userId = Math.floor(Math.random() * 900000);
    const refLink = `https://t.me/TitanB_Bot?start=${userId}`;
    
    const msg = `--- PROGRAMA DE RECLUTAMIENTO ---\n\nTu ID: ${userId}\nBono por invitado: ${TITAN_CONFIG.GAME_INFO.REF_BONUS} T-Coins\n\nComparte tu link: ${refLink}`;
    
    alert(msg);
}

function reclamarBonoReferido() {
    // Aquí iría la validación real con base de datos
    alert("Buscando nuevos reclutas en la red...");
}
