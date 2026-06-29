// About — PEARL editorial zone.
// Eyebrow + serif title, two large prose paragraphs revealed line-by-line,
// signature, and three count-up statistics. Oversized serif glyph as a
// low-opacity parallax background texture.

import {
  useSplitReveal,
  useCountUp,
  useParallax,
} from '../../hooks/useScrollAnimation'
import { GoldText } from '../shared/GoldText'

interface Stat {
  /** Numeric target for the count-up tween. */
  value: number
  /** Suffix rendered as a sibling node (kept outside the counting span). */
  suffix: string
  /** Muted label beneath the figure. */
  label: string
}

const STATS: readonly Stat[] = [
  { value: 500, suffix: '+', label: 'אירועים מאושרים' },
  { value: 5, suffix: '+', label: 'שנות ניסיון' },
  { value: 100, suffix: '%', label: 'שביעות רצון' },
] as const

function StatItem({ value, suffix, label }: Stat) {
  const numRef = useCountUp(value)

  return (
    <div className="flex flex-col">
      <div dir="ltr" className="flex items-baseline justify-start gap-1 font-display font-bold leading-none text-ink">
        <span
          ref={numRef}
          className="text-[clamp(4rem,9vw,7rem)] tabular-nums"
        >
          {value}
        </span>
        <GoldText
          as="span"
          className="text-[clamp(2.5rem,5vw,4rem)] font-display font-bold"
        >
          {suffix}
        </GoldText>
      </div>
      <span className="label mt-3 text-muted">{label}</span>
    </div>
  )
}

export default function About() {
  const glyphRef = useParallax<HTMLSpanElement>(0.4)
  const p1Ref = useSplitReveal<HTMLParagraphElement>({ type: 'lines' })
  const p2Ref = useSplitReveal<HTMLParagraphElement>({ type: 'lines' })

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-pearl px-6 py-28 text-ink md:px-10 md:py-40"
    >
      {/* Oversized serif glyph — low-opacity parallax texture */}
      <span
        ref={glyphRef}
        aria-hidden="true"
        className="pointer-events-none absolute -left-[6vw] top-[8%] select-none font-display font-black leading-none text-ink/[0.04]"
        style={{ fontSize: 'clamp(22rem,42vw,46rem)' }}
      >
        B
      </span>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Eyebrow */}
        <p className="label text-muted">
          <span className="label-index">02 /</span> הסיפור שלנו
        </p>

        {/* Title */}
        <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.05] text-ink">
          למה דווקא <GoldText as="span">BALLOONICE</GoldText>?
        </h2>

        {/* Editorial prose */}
        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12">
          <p
            ref={p1Ref}
            className="font-body text-[clamp(1.3rem,2.4vw,2rem)] font-light leading-[1.55] text-ink/85 md:col-span-7"
          >
            התחלנו מתשוקה פשוטה: להפוך אירועים רגילים לחוויות שאנשים ידברו עליהם
            חודשים אחרי. היום, אחרי יותר מ-500 אירועים, אנחנו יודעים בדיוק איך
            לקחת את החזון שלכם ולהפוך אותו לתפאורה שתגרום לאורחים שלכם לשלוף את
            הטלפון ולצלם.
          </p>

          <p
            ref={p2Ref}
            className="font-body text-[clamp(1.15rem,2vw,1.6rem)] font-light leading-[1.6] text-ink/70 md:col-span-5 md:self-end"
          >
            אנחנו לא מוכרים בלונים. אנחנו מוכרים רגעים. את ההפתעה בעיניים של ילד,
            את התמונות שיישארו לנצח, את התחושה שמישהו באמת דאג לכל פרט.
          </p>
        </div>

        {/* Signature */}
        <p className="mt-12 font-display text-xl italic text-muted md:text-2xl">
          — צוות BALLOONICE
        </p>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-12 border-t border-sand pt-14 sm:grid-cols-3 md:mt-28 md:gap-x-20">
          {STATS.map((stat) => (
            <StatItem key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
