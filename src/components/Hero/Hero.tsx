// Hero — BALLOONICE luxury redesign · NOIR cinematic
// Layered radial glow orbs (parallax) · clip/scale/blur logo entrance ·
// char-split headline · magnetic button-in-button CTA · count-style trust
// figures · brass scroll-cue. Sequence: logo → headline → sub → CTA → stats → cue.

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useSplitReveal, prefersReducedMotion } from '../../hooks/useScrollAnimation'
import MagneticButton from '../shared/MagneticButton'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaWrapRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const cueRef = useRef<HTMLDivElement>(null)
  const stringRef = useRef<SVGPathElement>(null)
  const balloonRef = useRef<SVGGElement>(null)

  // Headline: alternating char reveal (foundation hook).
  const headlineRef = useSplitReveal<HTMLHeadingElement>({
    type: 'chars',
    stagger: 0.025,
    start: 'top 95%',
  })

  // Orchestrated entrance (logo → sub → CTA → stats → cue).
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    if (prefersReducedMotion()) {
      // Everything is visible by default — nothing to do.
      return
    }

    const ctx = gsap.context(() => {
      // Initial hidden states (set in JS so reduced-motion users see content).
      // No blur filter — animating filter:blur re-rasterizes the logo every
      // frame; opacity + scale + clip give the same reveal GPU-cheaply.
      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 1.14,
        clipPath: 'inset(0% 0% 100% 0%)',
      })
      gsap.set([subRef.current, ctaWrapRef.current, statsRef.current], {
        opacity: 0,
        y: 38,
      })
      gsap.set(cueRef.current, { opacity: 0, y: 12 })
      if (balloonRef.current) gsap.set(balloonRef.current, { opacity: 0, scale: 0.8, transformOrigin: '50% 100%' })
      if (stringRef.current) gsap.set(stringRef.current, { drawSVG: '0%' })

      const tl = gsap.timeline({ delay: 0.35 })

      // 1 — Logo: clip up + scale settle.
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.3,
        ease: 'power4.out',
      })

      // Decorative balloon + drawn string, layered with the logo.
      if (balloonRef.current) {
        tl.to(
          balloonRef.current,
          { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
          '-=0.9'
        )
      }
      if (stringRef.current) {
        tl.to(
          stringRef.current,
          { drawSVG: '100%', duration: 1.1, ease: 'power2.out' },
          '<'
        )
      }

      // 2 — Headline handled by useSplitReveal (fires in-view at top).

      // 3 — Subhead.
      tl.to(
        subRef.current,
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        '-=0.45'
      )

      // 4 — CTA.
      tl.to(
        ctaWrapRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.55'
      )

      // 5 — Trust figures.
      tl.to(
        statsRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.55'
      )

      // 6 — Scroll cue.
      tl.to(
        cueRef.current,
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-noir text-ivory"
    >
      {/* ---- Layered depth: static radial-gradient glow ---- */}
      {/* Soft radial-gradient falloff gives the glow WITHOUT a blur() filter
          (which forces expensive per-frame rasterization) — painted once. */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(42rem 42rem at 90% -8%, rgba(201,169,110,0.20), transparent 60%),' +
            'radial-gradient(38rem 38rem at -10% 112%, rgba(217,166,160,0.16), transparent 60%),' +
            'radial-gradient(34rem 34rem at 50% 45%, rgba(232,201,139,0.10), transparent 65%)',
        }}
      />

      {/* ---- Decorative drawn-string balloon (inline SVG) ---- */}
      <svg
        className="pointer-events-none absolute left-[8%] top-[14%] hidden h-[26vh] w-auto md:block"
        viewBox="0 0 120 260"
        fill="none"
        aria-hidden="true"
      >
        <g ref={balloonRef}>
          <ellipse
            cx="60"
            cy="58"
            rx="44"
            ry="54"
            stroke="#C9A96E"
            strokeOpacity="0.5"
            strokeWidth="1.2"
          />
          <path
            d="M60 112 L54 124 L66 124 Z"
            stroke="#C9A96E"
            strokeOpacity="0.5"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </g>
        <path
          ref={stringRef}
          d="M60 124 C 70 160, 50 188, 62 218 C 70 238, 56 250, 60 258"
          stroke="#D9A6A0"
          strokeOpacity="0.45"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>

      {/* ---- Content ---- */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-28 text-center md:px-10">
        {/* Logo */}
        <img
          ref={logoRef}
          src="/assets/logo.png"
          alt="BALLOONICE"
          className="clip-reveal mb-10 h-20 w-auto select-none md:h-28"
          draggable={false}
        />

        {/* Headline — char split reveal */}
        <h1
          ref={headlineRef}
          className="font-display font-bold leading-[0.95] tracking-tight"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)' }}
        >
          האירוע שלכם, הקסם שלנו
        </h1>

        {/* Subhead */}
        <p
          ref={subRef}
          className="mx-auto mt-8 max-w-2xl font-body text-lg font-light leading-relaxed text-[#A99F92] md:text-xl"
        >
          עיצובי בלונים יוקרתיים שהופכים רגעים פשוטים לזיכרונות שנשארים. אתם
          חולמים, אנחנו מגשימים.
        </p>

        {/* Primary CTA — magnetic, button-in-button arrow */}
        <div ref={ctaWrapRef} className="mt-12">
          <MagneticButton href="#contact" label="בואו נתכנן יחד" variant="foil" />
        </div>

        {/* Trust figures */}
        <div
          ref={statsRef}
          className="mt-16 flex items-center justify-center gap-10 md:gap-16"
        >
          <div className="flex flex-col items-center">
            <span dir="ltr" className="dir-ltr font-display text-4xl font-bold text-foil md:text-5xl">
              500+
            </span>
            <span className="mt-1 font-body text-sm text-[#A99F92]">אירועים</span>
          </div>
          <span className="h-12 w-px bg-gold/30" aria-hidden="true" />
          <div className="flex flex-col items-center">
            <span dir="ltr" className="dir-ltr font-display text-4xl font-bold text-foil md:text-5xl">
              5+
            </span>
            <span className="mt-1 font-body text-sm text-[#A99F92]">
              שנות ניסיון
            </span>
          </div>
        </div>
      </div>

      {/* ---- Brass scroll cue ---- */}
      <div
        ref={cueRef}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <span className="flex h-11 w-7 items-start justify-center rounded-full border border-gold/40 p-1.5">
          <span className="h-2 w-2 animate-cue-drop rounded-full bg-gold" />
        </span>
      </div>

      {/* Local keyframes for the falling dot (kept transform-only). */}
      <style>{`
        @keyframes cue-drop {
          0% { transform: translateY(0); opacity: 0; }
          25% { opacity: 1; }
          70% { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        .animate-cue-drop {
          animation: cue-drop 1.9s cubic-bezier(0.32, 0.72, 0, 1) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-cue-drop { animation: none; opacity: 1; }
        }
      `}</style>
    </section>
  )
}
