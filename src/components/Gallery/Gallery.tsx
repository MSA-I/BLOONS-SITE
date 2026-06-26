// Gallery component - Masonry grid with lightbox functionality
// GSAP scroll animations, RTL direction, Hebrew headings

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ShimmerText from '../shared/ShimmerText'
import LightboxModal from './LightboxModal'

gsap.registerPlugin(ScrollTrigger)

// Gallery images with Unsplash sources
const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800', alt: 'בלונים לחתונה' },
  { src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800', alt: 'עיצוב אירוע' },
  { src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800', alt: 'בלונים צבעוניים' },
  { src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800', alt: 'יום הולדת' },
  { src: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800', alt: 'חגיגה' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', alt: 'אירוע מיוחד' },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // Lightbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Open lightbox
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setIsLightboxOpen(true)
  }

  // Close lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  // Navigate to previous image
  const goToPrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1
    )
  }

  // Navigate to next image
  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1
    )
  }

  // GSAP animations
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

      // Gallery items stagger animation
      const items = gridRef.current?.querySelectorAll('.gallery-item')
      if (items) {
        gsap.fromTo(
          items,
          { y: 60, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        id="gallery"
        dir="rtl"
        className="py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-[#FAF6F0] to-[#FFFDF9] relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 -left-20 w-80 h-80 bg-[#C9A96E]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-[#E8A598]/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto relative z-10">
          {/* Section header */}
          <div ref={titleRef} className="text-center mb-16 md:mb-20" style={{ opacity: 0 }}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heebo font-black text-[#1A0A00] mb-6">
              <ShimmerText>הגלריה שלנו</ShimmerText>
            </h2>
            <p className="text-lg md:text-xl text-[#1A0A00]/70 font-heebo max-w-2xl mx-auto">
              רגעים מיוחדים מהאירועים שעיצבנו עם אהבה
            </p>
          </div>

          {/* Masonry grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            style={{
              gridAutoRows: 'minmax(200px, auto)',
            }}
          >
            {GALLERY_IMAGES.map((image, index) => (
              <div
                key={index}
                className={`gallery-item group relative overflow-hidden rounded-2xl cursor-pointer ${
                  // Vary heights for masonry effect
                  index % 5 === 0 ? 'sm:row-span-2' : ''
                } ${index % 3 === 1 ? 'lg:row-span-2' : ''}`}
                style={{ opacity: 0 }}
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    openLightbox(index)
                  }
                }}
                aria-label={`פתח תמונה: ${image.alt}`}
              >
                {/* Image */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A00]/80 via-[#1A0A00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-white font-heebo font-bold text-lg md:text-xl">
                    {image.alt}
                  </span>
                </div>

                {/* Zoom icon */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[#C9A96E] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>

                {/* Border glow on hover */}
                <div className="absolute inset-0 rounded-2xl ring-2 ring-[#C9A96E]/0 group-hover:ring-[#C9A96E]/50 transition-all duration-500" />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12 md:mt-16">
            <a
              href="tel:0504127772"
              className="inline-flex items-center gap-3 bg-[#C9A96E] hover:bg-[#B8985E] text-[#1A0A00] font-heebo font-bold text-base md:text-lg py-3 px-8 md:py-4 md:px-10 rounded-full transition-all duration-300 shadow-lg shadow-[#C9A96E]/30 hover:shadow-xl hover:shadow-[#C9A96E]/40 hover:-translate-y-1"
            >
              <span>רוצים משהו דומה? דברו איתנו</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        images={GALLERY_IMAGES}
        currentIndex={currentImageIndex}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onPrev={goToPrev}
        onNext={goToNext}
      />
    </>
  )
}
