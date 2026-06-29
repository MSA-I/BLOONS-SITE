// Gallery — pointer-drag horizontal scroller of balloon cards that open a
// full-screen event-detail overlay. Ported from the reference initEventNav.

import { useEffect, useRef, useState } from 'react'
import { EVENTS, EVENTS_BY_KEY } from '../../lib/events'

function EventOverlay({ eventKey, onClose }: { eventKey: string; onClose: () => void }) {
  const ev = EVENTS_BY_KEY[eventKey]
  const goContact = () => {
    onClose()
    const c = document.getElementById('contact')
    if (c) {
      const y = c.getBoundingClientRect().top + window.pageYOffset - 56
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div dir="rtl" style={{ position: 'fixed', inset: 0, zIndex: 120, background: 'linear-gradient(180deg,#FDF8F4,#FBF1EC)', overflowY: 'auto', animation: 'overlayIn .45s cubic-bezier(.16,1,.3,1)' }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 46px', background: 'rgba(253,248,244,.9)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(190,117,137,.16)' }}>
        <div className="ev-back" onClick={onClose}>→ חזרה לגלריה</div>
        <img src="/assets/logo.png" alt="BALLOONICE" style={{ height: 34, width: 'auto' }} />
      </div>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '50px 46px 22px', textAlign: 'center' }}>
        <div style={{ fontWeight: 600, fontSize: 13, letterSpacing: '.16em', color: '#B26076', marginBottom: 12 }}>{ev.kicker}</div>
        <h1 style={{ fontFamily: "'Frank Ruhl Libre',serif", fontWeight: 500, fontSize: 48, color: '#211C1A', margin: '0 0 16px', lineHeight: 1.08 }}>{ev.title}</h1>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: '#5A524C', margin: '0 auto', maxWidth: 560 }}>{ev.desc}</p>
      </div>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '18px 46px 24px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {ev.photos.map((ph, i) => (
          <div key={i} className="ev-tile" style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', aspectRatio: '4/5', background: '#F3DBD3', boxShadow: '0 16px 34px -20px rgba(150,90,100,.45)' }}>
            <div style={{ position: 'absolute', inset: 0, background: ph.grad }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(80,40,50,.16),transparent 60%)' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,.65)', fontFamily: "'Cormorant Garamond',serif", fontSize: 24 }}>✦</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', padding: '8px 46px 26px' }}>
        <div style={{ fontSize: 13, color: '#A89C8C' }}>תמונות לדוגמה · שלחו לנו את התמונות שלכם ונשבץ אותן כאן</div>
      </div>
      <div style={{ textAlign: 'center', padding: '6px 46px 70px' }}>
        <button onClick={goContact} className="btn-shimmer" style={{ padding: '15px 36px', fontSize: 16 }}>רוצים אירוע כזה? דברו איתנו</button>
      </div>
    </div>
  )
}

export default function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [eventKey, setEventKey] = useState<string | null>(null)

  // Pointer-drag the scroller; suppress the click that ends a drag. Esc closes.
  useEffect(() => {
    const sc = scrollRef.current
    let down = false
    let moved = false
    let startX = 0
    let startL = 0

    const onDown = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== 'mouse') return
      down = true
      moved = false
      startX = e.clientX
      startL = sc!.scrollLeft
      sc!.style.cursor = 'grabbing'
      e.preventDefault?.()
    }
    const onMove = (e: PointerEvent) => {
      if (!down) return
      const dx = e.clientX - startX
      if (Math.abs(dx) > 4) moved = true
      sc!.scrollLeft = startL - dx
    }
    const onUp = () => {
      if (!down) return
      down = false
      sc!.style.cursor = 'grab'
    }
    const onClick = (e: MouseEvent) => {
      if (moved) {
        moved = false
        e.preventDefault()
        return
      }
      const el = (e.target as HTMLElement)?.closest?.('[data-event-key]') as HTMLElement | null
      if (el?.dataset.eventKey) setEventKey(el.dataset.eventKey)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setEventKey(null)
    }

    sc?.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    sc?.addEventListener('click', onClick)
    window.addEventListener('keydown', onKey)
    return () => {
      sc?.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      sc?.removeEventListener('click', onClick)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div id="gallery" style={{ padding: '72px 0 84px', background: 'linear-gradient(180deg,#FBF1EC,#FBF6EE)', overflow: 'hidden' }}>
      <div dir="rtl" style={{ maxWidth: 1180, margin: '0 auto 26px', padding: '0 56px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 13, letterSpacing: '.16em', color: '#B26076', marginBottom: 12 }}>גלריה</div>
          <h2 style={{ fontFamily: "'Frank Ruhl Libre',serif", fontWeight: 500, fontSize: 46, color: '#211C1A', margin: '0 0 8px', lineHeight: 1.08 }}>רגעים שעיצבנו</h2>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: '#7A6F66', margin: 0, maxWidth: 480 }}>לחצו על בלון כדי לצפות באירוע — או גררו הצידה לראות הכול.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#B26076', fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 15, whiteSpace: 'nowrap' }}>
          גררו הצידה
          <span style={{ display: 'inline-flex', alignItems: 'center', width: 46, height: 18, border: '1px solid #D99FA9', borderRadius: 999, justifyContent: 'center' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#BE7589', animation: 'nudgeX 1.5s ease-in-out infinite' }} />
          </span>
        </div>
      </div>

      <div ref={scrollRef} dir="ltr" style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '14px 56px 26px', overflowX: 'auto', overflowY: 'hidden', cursor: 'grab', userSelect: 'none' }}>
        {EVENTS.map((ev) => (
          <div key={ev.key} data-event-key={ev.key} dir="rtl" className="gal-card" style={{ flex: '0 0 248px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}>
            <div style={{ position: 'relative', width: 234, height: 286, transformOrigin: '50% 112%', animation: ev.sway }}>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50% 50% 50% 50%/45% 45% 55% 55%', overflow: 'hidden', boxShadow: '0 26px 50px -22px rgba(150,80,100,.55),inset -10px -12px 26px rgba(120,50,70,.22),inset 10px 10px 22px rgba(255,255,255,.42)' }}>
                <div style={{ position: 'absolute', inset: 0, background: ev.grad }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(70,35,45,.2),transparent 55%)' }} />
                <div style={{ position: 'absolute', top: '12%', left: '19%', width: 40, height: 54, borderRadius: '50%', background: 'rgba(255,255,255,.45)', filter: 'blur(5px)' }} />
              </div>
              <div style={{ position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: `14px solid ${ev.highlight}` }} />
              <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: '50%', width: 1.6, height: 30, background: `linear-gradient(${ev.highlight},transparent)`, transform: 'translateX(-50%)' }} />
            </div>
            <div style={{ marginTop: 46, textAlign: 'center' }}>
              <div style={{ fontFamily: "'Frank Ruhl Libre',serif", fontWeight: 500, fontSize: 20, color: '#211C1A' }}>{ev.card}</div>
              <div style={{ fontSize: 13, color: '#9C7A33', marginTop: 3 }}>צפו באירוע ←</div>
            </div>
          </div>
        ))}
        <div dir="rtl" style={{ flex: '0 0 230px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '0 14px' }}>
          <div style={{ fontFamily: "'Frank Ruhl Libre',serif", fontSize: 24, color: '#211C1A', marginBottom: 14, lineHeight: 1.2 }}>אהבתם<br />מה שראיתם?</div>
          <a href="#contact" className="btn-shimmer btn-shimmer--sm" style={{ padding: '12px 26px', fontSize: 15 }}>דברו איתנו ←</a>
        </div>
      </div>

      {eventKey && <EventOverlay eventKey={eventKey} onClose={() => setEventKey(null)} />}
    </div>
  )
}
