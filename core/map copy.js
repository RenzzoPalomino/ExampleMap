import * as THREE from '../three/three.module.js';
import { scene } from './scene.js';
import * as _swal from '../utils/customSwal.js'; 
export function loadMap(texturePath) {
    const gridHelper = new THREE.GridHelper(10, 20, 0x888888, 0x444444);

    const loadingManager = new THREE.LoadingManager();
    loadingManager.onStart = () => _swal.showLoading();
    loadingManager.onLoad = () => console.log('Carga completa');
    loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
        console.log(`Cargando ${itemsLoaded} de ${itemsTotal}: ${url}`);
        // _swal.hideLoading();
    };
    loadingManager.onError = (url) => console.error(`Error al cargar ${url}`);

    // const textureLoader = new THREE.TextureLoader(loadingManager);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(texturePath, (texture) => {
        const planeGeometry = new THREE.PlaneGeometry(10, 5);
        const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = - Math.PI / 2;
        scene.add(plane);
        //scene.add(gridHelper); //grilla ? podria servir para delimitar coordenadas
    });
}
