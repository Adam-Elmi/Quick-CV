# Quick CV

A browser-based CV builder. Fill in your details, pick a template, and download a PDF — no account, no server, nothing stored outside your own device.

Templates are written in [SomMark](https://github.com/Adam-Elmi/SomMark), a markup language that makes it easy for contributors to design and add new CV layouts.

> **Status: 99% complete — only more templates remain.**

---

## Todo

### Core App
- [x] CV form with sections: Profile, Education, Experience, Skills, Projects, Languages, Awards, Certifications
- [x] Per-field text styling — bold, italic, color, font size
- [x] Live PDF preview with zoom controls
- [x] PDF download
- [x] Page counter in preview (Page 1 / N)
- [x] Mobile layout — edit / preview tab toggle
- [x] Responsive across screen sizes

### Data & Storage
- [x] All data stored in localStorage — nothing sent to a server
- [x] Storage usage tracker
- [x] Fill with demo data (per-template sample data defined by contributors)
- [x] Clear all data
- [x] Zoom level and selected template survive a data reset

### Templates
- [x] Template engine — layouts written in SomMark
- [x] Template selector in the topbar
- [x] Each template defines its own fonts, placeholder defaults, and demo data in a config file
- [x] Basic CV template
- [x] Modern Sidebar template
- [ ] More templates

### Customization
- [x] Page size — A4 / Letter
- [x] Font family (options defined per template)
- [x] Custom CV filename
- [x] Settings panel (ready for future options)

---

## Adding a Template

Templates live in `src/Templates/`. Each template is a folder containing:

- `*.smark` — the CV layout written in SomMark
- `config.ts` — template name, supported fonts, required fields, placeholder defaults, and demo data

See the Developer Guide inside the app for full instructions.


---

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- SomMark (template engine)
- react-pdf / react-pdf-html (PDF generation)
- react-colorful (color picker)
