import EventEmitter from './EventEmitter.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

export default class Loader extends EventEmitter {
  constructor() {
    super()

    this.toLoad = 0
    this.loaded = 0
    this.items = {}

    this.setLoaders()
  }

  setLoaders() {
    this.loaders = []

    this.loaders.push({
      extensions: ['jpg', 'png'],
      action: (_resource) => {
        const image = new Image()

        image.addEventListener('load', () => {
          this.fileLoadEnd(_resource, image)
        })

        image.addEventListener('error', () => {
          this.fileLoadEnd(_resource, image)
        })

        image.src = _resource.source
      },
    })

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('draco/')
    dracoLoader.setDecoderConfig({ type: 'js' })

    const gltfLoader = new GLTFLoader()
    this.loaders.push({
      extensions: ['glb', 'gltf'],
      action: (_resource) => {
        gltfLoader.load(_resource.source, (_data) => {
          this.fileLoadEnd(_resource, _data)
        })
      },
    })
  }

  load(_resources = []) {
    for (const _resource of _resources) {
      this.toLoad++
      const extensionMatch = _resource.source.match(/\.([a-z]+)$/)

      if (typeof extensionMatch[1] !== 'undefined') {
        const extension = extensionMatch[1]
        const loader = this.loaders.find((_loader) => _loader.extensions.find((_extension) => _extension === extension))

        if (loader) {
          loader.action(_resource)
        } else {
          console.warn(`Cannot found loader for ${_resource}`)
        }
      } else {
        console.warn(`Cannot found extension of ${_resource}`)
      }
    }
  }

  fileLoadEnd(_resource, _data) {
    this.loaded++
    this.items[_resource.name] = _data

    this.trigger('fileEnd', [_resource, _data])

    if (this.loaded === this.toLoad) {
      this.trigger('end')
    }
  }
}
