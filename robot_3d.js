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

    // EL TITÁN (Geometría Táctica Pro)
    const titanGroup = new THREE.Group();
    
    // Cuerpo
    const bodyGeom = new THREE.OctahedronGeometry(1, 0);
    const bodyMat = new THREE.MeshStandardMaterial({ 
        color: 0x111111, 
        metalness: 1, 
        roughness: 0.1,
        emissive: 0x00e5ff,
        emissiveIntensity: 0.2
    });
    const body = new THREE.Mesh(bodyGeom, bodyMat);
    titanGroup.add(body);

    // Núcleo de Energía (El corazón rosa)
    const coreGeom = new THREE.SphereGeometry(0.3, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0xff00de });
    const core = new THREE.Mesh(coreGeom, coreMat);
    core.position.z = 0.5;
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
