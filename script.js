import * as THREE from 'three';
import {GLTFLoader} from "three/addons";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(5, 5, 5).normalize();
scene.add(light);

let capybara;

const loader = new GLTFLoader();
loader.load('/capybara/scene.gltf', function(gltf) {
    capybara = gltf.scene;
    capybara.scale.set(0.3, 0.3, 0.3);
    scene.add(capybara);

    let lastTime = 0;
    function animate(time) {
        requestAnimationFrame(animate);
        const delta = time - lastTime;
        lastTime = time;
        const rotationSpeed = 0.002;
        capybara.rotation.y += rotationSpeed * delta;
        renderer.render(scene, camera);
    }
    requestAnimationFrame(animate);
}, undefined, function(error) {
    console.error('Error while loading a model:', error);
});

let boundaries = {
    xMin: 0,
    xMax: 0,
    yMin: 0,
    yMax: 0
};

function updateBoundaries() {
    const aspect = window.innerWidth / window.innerHeight;
    const cameraZ = camera.position.z;
    const vFOV = (camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(vFOV / 2) * cameraZ;
    const width = height * aspect;

    boundaries.xMin = -width / 2.5;
    boundaries.xMax = width / 2.5;
    boundaries.yMin = -height / 2.5;
    boundaries.yMax = height / 2.5;
}

updateBoundaries();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateBoundaries();
});

function checkBoundaries(object) {
    if (object.position.x < boundaries.xMin) {
        object.position.x = boundaries.xMin;
    } else if (object.position.x > boundaries.xMax) {
        object.position.x = boundaries.xMax;
    }

    if (object.position.y < boundaries.yMin) {
        object.position.y = boundaries.yMin;
    } else if (object.position.y > boundaries.yMax) {
        object.position.y = boundaries.yMax;
    }
}

document.addEventListener('keydown', function(event) {
    const moveStep = 0.5;

    if (event.code === 'ArrowUp') {
        capybara.position.y += moveStep;  // Вверх
    } else if (event.code === 'ArrowDown') {
        capybara.position.y -= moveStep;  // Вниз
    } else if (event.code === 'ArrowLeft') {
        capybara.position.x -= moveStep;  // Влево
    } else if (event.code === 'ArrowRight') {
        capybara.position.x += moveStep;  // Вправо
    }

    checkBoundaries(capybara);
});