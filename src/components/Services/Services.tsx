// Services component - Service offerings grid with GSAP stagger animations
// RTL direction: cards animate from right to left

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ShimmerText from '../shared/ShimmerText'
import copy from '../../content/copy-he.json'

gsap.registerPlugin(ScrollTrigger)

// Service icons as SVG components
const icons = [
  // Wedding rings
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
    <circle cx="9" cy="12" r="5" />
    <circle cx="15" cy="12" r="5" />
  </svg>,
  // Birthday cake
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
    <path d="M12 3v3m-3 3h6a3 3 0 013 3v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a3 3 0 013-3z" />
    <path d="M8 9V6a1 1 0 011-1h.01" />
    <path d="M16 9V6a1 1 0 00-1-1h-.01" />
    <circle cx="12" cy="5" r="1" fill="currentColor" />
  </svg>,
  // Building/Corporate
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
    <path d="M3 21h18M9 21V8l-6 3v10M9 8l6-3v16M15 5l6 3v13M9 12h.01M9 16h.01M15 8h.01M15 12h.01M15 16h.01" />
  </svg>,
  // Heart/Family
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>,
  // Star/Custom
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>,
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Cards stagger animation - from right in RTL
      const cards = cardsRef.current?.querySelectorAll('.service-card')
      if (cards) {
        gsap.fromTo(
          cards,
          { x: 100, opacity: 0, scale: 0.95 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
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
      id="services"
      className="py-20 md:py-32 px-4 md:px-8 bg-[#FFFDF9] relative overflow-hidden"
    >
      {/* Background decorative element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#D4AF6A]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-[#E8B4A0]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20" style={{ opacity: 0 }}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heebo font-black text-[#2C1810] mb-6">
            <ShimmerText>{copy.services.title}</ShimmerText>
          </h2>
          <p className="text-lg md:text-xl text-[#2C1810]/70 font-heebo max-w-2xl mx-auto">
            {copy.services.subtitle}
          </p>
        </div>

        {/* Services grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {copy.services.items.map((service, index) => (
            <div
              key={index}
              className="service-card group bg-white rounded-2xl p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-[#D4AF6A]/10 transition-all duration-500 hover:-translate-y-2 border border-[#D4AF6A]/10"
              style={{ opacity: 0 }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#D4AF6A] to-[#E8B4A0] flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {icons[index]}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-heebo font-bold text-[#2C1810] mb-4 group-hover:text-[#D4AF6A] transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[#2C1810]/70 font-heebo leading-relaxed">
                {service.description}
              </p>

              {/* Decorative line */}
              <div className="mt-6 w-12 h-1 bg-gradient-to-r from-[#D4AF6A] to-transparent rounded-full group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
