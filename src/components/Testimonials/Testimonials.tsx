// Testimonials component - Customer reviews with GSAP blur fade animation
// Gold quotation marks and elegant cards

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ShimmerText from '../shared/ShimmerText'
import copy from '../../content/copy-he.json'

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
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

      // Cards fade in with blur effect
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card')
      if (cards) {
        gsap.fromTo(
          cards,
          {
            y: 60,
            opacity: 0,
            filter: 'blur(10px)',
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.15,
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
      id="testimonials"
      className="py-20 md:py-32 px-4 md:px-8 bg-[#FFFDF9] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#D4AF6A]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#E8B4A0]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-16 md:mb-20" style={{ opacity: 0 }}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heebo font-black text-[#2C1810] mb-4">
            <ShimmerText>{copy.testimonials.title}</ShimmerText>
          </h2>
        </div>

        {/* Testimonials grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {copy.testimonials.items.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card relative bg-white rounded-2xl p-8 shadow-lg shadow-black/5 hover:shadow-xl transition-shadow duration-300 border border-[#D4AF6A]/10"
              style={{ opacity: 0 }}
            >
              {/* Large decorative quote mark */}
              <div className="absolute top-6 right-6 text-6xl font-playfair text-[#D4AF6A]/20 select-none leading-none">
                "
              </div>

              {/* Quote */}
              <blockquote className="relative z-10">
                <p className="text-lg text-[#2C1810]/80 font-heebo leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              {/* Author info */}
              <div className="border-t border-[#D4AF6A]/20 pt-6 mt-auto">
                <p className="font-heebo font-bold text-[#2C1810]">
                  {testimonial.name}
                </p>
                <p className="text-sm text-[#D4AF6A] font-heebo mt-1">
                  {testimonial.event}
                </p>
              </div>

              {/* Star rating */}
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#D4AF6A]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
