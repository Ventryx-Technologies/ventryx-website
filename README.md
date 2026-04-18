# Ventryx Technologies — Web Platform

This repository contains the public-facing web platform for **Ventryx Technologies, LLC**, including the marketing site, product experience, documentation, support content, and the interactive Operra demo environment.

---

## 🚀 Overview

This is a statically served front-end application built with HTML, CSS, and vanilla JavaScript, designed for performance, simplicity, and full control over user experience without a build pipeline.

It includes:

* Marketing pages for Ventryx Technologies
* Platform, product, company, pricing, and resource pages
* Documentation and support content
* A mock authentication flow
* A fully interactive Operra demo workspace

---

## 🎯 Purpose

This repository serves as:

* The primary marketing and brand presence for Ventryx Technologies
* A product showcase for the Operra platform
* A documentation and support entry point
* A controlled demo environment for prospects, clients, and stakeholders

---

## 🧠 Operra Interactive Demo

The platform includes a fully interactive front-end simulation of **Operra**, Ventryx’s core SaaS product.

This allows users to explore product capabilities without requiring authentication or backend dependencies.

### Capabilities

* Multi-tier simulation:

  * `Startup`
  * `Growth`
  * `Enterprise`
* Dashboard metrics and live activity feeds
* API key management interface
* Request logs and analytics views
* Billing and organization UI
* Settings and platform controls (UI-level)

### Purpose of the Demo

* Demonstrate product capabilities
* Communicate scalability across tiers
* Support sales, onboarding, and presentations

### Demo Access

* Email: `demo@ventryx.com`
* Password: `demo`

Successful login routes to:

* `operra-demo.html`

### Notes

* This is a **front-end simulation only**
* Search functionality is mocked
* Create/edit actions are simulated
* No backend or database is connected

---

## 🧩 Stack

* HTML5
* CSS3
* Vanilla JavaScript
* Google Fonts (`Inter`)

No build step or framework is required.

---

## 📁 Project Structure

### Top-Level Pages

* `index.html`
* `platform.html`
* `products.html`
* `solutions.html`
* `resources.html`
* `company.html`
* `pricing.html`
* `contact.html`
* `about.html`
* `developers.html`
* `docs.html`
* `support.html`
* `login.html`
* `operra.html`
* `operra-demo.html`

### Key Directories

* `assets/css/` — shared styles and page-level styles
* `assets/js/` — shared scripts and demo behavior
* `platform/` — platform-specific pages
* `products/` — product detail pages
* `docs/` — documentation content
* `support/` — support and help pages
* `components/` — header/footer references and UI snippets
* `data/` — JSON data used for content and demo behavior

---

## 🧪 Local Development

Because this is a static site, you can run a local server from the project root:

```bash
python3 -m http.server 8123
```

Then open:

```text
http://127.0.0.1:8123/
```

---

## 🧭 Navigation & UI

Shared navigation logic:

* `assets/js/main.js`

Shared styles:

* `assets/css/main.css`
* `assets/css/navigation.css`

The site uses:

* Interactive desktop mega-menu
* Responsive mobile navigation system

---

## 🖥️ Demo System Files

* `operra-demo.html`
* `assets/js/operra-demo.js`
* `assets/css/pages/operra-demo.css`

---

## 📦 Status

* Production Ready
* Static Deployment (CDN-compatible)
* No Build Step Required

---

## 🚀 Pre-Launch Checklist

Before deployment, verify:

* Desktop navigation and mega-menu behavior
* Mobile navigation functionality
* Internal and nested page links
* Demo tier switching (`Startup`, `Growth`, `Enterprise`)
* Login-to-demo flow from `login.html`

Also validate using browser developer tools:

* No console errors
* No missing assets (404s)
* No blocked scripts or styles

---

## ⚠️ Repository Notes

* `components/site-header.html` and `components/site-footer.html` are reference snippets (no templating system is used)
* The site is fully static — changes to shared components must be manually applied across pages
* After updating navigation or layout, test multiple pages for consistency

---

## 📄 License

See [LICENSE](./LICENSE)

---
