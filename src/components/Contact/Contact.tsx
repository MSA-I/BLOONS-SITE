// Contact — NOIR dramatic CTA zone.
// HUGE clickable phone (magnetic + foil on hover), WhatsApp pill, email, urgency accent.
// Copy verbatim. RTL. Phone tel:0504127772 · WhatsApp wa.me/972504127772 · mailto e0504127772@gmail.com

import {
  useSplitReveal,
  useMagnetic,
  useStaggerReveal,
} from '../../hooks/useScrollAnimation'
import { ArrowIcon, WhatsappIcon } from '../shared/icons'

const PHONE_DISPLAY = '050-412-7772'

export default function Contact() {
  const titleRef = useSplitReveal<HTMLHeadingElement>({ type: 'words', stagger: 0.06 })
  const phoneRef = useMagnetic<HTMLAnchorElement>(0.25)
  const whatsappRef = useMagnetic<HTMLAnchorElement>(0.3)

  // Sequenced reveal for the supporting elements (eyebrow, subtitle, phone, CTA,
  // email, urgency, availability) via the shared stagger hook.
  useStaggerReveal('#contact', '[data-reveal]', 0.1, {
    y: 44,
    duration: 0.85,
    start: 'top 70%',
  })

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-noir text-ivory px-6 py-20 md:px-10 md:py-32"
    >
      {/* Top hairline */}
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-l from-transparent via-gold/35 to-transparent md:inset-x-10" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Eyebrow */}
        <p data-reveal className="label text-gold">
          <span className="label-index">04 /</span> צור קשר
        </p>

        {/* Title */}
        <h2
          ref={titleRef}
          className="mt-6 font-display text-[clamp(2.2rem,5vw,4rem)] font-bold leading-[1.05] text-ivory"
        >
          מוכנים ליצור משהו מיוחד?
        </h2>

        {/* Subtitle */}
        <p
          data-reveal
          className="mt-6 max-w-2xl font-body text-lg font-light leading-relaxed text-[#A99F92] md:text-xl"
        >
          ספרו לנו על האירוע שלכם. שיחה קצרה זה כל מה שצריך כדי להתחיל.
        </p>

        {/* HUGE phone — magnetic, foil on hover */}
        <div data-reveal className="mt-14 md:mt-20">
          <a
            ref={phoneRef}
            href="tel:0504127772"
            data-cursor
            aria-label={`התקשרו ${PHONE_DISPLAY}`}
            className="group relative inline-block"
          >
            <span className="dir-ltr block font-display text-[clamp(2.75rem,11vw,8rem)] font-bold leading-none tracking-tight text-ivory transition-opacity duration-500 ease-spring group-hover:opacity-0">
              {PHONE_DISPLAY}
            </span>
            <span
              aria-hidden="true"
              className="dir-ltr text-foil absolute inset-0 block font-display text-[clamp(2.75rem,11vw,8rem)] font-bold leading-none tracking-tight opacity-0 transition-opacity duration-500 ease-spring group-hover:opacity-100"
            >
              {PHONE_DISPLAY}
            </span>
          </a>
        </div>

        {/* WhatsApp pill + email */}
        <div data-reveal className="mt-12 flex flex-col items-start gap-7 md:flex-row md:items-center md:gap-10">
          <a
            ref={whatsappRef}
            href="https://wa.me/972504127772"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="group inline-flex items-center gap-4 rounded-full border border-ivory/15 bg-ivory px-8 py-4 font-body text-base font-semibold text-noir transition-[background-color,border-color] duration-300 ease-spring hover:bg-goldlight"
          >
            <WhatsappIcon className="h-6 w-6 shrink-0" />
            <span>שלחו הודעה בוואטסאפ</span>
            <span className="ml-1 flex h-7 w-7 items-center justify-center rounded-full bg-noir text-ivory transition-transform duration-300 ease-spring group-hover:-translate-x-1">
              <ArrowIcon className="h-3.5 w-3.5" />
            </span>
          </a>

          <a
            href="mailto:e0504127772@gmail.com"
            data-cursor
            className="dir-ltr font-body text-base text-[#A99F92] underline-offset-8 transition-colors duration-300 ease-spring hover:text-gold hover:underline"
          >
            e0504127772@gmail.com
          </a>
        </div>

        {/* Urgency — gold hairline accent, no card */}
        <div data-reveal className="mt-16 max-w-2xl border-r-2 border-gold pr-6 md:mt-20">
          <p className="font-display text-2xl font-bold text-ivory md:text-3xl">
            תאריכים מוגבלים
          </p>
          <p className="mt-3 font-body text-lg font-light leading-relaxed text-[#A99F92]">
            האירוע מתקרב? אל תחכו לרגע האחרון - התאריכים הטובים נתפסים מהר.
          </p>
        </div>

        {/* Availability */}
        <p data-reveal className="label mt-10 text-[#8A7E70]">
          זמינים א-ה, 9:00-20:00
        </p>
      </div>
    </section>
  )
}
