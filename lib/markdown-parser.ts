export interface HeadingNode {
  id: string
  text: string
  level: number
  children: HeadingNode[]
  parent?: HeadingNode
}

export interface CodeBlock {
  id: string
  language: string
  code: string
  lineCount: number
}

export interface ReadmeStats {
  wordCount: number
  headingCount: number
  codeBlockCount: number
  linkCount: number
  imageCount: number
  lineCount: number
  readingTime: number
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function parseHeadings(markdown: string): HeadingNode[] {
  const lines = markdown.split('\n')
  const root: HeadingNode[] = []
  const stack: HeadingNode[] = []

  const countMap = new Map<string, number>()

  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)$/)
    if (!match) continue

    const level = match[1].length
    const text = match[2].replace(/\*\*/g, '').replace(/`/g, '').trim()
    const baseId = slugify(text)

    // Handle duplicate IDs
    const count = countMap.get(baseId) ?? 0
    countMap.set(baseId, count + 1)
    const id = count === 0 ? baseId : `${baseId}-${count}`

    const node: HeadingNode = { id, text, level, children: [] }

    // Find correct parent
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop()
    }

    if (stack.length === 0) {
      root.push(node)
    } else {
      const parent = stack[stack.length - 1]
      node.parent = parent
      parent.children.push(node)
    }

    stack.push(node)
  }

  return root
}

export function parseCodeBlocks(markdown: string): CodeBlock[] {
  const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g
  const blocks: CodeBlock[] = []
  let match: RegExpExecArray | null
  let index = 0

  while ((match = codeBlockRegex.exec(markdown)) !== null) {
    const language = match[1] || 'text'
    const code = match[2].trimEnd()
    blocks.push({
      id: `code-block-${index++}`,
      language,
      code,
      lineCount: code.split('\n').length,
    })
  }

  return blocks
}

export function parseStats(markdown: string): ReadmeStats {
  // Word count (strip markdown syntax)
  const stripped = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[.*?\]\(.*?\)/g, '')
    .replace(/#{1,6}\s/g, '')
    .replace(/[*_~>]/g, '')
    .trim()

  const words = stripped.split(/\s+/).filter(w => w.length > 0)
  const wordCount = words.length

  const headingCount = (markdown.match(/^#{1,6}\s/gm) || []).length
  const codeBlockCount = (markdown.match(/```[\s\S]*?```/g) || []).length
  const linkCount = (markdown.match(/\[.+?\]\(.+?\)/g) || []).length
  const imageCount = (markdown.match(/!\[.*?\]\(.+?\)/g) || []).length
  const lineCount = markdown.split('\n').length
  const readingTime = Math.ceil(wordCount / 200)

  return { wordCount, headingCount, codeBlockCount, linkCount, imageCount, lineCount, readingTime }
}

export function flattenHeadings(nodes: HeadingNode[]): HeadingNode[] {
  const result: HeadingNode[] = []
  function traverse(nodes: HeadingNode[]) {
    for (const node of nodes) {
      result.push(node)
      if (node.children.length > 0) traverse(node.children)
    }
  }
  traverse(nodes)
  return result
}

export function searchMarkdown(markdown: string, query: string): string[] {
  if (!query.trim()) return []
  const lines = markdown.split('\n')
  const q = query.toLowerCase()
  return lines
    .filter(line => line.toLowerCase().includes(q))
    .slice(0, 20)
}

export function highlightText(text: string, query: string): string {
  if (!query.trim()) return text
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  return text.replace(regex, '<mark class="search-highlight">$1</mark>')
}
