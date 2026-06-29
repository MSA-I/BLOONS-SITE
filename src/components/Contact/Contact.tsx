// Contact — info column + request form. On submit: thank-you state + a
// confetti / floating-balloon celebration. Parallax balloons behind (driven by
// the global useParallax hook). Real details: 050-412-7772 · e0504127772@gmail.com.

import { useState, type CSSProperties } from 'react'

const PHONE_HREF = 'tel:0504127772'
const PHONE_DISPLAY = '050-412-7772'
const EMAIL = 'e0504127772@gmail.com'

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function celebrate() {
  if (reduced()) return
  const layer = document.createElement('div')
  layer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:200;overflow:hidden'
  document.body.appendChild(layer)
  const W = window.innerWidth
  const H = window.innerHeight
  const colors = ['#D99FA9', '#BE7589', '#E4C99F', '#C9A24B', '#F6DAD4', '#EAD09A', '#E8B5A6', '#FBE2E2']
  for (let i = 0; i < 80; i++) {
    const c = document.createElement('div')
    const sz = 6 + Math.random() * 9
    const round = Math.random() < 0.4
    c.style.cssText =
      'position:absolute;top:-24px;left:' + Math.random() * W + 'px;width:' + sz + 'px;height:' +
      (round ? sz : sz * 0.5) + 'px;background:' + colors[i % colors.length] + ';border-radius:' +
      (round ? '50%' : '1px') + ';opacity:.95'
    layer.appendChild(c)
    const dx = (Math.random() * 2 - 1) * 160
    c.animate(
      [
        { transform: 'translate(0,0) rotate(0deg)' },
        { transform: 'translate(' + dx + 'px,' + (H + 100) + 'px) rotate(' + (360 + Math.random() * 900) + 'deg)' },
      ],
      { duration: 2400 + Math.random() * 1800, delay: Math.random() * 500, easing: 'cubic-bezier(.2,.55,.4,1)', fill: 'forwards' },
    )
  }
  const tones = [
    ['#F8DDD7', '#DC93A0', '#B2607A'],
    ['#F7E6B6', '#D2A857', '#9C7A33'],
    ['#FCE9E0', '#E7B49E', '#C98979'],
    ['#FBE2E2', '#EBADB7', '#D38698'],
  ]
  for (let i = 0; i < 8; i++) {
    const t = tones[i % tones.length]
    const w = 34 + Math.random() * 28
    const b = document.createElement('div')
    b.style.cssText =
      'position:absolute;bottom:-140px;left:' + Math.random() * W + 'px;width:' + w + 'px;height:' +
      w * 1.22 + 'px;border-radius:50% 50% 50% 50%/46% 46% 54% 54%;background:radial-gradient(circle at 36% 28%,' +
      t[0] + ',' + t[1] + ' 60%,' + t[2] + ');box-shadow:inset -4px -6px 11px rgba(120,60,70,.18),inset 5px 5px 9px rgba(255,255,255,.4)'
    b.innerHTML =
      '<div style="position:absolute;bottom:-5px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:4px solid transparent;border-right:4px solid transparent;border-top:7px solid ' +
      t[2] + '"></div><div style="position:absolute;top:100%;left:50%;width:1.5px;height:' + w * 1.7 +
      'px;background:linear-gradient(' + t[2] + ',transparent);transform:translateX(-50%)"></div>'
    layer.appendChild(b)
    const dx = (Math.random() * 2 - 1) * 90
    b.animate(
      [
        { transform: 'translate(0,0)', opacity: 0 },
        { transform: 'translate(' + dx * 0.3 + 'px,-32vh)', opacity: 1, offset: 0.22 },
        { transform: 'translate(' + dx + 'px,-120vh)', opacity: 1 },
      ],
      { duration: 3400 + Math.random() * 1500, delay: Math.random() * 600, easing: 'ease-out', fill: 'forwards' },
    )
  }
  setTimeout(() => layer.remove(), 5400)
}

const label: CSSProperties = { display: 'block', fontSize: 13, color: '#7A6F66', marginBottom: 6 }

function ParallaxBalloon({ speed, style, tones, knot, lineH }: { speed: number; style: CSSProperties; tones: [string, string, string]; knot: number; lineH: number }) {
  return (
    <div data-parallax={String(speed)} style={{ position: 'absolute', zIndex: 1, willChange: 'transform', ...style }}>
      <div style={{ position: 'absolute', inset: 0, borderRadius: '50% 50% 50% 50%/46% 46% 54% 54%', background: `radial-gradient(circle at 36% 28%,${tones[0]},${tones[1]} 60%,${tones[2]})`, boxShadow: 'inset -4px -6px 12px rgba(130,60,80,.2),inset 4px 4px 10px rgba(255,255,255,.5),0 14px 26px -12px rgba(150,80,100,.45)', transformOrigin: '50% 120%', animation: style.animation as string }}>
        <div style={{ position: 'absolute', bottom: -knot, left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: `${knot - 1}px solid transparent`, borderRight: `${knot - 1}px solid transparent`, borderTop: `${knot + 2}px solid ${tones[2]}` }} />
        <div style={{ position: 'absolute', top: '100%', left: '50%', width: 1.2, height: lineH, background: `linear-gradient(${tones[2]},transparent)` }} />
      </div>
    </div>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    celebrate()
  }

  return (
    <div id="contact" style={{ background: 'linear-gradient(135deg,#F3DBD3,#EFCFC8)', padding: '112px 56px 80px', position: 'relative', borderRadius: '42% 42% 0 0 / 66px 66px 0 0', marginTop: -34, zIndex: 2 }}>
      <ParallaxBalloon speed={-58} tones={['#F8DDD7', '#DC93A0', '#B2607A']} knot={6} lineH={120} style={{ top: 6, right: '15%', width: 54, height: 67, animation: 'swayB 7s ease-in-out infinite' }} />
      <ParallaxBalloon speed={-92} tones={['#F7E6B6', '#D2A857', '#9C7A33']} knot={5} lineH={150} style={{ top: -6, left: '49%', width: 40, height: 50, animation: 'swayA 8s ease-in-out -1s infinite' }} />
      <ParallaxBalloon speed={-40} tones={['#FCE9E0', '#E7B49E', '#C98979']} knot={5} lineH={110} style={{ top: 18, left: '20%', width: 46, height: 57, animation: 'swayC 6.5s ease-in-out -.6s infinite' }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 48, alignItems: 'center', maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div data-reveal>
          <h2 style={{ fontFamily: "'Frank Ruhl Libre',serif", fontWeight: 500, fontSize: 42, color: '#211C1A', margin: '0 0 18px', lineHeight: 1.12 }}>נשמח לשמוע<br />על האירוע שלכם</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#6E5F5A', margin: '0 0 28px' }}>השאירו פרטים ונחזור אליכם תוך 24 שעות עם הצעה אישית.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <a href={PHONE_HREF} className="contact-link">
              <span style={{ width: 38, height: 38, borderRadius: '50%', background: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#BE7589', boxShadow: '0 6px 14px -8px rgba(150,90,100,.5)' }}>☎</span>
              <span className="dir-ltr">{PHONE_DISPLAY}</span>
            </a>
            <a href={`mailto:${EMAIL}`} className="contact-link">
              <span style={{ width: 38, height: 38, borderRadius: '50%', background: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#BE7589', boxShadow: '0 6px 14px -8px rgba(150,90,100,.5)' }}>✉</span>
              <span className="dir-ltr">{EMAIL}</span>
            </a>
          </div>
        </div>

        <div data-reveal data-reveal-delay="120" style={{ background: '#fff', borderRadius: 18, padding: 34, boxShadow: '0 24px 50px -22px rgba(150,90,100,.45)', minHeight: 300 }}>
          {submitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', height: 340 }}>
              <div style={{ fontSize: 46, marginBottom: 10 }}>🎈</div>
              <div style={{ fontFamily: "'Frank Ruhl Libre',serif", fontSize: 28, color: '#211C1A', marginBottom: 8 }}>תודה רבה!</div>
              <div style={{ fontSize: 16, color: '#7A6F66', maxWidth: 300, lineHeight: 1.6 }}>קיבלנו את הפנייה שלכם — נחזור אליכם עם הצעה אישית תוך 24 שעות.</div>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={label}>שם מלא</label>
                  <input type="text" placeholder="השם שלכם" required className="field" style={{ height: 46, padding: '0 13px' }} />
                </div>
                <div>
                  <label style={label}>טלפון</label>
                  <input type="tel" placeholder="050-0000000" required className="field" style={{ height: 46, padding: '0 13px' }} />
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={label}>סוג האירוע</label>
                <select className="field" style={{ height: 46, padding: '0 12px', color: '#6E5F5A' }} defaultValue="">
                  <option value="" disabled>בחרו אירוע</option>
                  <option>יום הולדת</option>
                  <option>ברית / בריתה</option>
                  <option>חתונה / אירוסין</option>
                  <option>בר / בת מצווה</option>
                  <option>אירוע חברה</option>
                  <option>אחר</option>
                </select>
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={label}>פרטים נוספים</label>
                <textarea rows={3} placeholder="ספרו לנו על האירוע, הצבעים והאווירה שתרצו…" className="field" style={{ padding: '11px 13px', resize: 'vertical' }} />
              </div>
              <button type="submit" className="btn-shimmer" style={{ width: '100%', padding: 15, fontSize: 16 }}>שליחת הבקשה</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
