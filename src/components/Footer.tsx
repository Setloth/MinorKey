import { brand, details } from '../brand/brand'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <Logo size="lg" />
        <p className="footer__tagline">{brand.tagline}</p>
        <dl className="footer__details">
          <div>
            <dt>Where</dt>
            <dd>{details.location}</dd>
          </div>
          <div>
            <dt>When</dt>
            <dd>{details.hours}</dd>
          </div>
          <div>
            <dt>Follow</dt>
            <dd>{details.instagram}</dd>
          </div>
        </dl>
        <p className="footer__fine">
          A concept brand by Seth Weintraub · <a href="#brand">View the brand sheet</a>
        </p>
      </div>
    </footer>
  )
}
