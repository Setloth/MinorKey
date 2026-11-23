import { useEffect, useRef } from 'react'
import { track } from './analytics'

// Fades a section in the first time it scrolls into view and records
// a section_view event, which is how "did visitors reach this part of
// the page" gets measured.
export function useReveal<T extends HTMLElement>(sectionName: string) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-revealed')
            track('section_view', { section: sectionName })
            observer.disconnect()
          }
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [sectionName])

  return ref
}
