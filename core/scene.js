import * as THREE from '../three/three.module.js';
import { OrbitControls } from '../three/OrbitControls.js';

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
export const renderer = new THREE.WebGLRenderer({ antialias: true });

export function initScene() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.set(0, 5, 5);
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.mouseButtons = {
        LEFT: THREE.MOUSE.PAN,     // Clic Izquierdo para desplazar
        MIDDLE: THREE.MOUSE.DOLLY, // Rueda para zoom (por defecto)
        RIGHT: THREE.MOUSE.ROTATE  // Clic Derecho para rotar
    };

    const initialPosition = camera.position.clone();
    const initialTarget = controls.target.clone();
    buttonReset(camera,controls,initialPosition,initialTarget)

    controls.enableDamping = true;
}

function buttonReset(camera, controls, initialPosition, initialTarget) {
    var resetButton = document.createElement('button');
    resetButton.innerText = 'Restablecer Vista';
    resetButton.style.position = 'absolute';
    resetButton.style.top = '10px';
    resetButton.style.left = '10px';
    resetButton.style.padding = '10px';
    resetButton.style.backgroundColor = '#007BFF';
    resetButton.style.color = 'white';
    resetButton.style.border = 'none';
    resetButton.style.borderRadius = '5px';
    resetButton.style.cursor = 'pointer';
    document.body.appendChild(resetButton);

    let isResetting = false;
    let progress = 0;
    const resetDuration = 1.0; // Duración de la animación en segundos

    resetButton.addEventListener('click', () => {
        isResetting = true;
        progress = 0;
    });

    function animateReset(deltaTime) {
        if (isResetting) {
            progress += deltaTime / resetDuration;

            // Interpolación lineal para la posición de la cámara
            camera.position.lerpVectors(camera.position, initialPosition, progress);

            // Interpolación para el target de los controles
            controls.target.lerpVectors(controls.target, initialTarget, progress);

            controls.update();

            if (progress >= 1) {
                // Terminar la animación
                isResetting = false;
                camera.position.copy(initialPosition);
                controls.target.copy(initialTarget);
                controls.update();
            }
        }
    }

    // Loop de animación
    let lastTime = performance.now();
    function animate() {
        requestAnimationFrame(animate);

        const currentTime = performance.now();
        const deltaTime = (currentTime - lastTime) / 1000; // Convertir a segundos
        lastTime = currentTime;

        animateReset(deltaTime);
    }

    animate();
}