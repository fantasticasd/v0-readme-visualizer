'use client'

import { useState } from 'react'
import { BarChart2, Code2, PanelRightClose, PanelRightOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { StatsCards } from './stats-cards'
import { CodeSnippets } from './code-snippets'
import type { ReadmeStats, CodeBlock } from '@/lib/markdown-parser'

type Tab = 'stats' | 'snippets'

interface RightSidebarProps {
  stats: ReadmeStats
  codeBlocks: CodeBlock[]
}

export function RightSidebar({ stats, codeBlocks }: RightSidebarProps) {
  const [tab, setTab] = useState<Tab>('stats')
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'flex flex-col border-l border-border bg-sidebar transition-all duration-300 ease-in-out shrink-0',
        collapsed ? 'w-12' : 'w-72',
      )}
    >
      {/* Header */}
      <div className={cn(
        'flex items-center border-b border-border px-3 py-3 gap-2 shrink-0',
        collapsed ? 'justify-center' : 'justify-between',
      )}>
        {!collapsed && (
          <div className="flex gap-1 flex-1 min-w-0">
            <button
              onClick={() => setTab('stats')}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors',
                tab === 'stats'
                  ? 'bg-primary/15 text-primary border border-primary/25'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
            >
              <BarChart2 size={12} />
              Stats
            </button>
            <button
              onClick={() => setTab('snippets')}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors relative',
                tab === 'snippets'
                  ? 'bg-primary/15 text-primary border border-primary/25'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted',
              )}
            >
              <Code2 size={12} />
              Snippets
              {codeBlocks.length > 0 && (
                <span className="ml-1 text-xs bg-muted text-muted-foreground rounded px-1 font-mono">
                  {codeBlocks.length}
                </span>
              )}
            </button>
          </div>
        )}

        <button
          onClick={() => setCollapsed(prev => !prev)}
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelRightOpen size={14} /> : <PanelRightClose size={14} />}
        </button>
      </div>

      {!collapsed && (
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {tab === 'stats' ? (
            <StatsCards stats={stats} />
          ) : (
            <CodeSnippets blocks={codeBlocks} />
          )}
        </div>
      )}

      {/* Collapsed tab icons */}
      {collapsed && (
        <div className="flex flex-col items-center gap-2 pt-3">
          <button
            onClick={() => { setCollapsed(false); setTab('stats') }}
            className={cn(
              'p-2 rounded-md transition-colors',
              tab === 'stats' ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted',
            )}
            title="Statistics"
          >
            <BarChart2 size={14} />
          </button>
          <button
            onClick={() => { setCollapsed(false); setTab('snippets') }}
            className={cn(
              'p-2 rounded-md transition-colors',
              tab === 'snippets' ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground hover:bg-muted',
            )}
            title="Code Snippets"
          >
            <Code2 size={14} />
          </button>
        </div>
      )}
    </aside>
  )
}
