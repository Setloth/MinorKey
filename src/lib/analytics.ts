// Tiny analytics helper. Every meaningful action on the page calls
// track(), so the page is ready to report the KPIs that matter
// (guest-list signups, record plays, CTA clicks) as soon as a real
// tool such as GA4 or Plausible is connected. Until then, events are
// pushed to window.dataLayer and logged in development.

type EventName =
  | 'cta_click'
  | 'record_play'
  | 'record_stop'
  | 'guestlist_signup'
  | 'section_view'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function track(event: EventName, params: Record<string, string> = {}) {
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push({ event, ...params })
  if (import.meta.env.DEV) {
    console.info('[track]', event, params)
  }
}
