/**
 * Document processing pipeline — 3 strict layers:
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
import type { Root, Heading, Code, Paragraph, List, Table, Blockquote, Image, Html, Link, ThematicBreak, Text, InlineCode, Node } from 'mdast'

import type {
  ParsedDocument,
  DocumentSection,
  ContentNode,
  CodeNode,
  ImageNode,
  DocumentStats,
  DocumentMetadata,
} from './document-model'

// ---------------------------------------------------------------------------
// Layer 1 — RAW INPUT
// Accepts a raw markdown string exactly as provided; no transformation here.
// ---------------------------------------------------------------------------

function acceptRawInput(markdown: string): string {
  return markdown
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(text: string): string {
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
// Parse the markdown into an mdast AST and walk it to produce a flat list of
// (heading | content-node) tokens with deterministic positions.
// ---------------------------------------------------------------------------

type Token =
  | { kind: 'heading'; level: number; text: string; position: number }
  | { kind: 'content'; node: ContentNode }

let _codeBlockCounter = 0

function normalizeAst(ast: Root): Token[] {
  _codeBlockCounter = 0
  const tokens: Token[] = []
  let position = 0

  for (const child of ast.children) {
    switch (child.type) {
      case 'heading': {
        const h = child as Heading
        const text = extractPlainText(h)
        tokens.push({ kind: 'heading', level: h.depth, text, position: position++ })
        break
      }

      case 'code': {
        const c = child as Code
        const code = c.value.trimEnd()
        const codeNode: CodeNode = {
          type: 'code',
          id: `code-block-${_codeBlockCounter++}`,
          language: c.lang || 'text',
          code,
          lineCount: code.split('\n').length,
          position: position++,
        }
        tokens.push({ kind: 'content', node: codeNode })
        break
      }

      case 'paragraph': {
        const p = child as Paragraph
        // Check if this paragraph is images-only (badge line etc.)
        const hasNonImage = p.children.some(c => c.type !== 'image' && c.type !== 'break')
        if (!hasNonImage) {
          // Extract each image as its own ImageNode
          for (const imgChild of p.children) {
            if (imgChild.type === 'image') {
              const img = imgChild as Image
              const imgNode: ImageNode = {
                type: 'image',
                src: img.url,
                alt: img.alt || '',
                position: position++,
              }
              tokens.push({ kind: 'content', node: imgNode })
            }
          }
        } else {
          tokens.push({
            kind: 'content',
            node: {
              type: 'paragraph',
              text: extractPlainText(p),
              position: position++,
            },
          })
        }
        break
      }

      case 'list': {
        const l = child as List
        const items: string[] = l.children.map(item => extractPlainText(item))
        tokens.push({
          kind: 'content',
          node: { type: 'list', ordered: l.ordered ?? false, items, position: position++ },
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

  return tokens
}

// ---------------------------------------------------------------------------
// Layer 3 — OUTPUT STRUCTURE
// Convert the flat token list into the hierarchical ParsedDocument.
// ---------------------------------------------------------------------------

/**
 * Normalize heading levels so skipped levels don't produce orphan nodes.
 * E.g. H1 → H3 becomes H1 → H2 in the normalized tree.
 * The algorithm tracks what the "expected next" level is and collapses gaps.
 */
function normalizeHeadingLevels(
  headingTokens: Array<{ level: number; text: string; position: number }>,
): Array<{ normalizedLevel: number; sourceLevel: number; text: string; position: number }> {
  if (headingTokens.length === 0) return []

  const result: Array<{ normalizedLevel: number; sourceLevel: number; text: string; position: number }> = []
  // Stack of normalized levels seen so far
  const stack: number[] = []

  for (const h of headingTokens) {
    // Find what normalized level this heading should occupy
    let normalizedLevel: number

    if (stack.length === 0) {
      normalizedLevel = 1
    } else {
      const lastNormalized = stack[stack.length - 1]
      const lastSource = result[result.length - 1].sourceLevel

      if (h.level > lastSource) {
        // Going deeper — assign lastNormalized + 1 (never skip a level)
        normalizedLevel = lastNormalized + 1
      } else if (h.level === lastSource) {
        normalizedLevel = lastNormalized
      } else {
        // Going up — pop stack until we find an ancestor with smaller source level
        while (stack.length > 1 && result[result.findLastIndex(r => r.normalizedLevel === stack[stack.length - 1])]?.sourceLevel >= h.level) {
          stack.pop()
        }
        normalizedLevel = Math.max(1, stack.length > 0 ? stack[stack.length - 1] : 1)
        // Ensure we don't go deeper than the ancestor
        while (stack.length > 0 && stack[stack.length - 1] >= normalizedLevel) {
          stack.pop()
        }
        normalizedLevel = (stack.length > 0 ? stack[stack.length - 1] : 0) + 1
      }
    }

    // Ensure we never skip levels (max step = +1)
    if (stack.length > 0) {
      normalizedLevel = Math.min(normalizedLevel, stack[stack.length - 1] + 1)
    }
    normalizedLevel = Math.max(1, normalizedLevel)

    stack.push(normalizedLevel)
    result.push({ normalizedLevel, sourceLevel: h.level, text: h.text, position: h.position })
  }

  return result
}

function buildSectionTree(
  tokens: Token[],
  dedupMap: Map<string, number>,
): { sections: DocumentSection[]; flatSections: DocumentSection[] } {
  // Separate heading tokens from content tokens and normalize levels
  const headingRaw = tokens
    .filter((t): t is Extract<Token, { kind: 'heading' }> => t.kind === 'heading')
    .map(t => ({ level: t.level, text: t.text, position: t.position }))

  const normalized = normalizeHeadingLevels(headingRaw)

  // Build sections with their normalized levels and stable IDs
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

  // Assign content nodes to their owning section (the last heading before them)
  let currentSectionIdx = -1
  let positionCursor = 0

  const sectionByPosition = new Map<number, DocumentSection>()
  for (const s of allSections) {
    // Find the position of this section's heading token
    const headingToken = tokens.find(
      t => t.kind === 'heading' && t.position === normalized[allSections.indexOf(s)].position,
    )
    if (headingToken) sectionByPosition.set(headingToken.position, s)
  }

  // Walk tokens in order, assigning content to sections
  for (const token of tokens) {
    if (token.kind === 'heading') {
      const sec = sectionByPosition.get(token.position)
      if (sec) currentSectionIdx = allSections.indexOf(sec)
    } else if (currentSectionIdx >= 0) {
      allSections[currentSectionIdx].content.push(token.node)
    }
    positionCursor = token.kind === 'content' ? token.node.position : token.position
  }

  // Build the hierarchy using a parent stack
  const root: DocumentSection[] = []
  const parentStack: DocumentSection[] = []

  for (const section of allSections) {
    while (parentStack.length > 0 && parentStack[parentStack.length - 1].level >= section.level) {
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

function computeStats(
  flatSections: DocumentSection[],
  codeBlocks: CodeNode[],
  links: Array<{ href: string; text: string }>,
  images: ImageNode[],
  badges: ImageNode[],
  rawMarkdown: string,
): DocumentStats {
  // Word count: only from paragraph / list / blockquote text nodes
  let wordCount = 0
  for (const section of flatSections) {
    for (const node of section.content) {
      if (node.type === 'paragraph') wordCount += node.text.split(/\s+/).filter(Boolean).length
      if (node.type === 'list') node.items.forEach(i => { wordCount += i.split(/\s+/).filter(Boolean).length })
      if (node.type === 'blockquote') wordCount += node.text.split(/\s+/).filter(Boolean).length
    }
    // Count the heading title itself
    wordCount += section.title.split(/\s+/).filter(Boolean).length
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

function extractGlobalLists(
  tokens: Token[],
): {
  codeBlocks: CodeNode[]
  images: ImageNode[]
  links: Array<{ href: string; text: string }>
} {
  const codeBlocks: CodeNode[] = []
  const images: ImageNode[] = []

  for (const token of tokens) {
    if (token.kind === 'content') {
      if (token.node.type === 'code') codeBlocks.push(token.node)
      if (token.node.type === 'image') images.push(token.node)
    }
  }

  return { codeBlocks, images, links: [] }
}

function extractLinks(ast: Root): Array<{ href: string; text: string }> {
  const links: Array<{ href: string; text: string }> = []
  visit(ast, 'link', (node: Link) => {
    links.push({ href: node.url, text: extractPlainText(node) })
  })
  return links
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

// Module-level parse cache keyed by a simple hash of the markdown string.
// This ensures the pipeline only runs once per unique input regardless of
// how many times React re-renders.
const _parseCache = new Map<number, ParsedDocument>()

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return h
}

/**
 * processDocument — the single public entry point.
 *
 * Call from a React `useMemo` (keyed on the raw string) or directly from a
 * server component.  Results are also module-level cached so repeated calls
 * with the same content are free.
 */
export function processDocument(rawMarkdown: string): ParsedDocument {
  const key = hashString(rawMarkdown)
  const cached = _parseCache.get(key)
  if (cached) return cached

  // ------ Layer 1: accept raw input ------
  const raw = acceptRawInput(rawMarkdown)

  // ------ Layer 2: parse to AST & normalize ------
  const ast = unified().use(remarkParse).use(remarkGfm).parse(raw) as Root
  const tokens = normalizeAst(ast)
  const links = extractLinks(ast)

  // ------ Layer 3: build output structure ------
  const dedupMap = new Map<string, number>()
  const { sections, flatSections } = buildSectionTree(tokens, dedupMap)
  const { codeBlocks, images } = extractGlobalLists(tokens)
  const badges = images.filter(img => isBadge(img.src))

  const stats = computeStats(flatSections, codeBlocks, links, images, badges, raw)

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
    metadata: { images, badges },
    stats,
    rawMarkdown: raw,
  }

  _parseCache.set(key, doc)
  return doc
}

/**
 * clearDocumentCache — call when you want to force a re-parse (e.g. in tests).
 */
export function clearDocumentCache(): void {
  _parseCache.clear()
}
