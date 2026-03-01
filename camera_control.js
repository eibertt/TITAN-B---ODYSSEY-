/** DYNAMIC VIEW CONTROL */
document.addEventListener('mousemove', (e) => {
    if(window.robotGroup) { // Referencia a tu robot 3D
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        window.robotGroup.rotation.y = x * 0.5;
        window.robotGroup.rotation.x = y * 0.2;
    }
});
