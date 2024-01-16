import EventEmitter from './EventEmitter.js'

export default class Sizes extends EventEmitter {
  constructor() {
    super()

    this.width = window.innerWidth
    this.height = window.innerHeight

    this.resize = this.resize.bind(this)
    window.addEventListener('resize', this.resize)

    this.resize()
  }

  resize() {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.trigger('resize')
  }
}
