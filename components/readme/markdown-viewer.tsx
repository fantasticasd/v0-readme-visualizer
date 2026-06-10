'use client'

import { useEffect, useRef, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import { slugify } from '@/lib/markdown-parser'
import 'highlight.js/styles/github.css'

interface SectionIdEntry {
  id: string
  title: string
}

interface MarkdownViewerProps {
  content: string
  searchQuery: string
  onSectionVisible: (id: string) => void
  /**
   * Ordered list of section IDs produced by the document pipeline.
   * The viewer uses these to assign heading element IDs so they exactly match
   * the sidebar tree — no re-slugification drift.
   */
  sectionIds: SectionIdEntry[]
}

export function MarkdownViewer({ content, searchQuery, onSectionVisible, sectionIds }: MarkdownViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Build a lookup: normalized title → pipeline ID.
  // Because sectionIds are in source order we can use a queue-style index
  // counter per slug to handle duplicate headings correctly.
  const idLookup = useMemo(() => {
    const map = new Map<string, string[]>()
    for (const entry of sectionIds) {
      const base = slugify(entry.title)
      const arr = map.get(base) ?? []
      arr.push(entry.id)
      map.set(base, arr)
    }
    return map
  }, [sectionIds])

  // Per-render counter to hand out IDs in order
  const idCounterRef = useRef(new Map<string, number>())

  // Reset counter whenever content changes
  useMemo(() => {
    idCounterRef.current = new Map()
  }, [content])

  function getHeadingId(children: React.ReactNode): string {
    const text = String(children)
    const base = slugify(text)
    const ids = idLookup.get(base)
    if (ids) {
      const idx = idCounterRef.current.get(base) ?? 0
      idCounterRef.current.set(base, idx + 1)
      return ids[idx] ?? ids[ids.length - 1]
    }
    // Fallback: should not happen if pipeline and viewer see the same content
    const count = idCounterRef.current.get(base) ?? 0
    idCounterRef.current.set(base, count + 1)
    return count === 0 ? base : `${base}-${count}`
  }

  // ---- IntersectionObserver for active section tracking ----
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    observerRef.current?.disconnect()

    const headings = container.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Pick the topmost intersecting heading
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          const id = visible[0].target.getAttribute('id')
          if (id) onSectionVisible(id)
        }
      },
      { rootMargin: '-8% 0px -75% 0px', threshold: 0 },
    )

    headings.forEach(h => observerRef.current?.observe(h))
    return () => observerRef.current?.disconnect()
  // Re-run when content or sectionIds change so observer sees fresh DOM
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, sectionIds, onSectionVisible])

  // ---- DOM-based search highlight ----
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Remove existing highlights
    container.querySelectorAll('mark.search-highlight').forEach(el => {
      const parent = el.parentNode
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent ?? ''), el)
        parent.normalize()
      }
    })

    if (!searchQuery.trim()) return

    const regex = new RegExp(
      `(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
      'gi',
    )

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement
        if (!parent) return NodeFilter.FILTER_REJECT
        if (['SCRIPT', 'STYLE', 'CODE', 'PRE', 'MARK'].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT
        }
        return NodeFilter.FILTER_ACCEPT
      },
    })

    const textNodes: Text[] = []
    let n: Node | null
    while ((n = walker.nextNode())) textNodes.push(n as Text)

    for (const textNode of textNodes) {
      if (!textNode.textContent?.match(regex)) continue
      const frag = document.createDocumentFragment()
      const parts = textNode.textContent.split(regex)
      for (const part of parts) {
        if (part.match(regex)) {
          const mark = document.createElement('mark')
          mark.className = 'search-highlight'
          mark.textContent = part
          frag.appendChild(mark)
        } else {
          frag.appendChild(document.createTextNode(part))
        }
      }
      textNode.parentNode?.replaceChild(frag, textNode)
    }
  }, [searchQuery, content])

  // Heading factory shared across all levels
  function makeHeading(Tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
    return function HeadingComponent({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
      const id = getHeadingId(children)
      return <Tag id={id} {...props}>{children}</Tag>
    }
  }

  return (
    <div ref={containerRef} className="readme-prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeHighlight, { detect: true }]]}
        components={{
          h1: makeHeading('h1'),
          h2: makeHeading('h2'),
          h3: makeHeading('h3'),
          h4: makeHeading('h4'),
          h5: makeHeading('h5'),
          h6: makeHeading('h6'),
          a: ({ href, children, ...props }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </a>
          ),
          img: ({ src, alt, ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt ?? ''} loading="lazy" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
