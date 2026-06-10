'use client'

import { BookOpen, ExternalLink, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ReadmeStats } from '@/lib/markdown-parser'

interface TopHeaderProps {
  filename: string
  stats: ReadmeStats
  activeSection: string
}

export function TopHeader({ filename, stats, activeSection }: TopHeaderProps) {
  return (
    <header className="flex items-center justify-between px-5 py-2.5 border-b border-border bg-card/50 backdrop-blur-sm shrink-0 gap-4">
      {/* Left: Logo + file */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-6 h-6 rounded bg-primary/20 border border-primary/30 flex items-center justify-center">
            <BookOpen size={13} className="text-primary" />
          </div>
          <span className="font-bold text-sm text-foreground hidden md:block">README Visualizer</span>
        </div>

        <span className="text-border hidden md:block">·</span>

        <div className="flex items-center gap-1.5 min-w-0">
          <FileText size={13} className="text-muted-foreground shrink-0" />
          <span className="text-sm text-muted-foreground font-mono truncate">{filename}</span>
        </div>

        {activeSection && (
          <>
            <span className="text-border hidden lg:block">·</span>
            <span className="text-xs text-muted-foreground hidden lg:block truncate max-w-[200px]">
              #{activeSection}
            </span>
          </>
        )}
      </div>

      {/* Right: Quick stats */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="font-mono font-medium text-foreground/80">{stats.wordCount.toLocaleString()}</span> words
          </span>
          <span className="text-border">·</span>
          <span className="flex items-center gap-1">
            <span className="font-mono font-medium text-foreground/80">{stats.headingCount}</span> sections
          </span>
          <span className="text-border">·</span>
          <span className="flex items-center gap-1">
            <span className="font-mono font-medium text-foreground/80">~{stats.readingTime}m</span> read
          </span>
        </div>

        <div
          className={cn(
            'flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border',
            'bg-emerald-50 border-emerald-200 text-emerald-700',
          )}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline">Live</span>
        </div>
      </div>
    </header>
  )
}
