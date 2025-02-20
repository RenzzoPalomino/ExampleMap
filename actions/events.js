import * as THREE from '../three/three.module.js';
import { camera } from '../core/scene.js';
import { stands } from '../core/stands.js';
//configuración canvas del stand 3d
import { createTextTexture } from '../utils/textures.js';
//acciones de seleccion
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
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(stands);
    if (intersects.length > 0) {
        const selectedStand = intersects[0].object;
        const standInfo = selectedStand.userData; //json seleccionado
        var _style = standInfo.style;
        //var selected = _style.selected;
        var selected = _style.selected.find(r => r.isSelected == isSelected); //ojo con esto

        if (standInfo.isSelected) return;
        standInfo.isSelected = isSelected;
        const newTexture = createTextTexture(_style.label,selected.color, selected.text_color);
        selectedStand.material.forEach((material, index) => {
            if (index === 2) {
                material.map = newTexture;
                material.needsUpdate = true;
                processStandSelection(standInfo);
            } else {
                material.color.set(new THREE.Color(selected.color));
            }
        });
        
    }
}

function processDeselection(event) {
    var isSelected = false;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(stands);
    if (intersects.length > 0) {
        const selectedStand = intersects[0].object;
        const standInfo = selectedStand.userData;
        var _style = standInfo.style;
        //var nonSelected = _style.selected;
        var nonSelected = _style.selected.find(r => r.isSelected == isSelected); //ojo con esto

        if (!standInfo.isSelected) return;
        standInfo.isSelected = isSelected;
        const originalTexture = createTextTexture(_style.label, nonSelected.color, nonSelected.text_color);
        selectedStand.material.forEach((material, index) => {
            if (index === 2) {
                material.map = originalTexture;
                material.needsUpdate = true;
                proccessStandDeselection(standInfo);
            } else {
                material.color.set(new THREE.Color(nonSelected.color));
            }
            
        });
    }
}