import { useEffect, useState } from 'react'
import { track } from '../lib/analytics'

// Mobile-only call to action that appears once the hero has scrolled
// away, so the primary action is always one tap from anywhere.
export function StickyCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    const guest = document.getElementById('guest-list')
    if (!hero || !guest) return

    let heroGone = false
    let guestShown = false
    const update = () => setVisible(heroGone && !guestShown)

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) heroGone = !entry.isIntersecting
        if (entry.target === guest) guestShown = entry.isIntersecting
      }
      update()
    })
    observer.observe(hero)
    observer.observe(guest)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`sticky-cta ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <a
        href="#guest-list"
        className="button"
        tabIndex={visible ? 0 : -1}
        onClick={() => track('cta_click', { location: 'sticky' })}
      >
        Get tonight's password
      </a>
    </div>
  )
}
