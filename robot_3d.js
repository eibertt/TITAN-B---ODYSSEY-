import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

export function init3D() {
    const container = document.getElementById('robot-view');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- ILUMINACIÓN CINEMATOGRÁFICA ---
    const light1 = new THREE.PointLight(0x00e5ff, 2, 10);
    light1.position.set(2, 2, 2);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xff00de, 1.5, 10);
    light2.position.set(-2, -1, 2);
    scene.add(light2);

    const ambient = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambient);

    // --- MATERIALES DE ALTA FIDELIDAD ---
    const armorMat = new THREE.MeshStandardMaterial({ 
        color: 0x080808, metalness: 1, roughness: 0.15 
    });
    const neonMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xff00de });

    const titanGroup = new THREE.Group();

    // 1. TORSO SUPERIOR (Trapezoide)
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.4, 1.2, 6), armorMat);
    titanGroup.add(torso);

    // 2. CABEZA TÁCTICA
    const headGroup = new THREE.Group();
    const headBase = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.4), armorMat);
    const visor = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.05), neonMat);
    visor.position.set(0, 0.05, 0.21);
    headGroup.add(headBase, visor);
    headGroup.position.y = 0.9;
    titanGroup.add(headGroup);

    // 3. HOMBROS REFORZADOS (Exoesqueleto)
    const createShoulder = (x) => {
        const sGroup = new THREE.Group();
        const pad = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.3, 0.6), armorMat);
        const join = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.4), armorMat);
        join.rotation.z = Math.PI / 2;
        sGroup.add(pad, join);
        sGroup.position.set(x, 0.5, 0);
        return sGroup;
    };
    titanGroup.add(createShoulder(0.85), createShoulder(-0.85));

    // 4. ANTEBRAZOS (Lanzadores)
    const createArm = (x) => {
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.8, 0.3), armorMat);
        arm.position.set(x, -0.2, 0);
        return arm;
    };
    titanGroup.add(createArm(0.9), createArm(-0.9));

    // 5. NÚCLEO DE FUSIÓN (Efecto de profundidad)
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), coreMat);
    core.position.set(0, 0.2, 0.4);
    titanGroup.add(core);

    scene.add(titanGroup);

    // --- ANIMACIÓN DE PRECISIÓN ---
    function animate() {
        requestAnimationFrame(animate);
        const t = Date.now() * 0.001;

        // Movimiento de flotación suave (Respiración)
        titanGroup.position.y = Math.sin(t) * 0.1;
        
        // Rotación lenta para mostrar los detalles 3D
        titanGroup.rotation.y = Math.sin(t * 0.5) * 0.3;

        // Pulso del núcleo y visor
        const pulse = 0.7 + Math.sin(t * 4) * 0.3;
        core.scale.setScalar(pulse);
        visor.material.opacity = pulse;

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}
