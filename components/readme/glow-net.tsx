'use client'

/**
 * GlowNet — decorative dot-grid background with a centred blue neon glow.
 *
 * Technique:
 *   1. A CSS radial-gradient dot pattern creates the net of tiny dots.
 *   2. Two stacked radial-gradient blobs produce the neon glow corona.
 *   3. A radial mask fades the whole layer to transparent at the edges so it
 *      blends seamlessly into any background colour.
 *
 * All rendering is CSS-only (no canvas, no SVG files) so it is
 * zero-JS at runtime and works with static export.
 */
export function GlowNet({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* ── Layer 1: outer soft glow corona ──────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 70% 55% at 50% 45%,
              rgba(37,99,235,0.18) 0%,
              rgba(59,130,246,0.10) 35%,
              transparent 70%
            )
          `,
        }}
      />

      {/* ── Layer 2: tight inner glow ────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 40% 32% at 50% 42%,
              rgba(96,165,250,0.22) 0%,
              rgba(59,130,246,0.12) 40%,
              transparent 75%
            )
          `,
        }}
      />

      {/* ── Layer 3: dot grid ─────────────────────────────────────────────
          Each dot is a 1.5 px circle rendered via radial-gradient on a 28 px grid.
          The dots are tinted with the same blue so they glow inside the corona.
      ──────────────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(96,165,250,0.55) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          backgroundPosition: 'center center',
          /* Radial mask: dots visible only inside the glow zone, fade to nothing at edges */
          WebkitMaskImage: `radial-gradient(ellipse 72% 58% at 50% 44%, black 0%, black 30%, transparent 68%)`,
          maskImage:        `radial-gradient(ellipse 72% 58% at 50% 44%, black 0%, black 30%, transparent 68%)`,
        }}
      />

      {/* ── Layer 4: specular highlight — tiny bright core ───────────────── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 18% 14% at 50% 40%,
              rgba(147,197,253,0.28) 0%,
              transparent 100%
            )
          `,
        }}
      />
    </div>
  )
}
