const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30000
);

camera.position.set(-3000, 900, 1000);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 1000;
controls.maxDistance = 1000;

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const loader = new THREE.TextureLoader();

const textures = [
  new THREE.TextureLoader().load("img/front.jpg"),
  new THREE.TextureLoader().load("img/back.jpg"),
  new THREE.TextureLoader().load("img/up.jpg"),
  new THREE.TextureLoader().load("img/down.jpg"),
  new THREE.TextureLoader().load("img/right.jpg"),
  new THREE.TextureLoader().load("img/left.jpg"),
];

let materials = [];

textures.forEach((texture) => {
  materials.push(new THREE.MeshBasicMaterial({ map: texture }));
});

materials.forEach((material) => {
  material.side = THREE.BackSide;
});

const geometry = new THREE.BoxGeometry(10000, 10000, 10000);
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
};

animate();
