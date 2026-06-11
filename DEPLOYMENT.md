# Deployment Checklist

README Visualizer is a fully static Next.js application. All processing runs
entirely in the browser — no server, no database, no API routes.

---

## Architecture summary

| Concern | Where it runs |
|---|---|
| Markdown parsing (`remark-parse`, `unified`) | Browser (client component) |
| Section / heading tree | Browser (`document-pipeline.ts`) |
| Statistics (word count, links, images …) | Browser (`document-pipeline.ts`) |
| Code snippet extraction & syntax highlighting | Browser (`highlight.js`) |
| Navigation, search, filtering | Browser (React state) |
| Content persistence across routes | `sessionStorage` |
| Fonts | Baked into the build by `next/font/google` at build time — no runtime CDN call needed |

---

## Build

```bash
pnpm install
pnpm build        # produces the `out/` directory
```

The `out/` directory is a complete static site. Serve it with any HTTP server:

```bash
npx serve out     # local preview
```

---

## GitHub Pages

1. Fork the repository.
2. Go to **Settings → Pages** and set the source to **GitHub Actions**.
3. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: corepack enable && pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out
      - uses: actions/deploy-pages@v4
```

If deploying to a sub-path (e.g. `username.github.io/readme-visualizer`), add
`basePath: '/readme-visualizer'` to `next.config.mjs`.

---

## Netlify

1. Connect the repository.
2. Build command: `pnpm build`
3. Publish directory: `out`
4. No environment variables required.

---

## Cloudflare Pages

1. Connect the repository.
2. Framework preset: **Next.js (Static HTML Export)**
3. Build command: `pnpm build`
4. Build output directory: `out`

---

## Local hosting (no Node.js)

Copy the `out/` directory to any web server (nginx, Apache, Caddy) or open
`out/index.html` directly. Because `trailingSlash: true` is set, every route
emits an `index.html` file — no rewrite rules required.

---

## Platform-specific dependencies

| Dependency | Status | Notes |
|---|---|---|
| `@vercel/analytics` | **Removed** | Was optional telemetry; not required for any feature |
| `next/font/google` | Safe | Fonts are downloaded once at build time and embedded in the output; no runtime network call |
| `sessionStorage` | Browser API | Available in all modern browsers; graceful no-op if unavailable |

## Remaining blockers

None. The application is fully portable as a static export.
