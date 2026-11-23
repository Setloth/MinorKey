import { Section } from './Section'

const pillars = [
  {
    title: 'Live, five nights',
    body: 'A house trio, rotating quartets and a Sunday jam. Two sets a night, played to a room that came to listen.',
  },
  {
    title: 'Forty seats',
    body: 'No bad seats and no shouting over the band. Small on purpose, so every table feels like the front row.',
  },
  {
    title: 'Drinks written like charts',
    body: 'Every cocktail is named for a piece of music theory and built the same way: a melody, a little tension, a clean resolve.',
  },
]

export function Room() {
  return (
    <Section id="room" eyebrow="The Room" title={<>A room built <em>for listening</em></>}>
      <div className="pillars">
        {pillars.map((p, i) => (
          <article key={p.title} className="pillar">
            <span className="pillar__num" aria-hidden="true">
              {['I', 'II', 'III'][i]}
            </span>
            <h3 className="pillar__title">{p.title}</h3>
            <p className="pillar__body">{p.body}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
