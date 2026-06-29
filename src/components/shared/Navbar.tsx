// Sticky blurred nav — logo, four section links, shimmer "הצעת מחיר" CTA.

const LINKS: { label: string; href: string }[] = [
  { label: 'בית', href: '#hero' },
  { label: 'שירותים', href: '#services' },
  { label: 'גלריה', href: '#gallery' },
  { label: 'צור קשר', href: '#contact' },
]

export default function Navbar() {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 46px',
        background: 'rgba(253,248,244,.82)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(190,117,137,.16)',
      }}
    >
      <a href="#hero" aria-label="BALLOONICE — לראש העמוד" style={{ display: 'inline-flex' }}>
        <img src="/assets/logo.png" alt="BALLOONICE" style={{ height: 46, width: 'auto' }} />
      </a>
      <div style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 15 }}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} className="nav-link">
            {l.label}
          </a>
        ))}
        <a href="#contact" className="btn-shimmer btn-shimmer--sm" style={{ padding: '10px 24px', fontSize: 14 }}>
          הצעת מחיר
        </a>
      </div>
    </div>
  )
}
