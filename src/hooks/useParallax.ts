import { useEffect } from 'react'

/**
 * Scroll-driven translateY for every [data-parallax] element, where the
 * attribute value is the travel in px. Ported from the reference initParallax.
 */
export function useParallax() {
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const para = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    if (!para.length) return

    let pending = false
    const update = () => {
      pending = false
      const vh = window.innerHeight || 800
      for (const el of para) {
        const r = el.getBoundingClientRect()
        const center = r.top + r.height / 2
        let prog = (vh * 0.5 - center) / (vh * 0.7)
        if (prog > 1) prog = 1
        if (prog < -1) prog = -1
        const sp = parseFloat(el.dataset.parallax || '0') || 0
        el.style.transform = 'translateY(' + (prog * sp).toFixed(1) + 'px)'
      }
    }
    const onScroll = () => {
      if (!pending) {
        pending = true
        requestAnimationFrame(update)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}
