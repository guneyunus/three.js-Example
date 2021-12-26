import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//texture loader
const TextureLoaderManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader()
const doorColorTExture = textureLoader.load('./textures/door/color.jpg')
const alphaColorTExture = textureLoader.load('./textures/door/alpha.jpg')
const ambientOcclusionColorTExture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const heightColorTExture = textureLoader.load('./textures/door/height.jpg')
const normalColorTExture = textureLoader.load('./textures/door/normal.jpg')
const metalnessColorTExture = textureLoader.load('./textures/door/metalness.jpg')
const roughnessColorTExture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTextures = textureLoader.load('./textures/matcaps/1.png')
const gradientTextures = textureLoader.load('./textures/gradients/3.jpg')



//object
//mesh basic material
//const material = new THREE.MeshBasicMaterial({color:'red'})
//material.map = doorColorTExture
//material.color.set('0ff00ff')
//material.wireframe = true
// material.opacity = 0.1
//material.transparent = true
//material.alphaMap = alphaColorTExture
//material.side = new THREE.DoubleSide

//mesh normal materail
// const material = new THREE.MeshNormalMaterial()
// //material.wireframe = true
// material.flatShading = true

//very important
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTextures

//const material = new THREE.MeshDepthMaterial()

//mesh lamber material
// const material = new THREE.MeshLambertMaterial()

//mesh phong materail very important
const material = new THREE.MeshPhongMaterial()
material.shininess = 100
material.specular = new THREE.Color(0xffff00)

//mesh toon material





//light
const ambienLight = new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambienLight)

const pointLight = new THREE.PointLight(0xffffff,0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)



const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5,16,16),material
)
sphere.position.x = - 1.5
scene.add(sphere)

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1,1),material
)
scene.add(plane)

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3,0.2,16,32),
    material
)
torus.position.x += 1.5
scene.add(torus)






 
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //update object
    sphere.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime

    sphere.rotation.X = 0.15 * elapsedTime
    torus.rotation.X = 0.15 * elapsedTime
    plane.rotation.X = 0.15 * elapsedTime


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()