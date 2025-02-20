import * as THREE from '../three/three.module.js';
import { scene } from './scene.js';
import { createTextTexture } from '../utils/textures.js';

export const stands = [];

export function createStands(standData) {
    standData.forEach(data => {
        var _body = data.body;
        var _position = data.position;
        var _style = data.style;
        //var nonSelected = _style.nonSelected;
        var nonSelected = _style.selected.find(r => r.isSelected == false); //ojo con esto
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
        stand.position.set(_position.x, _body.height / 2, _position.y);
        stand.userData = { ...data, isSelected: false };
        
        scene.add(stand);
        stands.push(stand);
    });
}