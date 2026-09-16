# Creative Direction: Fabeaulous Feet

## Emotional territory

Clinical calm with a beauty finish. A pro should feel they found a serious tool made by people who have done the work, and that it will make service days easier on their hands and nicer for their clients. Quiet confidence: precise, warm, never loud.

Reference energy: the precision voice of pro-equipment brands (4blanc) crossed with the soft plum identity from the 2025 rebrand.

## Visual identity

### Palette (from the 2025 Fabeaulous Feet Brand Color Guide)

| Token | Hex | Use |
|---|---|---|
| `--ff-plum` | `#681C67` | Logo (sampled from final logo file; guide lists Deep Plum `#6D1C62`), headings accents, secondary buttons, WhatsApp button |
| `--ff-navy` | `#27175F` | Violet Navy. Dark sections, footer |
| `--ff-navy-deep` | `#1E1149` | Deepest surface, overlays |
| `--ff-lilac` | `#F8C8EF` | Blush Lilac. Soft sections, highlights on navy |
| `--ff-raspberry` | `#F81E6C` | Electric Raspberry. Decorative accents, large display only |
| `--ff-raspberry-deep` | `#C2104F` | Primary CTA fill (white text passes AA) |
| `--ff-raspberry-light` | `#FF5C95` | Small accent text on navy |
| `--ff-charcoal` | `#111217` | Charcoal Black. Body text |
| `--ff-ink-soft` | `#4E4757` | Secondary text on light |
| `--ff-porcelain` | `#FBF8FA` | Page background |
| `--ff-mist` | `#F3EEF2` | Cards and alternating sections |

### WCAG AA contrast (checked 2026-09-15)

| Pair | Ratio | Result |
|---|---|---|
| Charcoal on porcelain | 17.73 | AA body |
| Ink-soft on porcelain | 8.43 | AA body |
| Ink-soft on mist | 7.75 | AA body |
| Plum on porcelain | 10.21 | AA body |
| White on plum | 10.77 | AA body |
| White on navy | 15.28 | AA body |
| Muted `#D3C8E6` on navy | 9.59 | AA body |
| Lilac on navy | 10.55 | AA body |
| Raspberry-light on navy | 5.25 | AA body |
| White on raspberry-deep (CTA) | 6.03 | AA body |
| Raspberry-deep on porcelain | 5.72 | AA body |
| Plum on lilac | 7.43 | AA body |
| Charcoal on lilac | 12.91 | AA body |
| White on raspberry `#F81E6C` | 3.89 | Large text only, so buttons use raspberry-deep |
| Raspberry on navy | 3.93 | Decorative / large only |

### Typography

- **Logo font:** Erstoria (flared, soft humanist lettering). It has no licensed web font, so the logo ships as the outlined SVG from the final file.
- **Display:** Marcellus 400 (Google Fonts, OFL). Closest free web match to Erstoria's flared strokes. Headlines, section titles, stat numbers.
- **Body and labels:** Jost 400/500/600 (Google Fonts, OFL). Matches the wide-tracked geometric "PROFESSIONAL PEDICURE SYSTEM" tagline in the logo.
- Only these two families load. No serif fallbacks for decoration.
- Scale: hero `clamp(2.9rem, 8vw, 7.25rem)`, section `clamp(2.1rem, 4.6vw, 4rem)`, body 17px (min 15px), labels 0.75rem uppercase with 0.2em tracking. Body line-height 1.7.

### Spacing, radius, shadow

- Open and airy. Section padding `clamp(88px, 12vw, 180px)`.
- Radius: 28px containers, 20px cards, pill buttons.
- Shadows tinted plum: `0 24px 60px -24px rgba(104,28,103,.28)`.

### Image treatment

- Client's own 2023 shoot only. Bright, clean studio light; no filters beyond `saturate(.96) contrast(1.02)`.
- Ratios: hero 3:2 full bleed, editorial 3:2, product 1:1 on mist.
- `object-position` set per image to protect faces and feet.
- Text over photos always sits on a navy gradient at 0.7+ alpha.

### Grid personality

12-column grid, asymmetric. Layout mix on the homepage: Poster (hero), Void (manifesto), Offset Stack (steps), Collision (flat tip), horizontal gallery, Data Wall (specs), Void (quote), split (paths).

### Motif

**The disc.** A thin concentric circle (the dermabrasion disc) plus the five toe dots from the logo. Used as the rotating hero ring, section dividers that draw on scroll, and card accents.

## Motion design language

- **Primary easing:** `cubic-bezier(0.22, 1, 0.36, 1)` / GSAP `power3.out`. Luxury, decelerating.
- **Duration scale:** base 0.3s. Micro 0.15s, standard 0.3s, dramatic 0.6s, cinematic 0.9 to 1.2s.
- **Enter direction:** up and from the left, leading the eye to CTAs at the lower right.
- **Stagger:** characters 0.03s, words 0.06s, elements 0.12s, sections 0.25s.
- **Exit:** hero recedes (scale up slightly, dim). Stacked cards scale to 0.94 and dim. Everything else holds.
- **Scroll sync:** hero parallax, manifesto word reveal, stacking cards and gallery are scrubbed (`scrub: 1`). Counters, fade-ups and image clips trigger once.
- **Choreography groups:** card = image, label, title, body with internal 0.08s stagger. Step card = number, title, body.
- **Content pages:** four patterns only (fade-up, staggered cards, image scale-in, label slide).
- **Safety:** all hidden start states live under `html.js`. The class is added only when motion is allowed, and removed if GSAP fails to load, so content is always visible without JS.
- **Ambient:** hero disc ring rotates on a 40s loop. Honors `prefers-reduced-motion`.

## Content production system

- **Voice:** Relaxed Precision. Short, specific, active. Speaks tech to tech. No hype, no invented numbers.
- **Hero formula:** two short parallel statements. "Smooth feet. Easy hands." (24 chars)
- **Section headings:** declarative fragments, 30 to 50 characters.
- **Body:** max 3 sentences per paragraph, 2 paragraphs per section.
- **CTAs:** Primary "Request pricing" / "Solicitar precios". Secondary "Message us on WhatsApp" / "Escríbenos por WhatsApp". Micro "See the system" / "Conoce el sistema".
- **Data copy:** specs as display numbers (12V, 9 speeds, 3x + 8x, 12 months).
- **Punctuation:** no em or en dashes in visible copy. Commas, periods, colons.
- **Spanish:** Mexican professional Spanish, "tú" register, salon vocabulary (pedicurista, callosidades, durezas, lima eléctrica).

## Site architecture

| EN | ES | Purpose |
|---|---|---|
| `/` | `/es/` | Full story, full GSAP |
| `/products/` | `/es/productos/` | One section per product family |
| `/professionals/` | `/es/profesionales/` | Why pros choose it, ordering, FAQ, distributors |
| `/about/` | `/es/nosotros/` | Origin, William and Karina, where to meet them |
| `/contact/` | `/es/contacto/` | WhatsApp, email, pricing form |
| `/404.html` | (bilingual) | Recovery |

Every page ends in the same action: request professional pricing.

## Stack note

11ty 3 + plain CSS tokens + GSAP 3 / ScrollTrigger via CDN. Tailwind CDN was left out: the production learnings flag `cdn.tailwindcss.com` as not for production, and it costs roughly 100KB of blocking JS on mobile PageSpeed. All styles live in `src/css/style.css` under `:root {}` tokens.
