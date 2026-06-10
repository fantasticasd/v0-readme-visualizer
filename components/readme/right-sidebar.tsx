'use client'

import { useState } from 'react'
import { BarChart2, Code2, PanelRightClose, PanelRightOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { StatsCards } from './stats-cards'
import { CodeSnippets } from './code-snippets'
interface StatsShape {
  wordCount: number
  headingCount: number
  codeBlockCount: number
  linkCount: number
  imageCount: number
  lineCount: number
  readingTime: number
}

interface CodeBlockShape {
  id: string
  language: string
  code: string
  lineCount: number
}

type Tab = 'stats' | 'snippets'

interface RightSidebarProps {
  stats: StatsShape
  codeBlocks: CodeBlockShape[]
}

export function RightSidebar({ stats, codeBlocks }: RightSidebarProps) {
  const [tab, setTab] = useState<Tab>('stats')
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'flex flex-col border-l border-border bg-background transition-all duration-300 ease-in-out shrink-0',
        collapsed ? 'w-10' : 'w-68',
      )}
    >
      {/* Header */}
      <div className={cn(
        'flex items-center border-b border-border px-2.5 h-10 gap-2 shrink-0',
        collapsed ? 'justify-center' : 'justify-between',
      )}>
        {!collapsed && (
          <div className="flex gap-0.5 flex-1 min-w-0">
            <button
              onClick={() => setTab('stats')}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-colors',
                tab === 'stats'
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
              )}
            >
              <BarChart2 size={12} />
              Stats
            </button>
            <button
              onClick={() => setTab('snippets')}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-colors',
                tab === 'snippets'
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
              )}
            >
              <Code2 size={12} />
              Snippets
              {codeBlocks.length > 0 && (
                <span className="ml-1 font-mono text-[10px] text-muted-foreground">
                  {codeBlocks.length}
                </span>
              )}
            </button>
          </div>
        )}

        <button
          onClick={() => setCollapsed(prev => !prev)}
          className="p-1 rounded text-muted-foreground/50 hover:text-muted-foreground transition-colors shrink-0"
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
        <div className="flex flex-col items-center gap-1 pt-3">
          <button
            onClick={() => { setCollapsed(false); setTab('stats') }}
            className={cn(
              'p-1.5 rounded transition-colors',
              tab === 'stats' ? 'text-primary' : 'text-muted-foreground/50 hover:text-muted-foreground',
            )}
            title="Statistics"
          >
            <BarChart2 size={14} />
          </button>
          <button
            onClick={() => { setCollapsed(false); setTab('snippets') }}
            className={cn(
              'p-1.5 rounded transition-colors',
              tab === 'snippets' ? 'text-primary' : 'text-muted-foreground/50 hover:text-muted-foreground',
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
