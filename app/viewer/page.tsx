'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Dashboard } from '@/components/readme/dashboard'
import { MOCK_README } from '@/lib/mock-readme'

const SESSION_KEY = 'readme-visualizer:content'
const FILENAME_KEY = 'readme-visualizer:filename'

export default function ViewerPage() {
  const router = useRouter()
  const [content, setContent] = useState<string | null>(null)
  const [filename, setFilename] = useState('README.md')
  const [ready, setReady] = useState(false)

  // On mount, restore content from sessionStorage (supports page refresh)
  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY)
    const storedName = sessionStorage.getItem(FILENAME_KEY)
    if (stored) {
      setContent(stored)
      if (storedName) setFilename(storedName)
    } else {
      // No content in session — redirect back to landing
      router.replace('/')
    }
    setReady(true)
  }, [router])

  const handleReset = () => {
    sessionStorage.removeItem(SESSION_KEY)
    sessionStorage.removeItem(FILENAME_KEY)
    router.push('/')
  }

  // Not ready yet (hydrating) or redirecting — render nothing to avoid flash
  if (!ready || !content) return null

  return (
    <Dashboard
      content={content}
      filename={filename}
      onReset={handleReset}
    />
  )
}
