/**
 * markdown-parser.ts — compatibility shim
 *
 * All types and logic now live in document-model.ts + document-pipeline.ts.
 * This file re-exports the shapes that existing components import so no
 * component interfaces need to change.
 */

export type { DocumentStats as ReadmeStats, CodeNode as CodeBlock } from './document-model'
export type { DocumentSection as HeadingNode } from './document-model'
export { processDocument } from './document-pipeline'

/**
 * slugify — still exported because MarkdownViewer uses it to assign heading
 * IDs that match the normalized model's IDs.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * highlightText — kept for any future direct use.
 */
export function highlightText(text: string, query: string): string {
  if (!query.trim()) return text
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  return text.replace(regex, '<mark class="search-highlight">$1</mark>')
}
