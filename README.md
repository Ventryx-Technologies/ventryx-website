# Ventryx Website

Marketing and product website for Ventryx Technologies, including the public site, documentation pages, support content, and the interactive Operra demo workspace.

## Overview

This repo is a static HTML/CSS/JavaScript site.

It includes:
- marketing pages for Ventryx
- platform, product, company, pricing, and resource pages
- documentation and support pages
- a mock login flow
- the interactive `operra-demo.html` demo account with `Startup`, `Growth`, and `Enterprise` demo tiers

## Stack

- HTML
- CSS
- vanilla JavaScript
- Google Fonts (`Inter`)

No build step is required.

## Project Structure

Key top-level pages:
- `index.html`
- `platform.html`
- `products.html`
- `solutions.html`
- `resources.html`
- `company.html`
- `pricing.html`
- `contact.html`
- `about.html`
- `developers.html`
- `docs.html`
- `support.html`
- `login.html`
- `operra.html`
- `operra-demo.html`

Key folders:
- `assets/css/` shared styles and page styles
- `assets/js/` shared scripts and demo behavior
- `platform/` platform detail pages
- `products/` product detail pages
- `docs/` documentation detail pages
- `support/` support subpages
- `components/` reference header/footer snippets and component placeholders
- `data/` JSON data files used for site content/reference

## Local Preview

Because this is a static site, the easiest preview is a local HTTP server from the repo root:

```bash
python3 -m http.server 8123
```

Then open:

```text
http://127.0.0.1:8123/
```

## Demo Account

The mock login page supports a demo account:

- Email: `demo@ventryx.com`
- Password: `demo`

Successful demo login routes to:

- `operra-demo.html`

The Operra demo includes:
- Dashboard
- Analytics
- API Keys
- Request Logs
- Rate Limits
- Billing
- Organizations
- Settings placeholder

Tier switcher:
- `Startup`
- `Growth`
- `Enterprise`

Important:
- this is a front-end demo only
- search is mock behavior
- create/edit actions are mock behavior
- forms and account actions are not connected to a backend

## Navigation

Shared navigation behavior lives in:

- `assets/js/main.js`

Important shared styles live in:

- `assets/css/main.css`
- `assets/css/navigation.css`

The main marketing pages use the interactive desktop mega-menu and mobile menu pattern.

## Main Demo Files

- [operra-demo.html](./operra-demo.html)
- [assets/js/operra-demo.js](./assets/js/operra-demo.js)
- [assets/css/pages/operra-demo.css](./assets/css/pages/operra-demo.css)

## Launch Notes

Before publishing, do a quick manual pass for:
- desktop navbar and mega-menu behavior
- mobile menu behavior
- top-level page links
- nested page links
- demo tier switching in `operra-demo.html`
- login-to-demo flow from `login.html`

## Repository Notes

- `components/site-header.html` and `components/site-footer.html` are reference snippets, not a live include system
- the site currently relies on static page files rather than a templating/build pipeline
- if you change shared nav or footer markup, check multiple top-level pages afterward

## License

See [LICENSE](./LICENSE).
