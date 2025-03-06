//utilidades para castear el color en fx a un formato 
export function hexToCSSColor(hex) {
    // Convertir de formato numérico (0xffff00) a string CSS (#ffff00)
    return `#${hex.toString(16).padStart(6, '0')}`;
}
export function cssColorToHex(cssColor) {
    // Remover el '#' si está presente
    cssColor = cssColor.replace(/^#/, '');
    // Convertir a número hexadecimal de Three.js
    return parseInt(cssColor, 16);
}

export function convert2DTo3D(px, py, imageWidth, imageHeight, planeWidth, planeHeight) {
    const worldX = (px / imageWidth) * planeWidth - planeWidth / 2;
    const worldZ = -(py / imageHeight) * planeHeight + planeHeight / 2;
    return { x: worldX, y: 0, z: worldZ }; // y = 0 porque es un plano en el suelo
}