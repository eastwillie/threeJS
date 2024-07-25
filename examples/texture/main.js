import * as THREE from 'three';
import WallTexture from '/public/texttures/textture01.jpg';

const render = new THREE.WebGLRenderer({antialias: true});
render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

const scene = new THREE.Scene();

//#region Camera
const camera = new THREE.PerspectiveCamera(90, 2, 0.1, 1000);
camera.position.set(0, 0, 1);
camera.lookAt(0, 0, 0);
//#endregion

const geometry = new THREE.BoxGeometry();

const texture = new THREE.TextureLoader().load(WallTexture);
texture.color = THREE.SRGBColorSpace;

const material = new THREE.MeshBasicMaterial({map: texture});

const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, -1);
scene.add(mesh);

render.setAnimationLoop(() => {
    mesh.rotation.x += Math.PI / 360;
    mesh.rotation.y += Math.PI / 360;
    render.render(scene, camera);
});