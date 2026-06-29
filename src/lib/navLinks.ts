// Single source of truth for the site's in-page navigation model, so the
// header and footer can't drift to different anchors/labels.

export interface NavLink {
  href: string
  label: string
}

// Header links.
export const NAV_LINKS: NavLink[] = [
  { href: '#services', label: 'השירותים' },
  { href: '#about', label: 'הסיפור שלנו' },
  { href: '#gallery', label: 'גלריה' },
  { href: '#contact', label: 'צור קשר' },
]

// Footer adds Home + Testimonials and omits Gallery.
export const FOOTER_LINKS: NavLink[] = [
  { href: '#hero', label: 'ראשי' },
  { href: '#services', label: 'השירותים' },
  { href: '#about', label: 'הסיפור שלנו' },
  { href: '#testimonials', label: 'המלצות' },
  { href: '#contact', label: 'צור קשר' },
]
