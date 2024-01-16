import EventEmitter from './utils/EventEmitter.js'
import * as THREE from 'three'
import Loader from './utils/Loader.js'

import framework from './assets/glb/framework.glb'
import page from './assets/glb/page.glb'
import content from './assets/glb/content.glb'

export default class Resources extends EventEmitter {
  constructor() {
    super()

    this.loader = new Loader()
    this.items = {}

    this.loader.load([
      { name: 'frameworkSource', source: framework },
      { name: 'pageSource', source: page },
      { name: 'contentSource', source: content },
    ])

    this.loader.on('fileEnd', (_resource, _data) => {
      this.items[_resource.name] = _data

      if (_resource.type === 'texture') {
        const texture = new THREE.Texture(_data)
        texture.needsUpdate = true

        this.items[`${_resource.name}Texture`] = texture
      }

      this.trigger('progress', [this.loader.loaded / this.loader.toLoad])
    })

    this.loader.on('end', () => {
      this.trigger('ready')
    })
  }
}
