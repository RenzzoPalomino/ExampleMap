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

export function createStands_bk(standData) {
    standData.forEach(data => {
        // console.log(data)
        var _body = data.body;
        var _position = data.position;
        var _style = data.style;
        // console.log(_position.z)
        var nonSelected = _style.selected.find(r => r.isSelected == false);
        const standColor = new THREE.Color(nonSelected.color);
        const standMaterial = [
            new THREE.MeshBasicMaterial({ color: standColor }),
            new THREE.MeshBasicMaterial({ color: standColor }),
            new THREE.MeshBasicMaterial(
            { 
                map: createTextTexture(_style.label, nonSelected.color, nonSelected.text_color) 
            }),
            new THREE.MeshBasicMaterial({ color: standColor }),
            new THREE.MeshBasicMaterial({ color: standColor }),
            new THREE.MeshBasicMaterial({ color: standColor })
        ];

        const standGeometry = new THREE.BoxGeometry(_body.width, _body.height, _body.depth);
        const stand = new THREE.Mesh(standGeometry, standMaterial);

        //Ajuste del eje Z para alinear con la convención de Three.js
        var artificio_Z = (_position.z * factor_de_conversion)
        
        stand.position.set(_position.x, _body.height / 2, artificio_Z); // Usar _position.z en vez de y
        
        // stand.position.set(_position.x, 0, _position.z); // Usar _position.z en vez de y

        stand.userData = { ...data, isSelected: false };
        
        scene.add(stand);
        stands.push(stand);
    });
}


export function createStands2(standData) {
    standData.forEach(data => {
        console.log(data)
        var _body = data.body;
        var _position = data.position;
        var _style = data.style;
        //var nonSelected = _style.nonSelected;
        var nonSelected = _style.selected.find(r => r.isSelected == false); //ojo con esto
        const standColor = new THREE.Color(nonSelected.color);
        const standMaterial = [
            new THREE.MeshBasicMaterial({ color: standColor }),
            new THREE.MeshBasicMaterial({ color: standColor }),
            new THREE.MeshBasicMaterial({ 
                map: createTextTexture(_style.label, nonSelected.color, nonSelected.text_color) 
            }),
            new THREE.MeshBasicMaterial({ color: standColor }),
            new THREE.MeshBasicMaterial({ color: standColor }),
            new THREE.MeshBasicMaterial({ color: standColor })
        ];

        const standGeometry = new THREE.BoxGeometry(_body.width, _body.height, _body.depth);
        const stand = new THREE.Mesh(standGeometry, standMaterial);
        stand.position.set(_position.x, _body.height / 2, _position.y);
        stand.userData = { ...data, isSelected: false };
        
        scene.add(stand);
        stands.push(stand);
    });
}