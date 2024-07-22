// Import Three.js
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

let scene, camera, renderer;
const init = () => {
    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xa0a0a0);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 50, 100);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 100, 100).normalize();
    scene.add(light);

    // Terrain
    const terrainGeometry = new THREE.PlaneGeometry(200, 200, 32, 32);
    const terrainMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
    const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
    terrain.rotation.x = -Math.PI / 2;
    scene.add(terrain);

    // Add Houses
    const houseGeometry = new THREE.BoxGeometry(10, 10, 10);
    const houseMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    for (let i = 0; i < 5; i++) {
        const house = new THREE.Mesh(houseGeometry, houseMaterial);
        house.position.set(Math.random() * 100 - 50, 5, Math.random() * 100 - 50);
        scene.add(house);
    }

    // Add Trees
    const treeGeometry = new THREE.ConeGeometry(5, 20, 32);
    const treeMaterial = new THREE.MeshLambertMaterial({ color: 0x008000 });
    for (let i = 0; i < 10; i++) {
        const tree = new THREE.Mesh(treeGeometry, treeMaterial);
        tree.position.set(Math.random() * 100 - 50, 10, Math.random() * 100 - 50);
        scene.add(tree);
    }

    // Render loop
    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();
};

// Adjust camera aspect ratio and renderer size on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize the scene
init();
