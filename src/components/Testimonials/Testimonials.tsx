// Testimonials - 3 customer testimonials with organic card feel
// Slight rotation, gold quotation marks, names and event types

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: 'הזמנו קשת בלונים לחתונה ולא היה לנו מושג שזה יהפוך לאטרקציה המרכזית של האירוע. כל האורחים התייצבו לתמונות מולה. פשוט הייתה שיחת הערב.',
    name: 'רונית ואיתי כהן',
    event: 'חתונה בגן אירועים',
  },
  {
    quote: 'הבת שלי רצתה יום הולדת של חדי קרן. מה שהם עשו עם הבלונים - היא פשוט קפאה במקום כשנכנסה. הרגע הזה שווה כל שקל.',
    name: 'מיכל לוי',
    event: 'יום הולדת 6',
  },
  {
    quote: 'אירוע השקה של מוצר חדש לחברה. הבלונים בצבעי הלוגו שלנו יצרו רקע מדהים לכל התמונות. הלקוחות שלנו היו המומים מהרמה.',
    name: 'דני אברהמי',
    event: 'אירוע השקה עסקי',
  },
]

const rotations = [-2, 1, -1]

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
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

      // Cards fade in with blur and rotation
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card')
      if (cards) {
        gsap.fromTo(
          cards,
          {
            y: 80,
            opacity: 0,
            filter: 'blur(10px)',
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
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
      id="testimonials"
      className="py-24 md:py-32 px-6 md:px-10 bg-[#FFFDF9] relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#C9A96E]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E8A598]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <div ref={titleRef} className="text-center mb-20" style={{ opacity: 0 }}>
          <h2 className="font-frank-ruhl text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A0A00] mb-4">
            מה אומרים עלינו
          </h2>
        </div>

        {/* Testimonials grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card relative bg-[#F5EDD6]/70 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:shadow-xl hover:shadow-[#C9A96E]/10 hover:-translate-y-2"
              style={{
                opacity: 0,
                transform: `rotate(${rotations[index]}deg)`,
              }}
            >
              {/* Large gold decorative quote mark */}
              <div className="absolute top-6 right-8 select-none pointer-events-none">
                <span className="font-frank-ruhl text-8xl text-[#C9A96E]/30 leading-none">
                  "
                </span>
              </div>

              {/* Quote */}
              <blockquote className="relative z-10 pt-8">
                <p className="font-heebo text-lg md:text-xl text-[#1A0A00]/80 leading-relaxed mb-8">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              {/* Author info */}
              <div className="border-t border-[#C9A96E]/20 pt-6">
                <p className="font-heebo font-bold text-lg text-[#1A0A00]">
                  {testimonial.name}
                </p>
                <p className="font-heebo text-[#C9A96E] mt-1">
                  {testimonial.event}
                </p>
              </div>

              {/* Star rating */}
              <div className="flex gap-1.5 mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-[#C9A96E]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
