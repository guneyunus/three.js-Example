import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

//time
//let time = Date.now()

//clock
//const Clock = new THREE.Clock()

gsap.to(mesh.position,{duration : 1, delay : 1,x : 2})
gsap.to(mesh.position,{duration : 1, delay : 2,x : 0})

//animations

const tick = () =>
{
    //time
    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // time = currentTime
    //update object
    //mesh.rotation.x += deltaTime * 0.001
    //Clock
    //const elapsed = Clock.getElapsedTime()
    
    //mesh animation is circle animate
    //mesh.position.y = Math.sin(elapsed)
    //mesh.position.x = Math.cos(elapsed)    

    //mesh.rotation.y = elapsed
    //var deneme = elapsed > 10 ? mesh.rotation.y = 0 : mesh.rotation.y = elapsed

    //renderer
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()