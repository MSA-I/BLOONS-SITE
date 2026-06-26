// Services - 5 elegant service cards with gold border hover
// GSAP staggered reveal, warm boutique feeling

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'חתונות',
    description: 'קשתות בלונים רומנטיות, רקעים לצילום ומתקני פרחים שישלימו את היום הגדול שלכם. כי החתונה שלכם ראויה לתפאורה שתגרום לאורחים לעצור ולהתפעל.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path d="M16 24c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="32" r="6" stroke="currentColor" strokeWidth="2" />
        <path d="M24 16v-6M24 44v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'ימי הולדת',
    description: 'מפלי בלונים, מספרים ענקיים וערכות נושא צבעוניות שיגרמו לילד שלכם להרגיש כמו כוכב. הביטו בעיניים הבורקות כשהם נכנסים לחדר.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <rect x="8" y="24" width="32" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M16 24v-4a2 2 0 012-2h12a2 2 0 012 2v4" stroke="currentColor" strokeWidth="2" />
        <path d="M24 18v-8M20 10l4-4 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="6" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'אירועים עסקיים',
    description: 'עיצובים בצבעי המותג שלכם, קירות לוגו ומתקנים מרשימים שמעלים את הארגון שלכם רמה. כי גם אירועי חברה יכולים להיות בלתי נשכחים.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path d="M6 40h36M14 40V20M34 40V20M10 20h28v-6L24 8 10 14v6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="20" y="26" width="8" height="14" rx="1" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: 'בריתות ובר/בת מצווה',
    description: 'חגיגות משפחתיות ראויות לעיצוב שמכבד את הרגע. מקשת כניסה ועד שולחן מתנות מעוצב, כל פרט במקומו.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path d="M24 4l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12l4-12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'עיצוב מותאם אישית',
    description: 'יש לכם רעיון שלא ראיתם בשום מקום? זה בדיוק מה שאנחנו אוהבים. ספרו לנו על החלום, ונהפוך אותו למציאות צבעונית.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <path d="M24 8c-8.8 0-16 7.2-16 16s7.2 16 16 16c2.2 0 4-1.8 4-4 0-1-.4-2-1-2.6-.6-.6-1-1.6-1-2.6 0-2.2 1.8-4 4-4h4.8c4.8 0 8.8-4 8.8-8.8 0-7.8-7.2-14-17.6-14z" stroke="currentColor" strokeWidth="2" />
        <circle cx="16" cy="22" r="2" fill="currentColor" />
        <circle cx="22" cy="16" r="2" fill="currentColor" />
        <circle cx="32" cy="18" r="2" fill="currentColor" />
      </svg>
    ),
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.service-card')
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
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
      id="services"
      className="py-24 md:py-32 px-6 md:px-10 bg-[#FFFDF9] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -right-20 w-96 h-96 bg-[#C9A96E]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-80 h-80 bg-[#E8A598]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-20" style={{ opacity: 0 }}>
          <h2 className="font-frank-ruhl text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A0A00] mb-6">
            מה אנחנו יודעים לעשות הכי טוב
          </h2>
          <p className="font-heebo text-xl text-[#1A0A00]/60 max-w-2xl mx-auto">
            כל אירוע מקבל תשומת לב אישית ועיצוב שמותאם בדיוק לחזון שלכם
          </p>
        </div>

        {/* Services grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group bg-[#F5EDD6]/50 rounded-2xl p-8 md:p-10 border-2 border-transparent hover:border-[#C9A96E] transition-all duration-500 hover:shadow-xl hover:shadow-[#C9A96E]/10 hover:-translate-y-2"
              style={{ opacity: 0 }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C9A96E] to-[#E8A598] flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="font-frank-ruhl text-2xl md:text-3xl font-bold text-[#1A0A00] mb-4 group-hover:text-[#C9A96E] transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-heebo text-[#1A0A00]/70 leading-relaxed text-lg">
                {service.description}
              </p>

              {/* Decorative line */}
              <div className="mt-8 w-12 h-1 bg-gradient-to-r from-[#C9A96E] to-transparent rounded-full group-hover:w-24 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
