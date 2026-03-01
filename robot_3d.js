import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

/**
 * TITAN B - ODYSSEY | MOTOR VISUAL 3D V2.0
 * Generación de Robot Táctico con Iluminación Dinámica
 */

let scene, camera, renderer, robot, energyCore;

function init3D() {
    const container = document.getElementById('robot-view');
    
    // 1. ESCENA Y CÁMARA
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // 2. RENDERER (Configuración de Alta Calidad)
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // 3. ILUMINACIÓN NEÓN
    const ambientLight = new THREE.AmbientLight(0x404040, 2); 
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00e5ff, 5, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    // 4. CONSTRUCCIÓN DEL ROBOT (Geometría Táctica)
    robot = new THREE.Group();

    // Torso Metálico
    const bodyGeom = new THREE.BoxGeometry(1.2, 1.5, 0.8);
    const bodyMat = new THREE.MeshStandardMaterial({ 
        color: 0x111111, 
        metalness: 1, 
        roughness: 0.2 
    });
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    robot.add(body);

    // Cabeza con Visor Neón
    const headGeom = new THREE.BoxGeometry(0.7, 0.5, 0.6);
    const head = new THREE.Mesh(headGeom, bodyMat);
    head.position.y = 1.1;
    robot.add(head);

    const visorGeom = new THREE.PlaneGeometry(0.5, 0.1);
    const visorMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const visor = new THREE.Mesh(visorGeom, visorMat);
    visor.position.set(0, 1.1, 0.31);
    robot.add(visor);

    // Núcleo de Energía (Esfera que pulsa)
    const coreGeom = new THREE.SphereGeometry(0.2, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xff00de });
    energyCore = new THREE.Mesh(coreGeom, coreMat);
    energyCore.position.set(0, 0, 0.4);
    robot.add(energyCore);

    scene.add(robot);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Animación de Flotación (Respiración del Robot)
    const time = Date.now() * 0.002;
    robot.position.y = Math.sin(time) * 0.1;
    robot.rotation.y += 0.01;

    // Efecto de Pulso en el Núcleo
    const pulse = 0.5 + Math.sin(time * 2) * 0.5;
    energyCore.scale.set(pulse, pulse, pulse);
    energyCore.material.opacity = pulse;

    renderer.render(scene, camera);
}

// Iniciar cuando el DOM esté listo
window.addEventListener('resize', () => {
    const container = document.getElementById('robot-view');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

init3D();

// Función para interactuar (Tap)
window.handleRobotTap = function() {
    energyCore.scale.set(2, 2, 2); // Feedback visual al tocar
    // Aquí se llamará a la lógica de ganar T-Coins
};
