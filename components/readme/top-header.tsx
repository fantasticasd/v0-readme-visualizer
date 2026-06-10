'use client'

import { BookOpen, FileText, RotateCcw } from 'lucide-react'
import type { ReadmeStats } from '@/lib/markdown-parser'

interface TopHeaderProps {
  filename: string
  stats: ReadmeStats
  onReset: () => void
}

export function TopHeader({ filename, stats, onReset }: TopHeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 h-12 border-b border-border bg-card shrink-0 gap-6">
      {/* Left: wordmark + file */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          <BookOpen size={15} className="text-primary" />
          <span className="font-semibold text-sm text-foreground tracking-tight">README Visualizer</span>
        </div>

        <span className="text-border select-none">/</span>

        <div className="flex items-center gap-1.5 min-w-0">
          <FileText size={12} className="text-muted-foreground/60 shrink-0" />
          <span className="text-sm text-muted-foreground font-mono truncate">{filename}</span>
        </div>
      </div>

      {/* Right: compact metadata + reset */}
      <div className="flex items-center gap-5 shrink-0">
        <div className="hidden sm:flex items-center gap-4 text-xs text-muted-foreground">
          <span>
            <span className="font-mono font-medium text-foreground tabular-nums">{stats.wordCount.toLocaleString()}</span>
            <span className="ml-1">words</span>
          </span>
          <span>
            <span className="font-mono font-medium text-foreground tabular-nums">{stats.headingCount}</span>
            <span className="ml-1">sections</span>
          </span>
          <span>
            <span className="font-mono font-medium text-foreground tabular-nums">{stats.codeBlockCount}</span>
            <span className="ml-1">snippets</span>
          </span>
          <span>
            <span className="font-mono font-medium text-foreground tabular-nums">~{stats.readingTime}m</span>
            <span className="ml-1">read</span>
          </span>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Load a different README"
        >
          <RotateCcw size={12} />
          <span className="hidden md:inline">New file</span>
        </button>
      </div>
    </header>
  )
}
