// Contact - CTA section with HUGE phone, WhatsApp button, urgency message
// Phone: 0504127772, Email: e0504127772@gmail.com

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Content stagger animation
      const contentElements = contentRef.current?.querySelectorAll('.animate-contact')
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 md:py-36 px-6 md:px-10 bg-gradient-to-b from-[#FAF6F0] to-[#F5EDD6] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C9A96E]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#E8A598]/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div ref={contentRef} className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <h2
            className="animate-contact font-frank-ruhl text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A0A00] mb-6"
            style={{ opacity: 0 }}
          >
            מוכנים ליצור משהו מיוחד?
          </h2>

          {/* Subtitle */}
          <p
            className="animate-contact font-heebo text-xl md:text-2xl text-[#1A0A00]/70 mb-12"
            style={{ opacity: 0 }}
          >
            ספרו לנו על האירוע שלכם. שיחה קצרה זה כל מה שצריך כדי להתחיל.
          </p>

          {/* HUGE Phone number */}
          <div
            className="animate-contact mb-10"
            style={{ opacity: 0 }}
          >
            <a
              href="tel:0504127772"
              className="inline-flex items-center gap-4 group"
            >
              <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#C9A96E] flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <span className="font-frank-ruhl text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A0A00] group-hover:text-[#C9A96E] transition-colors duration-300 direction-ltr">
                050-412-7772
              </span>
            </a>
          </div>

          {/* WhatsApp Button */}
          <a
            href="https://wa.me/972504127772"
            target="_blank"
            rel="noopener noreferrer"
            className="animate-contact inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-heebo font-bold text-xl py-4 px-10 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/30 hover:-translate-y-1 mb-10"
            style={{ opacity: 0 }}
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            שלחו הודעה בוואטסאפ
          </a>

          {/* Email */}
          <div
            className="animate-contact mb-10"
            style={{ opacity: 0 }}
          >
            <a
              href="mailto:e0504127772@gmail.com"
              className="inline-flex items-center gap-3 font-heebo text-lg text-[#1A0A00]/70 hover:text-[#C9A96E] transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              e0504127772@gmail.com
            </a>
          </div>

          {/* Urgency message */}
          <div
            className="animate-contact p-8 bg-white/60 rounded-3xl border border-[#C9A96E]/20"
            style={{ opacity: 0 }}
          >
            <p className="font-heebo text-xl text-[#1A0A00]/80 mb-2">
              <span className="text-[#C9A96E] font-bold">תאריכים מוגבלים</span>
            </p>
            <p className="font-heebo text-lg text-[#1A0A00]/60">
              האירוע מתקרב? אל תחכו לרגע האחרון - התאריכים הטובים נתפסים מהר.
            </p>
          </div>

          {/* Availability */}
          <p
            className="animate-contact mt-8 text-[#1A0A00]/50 font-heebo"
            style={{ opacity: 0 }}
          >
            זמינים א'-ה', 9:00-20:00
          </p>
        </div>
      </div>
    </section>
  )
}
