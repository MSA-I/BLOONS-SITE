// Services — numbered 01–05 editorial list with a hover slide.

interface Service {
  id: string
  title: string
  desc: string
}

const SERVICES: Service[] = [
  { id: '01', title: 'ימי הולדת', desc: 'קשתות, מספרים וקירות בלונים שהופכים כל גיל לחגיגה בלתי נשכחת.' },
  { id: '02', title: 'ברית ובריתה', desc: 'פינות מתוקות ועדינות בגווני פסטל לקבלת הרך הנולד.' },
  { id: '03', title: 'חתונות ואירוסין', desc: 'שערים, חופות וקישוטים רומנטיים שמלווים את היום המיוחד שלכם.' },
  { id: '04', title: 'בר ובת מצווה', desc: 'עיצובים מרשימים ובוגרים שמתאימים בדיוק לאופי של החוגג.' },
  { id: '05', title: 'אירועי חברה', desc: 'מיתוג ובלונים מותאמים אישית לכנסים, השקות ואירועים עסקיים.' },
]

export default function Services() {
  return (
    <div id="services" style={{ padding: '84px 56px', maxWidth: 1180, margin: '0 auto' }}>
      <div data-reveal style={{ marginBottom: 42 }}>
        <div style={{ fontWeight: 600, fontSize: 13, letterSpacing: '.16em', color: '#B26076', marginBottom: 12 }}>השירותים שלנו</div>
        <h2 style={{ fontFamily: "'Frank Ruhl Libre',serif", fontWeight: 500, fontSize: 44, color: '#211C1A', margin: 0 }}>לכל אירוע, השפה שלו</h2>
      </div>
      <div>
        {SERVICES.map((s, i) => (
          <div key={s.id} data-reveal data-reveal-delay={i === 0 ? undefined : String(i * 80)}>
            <div className="svc-row" style={i === SERVICES.length - 1 ? { borderBottom: '1px solid #EAD9D2' } : undefined}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 32, color: '#D99FA9', minWidth: 54 }}>{s.id}</div>
              <h3 style={{ fontFamily: "'Frank Ruhl Libre',serif", fontWeight: 500, fontSize: 25, color: '#211C1A', margin: 0, minWidth: 210 }}>{s.title}</h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: '#7A6F66', margin: 0, flex: 1 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
