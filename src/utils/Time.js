import EventEmitter from './EventEmitter.js'

export default class Time extends EventEmitter {
  constructor() {
    super()

    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16

    this.tick = this.tick.bind(this)
    this.tick()
  }

  tick() {
    this.ticker = requestAnimationFrame(this.tick)

    const current = Date.now()

    this.delta = Math.min(current - this.current, 60)
    this.elapsed = current - this.start
    this.current = current

    this.trigger('tick')
  }
}
