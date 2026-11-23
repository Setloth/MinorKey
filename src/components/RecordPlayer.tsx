import { useEffect, useRef, useState } from 'react'
import { track } from '../lib/analytics'
import { LoungeLoop } from '../lib/loungeLoop'
import { Section } from './Section'

type Props = {
  // Path to a real recording (e.g. '/audio/house-trio.mp3').
  // Without one, a loop is generated live in the browser.
  audioSrc?: string
}

// Other parts of the page (the hero's "Hear the room" button) call this
// to start the record. It must run inside a click so browsers allow audio.
export const PLAY_RECORD_EVENT = 'minorkey:play-record'

export function RecordPlayer({ audioSrc }: Props) {
  const [playing, setPlaying] = useState(false)
  const playingRef = useRef(false)
  const loop = useRef<LoungeLoop | null>(null)
  const audio = useRef<HTMLAudioElement | null>(null)

  async function play(from: string) {
    if (playingRef.current) return
    playingRef.current = true
    setPlaying(true)
    if (audioSrc) {
      audio.current ??= Object.assign(new Audio(audioSrc), { loop: true })
      await audio.current.play()
    } else {
      loop.current ??= new LoungeLoop()
      await loop.current.start()
    }
    track('record_play', { source: audioSrc ? 'recording' : 'generated', from })
  }

  function stop() {
    loop.current?.stop()
    audio.current?.pause()
    playingRef.current = false
    setPlaying(false)
    track('record_stop')
  }

  const playRef = useRef(play)
  useEffect(() => {
    playRef.current = play
  })

  useEffect(() => {
    const onPlay = () => void playRef.current('hero')
    window.addEventListener(PLAY_RECORD_EVENT, onPlay)
    return () => {
      window.removeEventListener(PLAY_RECORD_EVENT, onPlay)
      loop.current?.stop()
      audio.current?.pause()
    }
  }, [])

  const toggle = () => (playing ? stop() : void play('turntable'))

  return (
    <Section id="listen" eyebrow="Hear the room" title={<>Drop <em>the needle</em></>} className="section--listen">
      <div className="player">
        <button
          type="button"
          className={`turntable ${playing ? 'is-playing' : ''}`}
          onClick={toggle}
          aria-pressed={playing}
          aria-label={playing ? 'Stop the record' : 'Play the record'}
        >
          <svg viewBox="0 0 320 240" className="turntable__svg" aria-hidden="true">
            <rect x="4" y="4" width="312" height="232" rx="4" className="turntable__plinth" />
            <g className="turntable__platter">
              <circle cx="140" cy="120" r="96" className="turntable__vinyl" />
              <circle cx="140" cy="120" r="82" className="turntable__groove" />
              <circle cx="140" cy="120" r="68" className="turntable__groove" />
              <circle cx="140" cy="120" r="54" className="turntable__groove" />
              <circle cx="140" cy="120" r="30" className="turntable__label" />
              <text x="140" y="117" className="turntable__label-text">MINOR KEY</text>
              <text x="140" y="130" className="turntable__label-sub">♭♭♭ · 33⅓</text>
              <circle cx="140" cy="120" r="3" className="turntable__spindle" />
            </g>
            <g className="turntable__arm">
              <circle cx="276" cy="44" r="12" className="turntable__pivot" />
              {/* At rest the arm sits off the record; playing swings the head onto the outer grooves. */}
              <path d="M276 44 L264 140 L212 170" className="turntable__tonearm" />
              <rect x="196" y="164" width="18" height="12" rx="2" transform="rotate(-30 205 170)" className="turntable__head" />
            </g>
          </svg>
          <span className="turntable__cue">{playing ? 'Lift the needle' : 'Drop the needle'}</span>
        </button>

        <div className="player__copy">
          <p className="player__now">
            <span className={`player__dot ${playing ? 'is-on' : ''}`} aria-hidden="true" />
            {playing ? 'Now playing' : 'On the platter'}
          </p>
          <h3 className="player__track">ii–V–i in C Minor</h3>
          <p className="player__meta">
            Before you find the door, hear what's behind it. This is the house trio's opener, and every night at Minor
            Key starts here.
          </p>
          <p className="section__note">Tap the record to play. Sound starts only when you ask.</p>
        </div>
      </div>
    </Section>
  )
}
