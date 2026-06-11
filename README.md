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
- Fully static export — deploy to GitHub Pages, Netlify, Cloudflare Pages, or any web server

---

## Quick start

```bash
git clone https://github.com/fantasticasd/v0-readme-visualizer.git
cd v0-readme-visualizer
pnpm install
pnpm dev          # open http://localhost:3000
```

---

## Build a static site

```bash
pnpm build        # produces the out/ directory
npx serve out     # optional: preview locally
```

The `out/` directory is a complete static site — copy it to any web server or open `out/index.html` directly.

---

## Deploy to GitHub Pages

1. Fork this repository.
2. Go to **Settings → Pages → Source → GitHub Actions**.
3. Add the workflow below at `.github/workflows/deploy.yml` and push — it runs automatically on every push to `main`.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/upload-pages-artifact@v3
        with: { path: out }

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

---

## Deploy to Netlify

| Setting | Value |
|---|---|
| Build command | `pnpm build` |
| Publish directory | `out` |
| Environment variables | none required |

---

## Deploy to Cloudflare Pages

| Setting | Value |
|---|---|
| Framework preset | Next.js (Static HTML Export) |
| Build command | `pnpm build` |
| Build output directory | `out` |

---

## Architecture

All processing runs entirely in the browser — no server, no API routes.

| Concern | Where it runs |
|---|---|
| Markdown parsing | Browser (`remark`, `unified`) |
| Section tree + stats | Browser (`lib/document-pipeline.ts`) |
| Syntax highlighting | Browser (`highlight.js`) |
| Search + navigation | Browser (React state) |
| Content persistence | `sessionStorage` |

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

---

## License

MIT — free to use, fork, and deploy anywhere.
