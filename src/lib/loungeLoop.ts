// A placeholder jazz loop generated live in the browser with the Web
// Audio API, so the record player works without shipping an audio
// file. It plays a ii–V–i in C minor (the brand's key) with a walking
// bass, swung ride cymbal and a little vinyl crackle.
// Replace it with a real recording by passing `audioSrc` to <RecordPlayer>.

const BPM = 96
const BEAT = 60 / BPM
const SWING = (2 / 3) * BEAT // the swung "and" lands two-thirds through the beat

// Four bars: Dm7♭5 | G7♭9 | Cm9 | Cm9
const CHORDS = [
  [50, 53, 56, 60],
  [53, 56, 59, 62],
  [51, 55, 58, 62],
  [51, 55, 58, 62],
]

// Walking bass, one note per beat, with chromatic approach notes.
const BASS = [
  [38, 41, 44, 42],
  [43, 47, 50, 49],
  [36, 39, 43, 46],
  [48, 46, 43, 37],
]

const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12)

export class LoungeLoop {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private noise: AudioBuffer | null = null
  private timer: number | undefined
  private nextBarTime = 0
  private bar = 0

  get playing() {
    return this.ctx !== null
  }

  async start() {
    if (this.ctx) return
    const ctx = new AudioContext()
    this.ctx = ctx

    // Warm the whole mix with a gentle low-pass, like an old record.
    const tone = ctx.createBiquadFilter()
    tone.type = 'lowpass'
    tone.frequency.value = 4200
    tone.connect(ctx.destination)

    const master = ctx.createGain()
    master.gain.setValueAtTime(0, ctx.currentTime)
    master.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 1.2) // needle-drop fade in
    master.connect(tone)
    this.master = master

    this.noise = this.makeNoise(ctx)
    this.startCrackle(ctx, master)

    await ctx.resume()
    this.nextBarTime = ctx.currentTime + 0.15
    this.bar = 0
    this.timer = window.setInterval(() => this.schedule(), 100)
  }

  stop() {
    const ctx = this.ctx
    if (!ctx || !this.master) return
    window.clearInterval(this.timer)
    this.master.gain.cancelScheduledValues(ctx.currentTime)
    this.master.gain.setValueAtTime(this.master.gain.value, ctx.currentTime)
    this.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4)
    this.ctx = null
    this.master = null
    window.setTimeout(() => void ctx.close(), 500)
  }

  private schedule() {
    const ctx = this.ctx
    if (!ctx) return
    while (this.nextBarTime < ctx.currentTime + 0.4) {
      this.scheduleBar(this.bar, this.nextBarTime)
      this.nextBarTime += 4 * BEAT
      this.bar = (this.bar + 1) % CHORDS.length
    }
  }

  private scheduleBar(bar: number, t: number) {
    const chord = CHORDS[bar]
    // Comp on beat 1 and the swung "and" of 2.
    for (const at of [t, t + BEAT + SWING]) {
      for (const note of chord) this.tone(hz(note), at, BEAT * 1.4, 'triangle', 0.05)
      for (const note of chord) this.tone(hz(note + 12), at, BEAT * 0.8, 'sine', 0.012)
    }

    BASS[bar].forEach((note, beat) => {
      this.tone(hz(note), t + beat * BEAT, BEAT * 0.92, 'triangle', 0.22)
    })

    // Ride: every beat, plus the swung "and" of 2 and 4.
    for (let beat = 0; beat < 4; beat++) {
      this.ride(t + beat * BEAT, 0.05)
      if (beat === 1 || beat === 3) this.ride(t + beat * BEAT + SWING, 0.03)
    }
  }

  private tone(freq: number, t: number, dur: number, type: OscillatorType, peak: number) {
    const ctx = this.ctx
    if (!ctx || !this.master) return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(peak, t + 0.015)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    osc.connect(gain).connect(this.master)
    osc.start(t)
    osc.stop(t + dur + 0.05)
  }

  private ride(t: number, peak: number) {
    const ctx = this.ctx
    if (!ctx || !this.master || !this.noise) return
    const src = ctx.createBufferSource()
    src.buffer = this.noise
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 7000
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(peak, t)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)
    src.connect(hp).connect(gain).connect(this.master)
    src.start(t, Math.random())
    src.stop(t + 0.2)
  }

  private makeNoise(ctx: AudioContext) {
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
    return buffer
  }

  private startCrackle(ctx: AudioContext, dest: AudioNode) {
    // Sparse random clicks, looped: the sound of dust on vinyl.
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() < 0.0006 ? (Math.random() * 2 - 1) * 0.9 : 0
    }
    const src = ctx.createBufferSource()
    src.buffer = buffer
    src.loop = true
    const gain = ctx.createGain()
    gain.gain.value = 0.12
    src.connect(gain).connect(dest)
    src.start()
  }
}
