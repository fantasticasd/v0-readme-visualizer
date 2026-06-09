'use client'

import { useState, useCallback, useRef, useMemo } from 'react'
import { parseHeadings, parseCodeBlocks, parseStats, flattenHeadings } from '@/lib/markdown-parser'
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
  const contentRef = useRef<HTMLDivElement>(null)

  const headings = useMemo(() => parseHeadings(content), [content])
  const codeBlocks = useMemo(() => parseCodeBlocks(content), [content])
  const stats = useMemo(() => parseStats(content), [content])
  const flatHeadings = useMemo(() => flattenHeadings(headings), [headings])

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
        activeSection={activeId}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <LeftSidebar
          headings={headings}
          activeId={activeId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectSection={handleSectionSelect}
          onReset={onReset}
          filename={filename}
        />

        {/* Main content area */}
        <main
          ref={contentRef}
          className="flex-1 overflow-y-auto px-6 md:px-10 lg:px-16 py-8 min-w-0 scroll-smooth"
          role="main"
          aria-label="README content"
        >
          <div className="max-w-3xl mx-auto">
            {searchQuery.trim() && (
              <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-lg bg-amber-500/8 border border-amber-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span className="text-xs text-amber-400 font-medium">
                  Searching for <span className="font-mono bg-amber-500/15 px-1 rounded">&quot;{searchQuery}&quot;</span> — highlights shown in content below
                </span>
              </div>
            )}
            <MarkdownViewer
              content={content}
              searchQuery={searchQuery}
              onSectionVisible={handleSectionVisible}
            />
            {/* Bottom padding */}
            <div className="h-24" />
          </div>
        </main>

        {/* Right Sidebar */}
        <RightSidebar stats={stats} codeBlocks={codeBlocks} />
      </div>
    </div>
  )
}
