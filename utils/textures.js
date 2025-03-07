import * as THREE from '../three/three.module.js';


export function createTextTexture(standData, selected) {
    console.log("Estado seleccionado: ", selected);
    console.log("Stand Seleccionado: ", standData);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    var style = standData.style;

    // Asegurar que se encuentra el estilo correcto
    var _selected = style.selected.find(item => item.isSelected === selected);
    if (!_selected) {
        console.warn("No se encontró un estado de selección, usando el primero por defecto.");
        _selected = style.selected[0]; // Si no encuentra, usa el primero
    }

    var color = _selected.text_color;
    console.log("Color aplicado al texto:", color);

    canvas.width = 256;  // Resolución ajustable
    canvas.height = 128;

    // **Fondo transparente**
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpiar antes de redibujar
    ctx.fillStyle = "rgba(255, 255, 255, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // **Estilos de texto**
    ctx.fillStyle = color;
    ctx.font = "Bold 24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    ctx.fillText(style.label, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    return texture;
}

export function applyTopTexture(selectedStand, topTexture) {
    console.log("status seleccionado: ", selectedStand);
    console.log("texture: ", topTexture);

    // Verifica si el stand usa un material tipo `ArrayMaterial`
    if (!Array.isArray(selectedStand.material)) {
        console.warn("El stand no tiene materiales separados por cara. Creando materiales...");
        
        // Si el material es único, conviértelo en un ArrayMaterial para aplicar diferentes texturas en cada cara
        const baseMaterial = new THREE.MeshStandardMaterial({ color: selectedStand.material.color });
        selectedStand.material = [
            baseMaterial, baseMaterial,  // Lados
            new THREE.MeshStandardMaterial({ map: topTexture }), // Cara superior (2)
            baseMaterial, baseMaterial, baseMaterial // Otras caras
        ];
    } else {
        // Asignar textura solo a la cara superior (índice 2 en un cubo)
        selectedStand.material[2].map = topTexture;
        selectedStand.material[2].needsUpdate = true;
    }
}


export function createTextTexture_bk(text, background, text_color) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 256;

    context.fillStyle = background;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = text_color;
    context.font = 'Bold 32px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    return new THREE.CanvasTexture(canvas);
}
