// BALLOONICE — "élégance en l'air" warm boutique landing.
// Native scroll + rAF only (no Lenis/GSAP). Two global hooks drive the
// reveal/count-up and parallax across all sections.

import { useReveal } from './hooks/useReveal'
import { useParallax } from './hooks/useParallax'

import Navbar from './components/shared/Navbar'
import Hero from './components/Hero/Hero'
import Stats from './components/Stats/Stats'
import Services from './components/Services/Services'
import Gallery from './components/Gallery/Gallery'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

import './styles/globals.css'

export default function App() {
  useReveal()
  useParallax()

  return (
    <div dir="rtl" lang="he" style={{ overflowX: 'hidden' }}>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
