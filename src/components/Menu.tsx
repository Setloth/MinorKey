import { cocktails } from '../brand/brand'
import { Section } from './Section'

export function Menu() {
  return (
    <Section id="menu" eyebrow="The Bar" title={<>Cocktails <em>in a minor key</em></>}>
      <div className="menu">
        {cocktails.map((c) => (
          <article key={c.name} className="menu__card">
            <p className="menu__spirit">{c.spirit}</p>
            <h3 className="menu__name">{c.name}</h3>
            <p className="menu__notes">{c.notes}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
