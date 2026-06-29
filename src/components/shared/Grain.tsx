// Grain — static film-grain + subtle vignette overlay.
// Fixed full-screen, non-interactive, sits above content (z-[60]).
// The grain is a SMALL pre-rasterized SVG-noise tile repeated via background-
// image — NOT a live full-screen <feTurbulence> filter element, which would
// force the compositor to re-rasterize the whole viewport every frame (and
// freezes the renderer over the scrubbing pinned gallery).

const NOISE_TILE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

export default function Grain() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[60]">
      {/* Film grain — tiled, rasterized once */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: NOISE_TILE, backgroundRepeat: 'repeat' }}
      />

      {/* Subtle radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 120% at 50% 40%, transparent 55%, rgba(11,9,8,0.10) 100%)',
        }}
      />
    </div>
  )
}
