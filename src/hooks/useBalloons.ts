import { useEffect, type RefObject } from 'react'

interface Balloon {
  el: HTMLElement
  rx: number
  ry: number
  w: number
  h: number
  r: number
  x: number
  y: number
  vx: number
  vy: number
  ph: number
  drag: boolean
  gx: number
  gy: number
  path: SVGPathElement | null
}

/**
 * Interactive hero balloon cluster: gentle float toward each balloon's home
 * position, cursor repulsion, pointer-drag with momentum, pairwise separation,
 * and a curved SVG string from each balloon down to a shared pivot. Ported
 * ~verbatim from the reference initBalloons/measure/onDown/onMove/onUp/tick.
 *
 * Contract: every [data-balloon] inside the stage carries inline left/top/
 * width/height (px) as its home rect; the stage holds an [data-strings] <svg>
 * and an optional [data-hint].
 */
export function useBalloons(stageRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const els = Array.from(stage.querySelectorAll<HTMLElement>('[data-balloon]'))
    if (!els.length) return
    const px = (v: string) => parseFloat(v) || 0

    const balloons: Balloon[] = els.map((el) => {
      const rx = px(el.style.left)
      const ry = px(el.style.top)
      const w = px(el.style.width)
      const h = px(el.style.height)
      return { el, rx, ry, w, h, r: w * 0.52, x: rx, y: ry, vx: 0, vy: 0, ph: Math.random() * 6.28, drag: false, gx: 0, gy: 0, path: null }
    })

    const svg = stage.querySelector('[data-strings]')
    if (svg) {
      const NS = 'http://www.w3.org/2000/svg'
      balloons.forEach((b) => {
        const p = document.createElementNS(NS, 'path')
        p.setAttribute('stroke', 'rgba(188,117,137,.5)')
        p.setAttribute('stroke-width', '1.4')
        p.setAttribute('fill', 'none')
        p.setAttribute('stroke-linecap', 'round')
        svg.appendChild(p)
        b.path = p as SVGPathElement
      })
    }

    const hint = stage.querySelector<HTMLElement>('[data-hint]')
    const mouse = { x: -9999, y: -9999, inside: false }
    let anyDrag = false
    let pivot = { x: 0, y: 0 }

    const measure = () => {
      const r = stage.getBoundingClientRect()
      pivot = { x: r.width * 0.5, y: r.height * 0.9 }
    }
    measure()

    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      mouse.x = x
      mouse.y = y
      mouse.inside = x >= -40 && y >= -40 && x <= r.width + 40 && y <= r.height + 40
    }

    const onDown = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.('[data-balloon]') as HTMLElement | null
      if (!el) return
      const b = balloons.find((bb) => bb.el === el)
      if (!b) return
      if (e.cancelable) e.preventDefault()
      const r = stage.getBoundingClientRect()
      b.drag = true
      anyDrag = true
      b.gx = e.clientX - r.left - b.x
      b.gy = e.clientY - r.top - b.y
      el.style.cursor = 'grabbing'
      if (hint) hint.style.opacity = '0'
      try {
        el.setPointerCapture?.(e.pointerId)
      } catch {
        /* noop */
      }
    }

    const onUp = () => {
      anyDrag = false
      balloons.forEach((b) => {
        if (b.drag) {
          b.drag = false
          b.el.style.cursor = 'grab'
        }
      })
    }

    let last = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const dt = Math.min(2.2, (now - last) / 16.667)
      last = now
      const t = now / 1000
      const bs = balloons
      const pv = pivot
      const m = mouse
      for (const b of bs) {
        if (b.drag) {
          const nx = m.x - b.gx
          const ny = m.y - b.gy
          b.vx = nx - b.x
          b.vy = ny - b.y
          b.x = nx
          b.y = ny
        } else {
          const tx = b.rx + Math.cos(t * 0.7 + b.ph) * 3
          const ty = b.ry + Math.sin(t * 0.9 + b.ph) * 5
          let fx = (tx - b.x) * 0.05
          let fy = (ty - b.y) * 0.05
          if (m.inside && !anyDrag) {
            const cx = b.x + b.w / 2
            const cy = b.y + b.h / 2
            const dx = cx - m.x
            const dy = cy - m.y
            const d = Math.sqrt(dx * dx + dy * dy)
            const R = 140
            if (d < R && d > 0.01) {
              const f = (1 - d / R) * 2.6
              fx += (dx / d) * f
              fy += (dy / d) * f
            }
          }
          b.vx = (b.vx + fx * dt) * 0.9
          b.vy = (b.vy + fy * dt) * 0.9
          b.x += b.vx * dt
          b.y += b.vy * dt
        }
      }
      for (let i = 0; i < bs.length; i++) {
        for (let j = i + 1; j < bs.length; j++) {
          const a = bs[i]
          const c = bs[j]
          const dx = c.x + c.w / 2 - (a.x + a.w / 2)
          const dy = c.y + c.h / 2 - (a.y + a.h / 2)
          const d = Math.sqrt(dx * dx + dy * dy)
          const min = (a.r + c.r) * 0.8
          if (d < min && d > 0.01) {
            const push = ((min - d) / d) * 0.5
            if (!a.drag) {
              a.x -= dx * push
              a.y -= dy * push
            }
            if (!c.drag) {
              c.x += dx * push
              c.y += dy * push
            }
          }
        }
      }
      for (const b of bs) {
        const knotX = b.x + b.w / 2
        const knotY = b.y + b.h
        let ang = Math.atan2(knotX - pv.x, pv.y - knotY) * 57.2958
        if (ang > 26) ang = 26
        if (ang < -26) ang = -26
        b.el.style.transform =
          'translate(' + (b.x - b.rx).toFixed(2) + 'px,' + (b.y - b.ry).toFixed(2) + 'px) rotate(' + ang.toFixed(2) + 'deg)'
        if (b.path) {
          const mx = (pv.x + knotX) / 2 + (knotX - pv.x) * 0.05
          const my = (pv.y + knotY) / 2 + 16
          b.path.setAttribute(
            'd',
            'M' + pv.x.toFixed(1) + ' ' + pv.y.toFixed(1) + ' Q' + mx.toFixed(1) + ' ' + my.toFixed(1) + ' ' + knotX.toFixed(1) + ' ' + knotY.toFixed(1),
          )
        }
      }
      raf = requestAnimationFrame(tick)
    }

    stage.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    window.addEventListener('resize', measure)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      stage.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      window.removeEventListener('resize', measure)
      if (svg) svg.innerHTML = ''
    }
  }, [stageRef])
}
