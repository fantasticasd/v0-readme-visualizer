'use client'

import { useState, useCallback } from 'react'
import { ChevronRight, Hash } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { HeadingNode } from '@/lib/markdown-parser'

interface SectionNodeProps {
  node: HeadingNode
  activeId: string
  searchQuery: string
  onSelect: (id: string) => void
  depth?: number
}

function matchesSearch(node: HeadingNode, query: string): boolean {
  if (!query.trim()) return true
  const q = query.toLowerCase()
  if (node.text.toLowerCase().includes(q)) return true
  return node.children.some(child => matchesSearch(child, query))
}

function SectionNode({ node, activeId, searchQuery, onSelect, depth = 0 }: SectionNodeProps) {
  const hasChildren = node.children.length > 0
  const [expanded, setExpanded] = useState(true)
  const isActive = activeId === node.id
  const matches = matchesSearch(node, searchQuery)
  const textMatches = !searchQuery.trim() || node.text.toLowerCase().includes(searchQuery.toLowerCase())

  const handleClick = useCallback(() => {
    onSelect(node.id)
  }, [node.id, onSelect])

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setExpanded(prev => !prev)
  }, [])

  if (!matches) return null

  const levelColors: Record<number, string> = {
    1: 'text-foreground font-semibold',
    2: 'text-foreground/90 font-medium',
    3: 'text-foreground/80',
    4: 'text-muted-foreground',
    5: 'text-muted-foreground',
    6: 'text-muted-foreground',
  }

  const indentSizes: Record<number, string> = {
    0: '',
    1: 'pl-3',
    2: 'pl-5',
    3: 'pl-7',
    4: 'pl-9',
    5: 'pl-11',
  }

  return (
    <div>
      <div
        className={cn(
          'group flex items-center gap-1.5 py-1 px-2 rounded-md cursor-pointer text-sm transition-all duration-150',
          indentSizes[depth] ?? 'pl-11',
          isActive
            ? 'bg-primary/15 text-primary border border-primary/20'
            : 'hover:bg-muted/60 text-muted-foreground hover:text-foreground',
          textMatches && searchQuery.trim() ? 'bg-amber-500/10' : '',
        )}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick() }}
        aria-current={isActive ? 'true' : undefined}
      >
        {/* Toggle button */}
        <button
          className={cn(
            'shrink-0 w-4 h-4 flex items-center justify-center rounded text-muted-foreground/50 hover:text-muted-foreground transition-all',
            !hasChildren && 'invisible pointer-events-none',
          )}
          onClick={handleToggle}
          aria-label={expanded ? 'Collapse' : 'Expand'}
          tabIndex={-1}
        >
          <ChevronRight
            size={10}
            className={cn('transition-transform duration-200', expanded && 'rotate-90')}
          />
        </button>

        {/* Level indicator */}
        {depth === 0 && (
          <Hash size={11} className={cn('shrink-0', isActive ? 'text-primary' : 'text-muted-foreground/40')} />
        )}

        <span className={cn('truncate text-xs leading-relaxed', levelColors[node.level] ?? 'text-muted-foreground', isActive && 'text-primary')}>
          {node.text}
        </span>
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <div className="relative ml-2">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-border/50" />
          {node.children.map(child => (
            <SectionNode
              key={child.id}
              node={child}
              activeId={activeId}
              searchQuery={searchQuery}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}

interface SectionTreeProps {
  headings: HeadingNode[]
  activeId: string
  searchQuery: string
  onSelect: (id: string) => void
}

export function SectionTree({ headings, activeId, searchQuery, onSelect }: SectionTreeProps) {
  const visibleCount = headings.filter(h => matchesSearch(h, searchQuery)).length

  return (
    <div className="space-y-0.5">
      <div className="px-1 mb-3 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Sections
        </h3>
        <span className="text-xs text-muted-foreground/60 font-mono">
          {searchQuery.trim() ? `${visibleCount} match` : `${headings.length} top`}
        </span>
      </div>

      {headings.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-xs">
          No sections found
        </div>
      ) : (
        headings.map(node => (
          <SectionNode
            key={node.id}
            node={node}
            activeId={activeId}
            searchQuery={searchQuery}
            onSelect={onSelect}
          />
        ))
      )}
    </div>
  )
}
