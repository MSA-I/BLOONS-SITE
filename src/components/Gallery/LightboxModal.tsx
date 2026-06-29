// LightboxModal — elegant dark fullscreen image viewer.
// Keyboard + click navigation, body-scroll lock, GSAP open/close,
// RTL-aware arrows. Animates only transform / opacity.

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from '../../hooks/useScrollAnimation'
import type { GalleryImage } from './Gallery'

interface LightboxModalProps {
  images: GalleryImage[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function LightboxModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: LightboxModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') onNext() // RTL: left -> next
      else if (e.key === 'ArrowRight') onPrev() // RTL: right -> previous
    },
    [isOpen, onClose, onPrev, onNext]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Lock body scroll while open.
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Open / close animation.
  useEffect(() => {
    const overlay = overlayRef.current
    const content = contentRef.current
    if (!overlay || !content) return

    if (prefersReducedMotion()) {
      gsap.set(overlay, { display: isOpen ? 'flex' : 'none', opacity: isOpen ? 1 : 0 })
      gsap.set(content, { opacity: isOpen ? 1 : 0, scale: 1, y: 0 })
      return
    }

    if (isOpen) {
      gsap.set(overlay, { display: 'flex' })
      gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power3.out' })
      gsap.fromTo(
        content,
        { scale: 0.94, opacity: 0, y: 24 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', force3D: true }
      )
    } else {
      gsap.to(content, { scale: 0.96, opacity: 0, duration: 0.25, ease: 'power3.in' })
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
          if (overlayRef.current) gsap.set(overlayRef.current, { display: 'none' })
        },
      })
    }
  }, [isOpen])

  // Cross-fade on image change.
  useEffect(() => {
    const img = imageRef.current
    if (!img || !isOpen || prefersReducedMotion()) return
    gsap.fromTo(
      img,
      { opacity: 0, scale: 1.02 },
      { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out', force3D: true }
    )
  }, [currentIndex, isOpen])

  const currentImage = images[currentIndex]

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] hidden items-center justify-center bg-noir/95"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="תצוגת תמונה מוגדלת"
      dir="rtl"
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        data-cursor
        aria-label="סגור"
        className="absolute end-5 top-5 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-ivory/15 text-ivory/80 transition-colors duration-300 hover:border-gold hover:text-gold md:end-8 md:top-8"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter (LTR digits) */}
      <div className="dir-ltr absolute start-5 top-7 font-body text-sm tracking-[0.2em] text-[#A99F92] md:start-8">
        {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative flex h-full w-full items-center justify-center p-6 md:p-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous (right side in RTL) */}
        <button
          type="button"
          onClick={onPrev}
          data-cursor
          aria-label="התמונה הקודמת"
          className="absolute end-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/15 text-ivory/80 transition-colors duration-300 hover:border-gold hover:text-gold md:end-8 md:h-14 md:w-14"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Next (left side in RTL) */}
        <button
          type="button"
          onClick={onNext}
          data-cursor
          aria-label="התמונה הבאה"
          className="absolute start-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/15 text-ivory/80 transition-colors duration-300 hover:border-gold hover:text-gold md:start-8 md:h-14 md:w-14"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <img
          ref={imageRef}
          src={currentImage?.src}
          alt={currentImage?.alt}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Caption */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 px-4 text-center font-display text-lg text-ivory md:text-xl">
        {currentImage?.alt}
      </div>
    </div>
  )
}
