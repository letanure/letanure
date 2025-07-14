import { postMetadataGetAll } from '../../src/lib/mdx'
import * as fs from 'fs'
import * as path from 'path'
import 'dotenv/config'

interface HashnodePost {
  publicationId: string
  title: string
  contentMarkdown: string
  tags?: HashnodeTag[]
  publishedAt?: string
  settings?: {
    enableTableOfContent?: boolean
    isNewsletterActivated?: boolean
    delayedPublishedAt?: string
  }
}

interface HashnodeTag {
  slug: string
  name: string
}

interface HashnodeResponse {
  data: {
    publishPost: {
      post: {
        id: string
        url: string
        title: string
      }
    }
  }
  errors?: Array<{
    message: string
    extensions?: any
  }>
}

class HashnodePublisher {
  private apiKey: string
  private publicationId: string
  private apiUrl = 'https://gql.hashnode.com'

  constructor(apiKey: string, publicationId: string) {
    this.apiKey = apiKey
    this.publicationId = publicationId
  }

  async publishArticle(post: any): Promise<void> {
    const hashnodePost: HashnodePost = {
      publicationId: this.publicationId,
      title: post.title,
      contentMarkdown: this.processMarkdownForHashnode(post.content, post.date, post.slug),
      tags: this.processTagsForHashnode(post.tags),
      settings: {
        enableTableOfContent: true,
        isNewsletterActivated: false,
      },
    }

    const mutation = `
      mutation ($input: PublishPostInput!) {
        publishPost(input: $input) {
          post {
            id
            url
            title
          }
        }
      }
    `

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.apiKey,
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            input: hashnodePost,
          },
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`❌ Failed to publish ${post.title}:`)
        console.error(`   Status: ${response.status} ${response.statusText}`)
        console.error(`   Error: ${errorText}`)
        return
      }

      const result: HashnodeResponse = await response.json()
      
      if (result.errors && result.errors.length > 0) {
        console.error(`❌ GraphQL errors for ${post.title}:`)
        result.errors.forEach(error => {
          console.error(`   ${error.message}`)
        })
        return
      }

      if (result.data?.publishPost?.post) {
        const publishedPost = result.data.publishPost.post
        console.log(`✅ Published: ${post.title}`)
        console.log(`   URL: ${publishedPost.url}`)
        
        // Save published post ID for future reference
        this.savePublishedPost(post.slug, publishedPost.id)
      } else {
        console.error(`❌ Unexpected response format for ${post.title}`)
        console.error(JSON.stringify(result, null, 2))
      }
      
    } catch (error) {
      console.error(`❌ Failed to publish ${post.title}:`, error)
    }
  }

  private processMarkdownForHashnode(content: string, postDate: string, slug?: string): string {
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

    // Add canonical URL info at the end
    if (slug) {
      const canonicalInfo = `

---

*Originally published at [letanure.dev](https://www.letanure.dev/blog/${slug})*`
      processed = `${processed}${canonicalInfo}`
    }

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

  private processTagsForHashnode(tags: any[]): HashnodeTag[] {
    // Hashnode allows tags, convert to their format
    return tags
      .map(tag => String(tag))
      .map(tag => {
        // Clean tag and create slug
        const cleanTag = tag
          .toLowerCase()
          .replace(/\s+/g, '-')          // Replace spaces with hyphens
          .replace(/[^a-z0-9-]/g, '')    // Remove special chars except hyphens
          .replace(/-+/g, '-')           // Replace multiple hyphens with single
          .replace(/^-|-$/g, '')         // Remove leading/trailing hyphens
        
        return {
          slug: cleanTag,
          name: tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
        }
      })
      .filter(tag => tag.slug.length > 0)    // Remove empty tags
      .slice(0, 10) // Hashnode allows up to 10 tags
  }

  private savePublishedPost(slug: string, hashnodeId: string): void {
    const publishedFile = path.join(process.cwd(), '.publishing-data', 'hashnode-published.json')
    let published: Record<string, string> = {}
    
    // Ensure directory exists
    const dir = path.dirname(publishedFile)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    
    if (fs.existsSync(publishedFile)) {
      published = JSON.parse(fs.readFileSync(publishedFile, 'utf8'))
    }
    
    published[slug] = hashnodeId
    fs.writeFileSync(publishedFile, JSON.stringify(published, null, 2))
  }

  async getPublishedPosts(): Promise<Record<string, string>> {
    const publishedFile = path.join(process.cwd(), '.publishing-data', 'hashnode-published.json')
    if (fs.existsSync(publishedFile)) {
      return JSON.parse(fs.readFileSync(publishedFile, 'utf8'))
    }
    return {}
  }
}

// Main execution
async function main() {
  const apiKey = process.env.HASHNODE_API_KEY
  const publicationId = process.env.HASHNODE_PUBLICATION_ID
  
  if (!apiKey) {
    console.error('❌ HASHNODE_API_KEY environment variable required')
    console.error('📝 Get your token from: https://hashnode.com/settings/developer → Personal Access Tokens')
    process.exit(1)
  }

  if (!publicationId) {
    console.error('❌ HASHNODE_PUBLICATION_ID environment variable required')
    console.error('📝 Find your publication ID in your Hashnode dashboard URL or GraphQL playground')
    process.exit(1)
  }

  const publisher = new HashnodePublisher(apiKey, publicationId)
  const posts = postMetadataGetAll()
  const publishedPosts = await publisher.getPublishedPosts()

  console.log(`📝 Found ${posts.length} blog posts`)

  // Only publish new posts (not already published)
  let newPosts = posts.filter(post => !publishedPosts[post.slug])
  
  if (newPosts.length === 0) {
    console.log('✅ All posts already published to Hashnode')
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

  console.log(`🚀 Publishing ${newPosts.length} new posts to Hashnode...`)

  for (const post of newPosts) {
    await publisher.publishArticle(post)
    
    // Don't add delay after the last post
    if (newPosts.indexOf(post) < newPosts.length - 1) {
      const delay = 31000 // 31 seconds between posts (be respectful with GraphQL API)
      
      console.log(`⏳ Waiting ${delay/1000}s before next post...`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

// Check if this file is being run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export { HashnodePublisher }