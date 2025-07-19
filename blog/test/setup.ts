import { beforeAll, afterAll, afterEach } from 'vitest'

// Mock Next.js router
beforeAll(() => {
  // Mock environment variables if needed
  Object.defineProperty(process.env, 'NODE_ENV', {
    value: 'test',
    writable: true
  })
})

afterEach(() => {
  // Cleanup after each test
})

afterAll(() => {
  // Final cleanup
})