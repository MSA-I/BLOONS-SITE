// useScrollAnimation hook - GSAP scroll-triggered animations
// Will be enhanced by developer agent

import { useEffect, useRef, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollAnimationOptions {
  trigger?: string
  start?: string
  end?: string
  scrub?: boolean | number
  markers?: boolean
  onEnter?: () => void
  onLeave?: () => void
}

export function useScrollAnimation<T extends HTMLElement>(
  options: ScrollAnimationOptions = {}
): RefObject<T | null> {
  const elementRef = useRef<T>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const {
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      markers = false,
      onEnter,
      onLeave,
    } = options

    // Default reveal animation
    gsap.fromTo(
      elementRef.current,
      {
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1] as any,
        scrollTrigger: {
          trigger: elementRef.current,
          start,
          end,
          scrub,
          markers,
          onEnter,
          onLeave,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [options])

  return elementRef
}

export function useParallax<T extends HTMLElement>(
  speed: number = 0.5
): RefObject<T | null> {
  const elementRef = useRef<T>(null)

  useEffect(() => {
    if (!elementRef.current) return

    gsap.to(elementRef.current, {
      yPercent: -30 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: elementRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [speed])

  return elementRef
}

export function useStaggerReveal(
  containerSelector: string,
  childSelector: string,
  stagger: number = 0.1
): void {
  useEffect(() => {
    const container = document.querySelector(containerSelector)
    if (!container) return

    const children = container.querySelectorAll(childSelector)

    gsap.fromTo(
      children,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger,
        ease: [0.23, 1, 0.32, 1] as any,
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [containerSelector, childSelector, stagger])
}
