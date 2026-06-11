'use client'

import { useState, useCallback, useRef } from 'react'
import { Search, X, ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  query: string
  onChange: (q: string) => void
  matchCount?: number
  currentMatch?: number
  onPrevMatch?: () => void
  onNextMatch?: () => void
  className?: string
}

export function SearchBar({
  query,
  onChange,
  matchCount = 0,
  currentMatch = 0,
  onPrevMatch,
  onNextMatch,
  className,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [focused, setFocused] = useState(false)

  const handleClear = useCallback(() => {
    onChange('')
    inputRef.current?.focus()
  }, [onChange])

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg border bg-muted/30 transition-all',
        focused ? 'border-primary/40 ring-1 ring-primary/15 glow-focus' : 'border-border',
        className,
      )}
    >
      <Search size={14} className="text-muted-foreground shrink-0" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search README..."
        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none min-w-0"
        aria-label="Search README content"
      />

      {query && (
        <div className="flex items-center gap-1 shrink-0">
          {matchCount > 0 && (
            <span className="text-xs text-muted-foreground font-mono px-1">
              {currentMatch + 1}/{matchCount}
            </span>
          )}
          {matchCount > 0 && onPrevMatch && onNextMatch && (
            <>
              <button
                onClick={onPrevMatch}
                className="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Previous match"
              >
                <ChevronUp size={13} />
              </button>
              <button
                onClick={onNextMatch}
                className="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Next match"
              >
                <ChevronDown size={13} />
              </button>
            </>
          )}
          <button
            onClick={handleClear}
            className="p-0.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Clear search"
          >
            <X size={13} />
          </button>
        </div>
      )}
    </div>
  )
}
