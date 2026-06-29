// Footer — dark close: brand, contact, copyright.

const PHONE_DISPLAY = '050-412-7772'
const EMAIL = 'e0504127772@gmail.com'

export default function Footer() {
  return (
    <div style={{ background: '#211C1A', padding: '40px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
      <div>
        <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, letterSpacing: '.18em', color: '#E7C7A0' }}>BALLOONICE</div>
        <div style={{ fontSize: 13, color: '#9A8E7C', marginTop: 4 }}>בלונים שעושים שמח</div>
      </div>
      <div style={{ display: 'flex', gap: 26, fontSize: 14, color: '#C9BCA9' }}>
        <span className="dir-ltr">☎ {PHONE_DISPLAY}</span>
        <span className="dir-ltr">✉ {EMAIL}</span>
      </div>
      <div style={{ fontSize: 13, color: '#8A7E6E' }}>© 2026 כל הזכויות שמורות</div>
    </div>
  )
}
