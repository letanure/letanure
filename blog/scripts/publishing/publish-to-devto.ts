import { postMetadataGetAll } from '../../src/lib/mdx'
import * as fs from 'fs'
import * as path from 'path'
import 'dotenv/config'

interface DevToArticle {
  article: {
    title: string
    published: boolean
    body_markdown: string
    tags: string[]
    canonical_url: string
    description?: string
    cover_image?: string
  }
}

class DevToPublisher {
  private apiKey: string
  private baseUrl = 'https://dev.to/api'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async publishArticle(post: any): Promise<void> {
    const devToArticle: DevToArticle = {
      article: {
        title: post.title,
        published: true, // Publish immediately
        body_markdown: this.processMarkdownForDevTo(post.content, post.date),
        tags: this.processTagsForDevTo(post.tags).slice(0, 4), // Dev.to allows max 4 tags
        canonical_url: `https://www.letanure.dev/blog/${post.slug}`,
        description: post.summary,
      }
    }

    try {
      const response = await fetch(`${this.baseUrl}/articles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        body: JSON.stringify(devToArticle),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`❌ Failed to publish ${post.title}:`)
        console.error(`   Status: ${response.status} ${response.statusText}`)
        console.error(`   Error: ${errorText}`)
        return
      }

      const result = await response.json()
      console.log(`✅ Published: ${post.title}`)
      console.log(`   URL: ${result.url}`)
      
      // Save published post ID for future updates
      this.savePublishedPost(post.slug, result.id)
      
    } catch (error) {
      console.error(`❌ Failed to publish ${post.title}:`, error)
    }
  }

  private processMarkdownForDevTo(content: string, postDate: string): string {
    // Clean up encoding issues and normalize text (but preserve code blocks)
    let processed = content
      .replace(/[""]/g, '"')        // Replace smart quotes
      .replace(/['']/g, "'")        // Replace smart apostrophes  
      .replace(/—/g, '--')          // Replace em dashes
      .replace(/–/g, '-')           // Replace en dashes
      .replace(/…/g, '...')         // Replace ellipsis
      .replace(/\u00A0/g, ' ')      // Replace non-breaking spaces
      .replace(/\u2003/g, ' ')      // Replace em spaces
      .replace(/\u2002/g, ' ')      // Replace en spaces
      .replace(/\u2009/g, ' ')      // Replace thin spaces
      .replace(/\u200B/g, '')       // Remove zero-width spaces
      .replace(/\u2060/g, '')       // Remove word joiners
      .replace(/\u00AD/g, '')       // Remove soft hyphens
      .replace(/citeturn\d+search\d+/g, '') // Remove MDX artifacts
      .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '') // Remove MDX comment blocks
      .replace(/^Sources?:\s*$/gm, '') // Remove orphaned "Sources:" lines
      .replace(/\s+$/, '')          // Remove trailing whitespace
      .trim()                       // Remove leading/trailing whitespace only
    
    // Convert relative image paths to absolute
    processed = processed.replace(
      /!\[([^\]]*)\]\(\/([^)]+)\)/g, 
      '![$1](https://www.letanure.dev/$2)'
    )

    // Add warning for posts before 2025
    const year = new Date(postDate).getFullYear()
    
    if (year < 2025) {
      const warningBlock = `> **Note:** This article was originally published on ${new Date(postDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}. Some information may be outdated.

`
      
      // Add warning at the very beginning
      processed = `${warningBlock}${processed}`
    }

    return processed
  }

  private processTagsForDevTo(tags: any[]): string[] {
    return tags
      .map(tag => String(tag))          // Convert to string first
      .map(tag => {
        // Replace spaces with hyphens and remove special characters
        return tag
          .toLowerCase()
          .replace(/\s+/g, '')          // Remove all spaces (dev.to doesn't allow hyphens either)
          .replace(/[^a-z0-9]/g, '')    // Remove all non-alphanumeric chars
      })
      .filter(tag => tag.length > 0)    // Remove empty tags
  }

  private savePublishedPost(slug: string, devToId: number): void {
    const publishedFile = path.join(process.cwd(), '.publishing-data', 'devto-published.json')
    let published: Record<string, number> = {}
    
    // Ensure directory exists
    const dir = path.dirname(publishedFile)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    if (fs.existsSync(publishedFile)) {
      published = JSON.parse(fs.readFileSync(publishedFile, 'utf8'))
    }
    
    published[slug] = devToId
    fs.writeFileSync(publishedFile, JSON.stringify(published, null, 2))
  }

  async getPublishedPosts(): Promise<Record<string, number>> {
    const publishedFile = path.join(process.cwd(), '.publishing-data', 'devto-published.json')
    if (fs.existsSync(publishedFile)) {
      return JSON.parse(fs.readFileSync(publishedFile, 'utf8'))
    }
    return {}
  }
}

// Main execution
async function main() {
  const apiKey = process.env.DEVTO_API_KEY
  if (!apiKey) {
    console.error('❌ DEVTO_API_KEY environment variable required')
    process.exit(1)
  }

  const publisher = new DevToPublisher(apiKey)
  const posts = postMetadataGetAll()
  const publishedPosts = await publisher.getPublishedPosts()

  console.log(`📝 Found ${posts.length} blog posts`)

  // Only publish new posts (not already published)
  let newPosts = posts.filter(post => !publishedPosts[post.slug])
  
  if (newPosts.length === 0) {
    console.log('✅ All posts already published to dev.to')
    return
  }

  // Reverse to get oldest first (posts are sorted newest first by default)
  newPosts.reverse()
  
  console.log(`📅 Publishing in chronological order (${newPosts[0]?.date} to ${newPosts[newPosts.length - 1]?.date})`)

  // Check for limit flag
  const limitArg = process.argv.find(arg => arg.startsWith('--limit='))
  if (limitArg) {
    const limit = parseInt(limitArg.split('=')[1])
    if (limit && limit > 0) {
      newPosts = newPosts.slice(0, limit)
      console.log(`🔢 Limiting to ${limit} posts for testing`)
    }
  }

  console.log(`🚀 Publishing ${newPosts.length} new posts to dev.to...`)

  for (const post of newPosts) {
    await publisher.publishArticle(post)
    
    // Don't add delay after the last post
    if (newPosts.indexOf(post) < newPosts.length - 1) {
      const delay = 31000 // 31 seconds between posts
      
      console.log(`⏳ Waiting ${delay/1000}s before next post...`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

// Check if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export { DevToPublisher }