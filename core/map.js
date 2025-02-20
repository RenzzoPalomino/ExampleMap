import * as THREE from '../three/three.module.js';
// import { scene } from './scene.js';
import { scene, camera, renderer } from './scene.js';

export function loadMap(texturePath,background) {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(texturePath, (texture) => {
        // Crear el plano con la textura
        const planeGeometry = new THREE.PlaneGeometry(10, 5);
        const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);

        // Rotar el plano para que quede horizontal
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane)

        // Cargar y asignar imagen como fondo
        const loader = new THREE.TextureLoader();
        loader.load(background, function (backgroundTexture) {
            backgroundTexture.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = backgroundTexture;
        });
    });
}
