import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
/**
 * Material
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//dat.gui add
const gui = new dat.GUI()

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
const  cubetextureLoader= new THREE.CubeTextureLoader()
const textureLoader = new THREE.TextureLoader()

const doorColorTExture = textureLoader.load('./textures/door/color.jpg')
const alphaColorTExture = textureLoader.load('./textures/door/alpha.jpg')
const ambientOcclusionColorTExture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const heightColorTExture = textureLoader.load('./textures/door/height.jpg')
const normalColorTExture = textureLoader.load('./textures/door/normal.jpg')
const metalnessColorTExture = textureLoader.load('./textures/door/metalness.jpg')
const roughnessColorTExture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTextures = textureLoader.load('./textures/matcaps/9.jpg')
const gradientTextures = textureLoader.load('./textures/gradients/3.jpg')

// const environmentMapTexture = cubeTextureLoader.load([
//     './textures/environmentMaps/0/px.jpg',
//     './textures/environmentMaps/0/nx.jpg',
//     './textures/environmentMaps/0/py.jpg',
//     './textures/environmentMaps/0/ny.jpg',
//     './textures/environmentMaps/0/pz.jpg',
//     './textures/environmentMaps/0/nz.jpg'
// ])


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
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0xffff00)

// gradientTextures.minFilter =  THREE.NearestFilter
// gradientTextures.magFilter =  THREE.NearestFilter

//mesh toon material
// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTextures

//mesh standert material ****

// const material = new THREE.MeshStandardMaterial()
// // material.metalness = 0.45
// // material.roughness = 0.65
// material.map = doorColorTExture 
// material.aoMap = ambientOcclusionColorTExture
// material.aoMapIntensity = 1
// material.displacementMap = heightColorTExture
// material.displacementScale = 0.1
// material.metalnessMap = metalnessColorTExture
// material.roughnessMap = roughnessColorTExture
// material.normalMap = normalColorTExture
// material.normalScale.set(0.5,0.5)
// material.transparent = true
// material.alphaMap = alphaColorTExture



const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
//material.envMap = envmap

gui.add(material,'metalness').min(0).max(1).step(0.0001)
gui.add(material,'roughness').min(0).max(1).step(0.001)
gui.add(material,'aoMapIntensity').min(1).max(10).step(0.001)
gui.add(material,'displacementScale').min(0).max(1).step(0.001)


//light
const ambienLight = new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambienLight)

const pointLight = new THREE.PointLight(0xffffff,0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)



const sphere = new THREE.Mesh(
    new THREE.SphereBufferGeometry(0.5,64,64),material
)
sphere.position.x = - 1.5


const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1,1,100,100),material
)


const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3,0.2,64,128),
    material
)
torus.position.x += 1.5

//set geomerty to uv very impoortant***
sphere.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(sphere.geometry.attributes.uv.array,2)
)
plane.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(plane.geometry.attributes.uv.array,2)
)
torus.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(torus.geometry.attributes.uv.array,2)
)


scene.add(torus,sphere,plane)






 
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