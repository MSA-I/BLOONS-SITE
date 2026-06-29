// Footer — NOIR editorial close.
// Three-area layout: brand (logo + tagline), "ניווט מהיר" with alternating
// directional text-reveal links, "צרו קשר" details. Oversized BALLOONICE
// watermark behind. Subtle staggered entrance + split-reveal tagline.

import { useSplitReveal, useStaggerReveal, useMagnetic } from '../../hooks/useScrollAnimation'
import { FOOTER_LINKS, type NavLink } from '../../lib/navLinks'
import { scrollToAnchor } from '../../lib/smoothScroll'
import { WhatsappIcon } from '../shared/icons'

/**
 * RevealLink — alternating-direction masked text hover reveal.
 * Even index slides up, odd index slides down; the incoming copy is foil-gold.
 */
function RevealLink({ href, label, index }: NavLink & { index: number }) {
  const up = index % 2 === 0
  return (
    <a
      href={href}
      data-cursor
      onClick={(e) => {
        e.preventDefault()
        scrollToAnchor(href)
      }}
      className="group relative inline-block overflow-hidden align-bottom font-display text-2xl md:text-[1.7rem] leading-none text-ivory/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-4 focus-visible:ring-offset-noir"
    >
      {/* Outgoing copy */}
      <span
        className={`block transition-transform duration-500 ease-spring ${
          up ? 'group-hover:-translate-y-full' : 'group-hover:translate-y-full'
        }`}
      >
        {label}
      </span>
      {/* Incoming copy */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 block text-foil transition-transform duration-500 ease-spring group-hover:translate-y-0 ${
          up ? 'translate-y-full' : '-translate-y-full'
        }`}
      >
        {label}
      </span>
    </a>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  const taglineRef = useSplitReveal<HTMLParagraphElement>({ type: 'words', stagger: 0.05 })
  const whatsappRef = useMagnetic<HTMLAnchorElement>(0.3)

  // Subtle staggered entrance for the three editorial columns.
  useStaggerReveal('[data-footer-grid]', '[data-foot-col]', 0.12)

  return (
    <footer className="relative overflow-hidden bg-noir text-ivory">
      {/* Hairline top edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-gold/40 to-transparent" />

      {/* Oversized watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[3vw] inset-x-0 select-none text-center font-display font-black uppercase leading-none tracking-tight text-ivory/[0.035] text-[19vw] whitespace-nowrap"
      >
        BALLOONICE
      </span>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 pt-24 md:pt-32 pb-12">
        <div
          data-footer-grid
          className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-10"
        >
          {/* Brand */}
          <div data-foot-col className="md:col-span-5">
            <a href="#hero" data-cursor className="inline-block">
              <img
                src="/assets/logo.png"
                alt="BALLOONICE"
                className="h-14 md:h-16 w-auto brightness-0 invert"
                loading="lazy"
              />
            </a>
            <p
              ref={taglineRef}
              className="mt-8 max-w-sm font-display text-3xl md:text-4xl leading-tight text-ivory"
            >
              כל אירוע ראוי <span className="text-foil">לקצת קסם</span>
            </p>
          </div>

          {/* Quick navigation */}
          <nav data-foot-col className="md:col-span-3" aria-label="ניווט מהיר">
            <h3 className="label text-[#A99F92] mb-7">
              <span className="label-index">01 /</span> ניווט מהיר
            </h3>
            <ul className="flex flex-col gap-4 md:gap-5">
              {FOOTER_LINKS.map((link, i) => (
                <li key={link.label}>
                  <RevealLink {...link} index={i} />
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div data-foot-col className="md:col-span-4">
            <h3 className="label text-[#A99F92] mb-7">
              <span className="label-index">02 /</span> צרו קשר
            </h3>
            <ul className="flex flex-col gap-5">
              <li>
                <a
                  href="tel:0504127772"
                  data-cursor
                  className="dir-ltr inline-block font-display text-3xl md:text-4xl leading-none text-ivory transition-colors duration-300 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
                >
                  050-412-7772
                </a>
              </li>
              <li>
                <a
                  href="mailto:e0504127772@gmail.com"
                  data-cursor
                  className="dir-ltr inline-block text-lg text-[#A99F92] transition-colors duration-300 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
                >
                  e0504127772@gmail.com
                </a>
              </li>
              <li className="pt-2">
                <a
                  ref={whatsappRef}
                  href="https://wa.me/972504127772"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  className="group inline-flex items-center gap-3 rounded-full border border-gold/40 py-3 pr-6 pl-3 text-base text-ivory transition-colors duration-300 hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
                >
                  <span>שלחו הודעה בוואטסאפ</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foil text-noir transition-transform duration-500 ease-spring group-hover:scale-110">
                    <WhatsappIcon className="h-4 w-4" />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-24 flex flex-col items-center gap-3 border-t border-ivory/10 pt-8 md:flex-row md:justify-between">
          <p className="text-sm text-[#A99F92]">
            © {year} BALLOONICE. כל הזכויות שמורות.
          </p>
          <p className="text-xs uppercase tracking-[0.22em] text-[#A99F92]/70">
            Crafted with care
          </p>
        </div>
      </div>
    </footer>
  )
}
