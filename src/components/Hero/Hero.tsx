// Hero — two columns: editorial copy (staggered reveal) + an interactive,
// draggable balloon cluster (useBalloons physics). Ported from the reference.

import { useRef, type CSSProperties } from 'react'
import { useBalloons } from '../../hooks/useBalloons'

const balloonBody = (grad: string, shadow: string): CSSProperties => ({
  position: 'absolute',
  inset: 0,
  borderRadius: '50% 50% 50% 50%/45% 45% 55% 55%',
  background: grad,
  boxShadow: shadow,
})

interface BalloonDef {
  left: number
  top: number
  width: number
  height: number
  body: CSSProperties
  highlight: { width: number; height: number }
  knot: { border: number; color: string }
}

const BALLOONS: BalloonDef[] = [
  {
    left: 118, top: 14, width: 122, height: 148,
    body: balloonBody(
      'radial-gradient(circle at 35% 26%,#F8DDD7 0%,#DC93A0 46%,#B2607A 100%)',
      'inset -9px -11px 24px rgba(120,50,70,.26),inset 8px 8px 18px rgba(255,255,255,.5),0 22px 38px -16px rgba(150,80,100,.5)',
    ),
    highlight: { width: 28, height: 40 },
    knot: { border: 7, color: '#B2607A' },
  },
  {
    left: 236, top: 2, width: 98, height: 120,
    body: balloonBody(
      'radial-gradient(circle at 35% 26%,#F7E6B6 0%,#D2A857 46%,#9C7A33 100%)',
      'inset -8px -10px 20px rgba(120,80,30,.26),inset 7px 7px 16px rgba(255,255,255,.5),0 20px 34px -15px rgba(150,110,40,.5)',
    ),
    highlight: { width: 22, height: 32 },
    knot: { border: 6, color: '#9C7A33' },
  },
  {
    left: 34, top: 92, width: 88, height: 106,
    body: balloonBody(
      'radial-gradient(circle at 35% 26%,#FCE9E0 0%,#E7B49E 48%,#C98979 100%)',
      'inset -7px -9px 18px rgba(150,90,70,.24),inset 6px 6px 14px rgba(255,255,255,.55),0 18px 30px -14px rgba(160,100,80,.45)',
    ),
    highlight: { width: 20, height: 29 },
    knot: { border: 5, color: '#C98979' },
  },
  {
    left: 300, top: 128, width: 78, height: 96,
    body: balloonBody(
      'radial-gradient(circle at 35% 26%,#FBF0CF 0%,#E2C77E 50%,#C2A14B 100%)',
      'inset -6px -8px 15px rgba(140,110,40,.22),inset 6px 6px 12px rgba(255,255,255,.55),0 16px 26px -13px rgba(150,120,50,.45)',
    ),
    highlight: { width: 17, height: 25 },
    knot: { border: 5, color: '#C2A14B' },
  },
  {
    left: 168, top: 158, width: 74, height: 90,
    body: balloonBody(
      'radial-gradient(circle at 35% 26%,#FBE2E2 0%,#EBADB7 50%,#D38698 100%)',
      'inset -6px -8px 15px rgba(150,80,100,.22),inset 6px 6px 12px rgba(255,255,255,.55),0 16px 26px -13px rgba(160,90,110,.45)',
    ),
    highlight: { width: 16, height: 24 },
    knot: { border: 5, color: '#D38698' },
  },
]

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null)
  useBalloons(stageRef)

  return (
    <div id="hero" style={{ position: 'relative', overflow: 'hidden', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      {/* drifting background balloons */}
      <div
        style={{
          position: 'absolute', top: 120, right: '8%', width: 46, height: 58,
          borderRadius: '50% 50% 50% 50%/46% 46% 54% 54%',
          background: 'radial-gradient(circle at 36% 28%,#F6DAD4,#D98E9B 60%,#B2607A)',
          opacity: 0.13, filter: 'blur(1px)', animation: 'drift 26s linear infinite',
        }}
      />
      <div
        style={{
          position: 'absolute', top: 340, right: '24%', width: 34, height: 43,
          borderRadius: '50% 50% 50% 50%/46% 46% 54% 54%',
          background: 'radial-gradient(circle at 36% 28%,#F4DEA9,#C9A24B 60%,#9C7A33)',
          opacity: 0.12, filter: 'blur(1px)', animation: 'drift 32s linear -8s infinite',
        }}
      />

      <div
        style={{
          position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: '1.04fr .96fr',
          gap: 36, alignItems: 'center', padding: '40px 56px 70px', maxWidth: 1280, margin: '0 auto', width: '100%',
        }}
      >
        {/* left — copy */}
        <div>
          <div data-reveal data-reveal-delay="0" style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontWeight: 500, fontSize: 23, color: '#BE7589', marginBottom: 6 }}>
            élégance en l&apos;air
          </div>
          <div data-reveal data-reveal-delay="80" style={{ fontWeight: 600, fontSize: 13, letterSpacing: '.16em', color: '#B26076', marginBottom: 20 }}>
            עיצוב בלונים לאירועים מיוחדים
          </div>
          <h1 data-reveal data-reveal-delay="140" style={{ fontFamily: "'Frank Ruhl Libre',serif", fontWeight: 500, fontSize: 62, lineHeight: 1.04, color: '#211C1A', margin: '0 0 22px', letterSpacing: '-.015em' }}>
            נותנים לכל<br />אירוע <span style={{ color: '#BE7589' }}>צבע</span><br />של שמחה
          </h1>
          <p data-reveal data-reveal-delay="220" style={{ fontSize: 18, lineHeight: 1.75, color: '#5A524C', margin: '0 0 34px', maxWidth: 440 }}>
            סטודיו לעיצוב בלונים שמתרגם רגשות לקומפוזיציות מרהיבות. כל פרויקט נתפר אישית — מהקונספט ועד ההתקנה במקום האירוע.
          </p>
          <div data-reveal data-reveal-delay="300" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <a href="#contact" className="btn-shimmer" style={{ padding: '15px 34px', fontSize: 16 }}>
              בואו נתכנן יחד
            </a>
            <a href="#gallery" className="link-gold" style={{ fontSize: 16 }}>
              לצפייה בגלריה ←
            </a>
          </div>
        </div>

        {/* right — interactive balloon stage */}
        <div ref={stageRef} data-reveal data-reveal-delay="150" style={{ position: 'relative', height: 480 }}>
          <div
            style={{
              position: 'absolute', left: '50%', top: '48%', transform: 'translate(-50%,-50%)',
              width: 380, height: 380, borderRadius: '50%',
              background: 'radial-gradient(circle,rgba(231,183,191,.55),rgba(244,222,169,.25) 55%,transparent 72%)',
              filter: 'blur(8px)', animation: 'glowPulse 9s ease-in-out infinite', pointerEvents: 'none',
            }}
          />
          <svg data-strings style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none', zIndex: 1 }} />
          <div data-ribbon style={{ position: 'absolute', left: '50%', top: '90%', transform: 'translate(-50%,-50%)', zIndex: 2, width: 30, height: 16, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', left: 1, top: 0, width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderRight: '14px solid #C98293' }} />
            <div style={{ position: 'absolute', right: 1, top: 0, width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: '14px solid #C98293' }} />
            <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 9, height: 9, borderRadius: '50%', background: '#B2607A' }} />
          </div>
          <div data-hint style={{ position: 'absolute', top: 6, right: 4, zIndex: 5, fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 15, color: '#A8536B', background: 'rgba(255,255,255,.72)', padding: '5px 13px', borderRadius: 999, boxShadow: '0 6px 16px -8px rgba(150,90,100,.45)', pointerEvents: 'none', transition: 'opacity .6s' }}>
            ✦ גררו את הבלונים
          </div>

          {BALLOONS.map((b, i) => (
            <div
              key={i}
              data-balloon
              style={{ position: 'absolute', left: b.left, top: b.top, width: b.width, height: b.height, transformOrigin: '50% 100%', cursor: 'grab', touchAction: 'none', willChange: 'transform' }}
            >
              <div style={b.body} />
              <div style={{ position: 'absolute', top: '13%', left: '21%', width: b.highlight.width, height: b.highlight.height, borderRadius: '50%', background: 'rgba(255,255,255,.55)', filter: 'blur(3px)' }} />
              <div style={{ position: 'absolute', bottom: -9, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: `${b.knot.border}px solid transparent`, borderRight: `${b.knot.border}px solid transparent`, borderTop: `12px solid ${b.knot.color}` }} />
            </div>
          ))}

          {/* stat card */}
          <div data-reveal data-reveal-delay="600" style={{ position: 'absolute', bottom: 30, left: -14, zIndex: 3, background: '#fff', borderRadius: 16, padding: '15px 20px', boxShadow: '0 18px 36px -14px rgba(120,70,80,.4)', textAlign: 'center' }}>
            <div data-count="350" data-suffix="+" style={{ fontFamily: "'Frank Ruhl Libre',serif", fontSize: 28, color: '#BE7589', lineHeight: 1 }}>350+</div>
            <div style={{ fontSize: 12, color: '#7A6F66', marginTop: 2 }}>אירועים מעוצבים</div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div style={{ position: 'absolute', bottom: 22, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: '#B26076', fontFamily: "'Cormorant Garamond',serif", fontStyle: 'italic', fontSize: 15 }}>
        גללו למטה
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 34, border: '1px solid #D99FA9', borderRadius: 999 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#BE7589', animation: 'nudgeY 1.5s ease-in-out infinite' }} />
        </span>
      </div>
    </div>
  )
}
