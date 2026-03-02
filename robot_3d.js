import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';

export function init3D() {
    const container = document.getElementById('robot-view');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.innerHTML = ""; 
    container.appendChild(renderer.domElement);

    // --- MATERIALES METÁLICOS REALISTAS ---
    const armorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x1a1a1a, 
        metalness: 1, 
        roughness: 0.15, // Esto da el brillo de "espejo"
    });
    const neonMaterial = new THREE.MeshBasicMaterial({ color: 0x00e5ff });

    // GRUPO DEL ROBOT
    const robot = new THREE.Group();
    const torso = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.8, 0.7), armorMaterial);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.6), armorMaterial);
    head.position.y = 1.3;
    
    // REACTOR (Luz central)
    const reactor = new THREE.Mesh(new THREE.SphereGeometry(0.25, 32, 32), neonMaterial);
    reactor.position.set(0, 0.4, 0.36);

    robot.add(torso, head, reactor);
    scene.add(robot);

    // --- ILUMINACIÓN DE ESTUDIO (Para el reflejo) ---
    const topLight = new THREE.DirectionalLight(0xffffff, 2);
    topLight.position.set(0, 10, 10);
    scene.add(topLight);

    const cyanLight = new THREE.PointLight(0x00e5ff, 3, 20);
    cyanLight.position.set(5, 5, 5);
    scene.add(cyanLight);

    const pinkLight = new THREE.PointLight(0xff00de, 2, 20);
    pinkLight.position.set(-5, -5, 5);
    scene.add(pinkLight);

    camera.position.z = 4.5;

    function animate() {
        requestAnimationFrame(animate);
        const time = Date.now() * 0.001;
        robot.position.y = Math.sin(time) * 0.15; // Flotación
        robot.rotation.y += 0.005; // Rotación de exposición
        renderer.render(scene, camera);
    }
    animate();
}
