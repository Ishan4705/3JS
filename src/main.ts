import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js' 
// Import Stats not using curly braces
// as it is a default export
import {GUI} from 'dat.gui'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 1.5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

new OrbitControls(camera, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial({ wireframe: true })

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const stats = new Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
// Add rotation controls for the cube
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01).name('Rotate X')
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01).name('Rotate Y')
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01).name('Rotate Z')
cubeFolder.open()
const cameraFolder = gui.addFolder('Camera')
// Add position controls for the camera
cameraFolder.add(camera.position, 'x', -5, 5, 0.1).name('Position X')
cameraFolder.add(camera.position, 'y', -5, 5, 0.1).name('Position Y')
cameraFolder.add(camera.position, 'z', -5, 5, 0.1).name('Position Z')
cameraFolder.open()

function animate() {
  requestAnimationFrame(animate)
  // we can add stats beginaning and end markers to measure specific code blocks
  // stats.begin()
  // cube.rotation.x += 0.01
  // cube.rotation.y += 0.01
  // stats.end()
  stats.update()
  renderer.render(scene, camera)
}

animate()