import * as THREE from 'three';
import SoliderModel from '/public/models/glb/Soldier.glb';
import {GLTFLoader, OrbitControls} from 'three/addons';

const render = new THREE.WebGLRenderer({antialias: true});
render.setSize(window.innerWidth, window.innerHeight);
render.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(render.domElement);

const scene = new THREE.Scene();

//#region Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(1, 2, -3);
camera.lookAt(0, 0, 0);
const orbitControls = new OrbitControls(camera, render.domElement);
orbitControls.target.set(0, 0, 0);
//#endregion

//#region Light
const hemiSphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
scene.add(hemiSphereLight);
//#endregion

//#region Solider Model
let animationMixer;
const deltaClock = new THREE.Clock();
new GLTFLoader().load(SoliderModel, (model) => {
    const soliderModel = model.scene;
    soliderModel.position.set(0, -1, 0);
    scene.add(soliderModel);
    animationMixer = new THREE.AnimationMixer(soliderModel);
    const animations = model.animations;
    const walkClip = THREE.AnimationClip.findByName(animations, 'Walk');
    const walkAction = animationMixer.clipAction(walkClip);
    walkAction.play();
});
//#endregion

render.setAnimationLoop(() => {
    animationMixer?.update(deltaClock.getDelta());
    render.render(scene, camera);
});