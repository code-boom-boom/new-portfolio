import * as THREE from 'three'
import Time from './utils/Time.js'
import Sizes from './utils/Sizes.js'
import Resources from './Resources.js'
import { Pane } from 'tweakpane'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import World from './components/World.js'

export default class App {
  static instance

  constructor(_options) {
    if (App.instance) {
      return App.instance
    }
    App.instance = this

    this.$canvas = _options.$canvas

    this.time = new Time()
    this.sizes = new Sizes()
    this.resources = new Resources()

    this.setConfig()
    this.setDebug()
    this.setRenderer()
    this.setCamera()
    this.setLight()
    this.setWorld()

    this.start = this.start.bind(this)
    this.start()
  }

  setConfig() {
    this.config = {}
    this.config.debug = import.meta.env.VITE_DEBUG === 'true'
  }

  setDebug() {
    if (this.config.debug) {
      this.debug = new Pane()
    }
  }

  setRenderer() {
    this.scene = new THREE.Scene()

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.$canvas,
      alpha: true,
    })
    this.renderer.setPixelRatio(2)
    this.renderer.setSize(this.sizes.width, this.sizes.height)
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(40, this.sizes.width / this.sizes.height, 1, 100)
    this.camera.position.set(0, 20, 20)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.update()
  }

  setLight() {
    this.hemisphereLight = new THREE.AmbientLight(0xffffff, 0.9)
    this.scene.add(this.hemisphereLight)

    this.sunLight = new THREE.DirectionalLight(0xffffff, 0.9)
    this.sunLight.position.set(10, 10, 10)
    this.scene.add(this.sunLight)
  }

  setWorld() {
    this.world = new World()
  }

  start() {
    requestAnimationFrame(this.start)

    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }
}
