// Shared magnetic CTA pill with a nested "button-in-button" arrow circle.
// Single owner of the useMagnetic wiring + markup so the four CTAs can't drift.
// NOTE: deliberately no `transition-transform` / `active:scale` on the anchor —
// GSAP (useMagnetic) writes the inline transform; a CSS transition on transform
// would re-animate every magnetic frame and an active:scale would be clobbered.

import { useMagnetic } from '../../hooks/useScrollAnimation'
import { ArrowIcon } from './icons'

type Variant = 'foil' | 'gold'
type Size = 'lg' | 'sm'

interface MagneticButtonProps {
  href: string
  label: string
  variant?: Variant
  size?: Size
  target?: string
  ariaLabel?: string
  className?: string
  strength?: number
  onClick?: () => void
}

const PILL: Record<Variant, string> = {
  foil: 'bg-foil text-noir',
  gold: 'bg-gold text-ink hover:bg-goldlight',
}

const SIZE: Record<Size, { pad: string; text: string; circle: string; arrow: string }> = {
  lg: { pad: 'py-3 ps-8 pe-3', text: 'text-lg', circle: 'h-11 w-11', arrow: 'h-5 w-5' },
  sm: { pad: 'py-2.5 ps-6 pe-2.5', text: 'text-[0.95rem]', circle: 'h-8 w-8', arrow: 'h-4 w-4' },
}

export default function MagneticButton({
  href,
  label,
  variant = 'gold',
  size = 'lg',
  target,
  ariaLabel,
  className = '',
  strength = 0.4,
  onClick,
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLAnchorElement>(strength)
  const s = SIZE[size]

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      data-cursor
      aria-label={ariaLabel}
      onClick={onClick}
      className={`group inline-flex items-center gap-4 rounded-full font-body font-semibold transition-[background-color] duration-300 ease-spring will-change-transform ${PILL[variant]} ${s.pad} ${s.text} ${className}`.trim()}
    >
      <span>{label}</span>
      <span
        className={`flex items-center justify-center rounded-full bg-noir text-ivory transition-transform duration-300 ease-spring group-hover:-translate-x-1 ${s.circle}`}
      >
        <ArrowIcon className={s.arrow} />
      </span>
    </a>
  )
}
