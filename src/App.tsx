// BALLOONICE - Luxury Balloon Decoration Website
// Main App component with Lenis smooth scroll and all sections (zone order)

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from './hooks/useScrollAnimation'
import { setLenis } from './lib/smoothScroll'

// Shared
import Navbar from './components/shared/Navbar'
import CustomCursor from './components/shared/CustomCursor'
import Grain from './components/shared/Grain'
import Marquee from './components/shared/Marquee'

// Sections (zone order)
import Hero from './components/Hero/Hero'
import Services from './components/Services/Services'
import About from './components/About/About'
import Gallery from './components/Gallery/Gallery'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

// Styles
import './styles/globals.css'

// ScrollTrigger is registered by the hooks module (imported above).

function App() {
  // Initialize Lenis smooth scroll, synced to the GSAP ticker.
  // Skipped entirely under prefers-reduced-motion — Lenis runs its own RAF
  // loop, so native scroll-behavior:auto cannot stop it; the only way to honor
  // reduced motion is to not start it.
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })
    setLenis(lenis)

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    // Cleanup
    return () => {
      setLenis(null)
      lenis.destroy()
      gsap.ticker.remove(rafCallback)
    }
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-noir font-body text-ivory">
      {/* App-level overlays (mount once) */}
      <Grain />
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main content — zone order */}
      <main>
        {/* 1 — Hero (NOIR cinematic) */}
        <Hero />

        {/* 2 — Marquee transition band (gold-on-ink) */}
        <Marquee text="בלונים שעושים שמח" className="bg-noir py-6" />

        {/* 3 — Services (IVORY) */}
        <Services />

        {/* 4 — About (PEARL, count-up) */}
        <About />

        {/* 5 — Gallery (NOIR, horizontal pin) */}
        <Gallery />

        {/* 6 — Testimonials (IVORY) */}
        <Testimonials />

        {/* 7 — Contact (NOIR, CTA) */}
        <Contact />
      </main>

      {/* 8 — Footer (NOIR) */}
      <Footer />

      {/* Floating call button (mobile) — subtle, new tokens */}
      <a
        href="tel:0504127772"
        data-cursor
        className="fixed bottom-6 left-6 z-50 rounded-full bg-gold p-4 text-noir transition-transform duration-300 ease-spring active:scale-[0.98] md:hidden"
        aria-label="התקשרו עכשיו"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>
    </div>
  )
}

export default App
