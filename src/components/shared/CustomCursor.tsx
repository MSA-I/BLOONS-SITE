// CustomCursor — fixed circular cursor that follows the pointer (gsap.quickTo)
// and expands over [data-cursor] targets. Renders null + no-op on mobile or
// under reduced-motion. Hides native cursor via body.cursor-none (desktop only).

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { isMobileViewport, prefersReducedMotion } from '../../hooks/useScrollAnimation'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const disabled = isMobileViewport() || prefersReducedMotion()

  useEffect(() => {
    if (disabled) return
    const dot = dotRef.current
    if (!dot) return

    document.body.classList.add('cursor-none')

    // Center the dot on the pointer via xPercent/yPercent (separate transform
    // components from x/y, so the GSAP-animated x/y don't clobber centering).
    gsap.set(dot, { xPercent: -50, yPercent: -50 })

    const xTo = gsap.quickTo(dot, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(dot, 'y', { duration: 0.45, ease: 'power3.out' })

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const expand = () =>
      gsap.to(dot, { scale: 2.6, duration: 0.4, ease: 'power3.out' })
    const shrink = () =>
      gsap.to(dot, { scale: 1, duration: 0.4, ease: 'power3.out' })

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement
      if (t.closest('[data-cursor]')) expand()
    }
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement
      const target = t.closest('[data-cursor]')
      if (!target) return
      // Only shrink when the pointer actually leaves the [data-cursor] element,
      // not when it crosses between the element's own children.
      const related = (e as PointerEvent).relatedTarget as Node | null
      if (related && target.contains(related)) return
      shrink()
    }

    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onOut)

    return () => {
      document.body.classList.remove('cursor-none')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      gsap.killTweensOf(dot)
    }
  }, [disabled])

  if (disabled) return null

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] h-3 w-3 rounded-full bg-gold ring-1 ring-ink/20"
      style={{ willChange: 'transform' }}
    />
  )
}
