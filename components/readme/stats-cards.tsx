'use client'

import { BookOpen, Code2, Hash, Image, Link2, Clock, AlignLeft } from 'lucide-react'
import type { ReadmeStats } from '@/lib/markdown-parser'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  color: string
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div className="flex items-center justify-between py-2.5 px-1 border-b border-border/60 last:border-0 group">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className={`p-1.5 rounded-md ${color} shrink-0`}>
          {icon}
        </div>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <span className="text-sm font-semibold text-foreground font-mono tabular-nums">{value}</span>
    </div>
  )
}

interface StatsCardsProps {
  stats: ReadmeStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div>
      <StatCard
        icon={<AlignLeft size={14} className="text-blue-600" />}
        label="Words"
        value={stats.wordCount.toLocaleString()}
        color="bg-blue-50"
      />
      <StatCard
        icon={<Hash size={14} className="text-violet-600" />}
        label="Headings"
        value={stats.headingCount}
        color="bg-violet-50"
      />
      <StatCard
        icon={<Code2 size={14} className="text-emerald-600" />}
        label="Code Blocks"
        value={stats.codeBlockCount}
        color="bg-emerald-50"
      />
      <StatCard
        icon={<Link2 size={14} className="text-amber-600" />}
        label="Links"
        value={stats.linkCount}
        color="bg-amber-50"
      />
      <StatCard
        icon={<Image size={14} className="text-rose-600" />}
        label="Images"
        value={stats.imageCount}
        color="bg-rose-50"
      />
      <StatCard
        icon={<BookOpen size={14} className="text-cyan-600" />}
        label="Lines"
        value={stats.lineCount.toLocaleString()}
        color="bg-cyan-50"
      />
      <StatCard
        icon={<Clock size={14} className="text-orange-600" />}
        label="Read Time"
        value={`~${stats.readingTime}m`}
        color="bg-orange-50"
      />
    </div>
  )
}
