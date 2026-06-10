'use client'

import { useState, useCallback, useRef, useMemo } from 'react'
import { parseHeadings, parseCodeBlocks, parseStats } from '@/lib/markdown-parser'
import { LeftSidebar } from './left-sidebar'
import { RightSidebar } from './right-sidebar'
import { MarkdownViewer } from './markdown-viewer'
import { TopHeader } from './top-header'

interface DashboardProps {
  content: string
  filename: string
  onReset: () => void
}

export function Dashboard({ content, filename, onReset }: DashboardProps) {
  const [activeId, setActiveId] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [leftCollapsed, setLeftCollapsed] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const headings = useMemo(() => parseHeadings(content), [content])
  const codeBlocks = useMemo(() => parseCodeBlocks(content), [content])
  const stats = useMemo(() => parseStats(content), [content])

  const handleSectionSelect = useCallback((id: string) => {
    setActiveId(id)
    const el = document.getElementById(id)
    if (el && contentRef.current) {
      const container = contentRef.current
      const elTop = el.getBoundingClientRect().top
      const containerTop = container.getBoundingClientRect().top
      const offset = elTop - containerTop + container.scrollTop - 80
      container.scrollTo({ top: offset, behavior: 'smooth' })
    }
  }, [])

  const handleSectionVisible = useCallback((id: string) => {
    setActiveId(id)
  }, [])

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <TopHeader
        filename={filename}
        stats={stats}
        onReset={onReset}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <LeftSidebar
          headings={headings}
          activeId={activeId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectSection={handleSectionSelect}
          filename={filename}
          collapsed={leftCollapsed}
          onToggleCollapse={() => setLeftCollapsed(prev => !prev)}
        />

        {/* Main reading column */}
        <main
          ref={contentRef}
          className="flex-1 overflow-y-auto min-w-0 scroll-smooth"
          role="main"
          aria-label="README content"
        >
          {/* Centered reading column: max 860px, generous vertical padding */}
          <div className="max-w-[860px] mx-auto px-8 md:px-12 lg:px-16 py-12">
            {searchQuery.trim() && (
              <div className="mb-8 flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-amber-50 border border-amber-200/80">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span className="text-xs text-amber-700">
                  Showing results for{' '}
                  <span className="font-mono font-medium bg-amber-100 px-1.5 py-0.5 rounded">
                    &quot;{searchQuery}&quot;
                  </span>
                </span>
              </div>
            )}

            <MarkdownViewer
              content={content}
              searchQuery={searchQuery}
              onSectionVisible={handleSectionVisible}
            />

            <div className="h-32" />
          </div>
        </main>

        {/* Right Sidebar */}
        <RightSidebar stats={stats} codeBlocks={codeBlocks} />
      </div>
    </div>
  )
}
