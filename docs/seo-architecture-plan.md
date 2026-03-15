# SEO architecture plan for Insight Lab (Vite + React)

## Current rendering model
- The site is currently a Vite SPA with client-side route selection in `src/App.tsx` via `window.location.pathname` checks.
- Public routes are therefore CSR-only and initial HTML is almost empty except for shell/head tags.

## Minimum-effort path (recommended next step)
1. Keep SPA architecture.
2. Add route-level metadata and JSON-LD client-side (implemented).
3. Prerender the highest-value public marketing routes to static HTML:
   - `/`
   - `/solutions`
   - `/success-stories`
   - `/contact`
   - `/about`
   - `/real-estate-diagnosis`
4. Keep private/authenticated surfaces as CSR.

Suggested tool for prerender in Vite SPA: `vite-plugin-prerender` (or equivalent static prerender pipeline in CI).

## Best-practice path
1. Move public pages to SSR/SSG (e.g., Next.js App Router, Remix, or Vite SSR setup).
2. Keep interactive/private application areas as CSR islands.
3. Render route metadata + structured data server-side.
4. Add localized routes (`/es/...`, `/en/...`) when translation quality and canonical strategy are ready.

## SEO-friendly URL structure recommendations
- Keep:
  - `/`
  - `/about`
  - `/solutions`
  - `/success-stories`
  - `/contact`
  - `/real-estate-diagnosis`
- Migrate legacy typo route:
  - from `/real-state-maturity-quiz`
  - to `/real-estate-diagnosis`
- Future landing page clusters:
  - `/services/revenue-operations`
  - `/services/crm-automation`
  - `/industries/real-estate-marketing`
  - `/industries/medical-tourism-marketing`
  - `/faq`

## CSR content to move into initial HTML first
- Home hero value proposition and key service links.
- Solutions page service framework cards.
- Success stories overview copy and CTA links.
- Contact page lead-generation messaging.
- FAQ content blocks.
