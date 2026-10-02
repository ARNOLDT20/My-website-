# Blaze Tech Hub

A static public hub for Blaze Tech / T20 CLASSIC Tech services, verified live project previews, educational articles, and official community links.

## Site files

- `index.html` — homepage, service catalog, live project-preview dialog, T20 learning highlights, community paths, FAQ, and direct contact
- `services.html` — standalone service directory
- `insights.html` — searchable, filterable T20 article archive (English and Kiswahili)
- `contact.html` — both official emails, confirmed phone/WhatsApp routes, channel and group, service directory, and brand/project roster
- `about T20.html` — organization overview, restored T20 learning roots, and site navigation
- `whatsaptricks.html`, `make phone faster.html`, `forst programmer.html`, `web design blog.html`, `blog html vs javascript.html`, `blog data usage.html`, `swahili blogs.html` — original T20 archive articles
- `blog page home.HTML` — legacy library route, redirected to the searchable archive
- `404.html` — branded not-found page for static hosts that support it
- `site.css` / `site.js` — shared responsive styles and small progressive-enhancement scripts
- `brand-mark.svg` / `social-preview.png` — first-party identity assets

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

Project cards link only to the checked live destinations. Live previews load only after visitor action in an iframe sandbox that blocks form submission, pop-ups, and top-level navigation. Users are warned not to enter passwords or payment details. The external project apps remain independently operated; the preview is not presented as a private member portal or a payment flow. On mobile, the shared layout collapses cleanly, touch targets are enlarged, and heavy blur effects are removed from the scrolling UI. No external web font, tracking script, or hero-image download is required for the first view.
