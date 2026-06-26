// About component - Company story section with GSAP scroll animations
// Split layout: image on left, text on right (visual balance in RTL)

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ShimmerText from '../shared/ShimmerText'
import copy from '../../content/copy-he.json'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Image scale animation
      gsap.fromTo(
        imageRef.current,
        { scale: 0.9, opacity: 0, x: -50 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Content fade up animation
      const contentElements = contentRef.current?.querySelectorAll('.animate-content')
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Parallax on image
      gsap.to(imageRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 md:py-32 px-4 md:px-8 bg-[#FAF6F0] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D4AF6A]/5 to-transparent pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative order-2 lg:order-1"
            style={{ opacity: 0 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10">
              <img
                src="https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800&q=80"
                alt="Celebration with balloons"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              {/* Gold overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF6A]/20 to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#D4AF6A] rounded-full opacity-20 blur-xl" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#E8B4A0] rounded-full opacity-20 blur-xl" />

            {/* Floating badge */}
            <div className="absolute -bottom-6 right-8 bg-white rounded-xl shadow-lg shadow-black/10 p-4 md:p-6">
              <div className="text-center">
                <span className="block text-3xl md:text-4xl font-heebo font-black text-[#D4AF6A]">
                  {copy.trust.events_count}
                </span>
                <span className="text-sm text-[#2C1810]/60 font-heebo">
                  {copy.trust.events_label}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="order-1 lg:order-2">
            <h2
              className="animate-content text-4xl md:text-5xl lg:text-6xl font-heebo font-black text-[#2C1810] mb-8"
              style={{ opacity: 0 }}
            >
              <ShimmerText>{copy.about.title}</ShimmerText>
            </h2>

            <div className="space-y-6">
              {copy.about.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="animate-content text-lg md:text-xl text-[#2C1810]/80 font-heebo leading-relaxed"
                  style={{ opacity: 0 }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Signature */}
            <p
              className="animate-content mt-8 text-lg font-playfair italic text-[#D4AF6A]"
              style={{ opacity: 0 }}
            >
              {copy.about.signature}
            </p>

            {/* CTA */}
            <a
              href="tel:0504127772"
              className="animate-content inline-block mt-10 bg-[#2C1810] hover:bg-[#1C1008] text-white font-heebo font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ opacity: 0 }}
            >
              דברו איתנו עכשיו
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
