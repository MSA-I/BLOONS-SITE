// Hero - Full viewport luxury balloon decoration intro
// Hebrew serif headline, GSAP ScrollTrigger animations, trust indicators

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!heroRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.6 })

      // Headline reveal
      tl.fromTo(
        headlineRef.current,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
        }
      )

      // Subheadline fade in
      tl.fromTo(
        subheadlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.6'
      )

      // CTA button bounce in
      tl.fromTo(
        ctaRef.current,
        { y: 40, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'back.out(1.5)',
        },
        '-=0.4'
      )

      // Trust indicators
      tl.fromTo(
        trustRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3'
      )

      // Parallax on scroll
      gsap.to(headlineRef.current, {
        y: 120,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      gsap.to(subheadlineRef.current, {
        y: 60,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#F5EDD6] to-[#FAF6F0]"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-10 w-80 h-80 bg-[#C9A96E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-[#E8A598]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#C9A96E]/5 to-transparent rounded-full" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-10 text-center relative z-10 pt-24">
        {/* Main headline with Frank Ruhl Libre serif */}
        <h1
          ref={headlineRef}
          className="font-frank-ruhl text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#1A0A00] mb-8 leading-tight"
          style={{ opacity: 0 }}
        >
          <span className="block bg-gradient-to-l from-[#C9A96E] via-[#1A0A00] to-[#C9A96E] bg-clip-text text-transparent bg-[length:200%_100%] animate-shimmer">
            האירוע שלכם, הקסם שלנו
          </span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="font-heebo text-xl sm:text-2xl md:text-3xl text-[#1A0A00]/70 max-w-3xl mx-auto mb-12 leading-relaxed"
          style={{ opacity: 0 }}
        >
          עיצובי בלונים יוקרתיים שהופכים רגעים פשוטים לזיכרונות שנשארים.
          <span className="block mt-2 text-[#C9A96E]">אתם חולמים, אנחנו מגשימים.</span>
        </p>

        {/* CTA Button */}
        <a
          ref={ctaRef}
          href="tel:0504127772"
          className="inline-block bg-[#C9A96E] hover:bg-[#B89A5F] text-[#1A0A00] font-heebo font-bold text-xl md:text-2xl py-5 px-12 md:py-6 md:px-16 rounded-full transition-all duration-300 shadow-xl shadow-[#C9A96E]/30 hover:shadow-2xl hover:shadow-[#C9A96E]/40 hover:-translate-y-1 relative overflow-hidden group"
          style={{ opacity: 0 }}
        >
          <span className="absolute inset-0 w-full h-full">
            <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000 ease-out" />
          </span>
          <span className="relative z-10">בואו נתכנן יחד</span>
        </a>

        {/* Trust indicators */}
        <div
          ref={trustRef}
          className="flex flex-wrap items-center justify-center gap-12 md:gap-20 mt-20"
          style={{ opacity: 0 }}
        >
          <div className="text-center">
            <span className="block text-4xl md:text-5xl font-frank-ruhl font-bold text-[#C9A96E]">
              500+
            </span>
            <span className="text-base md:text-lg text-[#1A0A00]/60 font-heebo mt-2 block">
              אירועים
            </span>
          </div>
          <div className="w-px h-14 bg-[#C9A96E]/30 hidden md:block" />
          <div className="text-center">
            <span className="block text-4xl md:text-5xl font-frank-ruhl font-bold text-[#C9A96E]">
              5+
            </span>
            <span className="text-base md:text-lg text-[#1A0A00]/60 font-heebo mt-2 block">
              שנות ניסיון
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-7 h-12 rounded-full border-2 border-[#C9A96E]/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-[#C9A96E] animate-pulse" />
        </div>
      </div>
    </section>
  )
}
