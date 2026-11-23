import { brand, details, heroImage } from '../brand/brand'
import { track } from '../lib/analytics'
import { PLAY_RECORD_EVENT } from './RecordPlayer'

export function Hero() {
  function hearTheRoom() {
    track('cta_click', { location: 'hero_listen' })
    // Start the record from this click (browsers only allow audio after
    // a tap), then the anchor link scrolls down to the turntable.
    window.dispatchEvent(new Event(PLAY_RECORD_EVENT))
  }

  return (
    <section className={`hero ${heroImage ? 'hero--photo' : ''}`} id="top" aria-labelledby="hero-title">
      {heroImage && <img className="hero__photo" src={heroImage} alt="" fetchPriority="high" />}
      <div className="hero__sunburst" aria-hidden="true" />
      <div className="hero__inner">
        <p className="eyebrow">Jazz lounge &amp; cocktail bar · {details.location}</p>
        <h1 id="hero-title" className="hero__title">
          Find the door.
          <br />
          <em>Mind the music.</em>
        </h1>
        <p className="hero__lede">{brand.story}</p>
        <ul className="hero__facts" aria-label="At a glance">
          <li>Live jazz five nights</li>
          <li>Forty seats</li>
          <li>{details.hours}</li>
        </ul>
        <div className="hero__actions">
          <a
            href="#guest-list"
            className="button"
            onClick={() => track('cta_click', { location: 'hero' })}
          >
            Join the guest list
          </a>
          <a href="#listen" className="button button--ghost" onClick={hearTheRoom}>
            ▶&nbsp; Hear the room
          </a>
        </div>
      </div>
    </section>
  )
}
