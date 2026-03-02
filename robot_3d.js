import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, robot;

export function init3D() {
    const container = document.getElementById('robot-view');
    if(!container) return;

    // SCENE & BACKGROUND
    scene = new THREE.Scene();
    
    // CAMERA
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1.5, 4); // Elevada para ver el torso

    // RENDERER (Con fondo transparente para ver tu galaxia)
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // --- ILUMINACIÓN CIBERPUNK (Basada en la Imagen de Referencia) ---
    const ambientLight = new THREE.AmbientLight(0x111111, 1); // Luz ambiental muy tenue
    scene.add(ambientLight);

    // Luz de Fusión (Pecho - Cyan/Azul)
    const reactorLight = new THREE.PointLight(0x00e5ff, 5, 10);
    reactorLight.position.set(0, 1.5, 0.5);
    scene.add(reactorLight);

    // Luz de Acento 1 (Lado Derecho - Rosa/Púrpura Neón)
    const purpleLight = new THREE.PointLight(0xff00de, 3, 15);
    purpleLight.position.set(2, 2, 1);
    scene.add(purpleLight);

    // Luz de Acento 2 (Lado Izquierdo - Azul Eléctrico)
    const blueLight = new THREE.PointLight(0x00aaff, 2, 15);
    blueLight.position.set(-2, 1, 1);
    scene.add(blueLight);

    // CARGA DEL MODELO AVANZADO
    const loader = new GLTFLoader();
    
    // Mostrar mensaje de carga profesional
    container.innerHTML = "<div style='color:#00e5ff; font-family:monospace; text-align:center; padding-top:100px;'>FORGING ARMOR...</div>";

    loader.load('titan_robot.glb', (gltf) => {
        container.innerHTML = ""; // Limpiar mensaje
        container.appendChild(renderer.domElement);
        
        robot = gltf.scene;
        
        // --- TEXTURIZADO Y EFECTO DE NEÓN ---
        robot.traverse((child) => {
            if (child.isMesh) {
                // Hacemos que la armadura sea metálica y oscura
                child.material.metalness = 1;
                child.material.roughness = 0.3;
                child.material.color.setHex(0x222222); // Armadura negra/gris

                // Si el modelo tiene partes "emissive", las encendemos
                if(child.material.emissive) {
                    child.material.emissive.setHex(0x00e5ff); // Cyan por defecto
                    child.material.emissiveIntensity = 2;
                }
            }
        });

        // Posicionamiento
        robot.scale.set(1.5, 1.5, 1.5);
        robot.position.set(0, 0, 0);
        robot.rotation.y = Math.PI / 8; // Ligeramente de lado

        scene.add(robot);
        console.log("TITAN B: Forja completada.");
    }, undefined, (error) => {
        container.innerHTML = "<div style='color:#ff0033; font-family:monospace;'>ERROR: Missing titan_robot.glb</div>";
        console.error("No se pudo cargar la armadura:", error);
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    if (robot) {
        // Animación de respiración suave
        const time = Date.now() * 0.001;
        robot.position.y = Math.sin(time) * 0.05;
        // Rotación lenta para mostrar la armadura
        robot.rotation.y += 0.002; 
    }
    renderer.render(scene, camera);
}
