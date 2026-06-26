// Navbar - Luxury boutique sticky navigation
// RTL layout, prominent logo, clean Hebrew links

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { href: '#services', label: 'השירותים' },
  { href: '#about', label: 'הסיפור שלנו' },
  { href: '#testimonials', label: 'גלריה' },
  { href: '#contact', label: 'צור קשר' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP entrance animation
  useEffect(() => {
    if (!navRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3,
        }
      )
    }, navRef)

    return () => ctx.revert()
  }, [])

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return

    if (isMobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        }
      )
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll('li'),
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.1,
        }
      )
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      })
    }
  }, [isMobileMenuOpen])

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#F5EDD6]/95 backdrop-blur-md shadow-lg shadow-[#1A0A00]/5'
          : 'bg-transparent'
      }`}
      style={{ opacity: 0 }}
    >
      <div className="container mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-4 group"
            onClick={handleLinkClick}
          >
            <img
              src="/assets/logo.png"
              alt="BALLOONICE"
              className="h-14 md:h-16 w-auto transition-transform duration-500 group-hover:scale-105"
            />
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-10 font-heebo">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[#1A0A00] text-lg font-medium hover:text-[#C9A96E] transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-[#C9A96E] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
            <li>
              <a
                href="tel:0504127772"
                className="bg-[#C9A96E] hover:bg-[#B89A5F] text-[#1A0A00] font-bold py-3 px-8 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#C9A96E]/30 hover:-translate-y-0.5"
              >
                התקשרו עכשיו
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="תפריט"
          >
            <span
              className={`w-7 h-0.5 bg-[#1A0A00] transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-7 h-0.5 bg-[#1A0A00] transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-7 h-0.5 bg-[#1A0A00] transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className="md:hidden overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <ul className="py-6 space-y-5 font-heebo border-t border-[#C9A96E]/20">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block py-2 text-xl text-[#1A0A00] hover:text-[#C9A96E] transition-colors duration-300"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="tel:0504127772"
                onClick={handleLinkClick}
                className="inline-block mt-4 bg-[#C9A96E] text-[#1A0A00] font-bold py-3 px-8 rounded-full"
              >
                התקשרו עכשיו
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
