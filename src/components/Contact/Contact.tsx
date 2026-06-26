// Contact component - CTA section with phone and email
// Large CTA button with gold shimmer wave on scroll

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ShimmerText from '../shared/ShimmerText'
import copy from '../../content/copy-he.json'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Content animation
      const contentElements = contentRef.current?.querySelectorAll('.animate-contact')
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // CTA button shimmer animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-[#FAF6F0] to-[#F5ECD7] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF6A]/30 to-transparent" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#D4AF6A]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#E8B4A0]/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div ref={contentRef} className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <h2
            className="animate-contact text-4xl md:text-5xl lg:text-6xl font-heebo font-black text-[#2C1810] mb-6"
            style={{ opacity: 0 }}
          >
            <ShimmerText>{copy.contact.title}</ShimmerText>
          </h2>

          {/* Subtitle */}
          <p
            className="animate-contact text-lg md:text-xl text-[#2C1810]/80 font-heebo mb-12"
            style={{ opacity: 0 }}
          >
            {copy.contact.subtitle}
          </p>

          {/* Phone number - Prominent */}
          <div
            className="animate-contact mb-8"
            style={{ opacity: 0 }}
          >
            <a
              href="tel:0504127772"
              className="inline-flex items-center gap-3 text-3xl md:text-4xl font-heebo font-black text-[#D4AF6A] hover:text-[#C4A05A] transition-colors direction-ltr"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              050-412-7772
            </a>
          </div>

          {/* Main CTA Button */}
          <a
            ref={ctaRef}
            href="tel:0504127772"
            className="animate-contact inline-block relative overflow-hidden bg-[#D4AF6A] text-[#2C1810] font-heebo font-bold text-xl md:text-2xl py-5 px-12 md:py-6 md:px-16 rounded-full shadow-xl shadow-[#D4AF6A]/30 hover:shadow-2xl hover:shadow-[#D4AF6A]/40 transition-all duration-300 hover:-translate-y-1 group"
            style={{ opacity: 0 }}
          >
            {/* Shimmer effect */}
            <span className="absolute inset-0 w-full h-full">
              <span className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000 ease-out" />
            </span>
            <span className="relative z-10">{copy.contact.cta}</span>
          </a>

          {/* Email - Secondary */}
          <div
            className="animate-contact mt-10"
            style={{ opacity: 0 }}
          >
            <a
              href="mailto:e0504127772@gmail.com"
              className="inline-flex items-center gap-2 text-[#2C1810]/70 hover:text-[#D4AF6A] transition-colors font-heebo"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {copy.contact.email}
            </a>
          </div>

          {/* Availability */}
          <p
            className="animate-contact mt-6 text-sm text-[#2C1810]/60 font-heebo"
            style={{ opacity: 0 }}
          >
            {copy.contact.availability}
          </p>

          {/* Urgency message */}
          <div
            className="animate-contact mt-12 p-6 bg-white/50 rounded-2xl border border-[#D4AF6A]/20"
            style={{ opacity: 0 }}
          >
            <p className="text-[#2C1810]/80 font-heebo">
              {copy.contact.urgency}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
