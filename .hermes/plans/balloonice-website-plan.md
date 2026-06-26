# BALLOONICE Website Plan

## Context

**Client:** BALLOONICE — event balloon decoration business in Israel  
**Problem:** Needs a luxurious, celebratory website that converts event planners and individuals booking balloon decorations for weddings, birthdays, corporate events, etc.  
**Outcome:** A premium Hebrew RTL website with GSAP scroll animations that feels like an experience, not just a brochure.

---

## Activated Skills

| Skill | Role |
|-------|------|
| `@ui-ux-pro-max` | Design system, color/typography rules, accessibility |
| `@frontend-design` | Bold aesthetic direction, anti-generic patterns |
| `@emil-design-eng` | Animation polish, micro-interactions, spring physics |
| `@stitch-design-taste` | Premium typography, anti-slop rules, motion philosophy |
| `@marketing-psychology` | PLFS scoring for copy decisions, behavioral triggers |
| `@scroll-experience` | Parallax storytelling, GSAP ScrollTrigger patterns |
| `@high-end-visual-design` | $150k agency-level aesthetics, haptic depth |
| `@copywriting-psychologist` | Mechanism-first Hebrew copy that converts |
| `@content-strategy` | Content pillars for SEO and shareability |

---

## Brand Assets

### Logo
- **File:** `assets/logo.png`
- **Text:** BALLOONICE with balloon letters replacing the double-O
- **Hebrew tagline:** בלונים שעושים שמח ("Balloons that make happy")
- **Balloons:** Gold + Rose/Mauve

### Color Palette (Extracted)
```css
:root {
  /* Primary */
  --gold: #D4AF6A;           /* Warm metallic gold */
  --cream: #F5ECD7;          /* Pearl cream / champagne */
  --rose: #E8B4A0;           /* Dusty rose / rose gold */
  
  /* Accent */
  --dark: #2C1810;           /* Deep brown for text */
  
  /* Surfaces */
  --bg-light: #FFFDF9;       /* Warm white background */
  --bg-cream: #FAF6F0;       /* Subtle cream sections */
}
```

### Typography Direction
- **Display (Hebrew):** Heebo Black or Assistant Bold — confident, celebratory
- **Body (Hebrew):** Heebo Regular or Assistant — readable RTL
- **English accent:** Playfair Display or similar serif for luxury feel
- **NO:** Inter, Arial, Roboto, generic sans-serif

---

## Technical Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS (RTL configured) |
| Animation | GSAP + ScrollTrigger |
| Smooth Scroll | Lenis (or native with GSAP) |
| Icons | Phosphor Light or custom SVG |
| Hosting | Vercel or Netlify |

### RTL Configuration
```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heebo: ['Heebo', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [require('tailwindcss-rtl')],
};
```

---

## Site Architecture

```
BALLOONICE
├── Hero Section          [100vh, pinned scroll animation]
│   ├── Floating balloons (GSAP parallax)
│   ├── Logo reveal with shimmer
│   ├── Main headline (Hebrew)
│   └── Single CTA: "בואו נחגוג" (Let's celebrate)
│
├── Services Gallery      [Horizontal scroll or masonry]
│   ├── Wedding balloons
│   ├── Birthday decorations
│   ├── Corporate events
│   ├── Baby showers
│   └── Custom designs
│
├── About Section         [Split layout, image + text]
│   ├── Story headline
│   ├── Philosophy paragraph
│   └── Founder image/illustration
│
├── Testimonials          [Carousel with fade transitions]
│   ├── Quote
│   ├── Customer name
│   └── Event type tag
│
├── Contact / CTA         [Final conversion section]
│   ├── WhatsApp direct link
│   ├── Instagram link
│   └── Contact form (simple)
│
└── Footer                [Minimal, elegant]
    ├── Logo
    ├── Social links
    └── Copyright
```

---

## Animation Choreography

### Hero Section
1. **Entry:** Logo fades in with shimmer effect on gold elements (0-300ms)
2. **Balloons:** Floating parallax — gold balloon rises at 0.3x scroll speed, rose at 0.5x
3. **Headline:** Staggered word reveal with blur-up (600ms total, 80ms per word)
4. **CTA:** Subtle pulse glow on gold button

### Scroll Behaviors
| Section | Animation | Trigger |
|---------|-----------|---------|
| Hero → Services | Balloons rise out of view, services slide up | ScrollTrigger scrub |
| Services Gallery | Cards stagger in from right (RTL) | whileInView |
| About | Image scales from 0.95 to 1.0, text fades up | intersection 40% |
| Testimonials | Quotes crossfade with blur transition | auto-play + user control |
| CTA | Gold shimmer wave effect on button | intersection 60% |

### Spring Physics (from @emil-design-eng)
```js
// Button press feedback
const buttonSpring = {
  scale: 0.97,
  transition: { duration: 0.16, ease: [0.23, 1, 0.32, 1] }
};

// Floating balloons
const floatSpring = {
  y: [0, -20, 0],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
};
```

---

## Hebrew Copywriting Brief

### Audience Psychographic
- **Who:** Event planners, mothers planning kids' birthdays, brides, corporate HR
- **Awareness stage:** Problem-aware (they know they need decor) → Solution-aware (considering balloons)
- **Emotional state:** Excited but overwhelmed, wants "wow" without hassle
- **JTBD:** "Make my event look Instagram-worthy without me doing the work"

### Copy Mechanism (PLFS Scored)

| Element | Mechanism | PLFS Score |
|---------|-----------|------------|
| Headline | Identity ("אירועים שנזכרים") | +13 |
| Services | Jobs-to-be-done framing | +12 |
| CTA | Loss aversion ("אל תפספסו") | +11 |
| Testimonials | Social proof + specificity | +14 |

### Copy Deliverables
1. **Hero headline:** ~5 words, celebratory, identity-based
2. **Hero subhead:** ~15 words, the promise
3. **Service cards:** 3-5 words each, benefit-focused
4. **About paragraph:** ~50 words, story + expertise
5. **Testimonial quotes:** 3 real-feeling quotes (Hebrew)
6. **CTA text:** Action + urgency without being pushy
7. **All CTAs:** Must include WhatsApp as primary action

---

## Multi-Agent Team Plan

### Phase 1: Architecture
**Agent:** `architect`  
**Skills:** `@ui-ux-pro-max`, `@high-end-visual-design`, `@stitch-design-taste`  
**Tasks:**
1. Generate DESIGN.md with Stitch-compatible tokens
2. Define component tree and file structure
3. Set up Tailwind config with RTL and brand colors
4. Plan GSAP animation timeline

**Output:** `/src` folder structure, `DESIGN.md`, `tailwind.config.js`

---

### Phase 2: Copywriting
**Agent:** `copywriter`  
**Skills:** `@marketing-psychology`, `@copywriting-psychologist`, `@content-strategy`  
**Tasks:**
1. Write Hebrew hero headline + subhead
2. Write service descriptions (5 services)
3. Write about section
4. Create 3 testimonial quotes
5. Write all CTA microcopy
6. Define SEO meta title + description (Hebrew)

**Output:** `content/copy-he.json` with all Hebrew text

---

### Phase 3: Development
**Agent:** `developer`  
**Skills:** `@frontend-design`, `@scroll-experience`, `@emil-design-eng`  
**Tasks:**
1. Scaffold Vite + React + TypeScript project
2. Implement Hero with GSAP animations
3. Build Services gallery with scroll-triggered reveals
4. Create About section with split layout
5. Build Testimonials carousel
6. Implement Contact/CTA section
7. Add Lenis smooth scroll
8. Ensure RTL layout works correctly
9. Add mobile responsive breakpoints

**Output:** Complete `/src` implementation

---

### Phase 4: Testing & Polish
**Agent:** `tester`  
**Skills:** `@ui-ux-pro-max` (accessibility checks)  
**Tasks:**
1. Verify production build works (`npm run build`)
2. Test on mobile viewports (375px, 390px, 414px)
3. Test RTL text rendering
4. Check GSAP performance (60fps target)
5. Verify WhatsApp link works
6. Run Lighthouse audit (target 90+ performance)
7. Test reduced-motion media query fallbacks

**Output:** Bug list, performance report, screenshots

---

## Component Breakdown

### From Template (reuse patterns)
| Template Component | Adapt For |
|--------------------|-----------|
| Hero (parallax) | Hero with floating balloons |
| Testimonials (carousel) | Customer quotes |
| Features (grid) | Services gallery |
| Footer | Footer |

### Custom Components
| Component | Notes |
|-----------|-------|
| `FloatingBalloons.tsx` | GSAP parallax with gold/rose SVG balloons |
| `ShimmerText.tsx` | Gold metallic shimmer effect on hover/reveal |
| `RTLProvider.tsx` | Context for RTL direction |
| `WhatsAppCTA.tsx` | Fixed floating button or inline |

---

## File Structure

```
balloonice/
├── public/
│   ├── assets/
│   │   ├── logo.png
│   │   ├── balloons/
│   │   │   ├── gold.svg
│   │   │   └── rose.svg
│   │   └── gallery/
│   │       └── [service images]
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Hero/
│   │   ├── Services/
│   │   ├── About/
│   │   ├── Testimonials/
│   │   ├── Contact/
│   │   ├── Footer/
│   │   └── shared/
│   │       ├── FloatingBalloons.tsx
│   │       ├── ShimmerText.tsx
│   │       └── WhatsAppCTA.tsx
│   ├── content/
│   │   └── copy-he.json
│   ├── hooks/
│   │   └── useScrollAnimation.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── DESIGN.md
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Verification Plan

### Build Check
```bash
npm run build
npm run preview
```

### Manual Testing
1. Open in Chrome DevTools mobile mode
2. Scroll through all sections — animations should be smooth
3. Click WhatsApp CTA — should open WhatsApp with pre-filled message
4. Check RTL text alignment throughout
5. Test on real iPhone/Android if possible

### Performance Targets
- Lighthouse Performance: 90+
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- GSAP animations: 60fps on scroll

### Accessibility
- Color contrast ratios (gold on cream needs verification)
- Reduced motion fallbacks
- Keyboard navigation
- Screen reader announces Hebrew correctly

---

## Open Questions

1. **Gallery images:** Do you have high-quality photos of past balloon decorations? If not, should we use placeholder images or generate some?

2. **WhatsApp number:** What phone number should the WhatsApp CTA link to?

3. **Instagram handle:** What is the Instagram profile URL to link?

4. **Testimonials:** Are there real customer testimonials to use, or should the copywriter create realistic placeholder quotes?

5. **Domain:** Is there a domain purchased for hosting?

---

## Anti-Patterns (Enforced)

Per the activated skills, the following are BANNED:

- Inter, Roboto, Arial fonts
- Pure black (#000000) — use #2C1810 instead
- Purple/blue neon gradients
- Generic 3-column Bootstrap grids
- Emojis anywhere in the UI
- "Learn more" as CTA text
- Edge-to-edge sticky navbar
- Generic testimonial carousel with arrows
- AI copywriting clichés: "Elevate", "Seamless", "Next-Gen"
- Fake round numbers (99.99%, 50%)

---

## Success Criteria

The website is complete when:
1. All 5 sections implemented and animated
2. Hebrew RTL renders correctly
3. Mobile responsive down to 375px
4. GSAP animations run at 60fps
5. WhatsApp CTA functional
6. Lighthouse 90+ score
7. Copy approved by user
8. Build succeeds without errors

---

## Next Steps

1. **User answers open questions** (images, WhatsApp number, Instagram)
2. **Architect agent** creates DESIGN.md and file structure
3. **Copywriter agent** writes all Hebrew copy
4. **Developer agent** implements components
5. **Tester agent** validates build and mobile

**Awaiting approval before any implementation begins.**
