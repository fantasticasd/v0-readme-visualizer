/**
 * mind-map-layout.ts
 *
 * Pure TypeScript layout engine for the left-to-right horizontal tree.
 * No DOM, no side effects — takes a DocumentSection tree and returns
 * positioned nodes + edges ready for SVG rendering.
 *
 * Algorithm: Reingold–Tilford-style bottom-up / top-down pass.
 *   1. Compute subtree height (leaf count) for each node — bottom-up.
 *   2. Assign Y positions top-down, centering each parent over its children.
 *   3. Assign X positions by level (depth × columnWidth).
 */

import type { DocumentSection } from './document-model'

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface MindMapNode {
  id: string
  title: string
  level: number          // 1–6 (normalized)
  depth: number          // 0 = root, 1 = H2 branch, 2 = H3, …
  x: number              // centre x
  y: number              // centre y
  width: number
  height: number
  hasChildren: boolean
  collapsed: boolean
  /** First meaningful word(s) of first paragraph content, if any */
  preview: string
}

export interface MindMapEdge {
  id: string
  sourceId: string
  targetId: string
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface MindMapLayout {
  nodes: MindMapNode[]
  edges: MindMapEdge[]
  /** Total bounding box — useful for initial viewBox centering */
  bounds: { minX: number; minY: number; maxX: number; maxY: number }
}

// ---------------------------------------------------------------------------
// Layout constants
// ---------------------------------------------------------------------------

const COL_WIDTH   = 240   // horizontal distance between depth levels
const ROW_HEIGHT  = 52    // vertical slot per leaf node
const NODE_H      = 38    // rendered node box height
const NODE_W_BASE = 160   // base width for H2+
const NODE_W_ROOT = 200   // wider for H1 root

// Max title chars before truncation (layout only — rendering truncates via CSS)
const TITLE_MAX   = 28

// ---------------------------------------------------------------------------
// Internal tree node used during layout computation
// ---------------------------------------------------------------------------

interface LayoutNode {
  section: DocumentSection
  depth: number
  children: LayoutNode[]
  /** Number of leaf slots this subtree occupies */
  leafCount: number
  /** Assigned Y coordinate (centre) */
  y: number
  preview: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function extractPreview(section: DocumentSection): string {
  for (const node of section.content) {
    if (node.type === 'paragraph' && node.text.trim()) {
      const words = node.text.trim().split(/\s+/).slice(0, 3).join(' ')
      return words.length > 20 ? words.slice(0, 20) + '…' : words
    }
  }
  return ''
}

function truncate(text: string, max = TITLE_MAX): string {
  return text.length > max ? text.slice(0, max - 1) + '…' : text
}

/** Build the internal LayoutNode tree from DocumentSection[] */
function buildLayoutTree(
  sections: DocumentSection[],
  depth: number,
  collapsedSet: Set<string>,
): LayoutNode[] {
  return sections.map(s => {
    const isCollapsed = collapsedSet.has(s.id)
    const children = (!isCollapsed && s.children.length > 0)
      ? buildLayoutTree(s.children, depth + 1, collapsedSet)
      : []

    const leafCount = children.length === 0
      ? 1
      : children.reduce((sum, c) => sum + c.leafCount, 0)

    return {
      section: s,
      depth,
      children,
      leafCount,
      y: 0,
      preview: extractPreview(s),
    }
  })
}

/** Assign Y positions top-down, centring each parent over its children */
function assignY(nodes: LayoutNode[], startY: number): void {
  let cursor = startY
  for (const node of nodes) {
    const span = node.leafCount * ROW_HEIGHT
    node.y = cursor + span / 2
    if (node.children.length > 0) {
      assignY(node.children, cursor)
    }
    cursor += span
  }
}

/** Flatten the layout tree into MindMapNodes + edges */
function flatten(
  nodes: LayoutNode[],
  parentNode: LayoutNode | null,
  outNodes: MindMapNode[],
  outEdges: MindMapEdge[],
  collapsedSet: Set<string>,
): void {
  for (const node of nodes) {
    const x = node.depth * COL_WIDTH + (node.depth === 0 ? 0 : 0)
    const w = node.depth === 0 ? NODE_W_ROOT : NODE_W_BASE
    const isCollapsed = collapsedSet.has(node.section.id)

    outNodes.push({
      id: node.section.id,
      title: truncate(node.section.title),
      level: node.section.level,
      depth: node.depth,
      x: x + w / 2,
      y: node.y,
      width: w,
      height: NODE_H,
      hasChildren: node.section.children.length > 0,
      collapsed: isCollapsed,
      preview: node.preview,
    })

    if (parentNode !== null) {
      const px = (parentNode.depth * COL_WIDTH) + (parentNode.depth === 0 ? NODE_W_ROOT : NODE_W_BASE)
      const py = parentNode.y
      const cx = x
      const cy = node.y

      outEdges.push({
        id: `${parentNode.section.id}→${node.section.id}`,
        sourceId: parentNode.section.id,
        targetId: node.section.id,
        x1: px,
        y1: py,
        x2: cx,
        y2: cy,
      })
    }

    if (node.children.length > 0) {
      flatten(node.children, node, outNodes, outEdges, collapsedSet)
    }
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Compute a full left-to-right tree layout from a DocumentSection tree.
 *
 * @param sections   Root-level sections (doc.sections)
 * @param collapsed  Set of section IDs whose children should be hidden
 */
export function computeMindMapLayout(
  sections: DocumentSection[],
  collapsed: Set<string>,
): MindMapLayout {
  if (sections.length === 0) {
    return { nodes: [], edges: [], bounds: { minX: 0, minY: 0, maxX: 0, maxY: 0 } }
  }

  // 1. Build the internal tree (respecting collapse state)
  const layoutTree = buildLayoutTree(sections, 0, collapsed)

  // 2. Assign Y positions (top-down, starting at 0)
  assignY(layoutTree, 0)

  // 3. Flatten to arrays
  const nodes: MindMapNode[] = []
  const edges: MindMapEdge[] = []
  flatten(layoutTree, null, nodes, edges, collapsed)

  // 4. Compute bounding box
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const n of nodes) {
    minX = Math.min(minX, n.x - n.width / 2)
    minY = Math.min(minY, n.y - n.height / 2)
    maxX = Math.max(maxX, n.x + n.width / 2)
    maxY = Math.max(maxY, n.y + n.height / 2)
  }

  return {
    nodes,
    edges,
    bounds: { minX, minY, maxX, maxY },
  }
}
