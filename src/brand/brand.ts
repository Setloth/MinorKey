// Minor Key — brand content.
// Copy, palette roles and type choices live here so the landing page
// and the brand sheet stay in sync. Hex values come from tokens.css.

export const brand = {
  name: 'Minor Key',
  tagline: 'Find the door. Mind the music.',
  descriptor: 'A jazz lounge after dark, Beacon Hill, Boston',
  story:
    'Minor Key is a forty-seat listening room hidden below Beacon Hill. Live trios five nights a week, cocktails named for the music, and a door you only find if someone tells you where it is.',
  keySignature:
    'The mark is three flats: B♭, E♭ and A♭. That is the key signature of C minor, the key the house band opens every night in.',
}

export type Swatch = {
  name: string
  token: string
  role: string
}

export const palette: Swatch[] = [
  { name: 'Midnight', token: '--mk-midnight', role: 'Background. The room after dark.' },
  { name: 'Ink', token: '--mk-ink', role: 'Cards and raised surfaces.' },
  { name: 'Smoke', token: '--mk-smoke', role: 'Borders and dividers.' },
  { name: 'Brass', token: '--mk-brass', role: 'Primary accent: buttons, rules, the logo.' },
  { name: 'Brass Light', token: '--mk-brass-bright', role: 'Hover and highlight states.' },
  { name: 'Cream', token: '--mk-cream', role: 'Primary text.' },
  { name: 'Cream Dim', token: '--mk-cream-dim', role: 'Secondary text and captions.' },
  { name: 'Oxblood', token: '--mk-oxblood', role: 'Rare highlight: velvet, the red light. Use sparingly.' },
]

export const typefaces = [
  {
    name: 'Poiret One',
    token: '--font-deco',
    role: 'Wordmark, eyebrows and labels. Always uppercase with wide tracking.',
    sample: 'TONIGHT IN C MINOR',
  },
  {
    name: 'Playfair Display',
    token: '--font-display',
    role: 'Headlines. Italic for emphasis and the occasional flourish.',
    sample: 'A room built for listening',
  },
  {
    name: 'DM Sans',
    token: '--font-body',
    role: 'Body copy, menus, forms. Clean so the display type can be dramatic.',
    sample: 'Doors at seven. First set at eight. Last call at one.',
  },
]

export const voice = {
  is: ['Quiet confidence', 'A little mysterious', 'Warm, never stiff', 'Musical in its word choice'],
  isNot: ['Loud or salesy', 'Exclamation points', 'Inside jokes that exclude guests', 'Stuffy or exclusive'],
  examples: [
    { do: 'Find the door. Mind the music.', dont: 'BOOK YOUR TABLE NOW!!!' },
    { do: 'The trio starts at eight. Come early for the good seats.', dont: 'Limited seating, act fast!' },
  ],
}

export const sets = [
  { night: 'Wed', time: '8:00 & 10:00', act: 'The House Trio', note: 'Standards in C minor and beyond' },
  { night: 'Thu', time: '8:00 & 10:00', act: 'Hollis Grey Quartet', note: 'Hard bop, brushes and brass' },
  { night: 'Fri', time: '8:30 & 11:00', act: 'Velma Reyes Sings', note: 'Torch songs and late-night ballads' },
  { night: 'Sat', time: '8:30 & 11:00', act: 'Low Tide Sextet', note: 'Big sound, small room' },
  { night: 'Sun', time: '7:00', act: 'The Open Chart', note: 'Jam session. Bring your horn.' },
]

export const cocktails = [
  { name: 'Blue Seventh', spirit: 'Gin', notes: 'Butterfly pea, lemon, a flat note of elderflower' },
  { name: 'Rubato', spirit: 'Rye', notes: 'Stirred slow: vermouth, cacao, orange oil' },
  { name: 'Coda', spirit: 'Rum', notes: 'Espresso, demerara, a last bright finish' },
  { name: 'Grace Note', spirit: 'Zero proof', notes: 'Pear, tonic, rosemary, nothing missing' },
]

// Hero photo, from public/images/. Swap the filename to try another
// (hero-piano.jpg is the alternate). Set to '' to show the Deco sunburst alone.
// BASE_URL keeps the path working if the site is hosted in a subfolder
// (GitHub Pages serves it at /<repo-name>/).
// Use photos you have the rights to (your own, Unsplash/Pexels, or AI-generated).
export const heroImage = `${import.meta.env.BASE_URL}images/hero-sax.jpg`

export const details = {
  location: 'Beacon Hill, Boston',
  locationNote: 'Exact address sent with your password.',
  hours: 'Wed to Sun, 7 pm to 1 am',
  instagram: '@minorkeyboston',
}
