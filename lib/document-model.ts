/**
 * Normalized document model — the single source of truth produced by the
 * pipeline.  The UI layer only consumes this; no parsing logic lives in
 * components.
 */

// ---------------------------------------------------------------------------
// Content nodes
// ---------------------------------------------------------------------------

export type ContentNodeType =
  | 'paragraph'
  | 'code'
  | 'list'
  | 'table'
  | 'blockquote'
  | 'image'
  | 'html'
  | 'thematic_break'
  | 'other'

export interface BaseContentNode {
  type: ContentNodeType
  /** Source position index (0-based) in the original AST for stable ordering */
  position: number
}

export interface ParagraphNode extends BaseContentNode {
  type: 'paragraph'
  /** Raw markdown text for this paragraph (used for word counting) */
  text: string
}

export interface CodeNode extends BaseContentNode {
  type: 'code'
  id: string
  language: string
  code: string
  lineCount: number
}

export interface ListNode extends BaseContentNode {
  type: 'list'
  ordered: boolean
  /** Plain-text items for search/stats */
  items: string[]
}

export interface TableNode extends BaseContentNode {
  type: 'table'
  /** Raw markdown kept for pass-through rendering */
  raw: string
}

export interface BlockquoteNode extends BaseContentNode {
  type: 'blockquote'
  text: string
}

export interface ImageNode extends BaseContentNode {
  type: 'image'
  src: string
  alt: string
}

export interface HtmlNode extends BaseContentNode {
  type: 'html'
  value: string
}

export interface ThematicBreakNode extends BaseContentNode {
  type: 'thematic_break'
}

export interface OtherNode extends BaseContentNode {
  type: 'other'
}

export type ContentNode =
  | ParagraphNode
  | CodeNode
  | ListNode
  | TableNode
  | BlockquoteNode
  | ImageNode
  | HtmlNode
  | ThematicBreakNode
  | OtherNode

// ---------------------------------------------------------------------------
// Section / heading tree
// ---------------------------------------------------------------------------

export interface DocumentSection {
  /** Stable slug-based ID, deduped with a counter suffix when needed */
  id: string
  /** Clean heading text (markdown syntax stripped) */
  title: string
  /**
   * Normalized level 1–6.  Gaps in the source are filled: if the document
   * jumps from H1 to H3 the H3 is treated as level 2 internally so the
   * tree never has orphan nodes.
   */
  level: number
  /** Original level as written in the source */
  sourceLevel: number
  /** 0-based position in the flattened heading list */
  index: number
  children: DocumentSection[]
  content: ContentNode[]
  /**
   * True when this section was synthesised by the pipeline because the
   * document contained no headings. Its title ("Document") is not derived
   * from source text and must be excluded from word counts.
   */
  synthetic?: boolean
}

// ---------------------------------------------------------------------------
// Metadata extracted during normalization
// ---------------------------------------------------------------------------

export interface DocumentMetadata {
  /** All image nodes found anywhere in the document */
  images: ImageNode[]
  /** Badges / shields detected via URL heuristic (subset of images) */
  badges: ImageNode[]
}

// ---------------------------------------------------------------------------
// Computed stats — derived purely from structured data
// ---------------------------------------------------------------------------

export interface DocumentStats {
  /** Word count from text nodes only — code, links, metadata excluded */
  wordCount: number
  /** Number of normalized heading nodes (unique sections) */
  sectionCount: number
  /** Number of code block nodes */
  codeBlockCount: number
  /** Number of links (non-image) */
  linkCount: number
  /** Number of image nodes (excluding badges) */
  imageCount: number
  /** Total source lines */
  lineCount: number
  /** Estimated reading time in minutes (wordCount / 230 wpm, min 1) */
  readingTimeMinutes: number
}

// ---------------------------------------------------------------------------
// Top-level parsed document
// ---------------------------------------------------------------------------

export interface ParsedDocument {
  /** File-level title: the first H1 text, or the filename fallback */
  title: string
  /** Hierarchical section tree (only root-level sections here) */
  sections: DocumentSection[]
  /** All sections flattened in source order — convenient for iteration */
  flatSections: DocumentSection[]
  /** All code blocks extracted during normalization, in source order */
  codeBlocks: CodeNode[]
  /** All links extracted during normalization */
  links: Array<{ href: string; text: string }>
  metadata: DocumentMetadata
  stats: DocumentStats
  /** Original raw markdown — stored so the viewer can render it directly */
  rawMarkdown: string
}
