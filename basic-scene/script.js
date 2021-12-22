// console.log("hello");
// console.log(THREE);
// //scene
// const scene = new THREE.Scene();

// //red cube
// const geometry = new THREE.BoxGeometry(1,1,1);
// const material = new THREE.MeshBasicMaterial({color: 0xff0000});

// //mesh
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// const sizes = {
//     width:800,
//     height:600
// }
// //camera
// const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height);
// camera.position.z = 3;
// scene.add(camera);

// const Canvas = document.querySelector('.webgl');

// //renderer => draw the canvas elemet

// const renderer = new THREE.WebGLRenderer({
//     canvas = Canvas
// })
// renderer.setSize(sizes.width,sizes.height);
// renderer.render(scene,camera);

// console.log(scene);
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: '#ff0000'
})
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cubeMesh)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
