import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock Next.js 的 headers
vi.mock('next/headers', () => ({
  headers: () => new Headers(),
})) 