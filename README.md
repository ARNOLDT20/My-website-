# Blaze Tech Hub

A static public hub for Blaze Tech / T20 CLASSIC Tech services, verified live project previews, educational articles, and community links.

## Site files

- `index.html` — homepage, service catalog, live project-preview modal, T20 learning highlights, community paths, FAQ, and contact
- `services.html` — standalone service directory
- `insights.html` — searchable, filterable T20 article archive (English and Kiswahili)
- `contact.html` — WhatsApp and phone links for the two confirmed team numbers, with official community links
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

The repository is static HTML/CSS/JS and is connected to a Vercel-hosted project. A push to `main` publishes the static frontend there. Production is available at `https://www.t20tech.site`; the apex `https://t20tech.site` redirects to it. Namecheap BasicDNS now has Vercel's recommended apex record (`A @ → 216.198.79.1`); existing mail, verification, and project subdomain records were preserved. No backend, credentials, fake sign-in, or private member portal is included. Project previews load only after visitor action and are sandboxed; payment/form actions stay disabled in the quick preview.
