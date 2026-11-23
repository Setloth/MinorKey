import { sets } from '../brand/brand'
import { Section } from './Section'

export function Tonight() {
  return (
    <Section id="tonight" eyebrow="This Week" title={<>The <em>set list</em></>}>
      <ol className="setlist">
        {sets.map((s) => (
          <li key={s.night} className="setlist__row">
            <span className="setlist__night">{s.night}</span>
            <span className="setlist__act">
              <strong>{s.act}</strong>
              <span>{s.note}</span>
            </span>
            <span className="setlist__time">{s.time}</span>
          </li>
        ))}
      </ol>
      <p className="section__note">Doors at seven. Come early for the good seats.</p>
    </Section>
  )
}
