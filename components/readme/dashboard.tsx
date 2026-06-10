'use client'

import { useState, useCallback, useRef, useMemo } from 'react'
import { processDocument } from '@/lib/document-pipeline'
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
  // ---- UI state (never triggers re-parsing) ----
  const [activeId, setActiveId] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [leftCollapsed, setLeftCollapsed] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // ---- Parsing state: single memoized pipeline call ----
  // processDocument is also module-level cached, so even if this memo
  // somehow re-runs it is instantaneous on the second call.
  const doc = useMemo(() => processDocument(content), [content])

  // Derive all slices from the normalized document — no secondary parsing
  const headings = doc.sections          // hierarchical tree for sidebar
  const codeBlocks = doc.codeBlocks      // extracted by pipeline
  const stats = doc.stats                // deterministic from structured data

  // Adapt stats shape to what TopHeader / StatsCards currently expect
  const statsCompat = useMemo(() => ({
    wordCount: stats.wordCount,
    headingCount: stats.sectionCount,
    codeBlockCount: stats.codeBlockCount,
    linkCount: stats.linkCount,
    imageCount: stats.imageCount,
    lineCount: stats.lineCount,
    readingTime: stats.readingTimeMinutes,
  }), [stats])

  // Adapt codeBlocks to what CodeSnippets currently expects
  const codeBlocksCompat = useMemo(() =>
    codeBlocks.map(b => ({
      id: b.id,
      language: b.language,
      code: b.code,
      lineCount: b.lineCount,
    })),
  [codeBlocks])

  // Adapt headings (DocumentSection[]) to what SectionTree currently expects
  // DocumentSection already has id/title/children — just alias 'title' → 'text'
  const headingsCompat = useMemo(() => {
    function adapt(sections: typeof headings): import('@/lib/markdown-parser').HeadingNode[] {
      return sections.map(s => ({
        id: s.id,
        text: s.title,
        level: s.sourceLevel,
        children: adapt(s.children),
      }))
    }
    return adapt(headings)
  }, [headings])

  // ---- Navigation ----
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

  // Fired by the IntersectionObserver inside MarkdownViewer — only UI state
  const handleSectionVisible = useCallback((id: string) => {
    setActiveId(id)
  }, [])

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <TopHeader
        filename={filename}
        stats={statsCompat}
        onReset={onReset}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <LeftSidebar
          headings={headingsCompat}
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
              // Pass the flat section list so the viewer uses pipeline IDs
              sectionIds={doc.flatSections.map(s => ({ id: s.id, title: s.title }))}
            />

            <div className="h-32" />
          </div>
        </main>

        {/* Right Sidebar */}
        <RightSidebar stats={statsCompat} codeBlocks={codeBlocksCompat} />
      </div>
    </div>
  )
}
