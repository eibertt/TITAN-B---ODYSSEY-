import * as THREE from 'https://cdn.skypack.dev/three@0.132.2';

export function init3D() {
    const container = document.getElementById('robot-view');
    if (!container) return;

    // Crear Escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 3;

    // Crear Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.innerHTML = ''; // Limpiar cualquier residuo
    container.appendChild(renderer.domElement);

    // Iluminación Táctica
    const light = new THREE.PointLight(0x00e5ff, 2, 50);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040, 2));

        // EL TITÁN (Evolución Táctica)
    const titanGroup = new THREE.Group();
    
    const bodyMat = new THREE.MeshStandardMaterial({ 
        color: 0x111111, 
        metalness: 1, 
        roughness: 0.2,
        emissive: 0x00e5ff,
        emissiveIntensity: 0.1
    });

    // Torso (Hexagonal)
    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 1.2, 6), bodyMat);
    titanGroup.add(torso);

    // Cabeza (Octaedro pequeño)
    const head = new THREE.Mesh(new THREE.OctahedronGeometry(0.3, 0), bodyMat);
    head.position.y = 0.9;
    titanGroup.add(head);

    // Hombros/Protectores
    const shoulderGeom = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const leftShoulder = new THREE.Mesh(shoulderGeom, bodyMat);
    leftShoulder.position.set(-0.8, 0.4, 0);
    titanGroup.add(leftShoulder);

    const rightShoulder = new THREE.Mesh(shoulderGeom, bodyMat);
    rightShoulder.position.set(0.8, 0.4, 0);
    titanGroup.add(rightShoulder);

    // Núcleo Central (Corazón Rosa)
    const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 16, 16), 
        new THREE.MeshBasicMaterial({ color: 0xff00de })
    );
    core.position.set(0, 0.2, 0.4);
    titanGroup.add(core);

    scene.add(titanGroup);


    // Animación
    function animate() {
        requestAnimationFrame(animate);
        titanGroup.rotation.y += 0.01;
        titanGroup.rotation.x += 0.005;
        
        // Efecto de pulso en el núcleo
        const s = 1 + Math.sin(Date.now() * 0.005) * 0.2;
        core.scale.set(s, s, s);
        
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
