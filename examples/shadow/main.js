import * as THREE from 'three';
import CheckerTexture from '/public/textures/basic/checker.png';
import {OrbitControls} from 'three/addons';

const render = new THREE.WebGLRenderer({antialias: true});
render.shadowMap.enabled = true;
render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

const scene = new THREE.Scene();

//#region Camera
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 50, 50);
camera.lookAt(0, 10, 0);
const cameraOrbit = new OrbitControls(camera, render.domElement);
cameraOrbit.target.set(0, 0, 0);
//#endregion

//#region Floor
const floorSize = 40;
const floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize);
const floorTexture = new THREE.TextureLoader().load(CheckerTexture);
floorTexture.colorSpace = THREE.SRGBColorSpace;
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(floorSize / 2, floorSize / 2);
floorTexture.magFilter = THREE.NearestFilter;

const floorMaterial = new THREE.MeshPhongMaterial({map: floorTexture, side: THREE.DoubleSide});
floorMaterial.color.setRGB(1.5, 1.5, 1.5);

const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.rotation.x = Math.PI * -.5;
floorMesh.receiveShadow = true;
scene.add(floorMesh);
//#endregion

//#region Light
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.castShadow = true;
directionalLight.position.set(40, 40, 0);
directionalLight.target.position.set(0, 0, 0);
scene.add(hemisphereLight, directionalLight, directionalLight.target);
//#endregion

//#region Sphere
const sphereGeometry = new THREE.SphereGeometry(2);
const sphereMaterial = new THREE.MeshPhongMaterial({color: 0xff00ff});
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.set(0, 4, 0);
sphereMesh.castShadow = sphereMesh.receiveShadow = true;
scene.add(sphereMesh);
//#endregion

//#region Box
const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
const boxMaterial = new THREE.MeshPhongMaterial({color: 0x0000ff});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.set(4, 4, 0);
boxMesh.castShadow = boxMesh.receiveShadow = true;
scene.add(boxMesh);
//#endregion

render.setAnimationLoop(() => {
    render.render(scene, camera);
});