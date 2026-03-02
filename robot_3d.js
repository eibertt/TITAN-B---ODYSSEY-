import * as THREE from 'https://unpkg.com/three@0.150.1/build/three.module.js';

export function init3D() {
    const container = document.getElementById('robot-view');
    if (!container) return;

    // 1. Configuración de la Escena (Tu diseño)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    
    // Renderer con fondo transparente para que se vea tu galaxia
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.innerHTML = ""; // Limpia el contenedor
    container.appendChild(renderer.domElement);

    // 2. Materiales Estilo Neón
    const metalMaterial = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 1, roughness: 0.2 });
    const neonMaterial = new THREE.MeshBasicMaterial({ color: 0x00ccff });

    // 3. Construcción del Robot (Tu estructura)
    const robotGroup = new THREE.Group();

    // Torso
    const torso = new THREE.Mesh(new THREE.BoxGeometry(1, 1.5, 0.5), metalMaterial);
    robotGroup.add(torso);

    // Cabeza
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.5), metalMaterial);
    head.position.y = 1.1;
    robotGroup.add(head);

    // Reactor del pecho (Luz Neón)
    const reactor = new THREE.Mesh(new THREE.CircleGeometry(0.2, 32), neonMaterial);
    reactor.position.set(0, 0.3, 0.26);
    robotGroup.add(reactor);

    // Brazos
    const armGeo = new THREE.BoxGeometry(0.3, 1.2, 0.3);
    const leftArm = new THREE.Mesh(armGeo, metalMaterial);
    leftArm.position.set(-0.7, 0.15, 0);
    robotGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, metalMaterial);
    rightArm.position.set(0.7, 0.15, 0);
    robotGroup.add(rightArm);

    scene.add(robotGroup);

    // 4. Iluminación
    const light = new THREE.PointLight(0x00ccff, 10, 50);
    light.position.set(2, 2, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    camera.position.z = 4;

    // 5. Animación de movimiento (Tu lógica de flotación)
    function animate() {
        requestAnimationFrame(animate);
        const time = Date.now() * 0.002;
        robotGroup.position.y = Math.sin(time) * 0.1;
        robotGroup.rotation.y += 0.01; // Rotación suave
        renderer.render(scene, camera);
    }

    animate();

    // Ajuste de pantalla
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}
