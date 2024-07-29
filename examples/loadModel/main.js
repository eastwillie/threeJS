import * as THREE from 'three';
import {GLTFLoader, OrbitControls, RGBELoader} from 'three/addons';
import Background from '/public/textures/equirectangular/royal_esplanade_1k.hdr';
import Helmet from '/public/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf';

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

new RGBELoader().load(Background, background => {
    background.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = background;
    scene.environment = background;
});

new GLTFLoader().load(Helmet, gltf => scene.add(gltf.scene));

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.25, 20);
camera.position.set(0, 0, 10);
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2;
controls.maxDistance = 10;

renderer.setAnimationLoop(() => renderer.render(scene, camera));