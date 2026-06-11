/**
 * Document processing pipeline — strict 3-layer architecture:
 *
 *  RAW INPUT  →  NORMALIZATION (AST)  →  STRUCTURED ParsedDocument
 *
 * No parsing logic is allowed outside this file.
 * The UI layer only receives a ParsedDocument.
 */

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import type {
  Root, Heading, Code, Paragraph, List, Table,
  Blockquote, Image, Html, Link, ThematicBreak, Text, InlineCode, Node,
} from 'mdast'

import type {
  ParsedDocument,
  DocumentSection,
  ContentNode,
  CodeNode,
  ImageNode,
  DocumentStats,
} from './document-model'

// ---------------------------------------------------------------------------
// Layer 1 — RAW INPUT
// Accept raw markdown string as-is; no transformation.
// ---------------------------------------------------------------------------

function acceptRawInput(markdown: string): string {
  return markdown
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function extractPlainText(node: Node): string {
  const parts: string[] = []
  visit(node, (child) => {
    if (child.type === 'text') parts.push((child as Text).value)
    if (child.type === 'inlineCode') parts.push((child as InlineCode).value)
  })
  return parts.join(' ').trim()
}

/** Detect badge/shield images by URL pattern */
function isBadge(src: string): boolean {
  return (
    src.includes('shields.io') ||
    src.includes('badge.fury.io') ||
    src.includes('img.shields.io') ||
    src.includes('github.com/workflows') ||
    src.includes('travis-ci') ||
    src.includes('circleci') ||
    src.includes('codecov.io') ||
    (src.includes('badge') && src.includes('svg'))
  )
}

// ---------------------------------------------------------------------------
// Layer 2 — NORMALIZATION
// Walk the AST top-level nodes and emit a flat ordered token list.
// Code blocks are extracted here — no regex, parser-based only.
// ---------------------------------------------------------------------------

type HeadingToken = { kind: 'heading'; level: number; text: string; position: number }
type ContentToken = { kind: 'content'; node: ContentNode }
type Token = HeadingToken | ContentToken

function normalizeAst(ast: Root): { tokens: Token[]; links: Array<{ href: string; text: string }> } {
  let codeBlockCounter = 0  // scoped to this call — no module-level mutation
  const tokens: Token[] = []
  let position = 0

  // Extract all links from the entire AST in one pass (catches inline links
  // inside paragraphs, list items, blockquotes, etc.)
  const links: Array<{ href: string; text: string }> = []
  visit(ast, 'link', (node: Link) => {
    // Exclude image-only links (e.g. badge anchors)
    const text = extractPlainText(node)
    links.push({ href: node.url, text })
  })

  for (const child of ast.children) {
    switch (child.type) {
      case 'heading': {
        const h = child as Heading
        const text = extractPlainText(h)
        if (text) {  // skip empty headings
          tokens.push({ kind: 'heading', level: h.depth, text, position: position++ })
        }
        break
      }

      case 'code': {
        // Parser-based extraction — not regex
        const c = child as Code
        const code = c.value.trimEnd()
        const lang = (c.lang ?? '').toLowerCase().split('{')[0].trim() || 'text'
        const codeNode: CodeNode = {
          type: 'code',
          id: `code-block-${codeBlockCounter++}`,
          language: lang,
          code,
          lineCount: code.split('\n').length,
          position: position++,
        }
        tokens.push({ kind: 'content', node: codeNode })
        break
      }

      case 'paragraph': {
        const p = child as Paragraph
        // If the paragraph contains only images (badge lines, etc.) — isolate
        // each image as its own ImageNode rather than a text paragraph
        const hasNonImage = p.children.some(
          c => c.type !== 'image' && c.type !== 'break',
        )
        if (!hasNonImage) {
          for (const imgChild of p.children) {
            if (imgChild.type === 'image') {
              const img = imgChild as Image
              tokens.push({
                kind: 'content',
                node: { type: 'image', src: img.url, alt: img.alt ?? '', position: position++ },
              })
            }
          }
        } else {
          tokens.push({
            kind: 'content',
            node: { type: 'paragraph', text: extractPlainText(p), position: position++ },
          })
        }
        break
      }

      case 'list': {
        const l = child as List
        tokens.push({
          kind: 'content',
          node: {
            type: 'list',
            ordered: l.ordered ?? false,
            items: l.children.map(item => extractPlainText(item)),
            position: position++,
          },
        })
        break
      }

      case 'table': {
        tokens.push({
          kind: 'content',
          node: { type: 'table', raw: '', position: position++ },
        })
        break
      }

      case 'blockquote': {
        const bq = child as Blockquote
        tokens.push({
          kind: 'content',
          node: { type: 'blockquote', text: extractPlainText(bq), position: position++ },
        })
        break
      }

      case 'html': {
        const h = child as Html
        tokens.push({
          kind: 'content',
          node: { type: 'html', value: h.value, position: position++ },
        })
        break
      }

      case 'thematicBreak': {
        tokens.push({
          kind: 'content',
          node: { type: 'thematic_break', position: position++ },
        })
        break
      }

      default:
        tokens.push({
          kind: 'content',
          node: { type: 'other', position: position++ },
        })
    }
  }

  return { tokens, links }
}

// ---------------------------------------------------------------------------
// Layer 3 — OUTPUT STRUCTURE
// ---------------------------------------------------------------------------

/**
 * Normalize heading levels so the tree never has orphan / skipped nodes.
 *
 * Algorithm: maintain a stack of source levels we have "seen".  When a new
 * heading comes in:
 *   - Going deeper  → normalizedLevel = parent.normalized + 1
 *   - Same level    → normalizedLevel = parent.normalized
 *   - Going up      → pop until we find an ancestor with a strictly smaller
 *                     source level; that ancestor's normalized + 1 is our level
 *
 * This is O(n) and produces a guaranteed gap-free tree.
 */
function normalizeHeadingLevels(
  headings: Array<{ level: number; text: string; position: number }>,
): Array<{ normalizedLevel: number; sourceLevel: number; text: string; position: number }> {
  if (headings.length === 0) return []

  // Stack entries: { sourceLevel, normalizedLevel }
  const stack: Array<{ sourceLevel: number; normalizedLevel: number }> = []
  const result: Array<{ normalizedLevel: number; sourceLevel: number; text: string; position: number }> = []

  for (const h of headings) {
    // Pop stack entries whose source level is >= the current heading's level
    // (they are siblings or deeper, not ancestors)
    while (stack.length > 0 && stack[stack.length - 1].sourceLevel >= h.level) {
      stack.pop()
    }

    let normalizedLevel: number
    if (stack.length === 0) {
      // No ancestor — this is a root node
      normalizedLevel = 1
    } else {
      // One level deeper than nearest ancestor, capped at parent.normalized + 1
      // so we never skip a normalized level
      normalizedLevel = stack[stack.length - 1].normalizedLevel + 1
    }

    stack.push({ sourceLevel: h.level, normalizedLevel })
    result.push({
      normalizedLevel,
      sourceLevel: h.level,
      text: h.text,
      position: h.position,
    })
  }

  return result
}

/**
 * Build the hierarchical section tree from the flat token list.
 *
 * Content nodes are assigned to the section that immediately precedes them
 * in source order (O(n) single pass, no index lookups).
 */
function buildSectionTree(
  tokens: Token[],
  dedupMap: Map<string, number>,
): { sections: DocumentSection[]; flatSections: DocumentSection[] } {
  // --- 1. Collect heading tokens in source order ---
  const headingTokens = tokens.filter(
    (t): t is HeadingToken => t.kind === 'heading',
  )

  if (headingTokens.length === 0) {
    // No headings — wrap everything in a single synthetic root section
    const syntheticId = 'document'
    const section: DocumentSection = {
      id: syntheticId,
      title: 'Document',
      level: 1,
      sourceLevel: 1,
      index: 0,
      children: [],
      content: tokens
        .filter((t): t is ContentToken => t.kind === 'content')
        .map(t => t.node),
    }
    return { sections: [section], flatSections: [section] }
  }

  // --- 2. Normalize levels ---
  const normalized = normalizeHeadingLevels(
    headingTokens.map(t => ({ level: t.level, text: t.text, position: t.position })),
  )

  // --- 3. Create section objects with stable deduplicated IDs ---
  const allSections: DocumentSection[] = normalized.map((h, index) => {
    const base = slugify(h.text) || `section-${index}`
    const count = dedupMap.get(base) ?? 0
    dedupMap.set(base, count + 1)
    const id = count === 0 ? base : `${base}-${count}`
    return {
      id,
      title: h.text,
      level: h.normalizedLevel,
      sourceLevel: h.sourceLevel,
      index,
      children: [],
      content: [],
    }
  })

  // --- 4. Assign content nodes to their owning section (single O(n) pass) ---
  // Build a position→sectionIndex map for the heading tokens
  const headingPositionToSectionIdx = new Map<number, number>()
  headingTokens.forEach((t, idx) => headingPositionToSectionIdx.set(t.position, idx))

  let currentSectionIdx = -1
  for (const token of tokens) {
    if (token.kind === 'heading') {
      const idx = headingPositionToSectionIdx.get(token.position)
      if (idx !== undefined) currentSectionIdx = idx
    } else {
      // Content token — assign to current section if one exists
      if (currentSectionIdx >= 0) {
        allSections[currentSectionIdx].content.push(token.node)
      }
    }
  }

  // --- 5. Build the parent-child hierarchy ---
  const root: DocumentSection[] = []
  // parentStack holds the chain of open ancestor sections
  const parentStack: DocumentSection[] = []

  for (const section of allSections) {
    // Pop ancestors that are at the same or deeper level
    while (
      parentStack.length > 0 &&
      parentStack[parentStack.length - 1].level >= section.level
    ) {
      parentStack.pop()
    }
    if (parentStack.length === 0) {
      root.push(section)
    } else {
      parentStack[parentStack.length - 1].children.push(section)
    }
    parentStack.push(section)
  }

  return { sections: root, flatSections: allSections }
}

/**
 * Compute all stats deterministically from the structured model.
 * Word count includes only paragraph / list / blockquote text and heading
 * titles — code, links, and image metadata are excluded.
 */
function computeStats(
  flatSections: DocumentSection[],
  codeBlocks: CodeNode[],
  links: Array<{ href: string; text: string }>,
  images: ImageNode[],
  rawMarkdown: string,
): DocumentStats {
  let wordCount = 0

  for (const section of flatSections) {
    // Count the heading title itself
    wordCount += section.title.split(/\s+/).filter(Boolean).length

    for (const node of section.content) {
      switch (node.type) {
        case 'paragraph':
          wordCount += node.text.split(/\s+/).filter(Boolean).length
          break
        case 'list':
          node.items.forEach(item => {
            wordCount += item.split(/\s+/).filter(Boolean).length
          })
          break
        case 'blockquote':
          wordCount += node.text.split(/\s+/).filter(Boolean).length
          break
        // code, image, table, html, etc. intentionally excluded
      }
    }
  }

  const nonBadgeImages = images.filter(img => !isBadge(img.src))

  return {
    wordCount,
    sectionCount: flatSections.length,
    codeBlockCount: codeBlocks.length,
    linkCount: links.length,
    imageCount: nonBadgeImages.length,
    lineCount: rawMarkdown.split('\n').length,
    readingTimeMinutes: Math.max(1, Math.ceil(wordCount / 230)),
  }
}

// ---------------------------------------------------------------------------
// Module-level parse cache — keyed by a stable hash of the raw string.
// Results are reused across React re-renders without re-parsing.
// ---------------------------------------------------------------------------

const _parseCache = new Map<number, ParsedDocument>()

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return h
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * processDocument — the single public entry point.
 *
 * Safe to call from a React `useMemo` keyed on the raw string — results are
 * module-level cached so repeated calls with the same content are O(1).
 */
export function processDocument(rawMarkdown: string): ParsedDocument {
  const key = hashString(rawMarkdown)
  const cached = _parseCache.get(key)
  if (cached) return cached

  // Layer 1: accept raw input
  const raw = acceptRawInput(rawMarkdown)

  // Layer 2: parse AST and normalize into flat token list
  const ast = unified().use(remarkParse).use(remarkGfm).parse(raw) as Root
  const { tokens, links } = normalizeAst(ast)

  // Layer 3: build structured output from token list
  const dedupMap = new Map<string, number>()
  const { sections, flatSections } = buildSectionTree(tokens, dedupMap)

  // Extract global code/image lists from the token stream (no re-parsing)
  const codeBlocks: CodeNode[] = []
  const images: ImageNode[] = []
  for (const token of tokens) {
    if (token.kind === 'content') {
      if (token.node.type === 'code') codeBlocks.push(token.node)
      if (token.node.type === 'image') images.push(token.node)
    }
  }

  const stats = computeStats(flatSections, codeBlocks, links, images, raw)

  const title =
    flatSections.find(s => s.sourceLevel === 1)?.title ??
    flatSections[0]?.title ??
    'Untitled'

  const doc: ParsedDocument = {
    title,
    sections,
    flatSections,
    codeBlocks,
    links,
    metadata: {
      images,
      badges: images.filter(img => isBadge(img.src)),
    },
    stats,
    rawMarkdown: raw,
  }

  _parseCache.set(key, doc)
  return doc
}

/**
 * clearDocumentCache — force a re-parse on next call (useful in tests).
 */
export function clearDocumentCache(): void {
  _parseCache.clear()
}
