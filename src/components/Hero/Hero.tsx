// Hero component - Full viewport intro section with CTA
// GSAP animations: staggered text reveal, floating balloons, parallax

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ShimmerText from '../shared/ShimmerText'
import FloatingBalloons from '../shared/FloatingBalloons'
import copy from '../../content/copy-he.json'

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
      // Timeline for hero entrance animations
      const tl = gsap.timeline({ delay: 0.8 })

      // Headline animation
      tl.fromTo(
        headlineRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
        }
      )

      // Subheadline - word by word animation
      const subWords = subheadlineRef.current?.querySelectorAll('.word')
      if (subWords) {
        tl.fromTo(
          subWords,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '-=0.5'
        )
      }

      // CTA button animation
      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.5)',
        },
        '-=0.2'
      )

      // Trust indicators
      tl.fromTo(
        trustRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.3'
      )

      // Parallax effect on scroll
      gsap.to(headlineRef.current, {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to(subheadlineRef.current, {
        y: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Split subheadline into words for animation
  const subheadlineWords = copy.hero.subheadline.split(' ')

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] to-[#FAF6F0]"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,106,0.1)_0%,transparent_70%)]" />

      {/* Floating balloons */}
      <FloatingBalloons variant="hero" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 text-center relative z-10 pt-20">
        {/* Main headline */}
        <h1
          ref={headlineRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heebo font-black text-[#2C1810] mb-6 md:mb-8 leading-tight"
          style={{ opacity: 0 }}
        >
          <ShimmerText as="span" className="block">
            {copy.hero.headline}
          </ShimmerText>
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadlineRef}
          className="text-xl sm:text-2xl md:text-3xl text-[#2C1810]/80 font-heebo max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed"
          style={{ opacity: 0 }}
        >
          {subheadlineWords.map((word, index) => (
            <span key={index} className="word inline-block mx-1">
              {word}
            </span>
          ))}
        </p>

        {/* CTA Button */}
        <a
          ref={ctaRef}
          href="tel:0504127772"
          className="inline-block bg-[#D4AF6A] hover:bg-[#C4A05A] text-[#2C1810] font-heebo font-bold text-lg md:text-xl py-4 px-10 md:py-5 md:px-14 rounded-full transition-all duration-300 shadow-xl shadow-[#D4AF6A]/30 hover:shadow-2xl hover:shadow-[#D4AF6A]/40 hover:-translate-y-1 hover:scale-105"
          style={{ opacity: 0 }}
        >
          {copy.hero.cta}
        </a>

        {/* Trust indicators */}
        <div
          ref={trustRef}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-16 md:mt-20"
          style={{ opacity: 0 }}
        >
          <div className="text-center">
            <span className="block text-3xl md:text-4xl font-heebo font-black text-[#D4AF6A]">
              {copy.trust.events_count}
            </span>
            <span className="text-sm md:text-base text-[#2C1810]/60 font-heebo">
              {copy.trust.events_label}
            </span>
          </div>
          <div className="w-px h-12 bg-[#D4AF6A]/30 hidden md:block" />
          <div className="text-center">
            <span className="block text-3xl md:text-4xl font-heebo font-black text-[#D4AF6A]">
              {copy.trust.years}
            </span>
            <span className="text-sm md:text-base text-[#2C1810]/60 font-heebo">
              {copy.trust.years_label}
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-[#D4AF6A]/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-[#D4AF6A] animate-pulse" />
        </div>
      </div>
    </section>
  )
}
