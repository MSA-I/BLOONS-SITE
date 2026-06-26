// About - Personal story with large decorative quotation mark
// Warm narrative about the business, Hebrew text

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Large quote mark animation
      gsap.fromTo(
        quoteRef.current,
        { scale: 0.5, opacity: 0, rotate: -10 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Content stagger
      const contentElements = contentRef.current?.querySelectorAll('.animate-content')
      if (contentElements) {
        gsap.fromTo(
          contentElements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Parallax on quote mark
      gsap.to(quoteRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-36 px-6 md:px-10 bg-[#FAF6F0] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#C9A96E]/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E8A598]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Large decorative quote mark */}
          <div
            ref={quoteRef}
            className="absolute -top-8 right-0 md:right-10 select-none pointer-events-none"
            style={{ opacity: 0 }}
          >
            <span className="font-frank-ruhl text-[200px] md:text-[300px] text-[#C9A96E]/10 leading-none">
              "
            </span>
          </div>

          {/* Content */}
          <div ref={contentRef} className="relative z-10 pt-16 md:pt-24">
            <h2
              className="animate-content font-frank-ruhl text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A0A00] mb-10"
              style={{ opacity: 0 }}
            >
              למה דווקא BALLOONICE?
            </h2>

            <div className="space-y-8">
              <p
                className="animate-content font-heebo text-xl md:text-2xl text-[#1A0A00]/80 leading-relaxed"
                style={{ opacity: 0 }}
              >
                התחלנו מתשוקה פשוטה: להפוך אירועים רגילים לחוויות שאנשים ידברו עליהם חודשים אחרי.
                היום, אחרי יותר מ-500 אירועים, אנחנו יודעים בדיוק איך לקחת את החזון שלכם ולהפוך אותו
                לתפאורה שתגרום לאורחים שלכם לשלוף את הטלפון ולצלם.
              </p>

              <p
                className="animate-content font-heebo text-xl md:text-2xl text-[#1A0A00]/80 leading-relaxed"
                style={{ opacity: 0 }}
              >
                אנחנו לא מוכרים בלונים. אנחנו מוכרים רגעים. את ההפתעה בעיניים של ילד,
                את התמונות שיישארו לנצח, את התחושה שמישהו באמת דאג לכל פרט.
              </p>
            </div>

            {/* Signature */}
            <p
              className="animate-content mt-12 font-frank-ruhl text-2xl italic text-[#C9A96E]"
              style={{ opacity: 0 }}
            >
              - צוות BALLOONICE
            </p>

            {/* Stats row */}
            <div
              className="animate-content mt-16 flex flex-wrap gap-12 md:gap-20"
              style={{ opacity: 0 }}
            >
              <div className="text-center">
                <span className="block text-5xl md:text-6xl font-frank-ruhl font-bold text-[#C9A96E]">
                  500+
                </span>
                <span className="text-lg text-[#1A0A00]/60 font-heebo mt-2 block">
                  אירועים מאושרים
                </span>
              </div>
              <div className="text-center">
                <span className="block text-5xl md:text-6xl font-frank-ruhl font-bold text-[#C9A96E]">
                  5+
                </span>
                <span className="text-lg text-[#1A0A00]/60 font-heebo mt-2 block">
                  שנות ניסיון
                </span>
              </div>
              <div className="text-center">
                <span className="block text-5xl md:text-6xl font-frank-ruhl font-bold text-[#C9A96E]">
                  100%
                </span>
                <span className="text-lg text-[#1A0A00]/60 font-heebo mt-2 block">
                  שביעות רצון
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
