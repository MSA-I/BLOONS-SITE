// Stats band — three count-up figures (7 / 350+ / 100%).

import type { CSSProperties } from 'react'

const cell: CSSProperties = { padding: '0 46px' }
const divider: CSSProperties = { ...cell, borderLeft: '1px solid rgba(190,117,137,.28)' }
const num: CSSProperties = { fontFamily: "'Frank Ruhl Libre',serif", fontSize: 48, color: '#9C7A33', lineHeight: 1 }
const cap: CSSProperties = { fontSize: 14, color: '#7A6F66', marginTop: 8 }

export default function Stats() {
  return (
    <div style={{ background: 'linear-gradient(135deg,#F7E7E2,#F3DBD3)', padding: '54px 56px', display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
      <div data-reveal style={divider}>
        <div data-count="7" style={num}>7</div>
        <div style={cap}>שנות ניסיון</div>
      </div>
      <div data-reveal data-reveal-delay="120" style={divider}>
        <div data-count="350" data-suffix="+" style={num}>350+</div>
        <div style={cap}>אירועים מאושרים</div>
      </div>
      <div data-reveal data-reveal-delay="240" style={cell}>
        <div data-count="100" data-suffix="%" style={num}>100%</div>
        <div style={cap}>התאמה אישית</div>
      </div>
    </div>
  )
}
