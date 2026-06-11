'use client'

import {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from 'react'
import { Minus, Plus, Maximize2, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { computeMindMapLayout, type MindMapNode, type MindMapEdge } from '@/lib/mind-map-layout'
import type { DocumentSection } from '@/lib/document-model'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MindMapProps {
  sections: DocumentSection[]
  activeId: string
  onSelectSection: (id: string) => void
}

// ---------------------------------------------------------------------------
// Pan / zoom constants
// ---------------------------------------------------------------------------

const ZOOM_MIN = 0.2
const ZOOM_MAX = 2.5
const ZOOM_STEP = 0.15
const INITIAL_PADDING = 80

// ---------------------------------------------------------------------------
// Node colour palette — keyed by depth
// ---------------------------------------------------------------------------

const DEPTH_STYLES = [
  // depth 0 — H1 root
  {
    fill: 'var(--mm-root-fill)',
    stroke: 'var(--mm-root-stroke)',
    text: 'var(--mm-root-text)',
    fontSize: 13,
    fontWeight: 600,
    rx: 10,
  },
  // depth 1 — H2 primary branch
  {
    fill: 'var(--mm-d1-fill)',
    stroke: 'var(--mm-d1-stroke)',
    text: 'var(--mm-d1-text)',
    fontSize: 12,
    fontWeight: 500,
    rx: 8,
  },
  // depth 2 — H3 sub-branch
  {
    fill: 'var(--mm-d2-fill)',
    stroke: 'var(--mm-d2-stroke)',
    text: 'var(--mm-d2-text)',
    fontSize: 11,
    fontWeight: 400,
    rx: 6,
  },
  // depth 3+ — H4+
  {
    fill: 'var(--mm-d3-fill)',
    stroke: 'var(--mm-d3-stroke)',
    text: 'var(--mm-d3-text)',
    fontSize: 10,
    fontWeight: 400,
    rx: 5,
  },
] as const

function depthStyle(depth: number) {
  return DEPTH_STYLES[Math.min(depth, DEPTH_STYLES.length - 1)]
}

// ---------------------------------------------------------------------------
// Edge path — smooth cubic bezier
// ---------------------------------------------------------------------------

function edgePath(e: MindMapEdge): string {
  const cx = (e.x1 + e.x2) / 2
  return `M ${e.x1} ${e.y1} C ${cx} ${e.y1}, ${cx} ${e.y2}, ${e.x2} ${e.y2}`
}

// ---------------------------------------------------------------------------
// Single node
// ---------------------------------------------------------------------------

interface NodeProps {
  node: MindMapNode
  isActive: boolean
  isHovered: boolean
  onMouseEnter: (id: string) => void
  onMouseLeave: () => void
  onClick: (id: string) => void
  onToggleCollapse: (id: string) => void
}

function MindMapNodeEl({
  node,
  isActive,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onToggleCollapse,
}: NodeProps) {
  const style = depthStyle(node.depth)
  const x = node.x - node.width / 2
  const y = node.y - node.height / 2

  return (
    <g
      className="mind-map-node"
      onMouseEnter={() => onMouseEnter(node.id)}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick(node.id)}
      style={{ cursor: 'pointer' }}
    >
      {/* Shadow / glow for active and hover */}
      {(isActive || isHovered) && (
        <rect
          x={x - 3}
          y={y - 3}
          width={node.width + 6}
          height={node.height + 6}
          rx={style.rx + 2}
          fill="none"
          stroke={isActive ? 'rgba(37,99,235,0.35)' : 'rgba(37,99,235,0.15)'}
          strokeWidth={isActive ? 2 : 1.5}
          style={{ filter: isActive ? 'blur(3px)' : 'blur(2px)' }}
        />
      )}

      {/* Main box */}
      <rect
        x={x}
        y={y}
        width={node.width}
        height={node.height}
        rx={style.rx}
        fill={style.fill}
        stroke={isActive ? 'rgba(37,99,235,0.6)' : isHovered ? 'rgba(37,99,235,0.3)' : style.stroke}
        strokeWidth={isActive ? 1.5 : 1}
      />

      {/* Level badge — small pill on top-left for depth > 0 */}
      {node.depth > 0 && (
        <text
          x={x + 6}
          y={y + 9}
          fontSize={7}
          fontWeight={500}
          fill={style.stroke}
          fontFamily="var(--font-mono, monospace)"
          opacity={0.7}
        >
          H{node.level}
        </text>
      )}

      {/* Title */}
      <text
        x={node.x}
        y={node.y + (node.preview ? -5 : 1)}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={style.fontSize}
        fontWeight={style.fontWeight}
        fill={style.text}
        fontFamily="var(--font-sans, sans-serif)"
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        {node.title}
      </text>

      {/* Preview text */}
      {node.preview && (
        <text
          x={node.x}
          y={node.y + 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={9}
          fill={style.text}
          opacity={0.5}
          fontFamily="var(--font-sans, sans-serif)"
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {node.preview}
        </text>
      )}

      {/* Collapse/expand toggle — small chevron on right edge */}
      {node.hasChildren && (
        <g
          onClick={(e) => { e.stopPropagation(); onToggleCollapse(node.id) }}
          style={{ cursor: 'pointer' }}
        >
          <circle
            cx={x + node.width - 10}
            cy={node.y}
            r={7}
            fill={style.stroke}
            opacity={0.2}
          />
          <text
            x={x + node.width - 10}
            y={node.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={8}
            fill={style.text}
            opacity={0.7}
            style={{ pointerEvents: 'none', userSelect: 'none' }}
          >
            {node.collapsed ? '+' : '−'}
          </text>
        </g>
      )}
    </g>
  )
}

// ---------------------------------------------------------------------------
// Toolbar
// ---------------------------------------------------------------------------

interface ToolbarProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onFit: () => void
  zoom: number
}

function MapToolbar({ onZoomIn, onZoomOut, onFit, zoom }: ToolbarProps) {
  return (
    <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-card border border-border rounded-lg p-1 shadow-sm z-10">
      <button
        onClick={onZoomOut}
        className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Zoom out"
      >
        <Minus size={13} />
      </button>
      <span className="text-xs font-mono text-muted-foreground w-10 text-center tabular-nums select-none">
        {Math.round(zoom * 100)}%
      </span>
      <button
        onClick={onZoomIn}
        className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Zoom in"
      >
        <Plus size={13} />
      </button>
      <div className="w-px h-4 bg-border mx-0.5" />
      <button
        onClick={onFit}
        className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label="Fit to screen"
      >
        <Maximize2 size={13} />
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Legend
// ---------------------------------------------------------------------------

function MapLegend() {
  const items = [
    { label: 'H1 Root', depth: 0 },
    { label: 'H2 Branch', depth: 1 },
    { label: 'H3 Section', depth: 2 },
    { label: 'H4+ Detail', depth: 3 },
  ]
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-1.5 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-sm z-10">
      <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/60 mb-0.5">Legend</p>
      {items.map(({ label, depth }) => {
        const s = depthStyle(depth)
        return (
          <div key={label} className="flex items-center gap-2">
            <svg width={16} height={10}>
              <rect x={0} y={1} width={16} height={8} rx={s.rx * 0.5}
                fill={s.fill} stroke={s.stroke} strokeWidth={1} />
            </svg>
            <span className="text-[10px] text-muted-foreground">{label}</span>
          </div>
        )
      })}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main MindMap component
// ---------------------------------------------------------------------------

export function MindMap({ sections, activeId, onSelectSection }: MindMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  // Pan/zoom state
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const lastPointer = useRef({ x: 0, y: 0 })
  const [containerSize, setContainerSize] = useState({ w: 800, h: 600 })

  // Measure container
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      setContainerSize({ w: width, h: height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Compute layout — memoized, only re-runs when sections or collapse state changes
  const layout = useMemo(
    () => computeMindMapLayout(sections, collapsed),
    [sections, collapsed],
  )

  // Fit-to-screen helper
  const fitToScreen = useCallback(() => {
    if (layout.nodes.length === 0) return
    const { minX, minY, maxX, maxY } = layout.bounds
    const contentW = maxX - minX + INITIAL_PADDING * 2
    const contentH = maxY - minY + INITIAL_PADDING * 2
    const scaleX = containerSize.w / contentW
    const scaleY = containerSize.h / contentH
    const newZoom = Math.min(scaleX, scaleY, 1.2)
    const clampedZoom = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, newZoom))
    setZoom(clampedZoom)
    setPan({
      x: (containerSize.w - contentW * clampedZoom) / 2 - minX * clampedZoom + INITIAL_PADDING * clampedZoom,
      y: (containerSize.h - contentH * clampedZoom) / 2 - minY * clampedZoom + INITIAL_PADDING * clampedZoom,
    })
  }, [layout, containerSize])

  // Fit on first load / when sections change
  const hasFit = useRef(false)
  useEffect(() => {
    if (layout.nodes.length > 0 && containerSize.w > 0) {
      fitToScreen()
      hasFit.current = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections, containerSize])

  // ---- Pointer events for pan ----
  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    isDragging.current = true
    lastPointer.current = { x: e.clientX, y: e.clientY }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const dx = e.clientX - lastPointer.current.x
    const dy = e.clientY - lastPointer.current.y
    lastPointer.current = { x: e.clientX, y: e.clientY }
    setPan(p => ({ x: p.x + dx, y: p.y + dy }))
  }, [])

  const onPointerUp = useCallback(() => {
    isDragging.current = false
  }, [])

  // ---- Wheel for zoom ----
  const onWheel = useCallback((e: ReactWheelEvent<HTMLDivElement>) => {
    e.preventDefault()
    const delta = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP
    setZoom(z => {
      const next = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z + delta))
      // Zoom towards cursor
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const mx = e.clientX - rect.left
        const my = e.clientY - rect.top
        setPan(p => ({
          x: mx - (mx - p.x) * (next / z),
          y: my - (my - p.y) * (next / z),
        }))
      }
      return next
    })
  }, [])

  // ---- Node interaction ----
  const handleNodeClick = useCallback((id: string) => {
    onSelectSection(id)
  }, [onSelectSection])

  const handleToggleCollapse = useCallback((id: string) => {
    setCollapsed(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }, [])

  if (sections.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        No sections to display
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex-1 overflow-hidden select-none',
        'bg-background mind-map-surface',
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onWheel={onWheel}
      style={{ cursor: isDragging.current ? 'grabbing' : 'grab', touchAction: 'none' }}
      aria-label="Interactive mind map of document structure"
      role="img"
    >
      {/* CSS tokens for node colours */}
      <style>{`
        .mind-map-surface {
          --mm-root-fill: #1e3a5f;
          --mm-root-stroke: #3b82f6;
          --mm-root-text: #e0efff;
          --mm-d1-fill: #1c2a3a;
          --mm-d1-stroke: #2563eb;
          --mm-d1-text: #bfdbfe;
          --mm-d2-fill: #162032;
          --mm-d2-stroke: #1d4ed8;
          --mm-d2-text: #93c5fd;
          --mm-d3-fill: #111827;
          --mm-d3-stroke: #1e40af;
          --mm-d3-text: #6b7280;
        }
        :root:not(.dark) .mind-map-surface {
          --mm-root-fill: #1e3a6e;
          --mm-root-stroke: #2563eb;
          --mm-root-text: #ffffff;
          --mm-d1-fill: #eff6ff;
          --mm-d1-stroke: #3b82f6;
          --mm-d1-text: #1e3a8a;
          --mm-d2-fill: #f8faff;
          --mm-d2-stroke: #93c5fd;
          --mm-d2-text: #1d4ed8;
          --mm-d3-fill: #fafafa;
          --mm-d3-stroke: #cbd5e1;
          --mm-d3-text: #475569;
        }
      `}</style>

      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0 }}
      >
        <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
          {/* Edges — rendered first so nodes sit on top */}
          <g>
            {layout.edges.map(edge => (
              <path
                key={edge.id}
                d={edgePath(edge)}
                fill="none"
                stroke={
                  edge.targetId === activeId
                    ? 'rgba(37,99,235,0.6)'
                    : 'rgba(37,99,235,0.18)'
                }
                strokeWidth={edge.targetId === activeId ? 1.5 : 1}
                strokeDasharray={undefined}
              />
            ))}
          </g>

          {/* Nodes */}
          <g>
            {layout.nodes.map(node => (
              <MindMapNodeEl
                key={node.id}
                node={node}
                isActive={node.id === activeId}
                isHovered={node.id === hoveredId}
                onMouseEnter={setHoveredId}
                onMouseLeave={() => setHoveredId(null)}
                onClick={handleNodeClick}
                onToggleCollapse={handleToggleCollapse}
              />
            ))}
          </g>
        </g>
      </svg>

      {/* Controls */}
      <MapToolbar
        zoom={zoom}
        onZoomIn={() => setZoom(z => Math.min(ZOOM_MAX, z + ZOOM_STEP))}
        onZoomOut={() => setZoom(z => Math.max(ZOOM_MIN, z - ZOOM_STEP))}
        onFit={fitToScreen}
      />
      <MapLegend />

      {/* Node count hint */}
      <div className="absolute bottom-4 left-4 text-[10px] text-muted-foreground/50 select-none pointer-events-none">
        {layout.nodes.length} nodes · scroll to zoom · drag to pan
      </div>
    </div>
  )
}
