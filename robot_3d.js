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

    // --- ILUMINACIÓN DE HANGAR ESPACIAL ---
    const blueLight = new THREE.PointLight(0x00e5ff, 2.5, 10);
    blueLight.position.set(2, 2, 2);
    scene.add(blueLight);

    const pinkLight = new THREE.PointLight(0xff00de, 2, 10);
    pinkLight.position.set(-2, -1, 2);
    scene.add(pinkLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambient);

    // --- MATERIALES INDUSTRIALES ---
    const armorMat = new THREE.MeshStandardMaterial({ 
        color: 0x0a0a0a, 
        metalness: 1, 
        roughness: 0.2,
        emissive: 0x00e5ff,
        emissiveIntensity: 0.05
    });
    
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xff00de });

    const titanGroup = new THREE.Group();

    // 1. TORSO SUPERIOR (Chasis Principal)
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.4, 1.2, 6), armorMat);
    titanGroup.add(torso);

    // 2. CABEZA CON VISOR (IA Activa)
    const headGroup = new THREE.Group();
    const headBase = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.4), armorMat);
    const visor = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.06), glowMat);
    visor.position.set(0, 0.05, 0.21);
    headGroup.add(headBase, visor);
    headGroup.position.y = 0.95;
    titanGroup.add(headGroup);

    // 3. HOMBRETAS DE COMBATE (Simetría Perfecta)
    const createShoulder = (xSide) => {
        const sGroup = new THREE.Group();
        const pad = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.7), armorMat);
        const joint = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.45), armorMat);
        joint.rotation.z = Math.PI / 2;
        sGroup.add(pad, joint);
        sGroup.position.set(xSide * 0.9, 0.5, 0);
        return sGroup;
    };
    titanGroup.add(createShoulder(1), createShoulder(-1));

    // 4. ANTEBRAZOS / LANZADORES
    const createForearm = (xSide) => {
        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.9, 0.35), armorMat);
        arm.position.set(xSide * 1, -0.2, 0);
        return arm;
    };
    titanGroup.add(createForearm(1), createForearm(-1));

    // 5. NÚCLEO DE FUSIÓN (Corazón del Titán)
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), coreMat);
    core.position.set(0, 0.2, 0.45);
    titanGroup.add(core);

    scene.add(titanGroup);

    // --- MOTOR DE ANIMACIÓN DINÁMICA ---
    function animate() {
        requestAnimationFrame(animate);
        const time = Date.now() * 0.001;

        // Balanceo de "Respiración" Cinematográfico
        titanGroup.position.y = Math.sin(time * 0.8) * 0.12;
        
        // Rotación de escaneo lenta
        titanGroup.rotation.y = Math.sin(time * 0.4) * 0.25;

        // Pulso de Energía del Núcleo y Visor
        const energyLevel = 0.8 + Math.sin(time * 5) * 0.2;
        core.scale.setScalar(energyLevel);
        visor.material.opacity = energyLevel;

        // Pequeño movimiento de los brazos (Efecto hidráulico)
        titanGroup.children.forEach((child, index) => {
            if(index > 3) { // Seleccionando antebrazos
                child.position.y += Math.sin(time * 2) * 0.001;
            }
        });

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}
