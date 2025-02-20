import { initScene, scene, camera, renderer } from './core/scene.js';
import { loadMap } from './core/map.js';
import { createStands } from './core/stands.js';
import { setupEventListeners } from './actions/events.js';
import { adjust_origin } from './origin/data.js';

var plano ='./plano/plano_ferial_2024.png';
var background ='./plano/newbg.jpg'
//plano = './plano/Plano_EA2025.pdf'


initScene();
loadMap(plano,background);
createStands(adjust_origin);
setupEventListeners();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
