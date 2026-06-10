'use client'

import { useState } from 'react'
import { Check, Copy, Code2, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
interface CodeBlock {
  id: string
  language: string
  code: string
  lineCount: number
}

const LANGUAGE_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  typescript: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'TypeScript' },
  tsx: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'TSX' },
  javascript: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'JavaScript' },
  jsx: { bg: 'bg-amber-50', text: 'text-amber-700', label: 'JSX' },
  bash: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Bash' },
  shell: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Shell' },
  sh: { bg: 'bg-emerald-50', text: 'text-emerald-700', label: 'Shell' },
  python: { bg: 'bg-yellow-50', text: 'text-yellow-700', label: 'Python' },
  html: { bg: 'bg-orange-50', text: 'text-orange-700', label: 'HTML' },
  css: { bg: 'bg-cyan-50', text: 'text-cyan-700', label: 'CSS' },
  json: { bg: 'bg-rose-50', text: 'text-rose-700', label: 'JSON' },
  powershell: { bg: 'bg-blue-50', text: 'text-blue-700', label: 'PowerShell' },
  text: { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Text' },
}

function getLangStyle(lang: string) {
  return LANGUAGE_COLORS[lang.toLowerCase()] ?? { bg: 'bg-muted', text: 'text-muted-foreground', label: lang || 'code' }
}

interface CodeSnippetItemProps {
  block: CodeBlock
  index: number
}

function CodeSnippetItem({ block, index }: CodeSnippetItemProps) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(index < 3)
  const langStyle = getLangStyle(block.language)
  const isLong = block.lineCount > 8

  const handleCopy = async () => {
    await navigator.clipboard.writeText(block.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <Code2 size={12} className="text-muted-foreground/60" />
          <span className={cn('text-xs font-mono font-medium px-1.5 py-0.5 rounded', langStyle.bg, langStyle.text)}>
            {langStyle.label}
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            {block.lineCount} {block.lineCount === 1 ? 'line' : 'lines'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {isLong && (
            <button
              onClick={() => setExpanded(prev => !prev)}
              className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              aria-label={expanded ? 'Collapse' : 'Expand'}
            >
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          )}
          <button
            onClick={handleCopy}
            className={cn(
              'flex items-center gap-1 px-2 py-1 rounded text-xs transition-all',
              copied
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted',
            )}
            aria-label="Copy code"
          >
            {copied ? (
              <><Check size={11} /><span>Copied</span></>
            ) : (
              <><Copy size={11} /><span>Copy</span></>
            )}
          </button>
        </div>
      </div>

      {/* Code */}
      {expanded && (
        <div className="relative">
          <pre className={cn(
            'overflow-x-auto p-3 text-xs font-mono leading-relaxed',
            isLong && 'max-h-48 overflow-y-auto',
          )}>
            <code className="text-foreground/85">{block.code}</code>
          </pre>
        </div>
      )}

      {!expanded && (
        <button
          onClick={() => setExpanded(true)}
          className="w-full py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors text-center"
        >
          Show {block.lineCount} lines...
        </button>
      )}
    </div>
  )
}

interface CodeSnippetsProps {
  blocks: CodeBlock[]
}

export function CodeSnippets({ blocks }: CodeSnippetsProps) {
  const [filter, setFilter] = useState<string>('all')

  const languages = Array.from(new Set(blocks.map(b => b.language || 'text')))
  const filtered = filter === 'all' ? blocks : blocks.filter(b => (b.language || 'text') === filter)

  return (
    <div className="space-y-3">
      <div className="px-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Code Snippets
          </h3>
          <span className="text-xs font-mono text-muted-foreground/60">{filtered.length}</span>
        </div>

        {/* Language filter */}
        {languages.length > 1 && (
          <div className="flex flex-wrap gap-1 mb-3">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                'px-2 py-0.5 rounded text-xs transition-colors',
                filter === 'all'
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80',
              )}
            >
              All
            </button>
            {languages.map(lang => {
              const style = getLangStyle(lang)
              return (
                <button
                  key={lang}
                  onClick={() => setFilter(lang)}
                  className={cn(
                    'px-2 py-0.5 rounded text-xs transition-colors',
                    filter === lang
                      ? cn(style.bg, style.text, 'border border-current/20')
                      : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80',
                  )}
                >
                  {getLangStyle(lang).label}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-xs">
          No code snippets found
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((block, i) => (
            <CodeSnippetItem key={block.id} block={block} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
