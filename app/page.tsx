'use client'

import { useState } from 'react'
import { UploadScreen } from '@/components/readme/upload-screen'
import { Dashboard } from '@/components/readme/dashboard'
import { MOCK_README } from '@/lib/mock-readme'

export default function Home() {
  const [content, setContent] = useState<string | null>(null)
  const [filename, setFilename] = useState('README.md')

  const handleLoad = (text: string) => {
    setContent(text)
  }

  const handleLoadMock = () => {
    setContent(MOCK_README)
    setFilename('react-query-README.md')
  }

  const handleReset = () => {
    setContent(null)
    setFilename('README.md')
  }

  if (!content) {
    return (
      <UploadScreen
        onLoad={handleLoad}
        onLoadMock={handleLoadMock}
      />
    )
  }

  return (
    <Dashboard
      content={content}
      filename={filename}
      onReset={handleReset}
    />
  )
}
