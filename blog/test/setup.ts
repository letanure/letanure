import { beforeAll, afterAll, afterEach } from 'vitest'

// Mock Next.js router
beforeAll(() => {
  // Mock environment variables if needed
  process.env.NODE_ENV = 'test'
})

afterEach(() => {
  // Cleanup after each test
})

afterAll(() => {
  // Final cleanup
})