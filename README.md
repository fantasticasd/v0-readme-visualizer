# README Visualizer

Transform large `README.md` files into an interactive dashboard with search, navigation, statistics, syntax-highlighted code snippets, and a mind-map view.

**Fully static. No backend. No database. No auth. Runs anywhere.**

---

## Features

- Drag-and-drop or paste any Markdown file
- Collapsible section tree with active-section tracking
- Full-text search with inline highlighting
- Statistics panel (word count, headings, links, images, read time)
- Syntax-highlighted code snippet panel with one-click copy
- Interactive mind-map view of the document structure
- Dark / light theme toggle with `prefers-color-scheme` support
- Export full source code as a ZIP for self-hosting

---

## Quick start

```bash
git clone https://github.com/fantasticasd/v0-readme-visualizer.git
cd v0-readme-visualizer
npm install        # or: pnpm install / yarn
npm run dev        # open http://localhost:3000
```

---

## Build a static site

```bash
npm run build      # produces the out/ directory
npx serve out      # optional: preview locally
```

The `out/` directory is a complete static site. Copy it to any web server or open `out/index.html` directly.

---

## Self-hosting / Running without Vercel

This project has **zero Vercel dependencies**. It uses only standard browser APIs and generic npm packages.

### Deploy to GitHub Pages

1. Fork this repository.
2. Go to **Settings → Pages → Source → GitHub Actions**.
3. The included workflow (`.github/workflows/deploy.yml`) runs automatically on every push to `main`.

If deploying to a sub-path (e.g. `username.github.io/readme-visualizer`), add `basePath: '/readme-visualizer'` to `next.config.mjs`.

### Deploy to Netlify

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `out` |
| Environment variables | none required |

### Deploy to Cloudflare Pages

| Setting | Value |
|---|---|
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |

### Local file serving (no Node.js)

Copy the `out/` directory to any web server (nginx, Apache, Caddy). Because `trailingSlash: true` is set, every route emits its own `index.html` — no rewrite rules required.

---

## Architecture

All processing runs entirely in the browser — no server, no API routes, no environment variables needed.

| Concern | Where it runs |
|---|---|
| Markdown parsing | Browser (`remark`, `unified`) |
| Section tree + stats | Browser (`lib/document-pipeline.ts`) |
| Syntax highlighting | Browser (`highlight.js`) |
| Search + navigation | Browser (React state) |
| Content persistence | `sessionStorage` |
| Fonts | Baked in at build time (`next/font/google`) |

---

## Project structure

```
app/
  page.tsx              Upload / landing screen
  viewer/page.tsx       Dashboard route
  layout.tsx            Root layout + FOUC-prevention script
  globals.css           Design tokens (light + dark)

components/readme/
  upload-screen.tsx     Landing page UI + source export button
  dashboard.tsx         Main viewer shell
  top-header.tsx        Header with view/theme toggles
  left-sidebar.tsx      Collapsible section tree panel
  right-sidebar.tsx     Stats + snippets tabs
  section-tree.tsx      Recursive heading tree
  markdown-viewer.tsx   react-markdown renderer
  stats-cards.tsx       Statistics display
  code-snippets.tsx     Syntax-highlighted code blocks
  mind-map.tsx          SVG mind-map view
  search-bar.tsx        Search input
  theme-toggle.tsx      Sun/Moon toggle
  glow-net.tsx          Landing page background effect
  export-button.tsx     Client-side ZIP source download

lib/
  document-pipeline.ts  Markdown → DocumentModel
  document-model.ts     Type definitions
  mind-map-layout.ts    Tree layout algorithm
  markdown-parser.ts    Re-export shim
  mock-readme.ts        Demo content
  utils.ts              cn() helper
```

---

## Tech stack

| Library | Purpose |
|---|---|
| Next.js 16 | Framework (static export) |
| React 19 | UI |
| Tailwind CSS v4 | Styling |
| remark / unified | Markdown parsing |
| highlight.js | Syntax highlighting |
| react-markdown | Markdown rendering |
| lucide-react | Icons |
| jszip | Client-side source export |

---

## License

MIT — free to use, fork, and deploy anywhere.
