import type { ReactNode } from 'react'
import { useReveal } from '../lib/useReveal'

type Props = {
  id: string
  eyebrow: string
  title: ReactNode
  children: ReactNode
  className?: string
}

// Shared section frame: Deco eyebrow, headline, gold rule, and a
// fade-in the first time it scrolls into view.
export function Section({ id, eyebrow, title, children, className = '' }: Props) {
  const ref = useReveal<HTMLElement>(id)
  return (
    <section ref={ref} id={id} className={`section reveal ${className}`} aria-labelledby={`${id}-title`}>
      <div className="section__inner">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={`${id}-title`} className="section__title">
          {title}
        </h2>
        <div className="deco-rule" aria-hidden="true" />
        {children}
      </div>
    </section>
  )
}
