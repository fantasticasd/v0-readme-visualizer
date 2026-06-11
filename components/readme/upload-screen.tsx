'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FileText, Upload, ClipboardPaste, ArrowRight, BookOpen, Code2, Hash, GitBranch } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'
import { GlowNet } from './glow-net'
import { ExportSource } from './export-source'

interface UploadScreenProps {
  onLoad: (content: string) => void
  onLoadMock: () => void
}

type Mode = 'drop' | 'paste'

export function UploadScreen({ onLoad, onLoadMock }: UploadScreenProps) {
  const [mode, setMode] = useState<Mode>('drop')
  const [pasteContent, setPasteContent] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const [exportOpen, setExportOpen] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
        onLoad(text)
      }
      reader.readAsText(file)
    },
    [onLoad],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/markdown': ['.md', '.markdown'], 'text/plain': ['.txt'] },
    multiple: false,
    onDragEnter: () => setIsDragOver(true),
    onDragLeave: () => setIsDragOver(false),
    onDropAccepted: () => setIsDragOver(false),
    onDropRejected: () => setIsDragOver(false),
  })

  const handlePasteSubmit = () => {
    if (pasteContent.trim()) onLoad(pasteContent)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ExportSource open={exportOpen} onClose={() => setExportOpen(false)} />

      {/* Top nav */}
      <header className="border-b border-border px-6 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-primary/20 border border-primary/30 flex items-center justify-center">
            <BookOpen size={13} className="text-primary" />
          </div>
          <span className="font-semibold text-sm text-foreground">README Visualizer</span>
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1 px-2 py-1 rounded bg-muted/50 border border-border">
            <Code2 size={11} /> No auth required
          </span>
          <span className="flex items-center gap-1 px-2 py-1 rounded bg-muted/50 border border-border">
            <GitBranch size={11} /> Local only
          </span>
          <ThemeToggle />
          <button
            onClick={() => setExportOpen(true)}
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-muted/50 border border-border text-xs text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Open source & self-hosting"
          >
            <GitBranch size={11} /> Source
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-6 py-16">
        {/* Blue neon dot-grid glow — decorative background */}
        <GlowNet />

        <div className="relative z-10 w-full max-w-2xl space-y-8">
          {/* Hero */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-2">
              <Hash size={11} />
              <span>Markdown Dashboard</span>
            </div>
            <h1 className="text-4xl font-bold text-foreground tracking-tight text-balance">
              Visualize your README
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed text-balance max-w-md mx-auto">
              Transform large README.md files into an interactive dashboard with search, navigation, and statistics.
            </p>
          </div>

          {/* Upload card */}
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-lg shadow-gray-200/80">
            {/* Tabs */}
            <div className="flex border-b border-border">
              {(['drop', 'paste'] as Mode[]).map(m => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-colors',
                    mode === m
                      ? 'text-foreground border-b-2 border-primary bg-muted/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/10',
                  )}
                >
                  {m === 'drop' ? <Upload size={14} /> : <ClipboardPaste size={14} />}
                  {m === 'drop' ? 'Upload File' : 'Paste Markdown'}
                </button>
              ))}
            </div>

            <div className="p-6">
              {mode === 'drop' ? (
                <div
                  {...getRootProps()}
                  className={cn(
                    'border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-200',
                    isDragActive || isDragOver
                      ? 'border-primary bg-primary/5 scale-[1.01]'
                      : 'border-border hover:border-border/80 hover:bg-muted/20',
                  )}
                >
                  <input {...getInputProps()} />
                  <div className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center border transition-colors',
                    isDragActive ? 'bg-primary/15 border-primary/40' : 'bg-muted border-border',
                  )}>
                    <FileText size={24} className={isDragActive ? 'text-primary' : 'text-muted-foreground'} />
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-sm text-foreground">
                      {isDragActive ? 'Drop your README here' : 'Drag & drop your README.md'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      or click to browse — .md, .markdown, .txt
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <textarea
                    value={pasteContent}
                    onChange={e => setPasteContent(e.target.value)}
                    placeholder="# My Project&#10;&#10;Paste your README markdown here..."
                    className="w-full h-44 rounded-lg border border-border bg-muted/20 px-4 py-3 text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 resize-none transition-colors"
                  />
                  <button
                    onClick={handlePasteSubmit}
                    disabled={!pasteContent.trim()}
                    className={cn(
                      'w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                      pasteContent.trim()
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-muted text-muted-foreground cursor-not-allowed',
                    )}
                  >
                    <ArrowRight size={14} />
                    Visualize Markdown
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Demo button */}
          <div className="text-center">
            <button
              onClick={onLoadMock}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <BookOpen size={14} className="text-primary" />
              <span>Load demo README</span>
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { icon: <Hash size={14} />, title: 'Section Tree', desc: 'Navigate sections with collapsible tree' },
              { icon: <Code2 size={14} />, title: 'Code Snippets', desc: 'Extracted blocks with copy support' },
              { icon: <FileText size={14} />, title: 'Statistics', desc: 'Word count, headings, links, and more' },
            ].map(f => (
              <div key={f.title} className="p-3.5 rounded-lg bg-card border border-border text-center space-y-1.5">
                <div className="inline-flex p-2 rounded-md bg-muted text-primary">{f.icon}</div>
                <div className="text-xs font-semibold text-foreground">{f.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
