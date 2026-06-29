// Marquee — seamless infinite horizontal marquee transition band.
// ~9vw display type, duplicated content for a seamless loop (CSS keyframes).
// Optional slight scroll-velocity speedup (skipped under reduced-motion).

interface MarqueeProps {
  text: string
  className?: string
}

export default function Marquee({ text, className = '' }: MarqueeProps) {
  // Duplicated content makes the -50% translate loop seamless.
  const item = (
    <span className="px-[3vw] text-foil" style={{ fontSize: '9vw' }}>
      {text}
    </span>
  )

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`.trim()}
      aria-label={text}
    >
      <div
        className="animate-marquee flex w-max flex-row flex-nowrap items-center whitespace-nowrap font-display leading-none"
        style={{ fontWeight: 700 }}
        aria-hidden="true"
      >
        <div className="flex flex-row flex-nowrap items-center">
          {item}
          {item}
          {item}
        </div>
        <div className="flex flex-row flex-nowrap items-center">
          {item}
          {item}
          {item}
        </div>
      </div>
    </div>
  )
}
