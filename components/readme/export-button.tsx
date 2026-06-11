'use client'

import { useState } from 'react'
import { Download, ExternalLink, Archive, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { downloadFromGitHub, downloadDeployedZip } from '@/lib/export-source'

/**
 * Paths of static files that Next.js copies verbatim to out/_next/static or
 * out/ root. We expose these for the "download source" ZIP strategy.
 *
 * For the simplest cross-host approach we always offer the GitHub archive
 * first, and the local-fetch ZIP as a secondary option.
 */
const SOURCE_PATHS = [
  '/source/app/page.tsx',
  '/source/app/layout.tsx',
  '/source/app/globals.css',
  '/source/app/viewer/page.tsx',
  '/source/next.config.mjs',
  '/source/package.json',
  '/source/README.md',
]

type Strategy = 'github' | 'zip'

interface ExportButtonProps {
  className?: string
}

export function ExportButton({ className }: ExportButtonProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleGitHub = () => {
    setOpen(false)
    downloadFromGitHub()
  }

  const handleZip = async () => {
    setOpen(false)
    setLoading(true)
    try {
      await downloadDeployedZip(SOURCE_PATHS)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn('relative', className)}>
      <div className="flex items-center">
        {/* Primary action — GitHub */}
        <button
          onClick={handleGitHub}
          disabled={loading}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-l text-xs font-medium bg-muted/50 border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50"
          title="Download source from GitHub"
        >
          {loading ? (
            <span className="w-3 h-3 rounded-full border border-current border-t-transparent animate-spin" />
          ) : (
            <Download size={11} />
          )}
          Export Source
        </button>

        {/* Dropdown toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center px-1.5 py-1 rounded-r border border-l-0 border-border text-muted-foreground hover:text-foreground hover:bg-muted bg-muted/50 transition-colors"
          aria-label="More export options"
        >
          <ChevronDown size={11} className={cn('transition-transform', open && 'rotate-180')} />
        </button>
      </div>

      {/* Dropdown */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1.5 z-50 w-56 rounded-lg border border-border bg-popover shadow-lg overflow-hidden">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Export options
              </p>
            </div>
            <button
              onClick={handleGitHub}
              className="w-full flex items-start gap-2.5 px-3 py-2.5 hover:bg-muted/50 transition-colors text-left"
            >
              <ExternalLink size={14} className="text-foreground mt-0.5 shrink-0" />
              <div>
                <div className="text-xs font-medium text-foreground">GitHub archive</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Download main.zip from the public repository
                </div>
              </div>
            </button>
            <button
              onClick={handleZip}
              className="w-full flex items-start gap-2.5 px-3 py-2.5 hover:bg-muted/50 transition-colors text-left border-t border-border"
            >
              <Archive size={14} className="text-foreground mt-0.5 shrink-0" />
              <div>
                <div className="text-xs font-medium text-foreground">Download ZIP</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Package source files locally — no external request
                </div>
              </div>
            </button>
            <div className="px-3 py-2 border-t border-border bg-muted/20">
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                All processing runs in your browser. No data leaves your machine.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
