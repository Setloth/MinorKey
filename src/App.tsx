import { useEffect, useState } from 'react'
import { Footer } from './components/Footer'
import { GuestList } from './components/GuestList'
import { Hero } from './components/Hero'
import { Menu } from './components/Menu'
import { Nav } from './components/Nav'
import { RecordPlayer } from './components/RecordPlayer'
import { Room } from './components/Room'
import { StickyCta } from './components/StickyCta'
import { Tonight } from './components/Tonight'
import { BrandSheet } from './pages/BrandSheet'
import './styles/landing.css'
import './styles/brand-sheet.css'

// Two views without a router: the landing page, and the brand sheet
// at /#brand. Every other hash is an in-page anchor.
function useIsBrandSheet() {
  const [isBrand, setIsBrand] = useState(() => window.location.hash === '#brand')
  useEffect(() => {
    const onHash = () => setIsBrand(window.location.hash === '#brand')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return isBrand
}

export default function App() {
  const isBrand = useIsBrandSheet()

  useEffect(() => {
    if (!isBrand) document.title = 'Minor Key | Jazz Lounge in Beacon Hill, Boston'
  }, [isBrand])

  if (isBrand) return <BrandSheet />

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Room />
        <Tonight />
        <RecordPlayer />
        <Menu />
        <GuestList />
      </main>
      <Footer />
      <StickyCta />
    </>
  )
}
