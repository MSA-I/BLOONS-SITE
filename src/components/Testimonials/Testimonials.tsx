// Testimonials — BALLOONICE luxury redesign (ZONE: IVORY light)
// Editorial layout: large serif quotes on the ivory ground, ultra-light gold
// stars, author + event in muted small caps. No glass cards / rotation —
// hierarchy lives in type scale, gold hairlines and heavy negative space.
// Each testimonial reveals distinctly: a gold accent line clip-reveals while
// the serif quote fades up via SplitText.

import { useSplitReveal, useClipReveal } from '../../hooks/useScrollAnimation'

interface Testimonial {
  quote: string
  name: string
  event: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'הזמנו קשת בלונים לחתונה ולא היה לנו מושג שזה יהפוך לאטרקציה המרכזית של האירוע. כל האורחים התייצבו לתמונות מולה. פשוט הייתה שיחת הערב.',
    name: 'רונית ואיתי כהן',
    event: 'חתונה בגן אירועים',
  },
  {
    quote:
      'הבת שלי רצתה יום הולדת של חדי קרן. מה שהם עשו עם הבלונים - היא פשוט קפאה במקום כשנכנסה. הרגע הזה שווה כל שקל.',
    name: 'מיכל לוי',
    event: 'יום הולדת 6',
  },
  {
    quote:
      'אירוע השקה של מוצר חדש לחברה. הבלונים בצבעי הלוגו שלנו יצרו רקע מדהים לכל התמונות. הלקוחות שלנו היו המומים מהרמה.',
    name: 'דני אברהמי',
    event: 'אירוע השקה עסקי',
  },
]

// Ultra-light outline star — gold stroke, no fill (delicate, anti-slop).
function Star() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-gold"
    >
      <path d="M12 2.5l2.92 5.92 6.53.95-4.72 4.6 1.11 6.5L12 17.9l-5.84 3.07 1.11-6.5-4.72-4.6 6.53-.95L12 2.5z" />
    </svg>
  )
}

function Stars() {
  return (
    <div className="flex gap-1.5" aria-label="חמישה כוכבים מתוך חמישה">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} />
      ))}
    </div>
  )
}

function TestimonialItem({ item, index }: { item: Testimonial; index: number }) {
  // Quote: serif fade-up reveal (lines). Accent line: clip-reveal.
  const quoteRef = useSplitReveal<HTMLQuoteElement>({
    type: 'lines',
    start: 'top 85%',
  })
  const lineRef = useClipReveal<HTMLDivElement>({ start: 'top 88%' })

  return (
    <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
      {/* Index + stars rail */}
      <header className="md:col-span-3 flex flex-row md:flex-col items-baseline md:items-start justify-between md:justify-start gap-4">
        <span className="label text-muted">
          <span className="label-index">
            {String(index + 1).padStart(2, '0')} /
          </span>{' '}
          המלצה
        </span>
        <Stars />
      </header>

      {/* Quote + attribution */}
      <div className="md:col-span-9">
        {/* Gold accent line — clip reveal */}
        <div
          ref={lineRef}
          className="clip-reveal h-px w-16 bg-foil mb-8"
          aria-hidden="true"
        />

        <blockquote
          ref={quoteRef}
          className="font-display font-light text-ink leading-[1.35] text-[clamp(1.5rem,2.6vw,2.4rem)]"
        >
          {item.quote}
        </blockquote>

        <footer className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1">
          <cite className="not-italic font-body font-medium text-ink tracking-wide">
            {item.name}
          </cite>
          <span className="h-3 w-px bg-sand" aria-hidden="true" />
          <span className="label text-muted">{item.event}</span>
        </footer>
      </div>
    </article>
  )
}

export default function Testimonials() {
  const titleRef = useSplitReveal<HTMLHeadingElement>({ type: 'words' })

  return (
    <section id="testimonials" className="bg-ivory text-ink py-20 md:py-28 px-6 md:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <header className="mb-16 md:mb-24">
          <span className="label text-gold block mb-5">
            <span className="label-index">03 /</span> המלצות
          </span>
          <h2
            ref={titleRef}
            className="font-display font-bold text-ink leading-[0.95] text-[clamp(2.2rem,5vw,4rem)]"
          >
            מה אומרים עלינו
          </h2>
        </header>

        {/* Testimonials — stacked editorial rows with gold hairlines */}
        <div className="divide-y divide-sand">
          {testimonials.map((item, index) => (
            <div key={index} className="py-12 md:py-16 first:pt-0">
              <TestimonialItem item={item} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
