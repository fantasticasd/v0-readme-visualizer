export const MOCK_README = `# React Query - Powerful Asynchronous State Management

[![npm version](https://badge.fury.io/js/%40tanstack%2Fquery-core.svg)](https://badge.fury.io/js/%40tanstack%2Fquery-core)
[![Build Status](https://github.com/TanStack/query/workflows/react-query/badge.svg)](https://github.com/TanStack/query/actions?query=workflow%3Areact-query)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Fetching, caching, synchronizing and updating server state in your React applications made easy.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
  - [npm / Yarn / pnpm](#npm--yarn--pnpm)
  - [CDN](#cdn)
- [Quick Start](#quick-start)
- [Features](#features)
- [Usage](#usage)
  - [Queries](#queries)
  - [Mutations](#mutations)
  - [Query Invalidation](#query-invalidation)
- [Configuration](#configuration)
  - [QueryClient](#queryclient)
  - [Global Defaults](#global-defaults)
- [API Reference](#api-reference)
  - [useQuery](#usequery)
  - [useMutation](#usemutation)
  - [useQueryClient](#usequeryclient)
- [Advanced Patterns](#advanced-patterns)
  - [Dependent Queries](#dependent-queries)
  - [Parallel Queries](#parallel-queries)
  - [Infinite Queries](#infinite-queries)
- [TypeScript](#typescript)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

React Query is often described as the missing data-fetching library for React, but in more technical terms, it makes **fetching, caching, synchronizing and updating server state** in your React applications a breeze.

Out of the box, React Query requires **zero-configuration** and can be customized to your liking as your application grows.

React Query provides:

- Window focus refetching
- Request deduplication
- Automatic garbage collection
- Mutations + Query Invalidation
- Infinite scroll queries
- Optimistic updates
- Offline support

## Installation

### npm / Yarn / pnpm

Install React Query via your preferred package manager:

\`\`\`bash
# npm
npm install @tanstack/react-query

# Yarn
yarn add @tanstack/react-query

# pnpm
pnpm add @tanstack/react-query
\`\`\`

### CDN

You can also use React Query via CDN for rapid prototyping:

\`\`\`html
<script src="https://unpkg.com/@tanstack/react-query@5/build/umd/index.production.js"></script>
\`\`\`

#### DevTools

Install the optional devtools package for debugging:

\`\`\`bash
npm install @tanstack/react-query-devtools
\`\`\`

##### Windows

On Windows, ensure you have Node.js 18+ installed. You can verify with:

\`\`\`powershell
node --version
npm --version
\`\`\`

##### Linux

On Linux, you may need to set file permissions for global npm installs:

\`\`\`bash
sudo chown -R $(whoami) ~/.npm
npm install -g @tanstack/react-query
\`\`\`

## Quick Start

Wrap your application in a \`QueryClientProvider\` and start querying:

\`\`\`tsx
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

function Todos() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(res => res.json()),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <ul>
      {data.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}
\`\`\`

## Features

| Feature | Description |
|---------|-------------|
| **Auto Caching** | Responses are automatically cached and reused |
| **Background Refetch** | Stale data is automatically refreshed in the background |
| **Deduplication** | Duplicate requests are deduplicated automatically |
| **Pagination** | Built-in support for paginated and infinite data |
| **Optimistic Updates** | Update UI before server confirmation |
| **Offline Support** | Retry queries when coming back online |

## Usage

### Queries

Basic query usage with automatic caching:

\`\`\`typescript
const { data, isLoading, isError, error } = useQuery({
  queryKey: ['users', userId],
  queryFn: async () => {
    const response = await fetch(\`/api/users/\${userId}\`)
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  },
  staleTime: 5 * 60 * 1000, // 5 minutes
  gcTime: 10 * 60 * 1000,   // 10 minutes
})
\`\`\`

### Mutations

Use mutations to create, update, or delete server data:

\`\`\`typescript
const mutation = useMutation({
  mutationFn: (newTodo: { title: string }) =>
    fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
    }).then(res => res.json()),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
  onError: (error) => {
    console.error('Failed to create todo:', error)
  },
})

// Usage
mutation.mutate({ title: 'Buy groceries' })
\`\`\`

### Query Invalidation

Invalidate and refetch queries after mutations:

\`\`\`typescript
import { useQueryClient } from '@tanstack/react-query'

function TodoForm() {
  const queryClient = useQueryClient()

  const handleSubmit = async (data) => {
    await createTodo(data)
    // Invalidate and refetch
    await queryClient.invalidateQueries({ queryKey: ['todos'] })
  }
}
\`\`\`

## Configuration

### QueryClient

Configure the QueryClient with global defaults:

\`\`\`typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 3,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})
\`\`\`

### Global Defaults

You can also set defaults for specific query keys:

\`\`\`typescript
queryClient.setQueryDefaults(['todos'], {
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
})
\`\`\`

## API Reference

### useQuery

\`\`\`typescript
const result = useQuery({
  queryKey: QueryKey,
  queryFn: QueryFunction,
  enabled?: boolean,
  staleTime?: number,
  gcTime?: number,
  refetchInterval?: number | false,
  retry?: boolean | number,
  select?: (data: TData) => TSelectedData,
  placeholderData?: TData | (previousData: TData) => TData,
})
\`\`\`

**Returns:**

- \`data\` — The resolved query data
- \`isLoading\` — True if no data and fetching
- \`isFetching\` — True if fetching in background  
- \`isError\` — True if the query errored
- \`error\` — The error object if \`isError\` is true
- \`refetch\` — Function to manually trigger refetch

### useMutation

\`\`\`typescript
const mutation = useMutation({
  mutationFn: MutationFunction,
  onSuccess?: (data, variables, context) => void,
  onError?: (error, variables, context) => void,
  onSettled?: (data, error, variables, context) => void,
  onMutate?: (variables) => Promise<context> | context,
})
\`\`\`

### useQueryClient

\`\`\`typescript
const queryClient = useQueryClient()

// Invalidate queries
queryClient.invalidateQueries({ queryKey: ['todos'] })

// Set data manually
queryClient.setQueryData(['todos'], newData)

// Get cached data
const data = queryClient.getQueryData(['todos'])
\`\`\`

## Advanced Patterns

### Dependent Queries

Chain queries that depend on previous results:

\`\`\`typescript
const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
})

const { data: projects } = useQuery({
  queryKey: ['projects', user?.id],
  queryFn: () => fetchProjects(user!.id),
  enabled: !!user?.id, // Only runs after user is loaded
})
\`\`\`

### Parallel Queries

Run multiple queries in parallel:

\`\`\`typescript
function App({ users }) {
  const userQueries = useQueries({
    queries: users.map((user) => ({
      queryKey: ['user', user.id],
      queryFn: () => fetchUserById(user.id),
    })),
  })
}
\`\`\`

### Infinite Queries

Implement infinite scroll with \`useInfiniteQuery\`:

\`\`\`typescript
const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfiniteQuery({
  queryKey: ['projects'],
  queryFn: ({ pageParam }) => fetchProjects(pageParam),
  initialPageParam: 0,
  getNextPageParam: (lastPage) => lastPage.nextCursor,
})
\`\`\`

## TypeScript

React Query is written in TypeScript and provides full type safety:

\`\`\`typescript
interface Todo {
  id: number
  title: string
  completed: boolean
}

const { data } = useQuery<Todo[], Error>({
  queryKey: ['todos'],
  queryFn: (): Promise<Todo[]> => fetch('/api/todos').then(r => r.json()),
})
// data is typed as Todo[] | undefined
\`\`\`

## Testing

Set up React Query in your tests:

\`\`\`typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

test('loads and displays todos', async () => {
  const { findByText } = render(<Todos />, { wrapper: createWrapper() })
  await findByText('Todo 1')
})
\`\`\`

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a PR.

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit your changes: \`git commit -m 'Add amazing feature'\`
4. Push to the branch: \`git push origin feature/amazing-feature\`
5. Open a Pull Request

## License

MIT © [Tanner Linsley](https://github.com/tannerlinsley)

See [LICENSE](LICENSE) for more information.
`
