import * as THREE from '../three/three.module.js';
import { scene } from './scene.js';
import { createTextTexture } from '../utils/textures.js';

export const stands = [];
const factor_de_conversion = -1;


export function createStands(standData) {
    standData.forEach(data => {
        var _positions = data.position; // Lista de coordenadas [{x, z}, ...]
        var _body = data.body; 
        var _style = data.style;
        
        var nonSelected = _style.selected.find(r => r.isSelected == false);
        const standColor = new THREE.Color(nonSelected.color);

        // **1. Crear un `Shape` para definir el polígono**
        const shape = new THREE.Shape();
        
        // **2. Establecer los puntos del polígono con el factor de conversión**
        shape.moveTo(_positions[0].x, _positions[0].z * factor_de_conversion);
        for (let i = 1; i < _positions.length; i++) {
            shape.lineTo(_positions[i].x, _positions[i].z * factor_de_conversion);
        }
        shape.closePath(); // Cierra el polígono

        // **3. Configuración de extrusión (altura en el eje Y)**
        const extrudeSettings = { 
            depth: _body.height, // La altura del stand
            bevelEnabled: false 
        };

        // **4. Crear la geometría extruida**
        const standGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        
        // **5. Crear el material del stand**
        const standMaterial = new THREE.MeshBasicMaterial({ color: standColor });

        // **6. Crear el Mesh**
        const stand = new THREE.Mesh(standGeometry, standMaterial);

        // **7. Ajustar la posición Y (base del stand en y=0)**
        stand.rotation.x = -Math.PI / 2;  // Ajustar la extrusión para que se levante en Y
        stand.position.set(0, 0, 0);  // Base en y=0

        // **8. Agregarlo a la escena**
        stand.userData = { ...data, isSelected: false };
        scene.add(stand);
        stands.push(stand);
    });
}
export function createStandLabel(standData) {
    standData.forEach(data => {
        const _positions = data.position; 
        const _body = data.body;
        const _style = data.style;

        // **1. Crear la textura con el label**
        const textTexture = createTextTexture(data, false);
        const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture, transparent: true });

        // **2. Calcular el centro del stand**
        let centerX = 0, centerZ = 0;
        _positions.forEach(pos => {
            centerX += pos.x;
            centerZ += pos.z;
        });
        centerX /= _positions.length;
        centerZ /= _positions.length;

        // **3. Crear la geometría del plano (misma lógica de coordenadas)**
        const labelGeometry = new THREE.PlaneGeometry(1.5, 0.7);
        const labelMesh = new THREE.Mesh(labelGeometry, textMaterial);

        // **4. Posicionar el plano sobre el stand**
        labelMesh.position.set(centerX, _body.height + 0.05, centerZ);
        labelMesh.rotation.x = -Math.PI / 2;

        // **5. Agregarlo a la escena**
        scene.add(labelMesh);

        // **6. Guardar `labelMesh` en `userData` del stand**
        const stand = stands.find(s => s.userData.id === data.id);
        if (stand) {
            stand.userData.labelMesh = labelMesh; // Guardamos el label
        }
    });
}

export function createStandLabel2(standData) {
    standData.forEach(data => {
        // console.log(data)
        const _positions = data.position; // Coordenadas del stand
        const _body = data.body;
        const _style = data.style;

        // **1. Crear la textura con el label**
        const textTexture = createTextTexture(data,false);
        const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture, transparent: true });

        // **2. Calcular el centro del stand**
        let centerX = 0, centerZ = 0;
        _positions.forEach(pos => {
            centerX += pos.x;
            centerZ += pos.z;
        });
        centerX /= _positions.length;
        centerZ /= _positions.length;

        // **3. Crear la geometría del plano (misma lógica de coordenadas)**
        const labelGeometry = new THREE.PlaneGeometry(1.5, 0.7);
        const labelMesh = new THREE.Mesh(labelGeometry, textMaterial);

        // **4. Posicionar el plano sobre el stand**
        labelMesh.position.set(centerX, _body.height + 0.05, centerZ);
        labelMesh.rotation.x = -Math.PI / 2; // Mantenerlo paralelo al suelo

        // **5. Agregarlo a la escena**
        scene.add(labelMesh);
    });
}



