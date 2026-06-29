// Gallery — section 5, NOIR zone.
// Signature horizontal-pinned showcase: a track of 6 image panels that
// scrolls right -> left (RTL) while the section is pinned (desktop).
// Mobile / reduced-motion: pin is disabled by the hook, panels stack & swipe.

import { useRef, useState } from 'react'
import {
  useHorizontalPin,
  prefersReducedMotion,
} from '../../hooks/useScrollAnimation'
import MagneticButton from '../shared/MagneticButton'
import LightboxModal from './LightboxModal'

export interface GalleryImage {
  src: string
  alt: string
}

const GALLERY_IMAGES: GalleryImage[] = [
  { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80', alt: 'בלונים לחתונה' },
  { src: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&q=80', alt: 'עיצוב אירוע' },
  { src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1200&q=80', alt: 'בלונים צבעוניים' },
  { src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=80', alt: 'יום הולדת' },
  { src: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&q=80', alt: 'חגיגה' },
  { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80', alt: 'אירוע מיוחד' },
]

/* ---- single image panel: reveal is wired by useHorizontalPin (containerAnimation) ---- */
interface ImagePanelProps {
  image: GalleryImage
  index: number
  onOpen: (index: number) => void
}

function ImagePanel({ image, index, onOpen }: ImagePanelProps) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <article className="group flex shrink-0 flex-col justify-center gap-6 md:h-screen md:py-[14vh]">
      <button
        type="button"
        onClick={() => onOpen(index)}
        data-cursor
        aria-label={`הגדל תמונה: ${image.alt}`}
        className="block w-full overflow-hidden rounded-[2px] outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-noir"
      >
        <div
          data-gallery-panel
          className="relative aspect-[4/5] w-full overflow-hidden bg-ink md:h-[58vh] md:w-auto"
        >
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-[1.04] object-cover transition-transform duration-[1100ms] ease-spring will-change-transform group-hover:scale-110"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </button>

      <div className="flex items-baseline justify-between gap-4">
        <span className="label text-gold">
          <span className="label-index">{num} /</span>
        </span>
        <span className="font-display text-lg text-ivory md:text-xl">{image.alt}</span>
      </div>
    </article>
  )
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  // Pin the section, slide the track right -> left on desktop, and reveal each
  // panel as it enters horizontal view (containerAnimation-linked).
  useHorizontalPin(sectionRef, trackRef, { panelSelector: '[data-gallery-panel]' })

  // When the pin is disabled (reduced-motion) the over-wide horizontal track
  // would be clipped by overflow-hidden on desktop — make it natively
  // scrollable instead so every panel stays reachable.
  const reduced = prefersReducedMotion()

  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
  }
  const closeLightbox = () => setIsLightboxOpen(false)
  const goToPrev = () =>
    setLightboxIndex((i) => (i === 0 ? GALLERY_IMAGES.length - 1 : i - 1))
  const goToNext = () =>
    setLightboxIndex((i) => (i === GALLERY_IMAGES.length - 1 ? 0 : i + 1))

  return (
    <>
      <section
        ref={sectionRef}
        id="gallery"
        dir="rtl"
        className={`relative bg-noir text-ivory ${reduced ? 'overflow-x-auto overflow-y-hidden' : 'overflow-hidden'}`}
        aria-label="גלריה"
      >
        <div
          ref={trackRef}
          className="flex flex-col gap-16 px-5 py-20 md:h-screen md:w-max md:flex-row md:flex-nowrap md:items-stretch md:gap-[7vw] md:px-[8vw] md:py-0"
        >
          {/* Intro panel — oversized heading travels horizontally during the pin */}
          <header className="flex shrink-0 flex-col justify-center md:h-screen md:w-[68vw] lg:w-[46vw]">
            <span className="label text-gold">
              <span className="label-index">05 /</span> גלריה
            </span>
            <h2 className="mt-6 font-display font-bold leading-[0.95] text-ivory [font-size:clamp(2.6rem,8vw,7rem)]">
              העבודות
              <br />
              <span className="text-foil">שלנו</span>
            </h2>
            <p className="mt-8 max-w-md font-body text-base font-light leading-relaxed text-[#A99F92] md:text-lg">
              גללו כדי לראות רגעים מהאירועים שעיצבנו. לחצו על תמונה להגדלה.
            </p>
          </header>

          {/* Image panels */}
          {GALLERY_IMAGES.map((image, index) => (
            <ImagePanel
              key={image.src}
              image={image}
              index={index}
              onOpen={openLightbox}
            />
          ))}

          {/* Closing CTA panel */}
          <div className="flex shrink-0 flex-col justify-center gap-8 md:h-screen md:w-[60vw] lg:w-[40vw]">
            <p className="font-display leading-[1.05] text-ivory [font-size:clamp(1.9rem,4.5vw,3.4rem)]">
              רוצים משהו
              <br />
              <span className="text-foil">דומה?</span>
            </p>
            <MagneticButton
              href="#contact"
              label="רוצים משהו דומה? דברו איתנו"
              variant="gold"
              className="w-fit border border-gold/40"
            />
          </div>
        </div>
      </section>

      <LightboxModal
        images={GALLERY_IMAGES}
        currentIndex={lightboxIndex}
        isOpen={isLightboxOpen}
        onClose={closeLightbox}
        onPrev={goToPrev}
        onNext={goToNext}
      />
    </>
  )
}
