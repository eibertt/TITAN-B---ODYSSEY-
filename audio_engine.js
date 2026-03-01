/** * TITAN B - AUDIO ENGINE 
 * Gestión de atmósfera sonora 
 */
const AUDIO_SYSTEM = {
    playClick: () => {
        const click = new Audio('https://www.soundjay.com/buttons/sounds/button-50.mp3');
        click.volume = 0.2;
        click.play();
    },
    playLevelUp: () => {
        const level = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3');
        level.play();
    }
};

// Conectar con los botones del juego
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => AUDIO_SYSTEM.playClick());
});
