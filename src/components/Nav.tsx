import { track } from '../lib/analytics'
import { Logo } from './Logo'

export function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="nav__home">
        <Logo />
      </a>
      <nav aria-label="Main">
        <ul className="nav__links">
          <li><a href="#room">The Room</a></li>
          <li><a href="#tonight">Tonight</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#listen">Listen</a></li>
        </ul>
      </nav>
      <a
        href="#guest-list"
        className="button button--small"
        onClick={() => track('cta_click', { location: 'nav' })}
      >
        Get the password
      </a>
    </header>
  )
}
