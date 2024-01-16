import * as THREE from 'three'
import App from '../App.js'
import colors from '../color.js'

export default class World {
  constructor() {
    this.app = new App()
    this.resources = this.app.resources
    this.scene = this.app.scene

    this.container = new THREE.Group()
    this.scene.add(this.container)
    this.setFramework()
    this.setPage()
    this.setContent()
  }

  setFramework() {
    this.resources.on('ready', () => {
      const frameworkSource = this.resources.items.frameworkSource
      this.framework = new THREE.Group()

      frameworkSource.scene.children.forEach((item) => {
        this.framework.add(new THREE.Mesh(
          item.geometry,
          new THREE.MeshStandardMaterial({ color: colors[item.userData.materialColor] }),
        ))
      })
      this.container.add(this.framework)
    })
  }

  setPage() {
    this.resources.on('ready', () => {
      const pageSource = this.resources.items.pageSource
      this.page = new THREE.Group()

      pageSource.scene.children.forEach((item) => {
        this.page.add(new THREE.Mesh(
          item.geometry,
          new THREE.MeshStandardMaterial({ color: colors[item.userData.materialColor] }),
        ))
      })
      this.container.add(this.page)
    })
  }

  setContent() {
    this.resources.on('ready', () => {
      const contentSource = this.resources.items.contentSource

      this.content = new THREE.Group()

      contentSource.scene.children.forEach((item) => {
        this.content.add(new THREE.Mesh(
          item.geometry,
          new THREE.MeshStandardMaterial({ color: colors[item.userData.materialColor] }),
        ))
      })
      this.container.add(this.content)
    })
  }
}
