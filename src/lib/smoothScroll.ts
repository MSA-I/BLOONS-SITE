// Shared access to the app's single Lenis instance so in-page anchor jumps
// route through the same smooth-scroll engine instead of fighting it with a
// native scrollIntoView. When Lenis is absent (reduced-motion), fall back to
// an instant native jump.

import type Lenis from '@studio-freight/lenis'

let lenis: Lenis | null = null

export const setLenis = (instance: Lenis | null): void => {
  lenis = instance
}

export const scrollToAnchor = (href: string): void => {
  if (!href.startsWith('#')) return
  const el = document.querySelector<HTMLElement>(href)
  if (!el) return
  if (lenis) {
    // Offset clears the fixed floating navbar pill.
    lenis.scrollTo(el, { offset: -96 })
  } else {
    el.scrollIntoView({ behavior: 'auto', block: 'start' })
  }
}
