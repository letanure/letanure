import { postMetadataGetAll } from '../../src/lib/mdx'
import * as fs from 'fs'
import * as path from 'path'
import 'dotenv/config'

interface MediumPost {
  title: string
  contentFormat: 'markdown' | 'html'
  content: string
  tags?: string[]
  publishStatus: 'public' | 'draft' | 'unlisted'
  canonicalUrl?: string
  notifyFollowers?: boolean
}

interface MediumUser {
  id: string
  username: string
  name: string
  url: string
  imageUrl: string
}

class MediumPublisher {
  private apiKey: string
  private baseUrl = 'https://api.medium.com/v1'
  private userId: string | null = null

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async getUser(): Promise<MediumUser> {
    try {
      const response = await fetch(`${this.baseUrl}/me`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to get user: ${response.statusText}`)
      }

      const result = await response.json()
      this.userId = result.data.id
      return result.data
    } catch (error) {
      console.error('❌ Failed to get Medium user:', error)
      throw error
    }
  }

  async publishArticle(post: any): Promise<void> {
    if (!this.userId) {
      await this.getUser()
    }

    const mediumPost: MediumPost = {
      title: post.title,
      contentFormat: 'markdown',
      content: this.processMarkdownForMedium(post.content, post.date),
      tags: this.processTagsForMedium(post.tags),
      publishStatus: 'public',
      canonicalUrl: `https://www.letanure.dev/blog/${post.slug}`,
      notifyFollowers: false, // Don't spam followers when bulk publishing
    }

    try {
      const response = await fetch(`${this.baseUrl}/users/${this.userId}/posts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(mediumPost),
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
      console.log(`   URL: ${result.data.url}`)
      
      // Save published post ID for future reference
      this.savePublishedPost(post.slug, result.data.id)
      
    } catch (error) {
      console.error(`❌ Failed to publish ${post.title}:`, error)
    }
  }

  private processMarkdownForMedium(content: string, postDate: string): string {
    // Clean up encoding issues and normalize text
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

  private processTagsForMedium(tags: any[]): string[] {
    // Medium allows up to 5 tags, each up to 25 characters
    return tags
      .map(tag => String(tag))
      .map(tag => {
        // Clean tag and limit length
        return tag
          .toLowerCase()
          .replace(/\s+/g, '') // Remove spaces
          .replace(/[^a-z0-9]/g, '') // Remove special chars
          .substring(0, 25) // Limit to 25 chars
      })
      .filter(tag => tag.length > 0)
      .slice(0, 5) // Max 5 tags
  }

  private savePublishedPost(slug: string, mediumId: string): void {
    const publishedFile = path.join(process.cwd(), '.publishing-data', 'medium-published.json')
    let published: Record<string, string> = {}
    
    // Ensure directory exists
    const dir = path.dirname(publishedFile)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    if (fs.existsSync(publishedFile)) {
      published = JSON.parse(fs.readFileSync(publishedFile, 'utf8'))
    }
    
    published[slug] = mediumId
    fs.writeFileSync(publishedFile, JSON.stringify(published, null, 2))
  }

  async getPublishedPosts(): Promise<Record<string, string>> {
    const publishedFile = path.join(process.cwd(), '.publishing-data', 'medium-published.json')
    if (fs.existsSync(publishedFile)) {
      return JSON.parse(fs.readFileSync(publishedFile, 'utf8'))
    }
    return {}
  }
}

// Main execution
async function main() {
  const apiKey = process.env.MEDIUM_API_KEY
  if (!apiKey) {
    console.error('❌ MEDIUM_API_KEY environment variable required')
    console.error('📝 Get your token from: https://medium.com/me/settings → Integration tokens')
    process.exit(1)
  }

  const publisher = new MediumPublisher(apiKey)
  
  try {
    const user = await publisher.getUser()
    console.log(`👋 Publishing as: ${user.name} (@${user.username})`)
  } catch (error) {
    console.error('❌ Failed to authenticate with Medium')
    process.exit(1)
  }

  const posts = postMetadataGetAll()
  const publishedPosts = await publisher.getPublishedPosts()

  console.log(`📝 Found ${posts.length} blog posts`)

  // Only publish new posts (not already published)
  let newPosts = posts.filter(post => !publishedPosts[post.slug])
  
  if (newPosts.length === 0) {
    console.log('✅ All posts already published to Medium')
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

  console.log(`🚀 Publishing ${newPosts.length} new posts to Medium...`)

  for (const post of newPosts) {
    await publisher.publishArticle(post)
    
    // Don't add delay after the last post
    if (newPosts.indexOf(post) < newPosts.length - 1) {
      const delay = 60000 // 60 seconds between posts (Medium has strict rate limits)
      
      console.log(`⏳ Waiting ${delay/1000}s before next post...`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

// Check if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export { MediumPublisher }