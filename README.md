# Instill Idees — website

React 18 + Vite + Tailwind CSS + Framer Motion + React Router + Lucide. Frontend only.

```
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

Routes: `/`, `/about`, `/blog`, `/blog/:slug`, `/contact` (plus a 404).

- `src/data/` — all content (services, products, brands/clients, blog posts, FAQs, site contact info)
- `src/lib/img.js` — curated photo IDs (Unsplash) and video URLs (Pexels); swap in real project photography here
- `src/components/` — Navbar, Footer, Button (magnetic), Reveal (scroll/split/mask animations), Cards, Sections (video, timeline, CTA, FAQ, counters), Marquee
- The contact form validates and simulates submission only; it then offers a pre-filled `mailto:` link. Connect a form service (e.g. Formspree) in `EnquiryForm` to send real enquiries.
- Brand and client names are shown as text wordmarks; add official logo files only with permission.
