'use client'

import { useState } from 'react'
import { PanelLeftClose, PanelLeftOpen, BookOpen, RotateCcw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SectionTree } from './section-tree'
import { SearchBar } from './search-bar'
import type { HeadingNode } from '@/lib/markdown-parser'

interface LeftSidebarProps {
  headings: HeadingNode[]
  activeId: string
  searchQuery: string
  onSearchChange: (q: string) => void
  onSelectSection: (id: string) => void
  onReset: () => void
  filename?: string
}

export function LeftSidebar({
  headings,
  activeId,
  searchQuery,
  onSearchChange,
  onSelectSection,
  onReset,
  filename,
}: LeftSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'flex flex-col border-r border-border bg-sidebar transition-all duration-300 ease-in-out overflow-hidden shrink-0',
        collapsed ? 'w-12' : 'w-64',
      )}
    >
      {/* Header */}
      <div className={cn(
        'flex items-center border-b border-border px-3 py-3 gap-2 shrink-0',
        collapsed ? 'justify-center' : 'justify-between',
      )}>
        {!collapsed && (
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-5 h-5 rounded bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
              <BookOpen size={11} className="text-primary" />
            </div>
            <span className="font-semibold text-xs text-foreground truncate">
              {filename ?? 'README.md'}
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(prev => !prev)}
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />}
        </button>
      </div>

      {!collapsed && (
        <>
          {/* Search */}
          <div className="px-3 py-2 border-b border-border shrink-0">
            <SearchBar
              query={searchQuery}
              onChange={onSearchChange}
              className="text-xs"
            />
          </div>

          {/* Tree */}
          <nav className="flex-1 overflow-y-auto px-2 py-3 scrollbar-thin">
            <SectionTree
              headings={headings}
              activeId={activeId}
              searchQuery={searchQuery}
              onSelect={onSelectSection}
            />
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-3 shrink-0">
            <button
              onClick={onReset}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <RotateCcw size={12} />
              Load new README
            </button>
          </div>
        </>
      )}

      {/* Collapsed icons */}
      {collapsed && (
        <div className="flex-1 flex flex-col items-center gap-2 pt-3 overflow-hidden">
          <button
            onClick={onReset}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Load new README"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      )}
    </aside>
  )
}
