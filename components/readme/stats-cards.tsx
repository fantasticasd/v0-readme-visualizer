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
    <div className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-border/80 transition-colors group">
      <div className={`p-2 rounded-md ${color} shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider leading-none mb-1">{label}</div>
        <div className="text-lg font-semibold text-foreground font-mono leading-none">{value}</div>
      </div>
    </div>
  )
}

interface StatsCardsProps {
  stats: ReadmeStats
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="space-y-2">
      <div className="px-1 mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Statistics</h3>
      </div>
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
