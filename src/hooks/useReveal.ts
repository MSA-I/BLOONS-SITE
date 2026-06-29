import { useEffect } from 'react'

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function countUp(el: HTMLElement) {
  const target = +(el.dataset.count || '0')
  const suf = el.dataset.suffix || ''
  const dur = 1300
  const t0 = performance.now()
  const tick = (t: number) => {
    const p = Math.min(1, (t - t0) / dur)
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suf
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

/**
 * One IntersectionObserver for every [data-reveal] on the page (adds `.is-in`)
 * plus count-up for [data-count]. Mirrors the reference componentDidMount:
 * reduced-motion short-circuit + a 1.4s failsafe so nothing stays hidden.
 * Run once near the app root, after the sections have mounted.
 */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const countEls = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'))

    if (reduced()) {
      els.forEach((e) => e.classList.add('is-in'))
      countEls.forEach((e) => (e.textContent = (e.dataset.count || '') + (e.dataset.suffix || '')))
      return
    }

    countEls.forEach((e) => (e.textContent = '0' + (e.dataset.suffix || '')))

    let io: IntersectionObserver | null = null
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return
            const el = en.target as HTMLElement
            el.style.transitionDelay = (+(el.dataset.revealDelay || 0)) + 'ms'
            el.classList.add('is-in')
            if (el.dataset.count) countUp(el)
            io!.unobserve(el)
          })
        },
        { threshold: 0.18 },
      )
      els.forEach((e) => io!.observe(e))
    } else {
      els.forEach((e) => e.classList.add('is-in'))
      countEls.forEach(countUp)
    }

    const failsafe = window.setTimeout(() => {
      els.forEach((e) => e.classList.add('is-in'))
      countEls.forEach((e) => {
        if (e.textContent === '0' + (e.dataset.suffix || ''))
          e.textContent = (e.dataset.count || '') + (e.dataset.suffix || '')
      })
    }, 1400)

    return () => {
      io?.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [])
}
