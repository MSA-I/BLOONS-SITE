// Navbar component - Fixed navigation with GSAP scroll animation
// RTL layout with logo on right, mobile hamburger menu

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import copy from '../../content/copy-he.json'

gsap.registerPlugin(ScrollTrigger)

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

  // GSAP animation for navbar background
  useEffect(() => {
    if (!navRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.5,
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
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
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

  const navLinks = [
    { href: '#services', label: copy.nav.services },
    { href: '#about', label: copy.nav.about },
    { href: '#testimonials', label: 'המלצות' },
    { href: '#contact', label: copy.nav.contact },
  ]

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#FFFDF9]/95 backdrop-blur-md shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Right side in RTL */}
          <a
            href="#hero"
            className="flex items-center gap-3 group"
            onClick={handleLinkClick}
          >
            <img
              src="/assets/logo.png"
              alt="BALLOONICE Logo"
              className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-heebo font-bold text-xl text-[#2C1810] hidden sm:block">
              BALLOONICE
            </span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8 font-heebo">
            {navLinks.slice(0, -1).map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-[#2C1810] hover:text-[#D4AF6A] transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#D4AF6A] transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
            <li>
              <a
                href="tel:0504127772"
                className="bg-[#D4AF6A] hover:bg-[#C4A05A] text-[#2C1810] font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF6A]/30 hover:-translate-y-0.5"
              >
                {copy.nav.contact}
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-[#2C1810] transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#2C1810] transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-[#2C1810] transition-all duration-300 ${
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
          <ul className="py-4 space-y-4 font-heebo border-t border-[#D4AF6A]/20">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href === '#contact' ? 'tel:0504127772' : link.href}
                  onClick={handleLinkClick}
                  className={`block py-2 text-lg transition-colors duration-300 ${
                    link.href === '#contact'
                      ? 'text-[#D4AF6A] font-bold'
                      : 'text-[#2C1810] hover:text-[#D4AF6A]'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
