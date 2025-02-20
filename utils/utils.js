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
