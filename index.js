import { initScene, scene, camera, renderer } from './core/scene.js';
import { loadMap } from './core/map.js';
import { createStands,createStandLabel } from './core/stands.js';
import { setupEventListeners } from './actions/events.js';
import { adjust_origin } from './origin/data.js';
export const tag_target = 'map-container';

var plano = './plano/Plano_EA2025.jpg'
var background ='./plano/newbg.jpg'

initScene(tag_target);
loadMap(plano,background);
createStands(adjust_origin);
createStandLabel(adjust_origin);
setupEventListeners();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
