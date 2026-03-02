import * as THREE from 'https://unpkg.com';
import { GLTFLoader } from 'https://unpkg.com';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ILUMINACIÓN para que se vea el metal
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040, 5));

// CARGAR EL MODELO (El archivo que te falta)
const loader = new GLTFLoader();
loader.load('./assets/robot.glb', (gltf) => {
    const robot = gltf.scene;
    scene.add(robot);
    
    // Animación de flotación
    function animate() {
        requestAnimationFrame(animate);
        robot.position.y = Math.sin(Date.now() * 0.002) * 0.2;
        robot.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    animate();
}, undefined, (error) => {
    console.error('Error al cargar el robot: Asegúrate de tener el archivo robot.glb en la carpeta assets', error);
});

camera.position.z = 3;
