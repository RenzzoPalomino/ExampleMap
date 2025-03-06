import * as THREE from '../three/three.module.js';
import { scene, camera, renderer } from './scene.js';

export function loadMap(texturePath, background) {    
    // texturePath="";
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(texturePath, (texture) => {
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.minFilter = THREE.LinearFilter;

        // Obtener proporciones reales de la imagen
        const aspectRatio = texture.image.width / texture.image.height;
        const planeWidth = 20;  // Ajusta el tamaño de la imagen en la escena
        const planeHeight = planeWidth / aspectRatio;

        // Crear el plano con la textura y dimensiones correctas
        const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
        const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);

        // Centrar el plano en la escena y rotarlo horizontalmente
        plane.position.set(0, 0, 0);
        plane.rotation.x = -Math.PI / 2;

        scene.add(plane);
    });

    // Cargar y asignar la imagen de fondo
    const bgLoader = new THREE.TextureLoader();
    bgLoader.load(background, (backgroundTexture) => {
        backgroundTexture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = backgroundTexture;
    });
}

export function loadMap_prev(texturePath,background) {
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
