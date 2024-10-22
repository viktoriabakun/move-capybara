import * as THREE from 'three';

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xFFC0CB });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera Sizes
const viewSizes = {
    width: 800,
    height: 600
};

// Camera
const camera = new THREE.PerspectiveCamera(75, viewSizes.width / viewSizes.height);
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 2;
scene.add(camera);

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(viewSizes.width, viewSizes.height);
renderer.render(scene, camera);