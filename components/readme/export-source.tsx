'use client'

import { useState } from 'react'
import { GitBranch, Download, X, Copy, Check, Terminal, Globe, Package } from 'lucide-react'
import { cn } from '@/lib/utils'

const REPO_URL = 'https://github.com/fantasticasd/v0-readme-visualizer'

const SETUP_STEPS = [
  { cmd: 'git clone https://github.com/fantasticasd/v0-readme-visualizer.git', label: 'Clone' },
  { cmd: 'cd v0-readme-visualizer', label: 'Enter directory' },
  { cmd: 'npm install', label: 'Install dependencies' },
  { cmd: 'npm run build', label: 'Build static export → out/' },
  { cmd: 'npx serve out', label: 'Preview locally' },
]

const HOSTS = [
  {
    name: 'GitHub Pages',
    icon: <GitBranch size={14} />,
    steps: ['Fork the repo', 'Settings → Pages → Source: GitHub Actions', 'Push to main — workflow deploys automatically'],
  },
  {
    name: 'Netlify',
    icon: <Globe size={14} />,
    steps: ['Connect repo in Netlify dashboard', 'Build command: npm run build', 'Publish directory: out'],
  },
  {
    name: 'Cloudflare Pages',
    icon: <Globe size={14} />,
    steps: ['Connect repo in Cloudflare dashboard', 'Framework: Next.js (Static HTML Export)', 'Build command: npm run build', 'Output: out'],
  },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <button
      onClick={handleCopy}
      className={cn(
        'flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors shrink-0',
        copied
          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
          : 'bg-muted text-muted-foreground hover:text-foreground',
      )}
      aria-label="Copy command"
    >
      {copied ? <Check size={10} /> : <Copy size={10} />}
    </button>
  )
}

interface ExportSourceProps {
  open: boolean
  onClose: () => void
}

export function ExportSource({ open, onClose }: ExportSourceProps) {
  const [activeHost, setActiveHost] = useState(0)

  if (!open) return null

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Open source export"
    >
      <div className="relative w-full max-w-xl bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <Package size={16} className="text-primary" />
            <h2 className="font-semibold text-sm text-foreground">Open Source & Self-Hosting</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X size={15} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(100vh-10rem)] p-5 space-y-6">
          {/* Intro */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            README Visualizer is fully open-source and runs as a static site — no backend, no API keys, no Vercel required. Fork it, clone it, and deploy anywhere.
          </p>

          {/* GitHub link */}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border bg-muted/30 hover:bg-muted/60 hover:border-border/80 transition-colors group"
          >
            <GitBranch size={18} className="text-foreground shrink-0" />
            <div className="min-w-0">
              <div className="text-sm font-medium text-foreground">fantasticasd/v0-readme-visualizer</div>
              <div className="text-xs text-muted-foreground truncate">{REPO_URL}</div>
            </div>
            <Download size={13} className="ml-auto text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
          </a>

          {/* Setup steps */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Terminal size={13} className="text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Run locally</span>
            </div>
            <div className="rounded-lg border border-border overflow-hidden">
              {SETUP_STEPS.map((step, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3 py-2.5 border-b border-border/60 last:border-0 group bg-[#f6f8fa] dark:bg-card"
                >
                  <span className="text-[10px] font-mono text-muted-foreground/60 w-4 tabular-nums select-none">{i + 1}</span>
                  <code className="flex-1 text-xs font-mono text-foreground/90 select-all">{step.cmd}</code>
                  <CopyButton text={step.cmd} />
                </div>
              ))}
            </div>
          </div>

          {/* Deploy targets */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe size={13} className="text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deploy to</span>
            </div>

            {/* Host tabs */}
            <div className="flex gap-1 mb-3">
              {HOSTS.map((h, i) => (
                <button
                  key={h.name}
                  onClick={() => setActiveHost(i)}
                  className={cn(
                    'flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-colors',
                    activeHost === i
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted',
                  )}
                >
                  {h.icon}
                  {h.name}
                </button>
              ))}
            </div>

            <ol className="space-y-1.5">
              {HOSTS[activeHost].steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <span className="mt-0.5 w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* No backend callout */}
          <div className="flex items-start gap-2.5 px-3.5 py-3 rounded-lg bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900">
            <Check size={14} className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
            <p className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
              <strong>Zero runtime dependencies.</strong> No server, no database, no environment variables. The built <code className="font-mono bg-emerald-100 dark:bg-emerald-900/50 px-1 rounded">out/</code> directory is a plain folder of HTML/CSS/JS files you can host anywhere.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
