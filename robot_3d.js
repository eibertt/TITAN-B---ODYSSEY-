import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

// MOTOR VISUAL TITAN B - ALTA FIDELIDAD
let scene, camera, renderer, robot;

function init() {
    const container = document.getElementById('robot-view');
    if(!container) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 3;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Luces Cinematográficas (Cian y Fucsia)
    const light1 = new THREE.PointLight(0x00e5ff, 2, 50);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0ff00de, 2, 50);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    // Creación del Titán (Geometría Táctica)
    const geometry = new THREE.CapsuleGeometry(0.5, 1, 4, 8);
    const material = new THREE.MeshStandardMaterial({ 
        color: 0x333333, 
        metalness: 0.9, 
        roughness: 0.1,
        emissive: 0x00e5ff,
        emissiveIntensity: 0.2
    });
    robot = new THREE.Mesh(geometry, material);
    scene.add(robot);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    if(robot) {
        robot.rotation.y += 0.01;
        robot.position.y = Math.sin(Date.now() * 0.002) * 0.1;
    }
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    const container = document.getElementById('robot-view');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});

init();
