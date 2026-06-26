// LightboxModal component - Fullscreen image viewer with navigation
// GSAP animations for open/close, keyboard and touch support

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'

interface LightboxModalProps {
  images: { src: string; alt: string }[]
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

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onNext() // RTL: left arrow goes to next
          break
        case 'ArrowRight':
          onPrev() // RTL: right arrow goes to previous
          break
      }
    },
    [isOpen, onClose, onPrev, onNext]
  )

  // Add/remove keyboard listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // GSAP animations for open/close
  useEffect(() => {
    if (!overlayRef.current || !contentRef.current) return

    if (isOpen) {
      // Opening animation
      gsap.set(overlayRef.current, { display: 'flex' })
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      gsap.fromTo(
        contentRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' }
      )
    } else {
      // Closing animation
      gsap.to(contentRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      })
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          if (overlayRef.current) {
            gsap.set(overlayRef.current, { display: 'none' })
          }
        },
      })
    }
  }, [isOpen])

  // Animate image change
  useEffect(() => {
    if (!imageRef.current || !isOpen) return
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
    )
  }, [currentIndex, isOpen])

  const currentImage = images[currentIndex]

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] hidden items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="תצוגת תמונה מוגדלת"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 md:top-6 md:left-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
        aria-label="סגור"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image counter */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6 text-white/70 font-heebo text-sm md:text-base">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Main content */}
      <div
        ref={contentRef}
        className="relative w-full h-full flex items-center justify-center p-4 md:p-16"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous button (on right for RTL) */}
        <button
          onClick={onPrev}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A96E] text-white transition-all duration-300 hover:scale-110"
          aria-label="התמונה הקודמת"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Next button (on left for RTL) */}
        <button
          onClick={onNext}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 hover:bg-[#C9A96E] text-white transition-all duration-300 hover:scale-110"
          aria-label="התמונה הבאה"
        >
          <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Image */}
        <img
          ref={imageRef}
          src={currentImage?.src}
          alt={currentImage?.alt}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        />
      </div>

      {/* Caption */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-heebo text-lg md:text-xl text-center px-4">
        {currentImage?.alt}
      </div>
    </div>
  )
}
