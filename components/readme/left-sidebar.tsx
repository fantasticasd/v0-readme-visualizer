'use client'

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
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
  filename?: string
  collapsed: boolean
  onToggleCollapse: () => void
}

export function LeftSidebar({
  headings,
  activeId,
  searchQuery,
  onSearchChange,
  onSelectSection,
  filename,
  collapsed,
  onToggleCollapse,
}: LeftSidebarProps) {
  return (
    <aside
      className={cn(
        'flex flex-col border-r border-border bg-background transition-all duration-300 ease-in-out overflow-hidden shrink-0',
        collapsed ? 'w-10' : 'w-60',
      )}
    >
      {/* Collapse toggle */}
      <div className={cn(
        'flex items-center border-b border-border px-2.5 h-10 shrink-0',
        collapsed ? 'justify-center' : 'justify-end',
      )}>
        <button
          onClick={onToggleCollapse}
          className="p-1 rounded text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeftOpen size={14} /> : <PanelLeftClose size={14} />}
        </button>
      </div>

      {!collapsed && (
        <>
          {/* Search */}
          <div className="px-3 py-2.5 border-b border-border shrink-0">
            <SearchBar
              query={searchQuery}
              onChange={onSearchChange}
            />
          </div>

          {/* Section label */}
          <div className="px-4 pt-4 pb-1 shrink-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              {filename ?? 'Contents'}
            </p>
          </div>

          {/* Tree */}
          <nav
            className="flex-1 overflow-y-auto py-1 px-2"
            aria-label="Document sections"
          >
            <SectionTree
              headings={headings}
              activeId={activeId}
              searchQuery={searchQuery}
              onSelect={onSelectSection}
            />
          </nav>
        </>
      )}
    </aside>
  )
}
