import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, robot;

export function init3D() {
    const container = document.getElementById('robot-view');
    if(!container) return;

    scene = new THREE.Scene();
    
    // CÁMARA
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // RENDERER
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // --- ILUMINACIÓN NEÓN (EL AJUSTE QUE BUSCÁBAMOS) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // Luz base fuerte
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x00e5ff, 2, 50); // Brillo Cian
    blueLight.position.set(5, 5, 5);
    scene.add(blueLight);

    const pinkLight = new THREE.PointLight(0ff00de, 2, 50); // Brillo Púrpura
    pinkLight.position.set(-5, -5, 5);
    scene.add(pinkLight);

    // CARGA DEL MODELO
    const loader = new GLTFLoader();
    loader.load('titan_robot.glb', (gltf) => {
        robot = gltf.scene;
        robot.scale.set(2, 2, 2); // Ajusta el tamaño
        robot.position.y = -1;
        scene.add(robot);
        console.log("TITAN B: Modelo cargado y brillante.");
    }, undefined, (error) => {
        console.error("Error cargando el robot:", error);
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    if (robot) {
        robot.rotation.y += 0.01; // El robot gira solo
    }
    renderer.render(scene, camera);
}

// Ajustar si se voltea el celular
window.addEventListener('resize', () => {
    const container = document.getElementById('robot-view');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
