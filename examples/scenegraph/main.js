import * as THREE from 'three';
import GUI from 'lil-gui';
import {AxisGridHelper} from './AxisGridHelper.js';

const renderer = new THREE.WebGLRenderer({antialias: true});
const scene = new THREE.Scene();
const gui = new GUI();


//#region Camera
const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 1000);
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);
//#endregion

//#region Light
const light = new THREE.PointLight(0xffffff, 500);
scene.add(light);
//#endregion

const objects = [];
const sphereGeometry = new THREE.SphereGeometry(1, 18, 6);

//#region Solar System
const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xffff00});
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);
solarSystem.add(sunMesh);
//endregion

//#region Earth Obit
const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 10;
solarSystem.add(earthOrbit);
objects.push(earthOrbit);

const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233ff, emissive: 0x112244});
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthOrbit.add(earthMesh);
//#endregion

//#region Moon Obit
const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 2;
earthOrbit.add(moonOrbit);
objects.push(moonOrbit);
const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
moonMesh.scale.set(.5, .5, .5);
moonOrbit.add(moonMesh);
//#endregion

//#region Extra tools
makeAxisGrid(solarSystem, 'solarSystem', 25);
makeAxisGrid(sunMesh, 'sunMesh');
makeAxisGrid(earthOrbit, 'earthOrbit');
makeAxisGrid(earthMesh, 'earthMesh');
makeAxisGrid(moonOrbit, 'moonOrbit');
makeAxisGrid(moonMesh, 'moonMesh');
//#endregion


renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setAnimationLoop((time) => {
    objects.forEach(obj => obj.rotation.y += Math.PI / 360);
    renderer.render(scene, camera);
});

function makeAxisGrid(node, label, units) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, 'visible').name(label);
}
