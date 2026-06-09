'use client'

import { useEffect, useRef, useCallback, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import { slugify } from '@/lib/markdown-parser'
import 'highlight.js/styles/github-dark.css'

interface MarkdownViewerProps {
  content: string
  searchQuery: string
  onSectionVisible: (id: string) => void
}

function highlightSearchInText(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'))
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="search-highlight">{part}</mark>
    ) : (
      part
    ),
  )
}

interface MarkdownViewerProps {
  content: string
  searchQuery: string
  onSectionVisible: (id: string) => void
}

export function MarkdownViewer({ content, searchQuery, onSectionVisible }: MarkdownViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Setup intersection observer for active section tracking
  useEffect(() => {
    if (!containerRef.current) return

    observerRef.current?.disconnect()

    const headings = containerRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6')

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id')
            if (id) onSectionVisible(id)
          }
        }
      },
      { rootMargin: '-10% 0px -70% 0px', threshold: 0 },
    )

    headings.forEach(h => observerRef.current?.observe(h))
    return () => observerRef.current?.disconnect()
  }, [content, onSectionVisible])

  // Highlight search matches in the DOM after render
  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current

    // Remove existing highlights
    container.querySelectorAll('mark.search-highlight').forEach(el => {
      const parent = el.parentNode
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ''), el)
        parent.normalize()
      }
    })

    if (!searchQuery.trim()) return

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement
        if (!parent) return NodeFilter.FILTER_REJECT
        if (['SCRIPT', 'STYLE', 'CODE', 'PRE', 'MARK'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT
        return NodeFilter.FILTER_ACCEPT
      },
    })

    const nodes: Text[] = []
    let node: Node | null
    while ((node = walker.nextNode())) nodes.push(node as Text)

    const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')

    nodes.forEach(textNode => {
      if (!textNode.textContent?.match(regex)) return
      const frag = document.createDocumentFragment()
      const parts = textNode.textContent.split(regex)
      parts.forEach(part => {
        if (part.match(regex)) {
          const mark = document.createElement('mark')
          mark.className = 'search-highlight'
          mark.textContent = part
          frag.appendChild(mark)
        } else {
          frag.appendChild(document.createTextNode(part))
        }
      })
      textNode.parentNode?.replaceChild(frag, textNode)
    })
  }, [searchQuery, content])

  const countMap = useMemo<Map<string, number>>(() => new Map(), [content])

  return (
    <div ref={containerRef} className="readme-prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeHighlight, { detect: true }]]}
        components={{
          h1: ({ children, ...props }) => {
            const text = String(children)
            const base = slugify(text)
            const count = countMap.get(base) ?? 0
            countMap.set(base, count + 1)
            const id = count === 0 ? base : `${base}-${count}`
            return <h1 id={id} {...props}>{children}</h1>
          },
          h2: ({ children, ...props }) => {
            const text = String(children)
            const base = slugify(text)
            const count = countMap.get(base) ?? 0
            countMap.set(base, count + 1)
            const id = count === 0 ? base : `${base}-${count}`
            return <h2 id={id} {...props}>{children}</h2>
          },
          h3: ({ children, ...props }) => {
            const text = String(children)
            const base = slugify(text)
            const count = countMap.get(base) ?? 0
            countMap.set(base, count + 1)
            const id = count === 0 ? base : `${base}-${count}`
            return <h3 id={id} {...props}>{children}</h3>
          },
          h4: ({ children, ...props }) => {
            const text = String(children)
            const base = slugify(text)
            const count = countMap.get(base) ?? 0
            countMap.set(base, count + 1)
            const id = count === 0 ? base : `${base}-${count}`
            return <h4 id={id} {...props}>{children}</h4>
          },
          h5: ({ children, ...props }) => {
            const text = String(children)
            const base = slugify(text)
            const count = countMap.get(base) ?? 0
            countMap.set(base, count + 1)
            const id = count === 0 ? base : `${base}-${count}`
            return <h5 id={id} {...props}>{children}</h5>
          },
          h6: ({ children, ...props }) => {
            const text = String(children)
            const base = slugify(text)
            const count = countMap.get(base) ?? 0
            countMap.set(base, count + 1)
            const id = count === 0 ? base : `${base}-${count}`
            return <h6 id={id} {...props}>{children}</h6>
          },
          a: ({ href, children, ...props }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </a>
          ),
          img: ({ src, alt, ...props }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt || ''} loading="lazy" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
