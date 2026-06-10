'use client'

import { useState, useCallback } from 'react'
import { ChevronRight } from 'lucide-react'
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

  // Indent by depth — each level adds 12px of left padding
  const paddingLeft = 8 + depth * 12

  return (
    <div>
      <div
        className={cn(
          'group relative flex items-center gap-1 py-1 pr-2 rounded-md cursor-pointer transition-all duration-100 select-none',
          isActive
            ? 'bg-accent/60 text-primary'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
          textMatches && searchQuery.trim() && !isActive ? 'text-foreground' : '',
        )}
        style={{ paddingLeft }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick() }}
        aria-current={isActive ? 'true' : undefined}
      >
        {/* Active indicator bar */}
        {isActive && (
          <span className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-primary" />
        )}

        {/* Expand/collapse chevron */}
        <span
          className={cn(
            'shrink-0 w-3.5 h-3.5 flex items-center justify-center',
            !hasChildren && 'invisible pointer-events-none',
          )}
          onClick={handleToggle}
          role="button"
          aria-label={expanded ? 'Collapse' : 'Expand'}
          tabIndex={-1}
        >
          <ChevronRight
            size={10}
            className={cn(
              'text-muted-foreground/40 transition-transform duration-150',
              expanded && 'rotate-90',
              'group-hover:text-muted-foreground/70',
            )}
          />
        </span>

        {/* Label */}
        <span
          className={cn(
            'truncate leading-relaxed',
            depth === 0 ? 'text-xs font-medium' : 'text-xs font-normal',
            isActive && 'font-medium',
          )}
        >
          {node.text}
        </span>
      </div>

      {/* Children with vertical guide line */}
      {hasChildren && expanded && (
        <div className="relative" style={{ marginLeft: paddingLeft + 8 }}>
          <span className="absolute left-1.5 top-0 bottom-0 w-px bg-border" />
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
  if (headings.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-muted-foreground/50">
        No sections found
      </div>
    )
  }

  return (
    <div className="space-y-0.5 pb-4">
      {headings.map(node => (
        <SectionNode
          key={node.id}
          node={node}
          activeId={activeId}
          searchQuery={searchQuery}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
