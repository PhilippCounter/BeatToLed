class MusicBeatScheduler {
  constructor (cb) {
    this.scheduled = []
    this.started = false
    this.running = false
    this.startTime = 0
    this.cb = cb
    this.schedule = this.schedule.bind(this)
  }

  getScheduler () {
    return this.schedule
  }

  start () {
    this.started = true
    this.startTime = Date.now()

    if (this.scheduled.length === 0) return

    this.running = true
    let next = Math.max(0, this.scheduled[0])
    setTimeout(this._do.bind(this), next.pos)
  }

  schedule (pos) {
    this.cb(pos)
  }

  _do () {
    const cur = this.scheduled.shift()

    

    if (this.scheduled.length === 0) {
      this.running = false
      return
    }

    const next = this.scheduled[0]
    const waitTime = Math.max(0, next.pos - (Date.now() - this.startTime))
    setTimeout(this._do.bind(this), waitTime)
  }
}

module.exports = MusicBeatScheduler