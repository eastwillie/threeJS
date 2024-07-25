import * as THREE from 'three';
import {OrbitControls} from 'three/addons';
import TextureFloor from '/public/texttures/basic/checker.png';
import {ColorGUIHelper} from './helpers.js';
import GUI from 'lil-gui';
import {DirectionalLightHelper} from "three";

const render = new THREE.WebGLRenderer({antialias: true});
render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

const scene = new THREE.Scene();

//#region Camera
const camera = new THREE.PerspectiveCamera(90, 2, 0.1, 1000);
camera.position.set(0, 5, 25);
const controls = new OrbitControls(camera, render.domElement);
controls.target.set(0, 5, 0);
controls.update();
//#endregion

//#region Floor
const floorSize = 40;
const floorTexture = new THREE.TextureLoader().load(TextureFloor);
floorTexture.color = THREE.SRGBColorSpace;
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(floorSize / 2, floorSize / 2);
floorTexture.magFilter = THREE.NearestFilter;
const floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize);
const floorMaterial = new THREE.MeshPhongMaterial({map: floorTexture, side: THREE.DoubleSide});
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.rotation.x = Math.PI * -.5;
scene.add(floorMesh);
//#endregion

//#region Cube
const cubeSize = 4;
const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const cubeMaterial = new THREE.MeshPhongMaterial({color: 0x8ac8ac});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.set(0, cubeSize / 2 + 1, 0);
scene.add(cubeMesh);
//#endregion

//#region Sphere
const sphereRadius = 2;
const sphereGeometry = new THREE.SphereGeometry(sphereRadius);
const sphereMaterial = new THREE.MeshPhongMaterial({color: 0xca8ca8});
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.set(5, sphereRadius + 1, 0);
scene.add(sphereMesh);
//#endregion

//#region Ambient Light
const color = 0xFFFFFF;
const intensity = 1;
const ambientLight = new THREE.AmbientLight(color, intensity);
scene.add(ambientLight);
//#endregion

//#region Hemi-Sphere Light
const skyColor = 0xB1E1FF;
const groundColor = 0xB97A20;
const hemiSphereLight = new THREE.HemisphereLight(skyColor, groundColor, 1);
scene.add(hemiSphereLight);
//#endregion

//#region Directional Light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 10, 5);
directionalLight.target.position.set(0, 0, 0);
scene.add(directionalLight);
scene.add(directionalLight.target);
//#endregion


//#region Helpers
const gui = new GUI();

gui.addColor(new ColorGUIHelper(ambientLight, 'color'), 'value').name('Ambient Color');
gui.add(ambientLight, 'intensity', 0, 2, 0.01).name('Ambient Intensity');

gui.addColor(new ColorGUIHelper(hemiSphereLight, 'color'), 'value').name('Sky Color');
gui.addColor(new ColorGUIHelper(hemiSphereLight, 'groundColor'), 'value').name('Ground Color');
gui.add(hemiSphereLight, 'intensity', 0, 2, 0.01).name('Hemi Sphere Light Intensity');

gui.addColor(new ColorGUIHelper(directionalLight, 'color'), 'value').name('Directional Light Color');
gui.add(directionalLight, 'intensity', 0, 2, 0.01).name('Directional Light Intensity');
const directionalLightHelper = new DirectionalLightHelper(directionalLight);
const directionalLightCallBack = () => {
    directionalLight.updateWorldMatrix();
    directionalLightHelper.update();
};
makeXYZGUI(gui, directionalLight.position, 'Directional Light Position', directionalLightCallBack);
makeXYZGUI(gui, directionalLight.target.position, 'Directional Light Target', directionalLightCallBack);
scene.add(directionalLightHelper);
//#endregion
render.setAnimationLoop(() => {
    render.render(scene, camera);
});

function makeXYZGUI(gui, vector3, name, callback) {
    const folder = gui.addFolder(name);
    folder.add(vector3, 'x', -10, 10).onChange(callback);
    folder.add(vector3, 'y', 0, 10).onChange(callback);
    folder.add(vector3, 'z', -10, 10).onChange(callback);
    folder.open();
}