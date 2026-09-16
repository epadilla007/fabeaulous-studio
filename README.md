# Fabeaulous Feet · Studio site

Bilingual (EN / ES-MX) marketing site for Fabeaulous Feet, Professional Pedicure System. Built by GrowMyBrand with the Studio stack: Eleventy 3, plain CSS tokens, GSAP 3 + ScrollTrigger.

## Edit content
- All visible copy (EN and ES): `src/_data/copy.js`
- Site settings (URL, email, WhatsApp, form key): `src/_data/site.js`
- Page URLs per language: `src/_data/pages.js`
- Styles and design tokens: `src/css/style.css` (bump `cssVersion` in `site.js` after CSS changes)
- Images: `src/images/` (client photo shoot + product photography)

## Before launch
1. `src/_data/site.js` → replace `WHATSAPP_NUMBER` with the confirmed number (digits only, country code first).
2. `src/_data/site.js` → replace `YOUR_WEB3FORMS_ACCESS_KEY` with the Web3Forms key.
3. After DNS cutover, set `url` to `https://www.fabeaulousfeet.com`.

## Run
```
npm install
npm run build   # outputs _site/
npm start       # local dev server
```

Project docs: `creative-direction.md`, `narrative-map.md`, `project-research.md`.
