'use client'

import { useRouter } from 'next/navigation'
import { UploadScreen } from '@/components/readme/upload-screen'
import { MOCK_README } from '@/lib/mock-readme'

const SESSION_KEY = 'readme-visualizer:content'
const FILENAME_KEY = 'readme-visualizer:filename'

export default function Home() {
  const router = useRouter()

  const navigate = (text: string, name: string) => {
    sessionStorage.setItem(SESSION_KEY, text)
    sessionStorage.setItem(FILENAME_KEY, name)
    router.push('/viewer')
  }

  const handleLoad = (text: string) => {
    navigate(text, 'README.md')
  }

  const handleLoadMock = () => {
    navigate(MOCK_README, 'react-query-README.md')
  }

  return (
    <UploadScreen
      onLoad={handleLoad}
      onLoadMock={handleLoadMock}
    />
  )
}
