# README Visualizer

Transform large `README.md` files into an interactive dashboard with search, section navigation, statistics, code snippets, and a mind-map view.

**Fully static. No backend. No API keys. No Vercel required.**

---

## Features

- Drag-and-drop or paste any Markdown file
- Collapsible section tree (left sidebar)
- Full Markdown rendering with syntax-highlighted code blocks
- Statistics panel: word count, headings, links, images, read time
- Code snippets panel with one-click copy
- Mind map visualization of the heading hierarchy
- Full-text search with result highlighting
- Light / dark theme (persisted to `localStorage`)
- 100% client-side — works offline after first load

---

## Running locally

```bash
git clone https://github.com/fantasticasd/v0-readme-visualizer.git
cd v0-readme-visualizer

npm install        # or pnpm install / yarn install
npm run build      # produces the out/ directory
npm start          # serves out/ on http://localhost:3000
```

For development with hot reload:

```bash
npm run dev
```

---

## Self-hosting / Running without Vercel

The `npm run build` command produces a fully self-contained `out/` directory of static HTML, CSS, and JS. Serve it with any HTTP server:

```bash
# Node
npx serve out

# Python
python -m http.server 3000 --directory out

# nginx — point root to out/
```

### GitHub Pages

1. Fork this repository.
2. Go to **Settings → Pages** and set source to **GitHub Actions**.
3. Push to `main` — the included workflow (`.github/workflows/deploy.yml`) builds and deploys automatically.

If deploying to a sub-path (e.g. `username.github.io/readme-visualizer`), add this to `next.config.mjs`:

```js
basePath: '/readme-visualizer',
assetPrefix: '/readme-visualizer/',
```

### Netlify

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `out` |
| Environment variables | none |

### Cloudflare Pages

| Setting | Value |
|---|---|
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |

---

## Tech stack

| Concern | Library |
|---|---|
| Framework | Next.js 16 (static export) |
| Markdown parsing | `remark-parse` + `unified` |
| Markdown rendering | `react-markdown` + `rehype-highlight` |
| Syntax highlighting | `highlight.js` (github theme) |
| Styling | Tailwind CSS v4 |
| Icons | `lucide-react` |
| File upload | `react-dropzone` |

All processing runs in the browser. No server-side code is used at runtime.

---

## Contributing

Pull requests are welcome. To add a feature:

```bash
git checkout -b my-feature
npm run dev        # start dev server
# make your changes
git commit -m "feat: describe your change"
git push origin my-feature
# open a pull request
```

---

## License

MIT
