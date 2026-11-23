import { useEffect, useState } from 'react'
import { brand, palette, typefaces, voice } from '../brand/brand'
import { Logo } from '../components/Logo'

// A shareable brand reference at /#brand. Hex values are read from
// tokens.css at runtime, so this sheet can never drift from the site.
function useTokenValues(tokens: string[]) {
  const [values] = useState<Record<string, string>>(() => {
    const styles = getComputedStyle(document.documentElement)
    return Object.fromEntries(tokens.map((t) => [t, styles.getPropertyValue(t).trim().toUpperCase()]))
  })
  return values
}

const paletteTokens = palette.map((p) => p.token)

export function BrandSheet() {
  const hex = useTokenValues(paletteTokens)

  useEffect(() => {
    document.title = `${brand.name} | Brand Sheet`
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="brand">
      <header className="brand__header">
        <a href="#" className="brand__back">← Back to the site</a>
        <p className="eyebrow">Brand Sheet · v1</p>
        <Logo size="lg" />
        <p className="brand__tagline">{brand.tagline}</p>
        <p className="brand__intro">{brand.story}</p>
      </header>

      <section className="brand__section" aria-labelledby="mark">
        <h2 id="mark" className="brand__h2">The mark</h2>
        <div className="brand__mark-grid">
          <div className="brand__mark-tile brand__mark-tile--dark"><Logo size="lg" /></div>
          <div className="brand__mark-tile brand__mark-tile--brass"><Logo size="lg" /></div>
          <div className="brand__mark-tile brand__mark-tile--symbol" aria-hidden="true">♭♭♭</div>
        </div>
        <p className="brand__body">{brand.keySignature}</p>
      </section>

      <section className="brand__section" aria-labelledby="color">
        <h2 id="color" className="brand__h2">Color</h2>
        <p className="brand__body">
          Midnight and cream carry the page. Brass is the lamplight: buttons, rules and the mark. Oxblood is the red
          light over the door, used once or twice a page at most.
        </p>
        <ul className="swatches">
          {palette.map((s) => (
            <li key={s.token} className="swatch">
              <span className="swatch__chip" style={{ background: `var(${s.token})` }} />
              <span className="swatch__name">{s.name}</span>
              <code className="swatch__hex">{hex[s.token]}</code>
              <code className="swatch__token">{s.token}</code>
              <span className="swatch__role">{s.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="brand__section" aria-labelledby="type">
        <h2 id="type" className="brand__h2">Typography</h2>
        <div className="type-specimens">
          {typefaces.map((t) => (
            <article key={t.token} className="type-specimen">
              <p className="type-specimen__sample" style={{ fontFamily: `var(${t.token})` }}>
                {t.sample}
              </p>
              <p className="type-specimen__name">
                {t.name} <code>{t.token}</code>
              </p>
              <p className="brand__body">{t.role}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="brand__section" aria-labelledby="voice">
        <h2 id="voice" className="brand__h2">Voice</h2>
        <div className="voice">
          <div>
            <h3 className="voice__h3">We sound</h3>
            <ul className="voice__list">{voice.is.map((v) => <li key={v}>{v}</li>)}</ul>
          </div>
          <div>
            <h3 className="voice__h3">We never sound</h3>
            <ul className="voice__list voice__list--no">{voice.isNot.map((v) => <li key={v}>{v}</li>)}</ul>
          </div>
        </div>
        <div className="voice__examples">
          {voice.examples.map((ex) => (
            <div key={ex.do} className="voice__example">
              <p><span className="voice__tag">Say</span> {ex.do}</p>
              <p><span className="voice__tag voice__tag--no">Not</span> {ex.dont}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="brand__section" aria-labelledby="components">
        <h2 id="components" className="brand__h2">Components</h2>
        <div className="brand__components">
          <a href="#" className="button" onClick={(e) => e.preventDefault()}>Primary action</a>
          <a href="#" className="button button--ghost" onClick={(e) => e.preventDefault()}>Secondary action</a>
          <p className="eyebrow">Eyebrow label</p>
          <div className="deco-rule" aria-hidden="true" />
        </div>
      </section>
    </main>
  )
}
