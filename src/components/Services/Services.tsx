// Services — IVORY editorial numbered list (01–05).
// Award-site reveal: heading via useSplitReveal, each row via useClipReveal.
// No cards, no glass, no shadows — type scale + space + thin gold hairlines.

import { useSplitReveal, useClipReveal } from '../../hooks/useScrollAnimation'
import { ArrowIcon } from '../shared/icons'

interface Service {
  id: string
  title: string
  description: string
}

const services: Service[] = [
  {
    id: '01',
    title: 'חתונות',
    description:
      'קשתות בלונים רומנטיות, רקעים לצילום ומתקני פרחים שישלימו את היום הגדול שלכם. כי החתונה שלכם ראויה לתפאורה שתגרום לאורחים לעצור ולהתפעל.',
  },
  {
    id: '02',
    title: 'ימי הולדת',
    description:
      'מפלי בלונים, מספרים ענקיים וערכות נושא צבעוניות שיגרמו לילד שלכם להרגיש כמו כוכב. הביטו בעיניים הבורקות כשהם נכנסים לחדר.',
  },
  {
    id: '03',
    title: 'אירועים עסקיים',
    description:
      'עיצובים בצבעי המותג שלכם, קירות לוגו ומתקנים מרשימים שמעלים את הארגון שלכם רמה. כי גם אירועי חברה יכולים להיות בלתי נשכחים.',
  },
  {
    id: '04',
    title: 'בריתות ובר/בת מצווה',
    description:
      'חגיגות משפחתיות ראויות לעיצוב שמכבד את הרגע. מקשת כניסה ועד שולחן מתנות מעוצב, כל פרט במקומו.',
  },
  {
    id: '05',
    title: 'עיצוב מותאם אישית',
    description:
      'יש לכם רעיון שלא ראיתם בשום מקום? זה בדיוק מה שאנחנו אוהבים. ספרו לנו על החלום, ונהפוך אותו למציאות צבעונית.',
  },
]

function ServiceRow({ service }: { service: Service }) {
  const rowRef = useClipReveal<HTMLDivElement>({ start: 'top 85%' })

  return (
    <div
      ref={rowRef}
      className="clip-reveal group relative border-t border-sand/70 last:border-b last:border-sand/70"
    >
      {/* gold accent bar — grows from the trailing (right, RTL) edge on hover */}
      <span
        aria-hidden="true"
        className="absolute top-0 right-0 h-px w-0 bg-foil transition-[width] duration-700 ease-spring group-hover:w-full"
      />

      <div
        data-clip-inner
        className="grid grid-cols-1 gap-y-4 py-10 md:grid-cols-12 md:items-baseline md:gap-x-8 md:py-14 lg:py-16"
      >
        {/* index */}
        <div className="md:col-span-2 lg:col-span-1">
          <span className="dir-ltr font-display text-base font-normal text-muted transition-colors duration-500 group-hover:text-gold">
            {service.id}
          </span>
        </div>

        {/* title */}
        <div className="md:col-span-5 lg:col-span-5">
          <h3 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.04] text-ink transition-colors duration-500 group-hover:text-gold">
            {service.title}
          </h3>
        </div>

        {/* description */}
        <div className="md:col-span-4 lg:col-span-5">
          <p className="max-w-[42ch] font-body text-base font-light leading-relaxed text-ink/70 md:text-lg">
            {service.description}
          </p>
        </div>

        {/* arrow — reveals on hover, points to the leading (left, RTL) edge */}
        <div className="hidden md:col-span-1 md:flex md:items-center md:justify-end">
          <span
            aria-hidden="true"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-sand/80 text-ink opacity-0 -translate-x-3 transition-all duration-500 ease-spring group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-gold group-hover:text-gold"
          >
            <ArrowIcon className="h-5 w-5" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const headingRef = useSplitReveal<HTMLHeadingElement>({ type: 'lines' })

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-ivory px-6 py-20 text-ink md:px-10 md:py-28 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        {/* header */}
        <header className="mb-16 md:mb-24 md:max-w-3xl">
          <p className="label mb-6 text-muted">
            <span className="label-index">01 /</span> השירותים
          </p>
          <h2
            ref={headingRef}
            className="font-display text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.05] text-ink"
          >
            מה אנחנו יודעים לעשות הכי טוב
          </h2>
          <p className="mt-7 max-w-xl font-body text-lg font-light leading-relaxed text-ink/65 md:text-xl">
            כל אירוע מקבל תשומת לב אישית ועיצוב שמותאם בדיוק לחזון שלכם
          </p>
        </header>

        {/* editorial numbered list */}
        <div>
          {services.map((service) => (
            <ServiceRow key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
