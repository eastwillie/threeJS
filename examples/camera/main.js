import * as THREE from 'three';
import FloorTexture from '/public/textures/basic/checker.png';
import {OrbitControls} from "three/addons";
import GUI from "lil-gui";

const render = new THREE.WebGLRenderer({antialias: true});
render.setScissorTest(true);
render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(render.domElement);

const scene = new THREE.Scene();

//#region Camera1
const camera1 = new THREE.PerspectiveCamera(45, undefined, 5, 100);
camera1.position.set(0, 10, 20);
camera1.lookAt(0, 0, 0);
const cameraOrbit1 = new OrbitControls(camera1, document.querySelector('#view1'));
cameraOrbit1.target.set(0, 0, 0);
cameraOrbit1.update();
//#endregion

//#region Camera2
const camera2 = new THREE.PerspectiveCamera(45, undefined, 0.1, 1000);
camera2.position.set(0, 10, 40);
camera2.lookAt(0, 0, 0);
const cameraOrbit2 = new OrbitControls(camera2, document.querySelector('#view2'));
cameraOrbit2.target.set(0, 0, 0);
cameraOrbit2.update();
//#endregion

//#region Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);
//#endregion

//#region floor
const floorSize = 40;
const floorGeometry = new THREE.PlaneGeometry(floorSize, floorSize);
const floorTexture = new THREE.TextureLoader().load(FloorTexture);
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.magFilter = THREE.NearestFilter;
floorTexture.repeat.set(floorSize / 2, floorSize / 2);
const floorMaterial = new THREE.MeshPhongMaterial({map: floorTexture, side: THREE.DoubleSide});
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.rotation.x = Math.PI * -0.5;
scene.add(floorMesh);
//#endregion

//#region Box
const boxGeometry = new THREE.BoxGeometry(4, 4, 4);
const boxMaterial = new THREE.MeshPhongMaterial({color: 0xff00ff});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.set(0, 3, 0);
scene.add(boxMesh);
//#endregion

//#region Helpers
const gui = new GUI();
gui.add(camera1, 'fov', 1, 180, 1).name('FOV');
gui.add(camera1, 'near', 1, 10, 1).name('Near');
gui.add(camera1, 'far', 50, 200, 1).name('Far');
const cameraHelper = new THREE.CameraHelper(camera1);
scene.add(cameraHelper);
//#endregion

render.setAnimationLoop(() => {
    const aspect1 = setScissorForElement(document.querySelector('#view1'));
    camera1.aspect = aspect1;
    camera1.updateProjectionMatrix();
    cameraHelper.visible = false;
    cameraHelper.update();
    render.render(scene, camera1);

    const aspect2 = setScissorForElement(document.querySelector('#view2'));
    camera2.aspect = aspect2;
    camera2.updateProjectionMatrix();
    cameraHelper.visible = true;
    cameraHelper.update();
    render.render(scene, camera2);
});

function setScissorForElement(elem) {
    const canvasRect = render.domElement.getBoundingClientRect();
    const elemRect = elem.getBoundingClientRect();

    // compute a canvas relative rectangle
    const right = Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
    const left = Math.max(0, elemRect.left - canvasRect.left);
    const bottom = Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
    const top = Math.max(0, elemRect.top - canvasRect.top);

    const width = Math.min(canvasRect.width, right - left);
    const height = Math.min(canvasRect.height, bottom - top);

    // setup the scissor to only render to that part of the canvas
    const positiveYUpBottom = canvasRect.height - bottom;
    render.setScissor(left, positiveYUpBottom, width, height);
    render.setViewport(left, positiveYUpBottom, width, height);

    // return the aspect
    return width / height;
}