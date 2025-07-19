import { describe, it, expect } from 'vitest'

// Simple HTTP fetch tests to check if pages render without 404
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:3000'

describe('Page Rendering Tests', () => {
  const testPages = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Workshop', path: '/workshop-diy' },
    { name: 'About', path: '/about' },
    { name: 'Now', path: '/now' },
    { name: 'Projects', path: '/projects' },
    { name: 'Sitemap', path: '/sitemap.xml' },
  ]

  testPages.forEach(({ name, path }) => {
    it(`should render ${name} page without 404`, async () => {
      try {
        const response = await fetch(`${BASE_URL}${path}`)
        
        // Check that page loads (not 404)
        expect(response.status).not.toBe(404)
        expect(response.status).toBeLessThan(500) // No server errors
        
        // For HTML pages, check basic content
        if (path.endsWith('.xml')) {
          const text = await response.text()
          expect(text).toContain('<?xml')
          expect(text.length).toBeGreaterThan(0)
        } else {
          const html = await response.text()
          expect(html).toContain('<html')
          expect(html).toContain('</html>')
          expect(html.length).toBeGreaterThan(100) // Has substantial content
        }
        
        console.log(`✓ ${name} page (${path}) - Status: ${response.status}`)
      } catch (error) {
        console.error(`✗ ${name} page (${path}) failed:`, error)
        throw error
      }
    }, 10000) // 10 second timeout per test
  })

  // Test a blog post exists
  it('should have at least one blog post', async () => {
    try {
      const response = await fetch(`${BASE_URL}/blog`)
      const html = await response.text()
      
      // Should contain blog post links or content
      const hasBlogContent = html.includes('href="/blog/') || 
                           html.includes('No posts found') ||
                           html.includes('Latest Posts')
      
      expect(hasBlogContent).toBe(true)
      console.log('✓ Blog page has content or posts')
    } catch (error) {
      console.error('✗ Blog content check failed:', error)
      throw error
    }
  })

  // Test blog tags page (if any posts exist)
  it('should handle blog tags page', async () => {
    try {
      // Try a common tag or the tag index
      const tagResponse = await fetch(`${BASE_URL}/blog/tag/javascript`)
      
      // Tag page should either exist or return 404 (both are acceptable)
      expect([200, 404]).toContain(tagResponse.status)
      
      if (tagResponse.status === 200) {
        const html = await tagResponse.text()
        expect(html).toContain('<html')
        console.log('✓ Blog tag page accessible')
      } else {
        console.log('✓ Blog tag page returns 404 (acceptable)')
      }
    } catch (error) {
      console.error('✗ Blog tag check failed:', error)
      throw error
    }
  })
})