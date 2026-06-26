// Footer component - Elegant footer with logo, links, and copyright
// Minimal design with gold accents

import copy from '../../content/copy-he.json'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: '#hero', label: 'ראשי' },
    { href: '#services', label: copy.nav.services },
    { href: '#about', label: copy.nav.about },
    { href: '#testimonials', label: 'המלצות' },
    { href: 'tel:0504127772', label: copy.nav.contact },
  ]

  return (
    <footer className="bg-[#2C1810] text-[#F5ECD7] relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF6A] to-transparent" />

      {/* Decorative balloons background */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 w-24 h-32 rounded-full bg-[#D4AF6A]" style={{ borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%' }} />
        <div className="absolute bottom-10 right-20 w-20 h-28 rounded-full bg-[#E8B4A0]" style={{ borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%' }} />
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          {/* Logo and tagline */}
          <div className="text-center md:text-right">
            <a href="#hero" className="inline-block">
              <img
                src="/assets/logo.png"
                alt="BALLOONICE Logo"
                className="h-16 mx-auto md:mx-0 md:mr-0 mb-4"
              />
            </a>
            <p className="text-[#D4AF6A] font-playfair text-lg italic">
              {copy.footer.tagline}
            </p>
          </div>

          {/* Quick links */}
          <div className="text-center">
            <h3 className="font-heebo font-bold text-lg mb-4 text-[#D4AF6A]">
              ניווט מהיר
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#F5ECD7]/80 hover:text-[#D4AF6A] transition-colors font-heebo"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="text-center md:text-left">
            <h3 className="font-heebo font-bold text-lg mb-4 text-[#D4AF6A]">
              צרו קשר
            </h3>
            <div className="space-y-3">
              <a
                href="tel:0504127772"
                className="flex items-center justify-center md:justify-start gap-2 text-[#F5ECD7]/80 hover:text-[#D4AF6A] transition-colors font-heebo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="direction-ltr">050-412-7772</span>
              </a>
              <a
                href="mailto:e0504127772@gmail.com"
                className="flex items-center justify-center md:justify-start gap-2 text-[#F5ECD7]/80 hover:text-[#D4AF6A] transition-colors font-heebo"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {copy.contact.email}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[#D4AF6A]/20 text-center">
          <p className="text-[#F5ECD7]/60 text-sm font-heebo">
            &copy; {currentYear} BALLOONICE. {copy.footer.copyright.split('|')[1]}
          </p>
        </div>
      </div>
    </footer>
  )
}
