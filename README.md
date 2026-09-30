# Blaze Tech Hub

A static public hub for Blaze Tech / T20 CLASSIC Tech services, projects, and member connection paths.

## Site files

- `index.html` — homepage, service catalog, ecosystem, member paths, FAQ, and contact
- `services.html` — standalone service directory
- `about T20.html` — organization overview replacing the legacy personal-profile page
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

The repository is static HTML/CSS/JS. Publish the repository root with the existing hosting provider for `t20tech.site`; no backend, credentials, or private member portal are included in this frontend. Confirm the hosting account's document root and domain routing before publication. The member pathways link to the existing WhatsApp service contact and do not store member data.
