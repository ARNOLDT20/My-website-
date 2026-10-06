# Blaze Tech Hub

A static public hub for Blaze Tech / T20 CLASSIC Tech services, verified live project previews (including an in-page T20-CLASSIC AI assistant trial), educational articles, and official community links.

## Site files

- `index.html` — homepage, service catalog, live project-preview dialog, T20-CLASSIC AI trial, T20 learning highlights, community paths, FAQ, and direct contact
- `services.html` — standalone service directory
- `insights.html` — searchable, filterable T20 article archive (English and Kiswahili)
- `contact.html` — both official emails, confirmed phone/WhatsApp routes, channel and group, service directory, and brand/project roster
- `about T20.html` — organization overview, restored T20 learning roots, and site navigation
- `whatsaptricks.html`, `make phone faster.html`, `forst programmer.html`, `web design blog.html`, `blog html vs javascript.html`, `blog data usage.html`, `swahili blogs.html` — original T20 archive articles
- `blog page home.HTML` — legacy library route, redirected to the searchable archive
- `404.html` — branded not-found page for static hosts that support it
- `site.css` / `site.js` — shared responsive styles and small progressive-enhancement scripts
- `brand-mark.svg` / `social-preview.png` — first-party identity assets
- `assets/project-previews/t20-classic-ai.webp` — optimized, first-party screenshot for the AI assistant project card
- `assets/project-previews/t20-classic-ai-mobile.webp` — portrait screenshot selected by the responsive `<picture>` source at viewport widths up to 480px, preserving the chat UI on phones

## Local preview

Serve the repository root with any static file server, for example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Publishing

The repository is static HTML/CSS/JS and is connected to a Vercel-hosted project. A push to `main` publishes the static frontend there. Production is available at `https://www.t20tech.site`; the apex `https://t20tech.site` redirects to it. Namecheap BasicDNS uses Vercel's recommended apex record (`A @ → 216.198.79.1`); the existing mail, verification, and project-subdomain records were preserved.

## Public contact and previews

The team-supplied public email addresses are `blazetech154@gmail.com` and `t20classictech@gmail.com`. Confirmed phone/WhatsApp routes are `+255 627 417 402` and `+255 753 468 867`; the official channel and main group are linked directly on the site. No address or opening hours are published because none were verified.

Project cards link only to checked live destinations. Previews load only after visitor action. Other project previews block form submits, pop-ups, and top-level navigation; the T20-CLASSIC AI preview permits chat submission only inside its cross-origin iframe, with pop-ups and top-level navigation still blocked. Prompts are sent to `assistant.t20tech.site`, not to this website; visitors are warned not to share passwords or private/financial details. The assistant screenshot is a lazy-loaded first-party asset. The external project apps remain independently operated; the preview is not presented as a private member portal or payment flow. On mobile, the shared layout collapses cleanly, touch targets are enlarged, and heavy blur effects are removed from the scrolling UI. No external web font, tracking script, or hero-image download is required for the first view.
