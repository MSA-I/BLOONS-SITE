// BALLOONICE - Luxury Balloon Decoration Website
// Main App component with Lenis smooth scroll and all sections

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Components
import Navbar from './components/shared/Navbar'
import Hero from './components/Hero/Hero'
import Gallery from './components/Gallery/Gallery'
import Services from './components/Services/Services'
import About from './components/About/About'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

// Styles
import './styles/globals.css'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    // Cleanup
    return () => {
      lenis.destroy()
      gsap.ticker.remove(rafCallback)
    }
  }, [])

  return (
    <div className="min-h-screen bg-bg-light font-heebo overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* Hero Section - Full viewport intro */}
        <Hero />

        {/* Gallery Section - Our work showcase */}
        <Gallery />

        {/* Services Section - What we offer */}
        <Services />

        {/* About Section - Our story */}
        <About />

        {/* Testimonials Section - Customer reviews */}
        <Testimonials />

        {/* Contact Section - CTA with phone */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CTA Button (Mobile) */}
      <a
        href="tel:0504127772"
        className="fixed bottom-6 left-6 z-50 md:hidden bg-[#C9A96E] text-[#1A0A00] p-4 rounded-full shadow-lg shadow-[#C9A96E]/30 hover:shadow-xl transition-all duration-300 animate-pulse"
        aria-label="התקשרו עכשיו"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>
    </div>
  )
}

export default App
