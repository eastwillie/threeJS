import * as THREE from 'three';

const render = new THREE.WebGLRenderer({antialias: true});
render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

const bgColor = 0xffffff;
const scene = new THREE.Scene();
scene.background = new THREE.Color(bgColor);
scene.fog = new THREE.Fog(bgColor, 15, 25);

//#region Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 20);
camera.lookAt(0, 0, 0);
scene.add(camera);
//#endregion

//#region Light
const hemisphereLight = new THREE.HemisphereLight(0xfff, 0x000, 2);
scene.add(hemisphereLight);
//#endregion

//#region Box
const boxGeometry = new THREE.BoxGeometry(4, 4, 10);
const boxMaterial = new THREE.MeshPhongMaterial({color: 0xff00ff});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.set(0, 0, 0);
scene.add(boxMesh);
//#endregion

render.setAnimationLoop(() => {
    boxMesh.rotation.x += Math.PI / 60 / 18;
    boxMesh.rotation.y += Math.PI / 60 / 18;

    render.render(scene, camera);
});