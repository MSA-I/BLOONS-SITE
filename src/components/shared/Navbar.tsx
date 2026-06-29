// Navbar — BALLOONICE luxury floating navigation.
// Detached glass pill, transparent over the noir hero, gains a subtle
// ivory tint + backdrop-blur once scrolled past the hero. RTL: logo sits
// on the RIGHT, links read right-to-left. Magnetic phone CTA. On mobile a
// hamburger morphs into an X and opens a full-screen ivory overlay with
// staggered slide-up links. Smooth anchor scrolling via scrollIntoView.

import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../../hooks/useScrollAnimation'
import { scrollToAnchor } from '../../lib/smoothScroll'
import { NAV_LINKS } from '../../lib/navLinks'
import MagneticButton from './MagneticButton'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const overlayRef = useRef<HTMLDivElement>(null)
  const overlayItemsRef = useRef<HTMLUListElement>(null)

  // Toggle tint/blur once past the hero fold.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the full-screen menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Animate the mobile overlay in/out (staggered slide-up links).
  useEffect(() => {
    const overlay = overlayRef.current
    const list = overlayItemsRef.current
    if (!overlay || !list) return

    const items = list.querySelectorAll<HTMLElement>('[data-overlay-item]')

    if (prefersReducedMotion()) {
      // Must toggle display too — the overlay ships with Tailwind `hidden`
      // (display:none); autoAlpha only sets opacity/visibility, so without this
      // the reduced-motion menu never appears while body scroll is locked.
      gsap.set(overlay, {
        display: menuOpen ? 'flex' : 'none',
        autoAlpha: menuOpen ? 1 : 0,
      })
      gsap.set(items, { autoAlpha: 1, y: 0 })
      return
    }

    if (menuOpen) {
      const tl = gsap.timeline()
      tl.set(overlay, { display: 'flex' })
        .to(overlay, { autoAlpha: 1, duration: 0.4, ease: 'power3.out' })
        .fromTo(
          items,
          { yPercent: 120, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.07,
            ease: 'power3.out',
            force3D: true,
          },
          '-=0.15'
        )
      return () => {
        tl.kill()
      }
    }

    const tl = gsap.timeline()
    tl.to(items, {
      yPercent: 60,
      opacity: 0,
      duration: 0.25,
      stagger: 0.03,
      ease: 'power2.in',
    }).to(
      overlay,
      {
        autoAlpha: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => gsap.set(overlay, { display: 'none' }),
      },
      '-=0.1'
    )
    return () => {
      tl.kill()
    }
  }, [menuOpen])

  // Scroll to an in-page anchor through the shared Lenis instance (falls back
  // to a native instant jump under reduced motion). Close the mobile menu first.
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith('#')) return
      e.preventDefault()
      setMenuOpen(false)
      // Give the mobile overlay time to close before scrolling.
      const delay = menuOpen ? 350 : 0
      window.setTimeout(() => scrollToAnchor(href), delay)
    },
    [menuOpen]
  )

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-6 w-[min(100%-2rem,72rem)] px-0">
        <nav
          className={[
            'pointer-events-auto flex items-center justify-between gap-4',
            'rounded-full px-5 py-3 md:px-7 md:py-3.5',
            'transition-[background-color,backdrop-filter,border-color,box-shadow] duration-500',
            'border',
            scrolled
              ? 'border-sand/60 bg-ivory/90 shadow-[0_10px_40px_-18px_rgba(28,22,18,0.4)] backdrop-blur-md'
              : 'border-transparent bg-transparent',
          ].join(' ')}
          style={{ transitionTimingFunction: 'cubic-bezier(0.32,0.72,0,1)' }}
        >
          {/* Logo — RIGHT in RTL (first DOM child) */}
          <a
            href="#hero"
            data-cursor
            onClick={(e) => handleNavClick(e, '#hero')}
            className="group flex shrink-0 items-center"
            aria-label="BALLOONICE"
          >
            <img
              src="/assets/logo.png"
              alt="BALLOONICE"
              className="h-10 w-auto transition-transform duration-500 group-hover:scale-105 md:h-12"
              style={{ transitionTimingFunction: 'cubic-bezier(0.32,0.72,0,1)' }}
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-9 font-body md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  data-cursor
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={[
                    'group relative text-[0.95rem] font-medium tracking-wide transition-colors duration-300',
                    scrolled ? 'text-ink hover:text-gold' : 'text-ivory hover:text-goldlight',
                  ].join(' ')}
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 right-0 h-px w-0 bg-gold transition-all duration-500 ease-spring group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA (magnetic pill) */}
          <MagneticButton
            href="tel:0504127772"
            label="התקשרו עכשיו"
            variant="gold"
            size="sm"
            className="hidden md:inline-flex"
          />

          {/* Mobile hamburger / X */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'סגירת תפריט' : 'פתיחת תפריט'}
            aria-expanded={menuOpen}
            className="relative flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="sr-only">{menuOpen ? 'סגירת תפריט' : 'תפריט'}</span>
            <span className="relative block h-4 w-7">
              <span
                className={[
                  'absolute left-0 block h-0.5 w-7 rounded-full transition-all duration-300 ease-spring',
                  menuOpen ? 'top-1/2 rotate-45' : 'top-0',
                  menuOpen || scrolled ? 'bg-ink' : 'bg-ivory',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute bottom-0 left-0 block h-0.5 w-7 rounded-full transition-all duration-300 ease-spring',
                  menuOpen ? '-rotate-45 bottom-auto top-1/2' : '',
                  menuOpen || scrolled ? 'bg-ink' : 'bg-ivory',
                ].join(' ')}
              />
            </span>
          </button>
        </nav>
      </div>

      {/* Full-screen mobile overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-auto fixed inset-0 z-40 hidden flex-col bg-ivory px-8 pb-12 pt-28 md:hidden"
        style={{ visibility: 'hidden' }}
      >
        <ul ref={overlayItemsRef} className="flex flex-col gap-2 font-display">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} className="overflow-hidden">
              <a
                href={link.href}
                data-cursor
                data-overlay-item
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-baseline gap-4 py-3 text-4xl font-bold text-ink transition-colors duration-300 active:text-gold"
              >
                <span className="label label-index text-gold">
                  0{i + 1} /
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="tel:0504127772"
          data-cursor
          data-overlay-item
          onClick={() => setMenuOpen(false)}
          className="mt-auto inline-flex items-center justify-center gap-3 rounded-full bg-gold py-4 font-body text-lg font-semibold text-ink active:scale-[0.98]"
        >
          <span>התקשרו עכשיו</span>
          <span className="dir-ltr text-base font-medium opacity-70">
            050-412-7772
          </span>
        </a>
      </div>
    </header>
  )
}
