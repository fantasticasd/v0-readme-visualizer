'use client'

import { BookOpen, FileText, RotateCcw, List, GitBranch } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { cn } from '@/lib/utils'

interface StatsShape {
  wordCount: number
  headingCount: number
  codeBlockCount: number
  readingTime: number
}

export type ViewMode = 'tree' | 'mindmap'

interface TopHeaderProps {
  filename: string
  stats: StatsShape
  onReset: () => void
  activeView: ViewMode
  onViewChange: (v: ViewMode) => void
}

export function TopHeader({ filename, stats, onReset, activeView, onViewChange }: TopHeaderProps) {
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

        {/* View toggle */}
        <div className="flex items-center gap-0.5 bg-muted rounded-md p-0.5">
          <button
            onClick={() => onViewChange('tree')}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors',
              activeView === 'tree'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
            aria-label="Tree view"
          >
            <List size={12} />
            <span className="hidden sm:inline">Tree</span>
          </button>
          <button
            onClick={() => onViewChange('mindmap')}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors',
              activeView === 'mindmap'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground',
            )}
            aria-label="Mind map view"
          >
            <GitBranch size={12} />
            <span className="hidden sm:inline">Mind Map</span>
          </button>
        </div>

        <ThemeToggle />

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
