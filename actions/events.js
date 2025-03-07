import * as THREE from '../three/three.module.js';
import { camera, renderer } from '../core/scene.js';
import { stands } from '../core/stands.js';
// Configuración canvas del stand 3D
import { createTextTexture,applyTopTexture } from '../utils/textures.js';
// Acciones de selección
import { processStandSelection } from './logic.js';
import { proccessStandDeselection } from './logic.js';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let isMouseMoving = false;

export function setupEventListeners() {
    window.addEventListener('mousedown', () => { isMouseMoving = false; });
    window.addEventListener('mousemove', () => { isMouseMoving = true; });
    window.addEventListener('mouseup', (event) => {
        if (event.button !== 0 || isMouseMoving) return;
        processSelection(event);
    });
    window.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        processDeselection(event);
    });
}

function processSelection(event) {
    var isSelected = true;

    // Obtener el canvas y su rectángulo
    const canvas = renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    // Calcular coordenadas del mouse relativas al canvas
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(stands);

    if (intersects.length > 0) {
        const selectedStand = intersects[0].object;
        const standInfo = selectedStand.userData;
        var _style = standInfo.style;
        var selected = _style.selected.find(r => r.isSelected == isSelected);

        if (standInfo.isSelected) return;
        standInfo.isSelected = isSelected;

        const topTexture = createTextTexture(standInfo, isSelected);

        // **Actualizar la textura del label si existe**
        if (standInfo.labelMesh) {
            standInfo.labelMesh.material.map.dispose(); // Liberar la textura anterior
            standInfo.labelMesh.material.map = topTexture;
            standInfo.labelMesh.material.needsUpdate = true;
        }

        // Manejo seguro del material
        selectedStand.material.color.set(new THREE.Color(selected.color));
        processStandSelection(standInfo);
    }
}

function processDeselection(event) {
    var isSelected = false;

    // Obtener el canvas y su rectángulo
    const canvas = renderer.domElement;
    const rect = canvas.getBoundingClientRect();

    // Calcular coordenadas del mouse relativas al canvas
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(stands);

    if (intersects.length > 0) {
        const selectedStand = intersects[0].object;
        const standInfo = selectedStand.userData;
        var _style = standInfo.style;
        var nonSelected = _style.selected.find(r => r.isSelected == isSelected);

        if (!standInfo.isSelected) return;
        standInfo.isSelected = isSelected;

        const topTexture = createTextTexture(standInfo, isSelected);
        
        // **Actualizar la textura del label si existe**
        if (standInfo.labelMesh) {
            standInfo.labelMesh.material.map.dispose(); // Liberar la textura anterior
            standInfo.labelMesh.material.map = topTexture;
            standInfo.labelMesh.material.needsUpdate = true;
        }

        // Manejo seguro del material
        selectedStand.material.color.set(new THREE.Color(nonSelected.color));
        proccessStandDeselection(standInfo);
    }
}
