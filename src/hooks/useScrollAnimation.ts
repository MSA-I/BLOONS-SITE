// useScrollAnimation — BALLOONICE motion foundation
// Award-site editorial scroll animations on GSAP + ScrollTrigger + SplitText.
// All hooks: animate ONLY transform / opacity / clip-path, force3D,
// short-circuit under prefers-reduced-motion, and clean up on unmount.

import { useEffect, useRef, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

/* ============================================================
   Helpers
   ============================================================ */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isMobileViewport = (): boolean =>
  typeof window !== 'undefined' && window.innerWidth < 768

/* ============================================================
   useParallax — transform-only scrub parallax (reduced on mobile).
   ============================================================ */
export function useParallax<T extends HTMLElement>(
  speed: number = 0.5
): RefObject<T | null> {
  const elementRef = useRef<T>(null)

  useEffect(() => {
    const el = elementRef.current
    if (!el) return
    if (prefersReducedMotion()) return

    // Reduced parallax on mobile
    const factor = isMobileViewport() ? 0.4 : 1

    const tween = gsap.to(el, {
      yPercent: -30 * speed * factor,
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [speed])

  return elementRef
}

export function useStaggerReveal(
  containerSelector: string,
  childSelector: string,
  stagger: number = 0.1,
  opts: { y?: number; duration?: number; start?: string } = {}
): void {
  const { y = 40, duration = 0.6, start = 'top 80%' } = opts
  useEffect(() => {
    const container = document.querySelector(containerSelector)
    if (!container) return

    const children = container.querySelectorAll(childSelector)
    if (!children.length) return

    if (prefersReducedMotion()) {
      gsap.set(children, { opacity: 1, y: 0 })
      return
    }

    const tween = gsap.fromTo(
      children,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease: 'power3.out',
        force3D: true,
        scrollTrigger: { trigger: container, start, once: true },
      }
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [containerSelector, childSelector, stagger, y, duration, start])
}

/* ============================================================
   useSplitReveal — SplitText line/word/char reveal.
   Alternating Y per index (i%2 ? 110% : -110%), dur .65,
   stagger .03, power3.out, start "top 85%", once.
   Reduced-motion: no-op (visible). Fallback: opacity fade.
   ============================================================ */
export function useSplitReveal<T extends HTMLElement>(
  opts: {
    type?: 'lines' | 'words' | 'chars'
    stagger?: number
    start?: string
  } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const { type = 'lines', stagger = 0.03, start = 'top 85%' } = opts

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) return // content fully visible, no-op

    // Hide synchronously (before the deferred split) so above-the-fold headings
    // never paint visible and then snap to hidden once fonts resolve (FOUC).
    gsap.set(el, { autoAlpha: 0 })

    let split: SplitText | null = null
    let tween: gsap.core.Tween | null = null
    let cancelled = false

    const setup = () => {
      if (cancelled || !ref.current) return
      const node = ref.current
      const hasSplit = typeof SplitText !== 'undefined' && !!SplitText

      if (hasSplit) {
        try {
          // Split into chars/words but keep WORDS intact when char-splitting so
          // RTL (Hebrew) word order is preserved.
          split = new SplitText(node, {
            type: type === 'chars' ? 'words,chars' : type,
          })
          const targets: Element[] =
            type === 'chars'
              ? split.chars
              : type === 'words'
                ? split.words
                : split.lines

          // Parent becomes visible; the chars stay hidden via the from-tween's
          // immediateRender, so nothing flashes.
          gsap.set(node, { perspective: 600, autoAlpha: 1 })
          tween = gsap.from(targets, {
            yPercent: (i: number) => (i % 2 ? 110 : -110),
            opacity: 0,
            duration: 0.65,
            ease: 'power3.out',
            stagger,
            force3D: true,
            scrollTrigger: { trigger: node, start, once: true },
          })
        } catch {
          split?.revert()
          split = null
          tween = null
        }
      }

      // Fallback: simple opacity fade when SplitText unavailable/failed
      if (!tween) {
        tween = gsap.fromTo(
          node,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: 'power3.out',
            force3D: true,
            scrollTrigger: { trigger: node, start, once: true },
          }
        )
      }
      ScrollTrigger.refresh()
    }

    // Split AFTER fonts are ready so line/char measurement is correct.
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(setup)
    } else {
      setup()
    }

    return () => {
      cancelled = true
      tween?.scrollTrigger?.kill()
      tween?.kill()
      split?.revert()
    }
  }, [type, stagger, start])

  return ref
}

/* ============================================================
   useClipReveal — animates CSS var --clip from
   inset(100% 0% 0% 0%) -> inset(0%), plus inner
   [data-clip-inner] translateY 35% -> 0. dur 1.2 power3.out once.
   Element must set clip-path:var(--clip,inset(0)) (use .clip-reveal).
   Reduced-motion: no-op (revealed).
   ============================================================ */
export function useClipReveal<T extends HTMLElement>(
  opts: { start?: string } = {}
): RefObject<T | null> {
  const ref = useRef<T>(null)
  const { start = 'top 80%' } = opts

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      el.style.clipPath = 'inset(0% 0% 0% 0%)'
      return
    }

    const inner = el.querySelector<HTMLElement>('[data-clip-inner]')

    // Animate clip-path DIRECTLY with matching 4-value insets so GSAP can
    // interpolate it (a CSS-var inset(100% 0 0 0) -> inset(0%) mismatch can't
    // be tweened and leaves the element stuck hidden).
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start, once: true },
    })
    tl.fromTo(
      el,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power3.out' }
    )
    if (inner) {
      tl.from(
        inner,
        { yPercent: 35, duration: 1.2, ease: 'power3.out', force3D: true },
        0
      )
    }

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [start])

  return ref
}

/* ============================================================
   useCountUp — tween 0 -> target on enter, write rounded value.
   start "top 85%", once. Reduced-motion: final value immediately.
   ============================================================ */
export function useCountUp(
  target: number,
  opts: { duration?: number } = {}
): RefObject<HTMLSpanElement | null> {
  const ref = useRef<HTMLSpanElement>(null)
  const { duration = 2 } = opts

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      el.textContent = String(Math.round(target))
      return
    }

    const counter = { val: 0 }
    const tween = gsap.to(counter, {
      val: target,
      duration,
      ease: 'power3.out',
      onUpdate: () => {
        el.textContent = String(Math.round(counter.val))
      },
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [target, duration])

  return ref
}

/* ============================================================
   useMagnetic — pointer-follow translate via gsap.quickTo,
   reset on leave. Disabled on mobile / reduced-motion.
   ============================================================ */
export function useMagnetic<T extends HTMLElement>(
  strength: number = 0.35
): RefObject<T | null> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (isMobileViewport() || prefersReducedMotion()) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' })

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)
      xTo(relX * strength)
      yTo(relY * strength)
    }
    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      gsap.killTweensOf(el)
    }
  }, [strength])

  return ref
}

/* ============================================================
   useHorizontalPin — RTL horizontal scroll gallery.
   Pins sectionRef, translates trackRef to NEGATIVE x so panels
   read right -> left. scrub 1, end "+=" + track.scrollWidth.
   DISABLED (early return) on mobile / reduced-motion (stacks via CSS).
   ============================================================ */
export function useHorizontalPin(
  sectionRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  opts: { scrub?: number | boolean; start?: string; panelSelector?: string } = {}
): void {
  const { scrub = 1, start = 'top top', panelSelector } = opts

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return
    if (isMobileViewport() || prefersReducedMotion()) return

    const getDistance = () => track.scrollWidth - window.innerWidth
    if (getDistance() <= 0) return

    // Direction-aware sign: in RTL the track overflows to the LEFT (its box left
    // edge is negative at rest), so we must move it to POSITIVE x to reveal the
    // left-side panels. In LTR it overflows right → NEGATIVE x. Captured ONCE
    // from the rest position (x:0) — measuring inside the function-based value
    // would re-read a mid-translate rect on invalidateOnRefresh and flip the
    // sign, sending the gallery the wrong way.
    const sign = track.getBoundingClientRect().left < -1 ? 1 : -1

    const tween = gsap.to(track, {
      x: () => sign * getDistance(),
      ease: 'none',
      force3D: true,
      scrollTrigger: {
        trigger: section,
        start,
        end: () => '+=' + getDistance(),
        pin: true,
        scrub,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    // Panels reveal in a staggered sequence as the section enters, with cheap
    // transform/opacity only. (A containerAnimation per-panel reveal was tried,
    // but the start mapping is unreliable for an RTL track — panels revealed on
    // exit, not entry — and clip-path reveals during the scrub froze the
    // compositor. A staggered entry reveal is robust and never leaves a panel
    // blank in view.)
    const panelTweens: gsap.core.Tween[] = []
    if (panelSelector) {
      const panels = track.querySelectorAll<HTMLElement>(panelSelector)
      if (panels.length) {
        panelTweens.push(
          gsap.fromTo(
            panels,
            { autoAlpha: 0, yPercent: 10 },
            {
              autoAlpha: 1,
              yPercent: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: 'power3.out',
              force3D: true,
              scrollTrigger: { trigger: section, start: 'top 70%', once: true },
            }
          )
        )
      }
    }

    // Recompute once fonts/images settle so the pinned length is accurate.
    const refresh = () => ScrollTrigger.refresh()
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(refresh)
    }
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      panelTweens.forEach((t) => {
        t.scrollTrigger?.kill()
        t.kill()
      })
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [sectionRef, trackRef, scrub, start, panelSelector])
}
