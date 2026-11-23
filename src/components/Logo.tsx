import { brand } from '../brand/brand'

type Props = {
  size?: 'sm' | 'lg'
}

// Wordmark plus the three-flat mark (the key signature of C minor).
export function Logo({ size = 'sm' }: Props) {
  return (
    <span className={`logo logo--${size}`} aria-label={brand.name}>
      <span className="logo__mark" aria-hidden="true">
        ♭♭♭
      </span>
      <span className="logo__word" aria-hidden="true">
        {brand.name}
      </span>
    </span>
  )
}
