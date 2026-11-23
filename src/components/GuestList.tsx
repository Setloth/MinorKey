import { useState, type FormEvent } from 'react'
import { details } from '../brand/brand'
import { track } from '../lib/analytics'
import { Section } from './Section'

// The page's primary conversion. There is no backend yet: in
// production this would post to the email tool (Mailchimp, Klaviyo,
// etc.) and the password would arrive by email.
export function GuestList() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  function submit(e: FormEvent) {
    e.preventDefault()
    track('guestlist_signup')
    setJoined(true)
  }

  return (
    <Section id="guest-list" eyebrow="The Guest List" title={<>Get <em>tonight's password</em></>} className="section--guest">
      {joined ? (
        <div className="guest__done" role="status">
          <p className="eyebrow">You're on the list</p>
          <p className="guest__password">“Rubato”</p>
          <p className="section__note">
            Say it at the door. The address is on its way to {email}.
          </p>
        </div>
      ) : (
        <form className="guest__form" onSubmit={submit}>
          <p className="guest__lede">
            Join the list for this week's password, the address, and first word on new sets.
          </p>
          <div className="guest__row">
            <label htmlFor="guest-email" className="visually-hidden">
              Email address
            </label>
            <input
              id="guest-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="guest__input"
            />
            <button type="submit" className="button">
              Put me on the list
            </button>
          </div>
          <p className="section__note">{details.locationNote} No spam, just the music.</p>
        </form>
      )}
    </Section>
  )
}
