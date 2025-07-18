import { ImageResponse } from 'next/og'
import { postMetadataGet } from '@/lib/mdx'

// Image metadata
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  const { slug } = params
  
  try {
    const post = postMetadataGet(slug)
    
    if (!post) {
      // Fallback image if post not found
      return new ImageResponse(
        (
          <div
            style={{
              fontSize: 64,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '40px',
            }}
          >
            <div style={{ marginBottom: '20px' }}>📝</div>
            <div>Blog Post Not Found</div>
          </div>
        ),
        { ...size }
      )
    }

    // Format date
    const date = new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    // Truncate title if too long
    const maxTitleLength = 80
    const title = post.title.length > maxTitleLength 
      ? `${post.title.substring(0, maxTitleLength)}...`
      : post.title

    // Get primary tag for color theming
    const primaryTag = post.tags?.[0] || 'general'
    
    // Color scheme based on tag
    const getColorScheme = (tag: string) => {
      const schemes = {
        javascript: { bg: 'linear-gradient(135deg, #f7df1e 0%, #e6c200 100%)', text: '#000' },
        typescript: { bg: 'linear-gradient(135deg, #3178c6 0%, #2c5aa0 100%)', text: '#fff' },
        react: { bg: 'linear-gradient(135deg, #61dafb 0%, #21b5d4 100%)', text: '#000' },
        nodejs: { bg: 'linear-gradient(135deg, #68a063 0%, #4d7549 100%)', text: '#fff' },
        ai: { bg: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)', text: '#fff' },
        css: { bg: 'linear-gradient(135deg, #264de4 0%, #1e3a8a 100%)', text: '#fff' },
        default: { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', text: '#fff' }
      }
      return schemes[tag as keyof typeof schemes] || schemes.default
    }

    const colorScheme = getColorScheme(primaryTag)

    return new ImageResponse(
      (
        <div
          style={{
            background: colorScheme.bg,
            color: colorScheme.text,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '60px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                opacity: 0.9,
              }}
            >
              letanure.dev
            </div>
            <div
              style={{
                fontSize: 20,
                opacity: 0.8,
              }}
            >
              {date}
            </div>
          </div>

          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              flex: 1,
              textAlign: 'left',
            }}
          >
            <h1
              style={{
                fontSize: title.length > 50 ? 48 : 56,
                fontWeight: 'bold',
                lineHeight: 1.1,
                margin: 0,
                marginBottom: '20px',
              }}
            >
              {title}
            </h1>
            
            {post.summary && (
              <p
                style={{
                  fontSize: 24,
                  lineHeight: 1.4,
                  margin: 0,
                  marginBottom: '30px',
                  opacity: 0.9,
                  maxWidth: '90%',
                }}
              >
                {post.summary.length > 150 
                  ? `${post.summary.substring(0, 150)}...`
                  : post.summary
                }
              </p>
            )}
          </div>

          {/* Footer with tags */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '40px',
            }}
          >
            <div
              style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              {post.tags?.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: colorScheme.text === '#fff' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                    color: colorScheme.text,
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: 16,
                    fontWeight: '500',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
            
            <div
              style={{
                fontSize: 48,
                opacity: 0.6,
              }}
            >
              📝
            </div>
          </div>
        </div>
      ),
      { ...size }
    )
  } catch (error) {
    console.error('Error generating OG image:', error)
    
    // Fallback error image
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 64,
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
            color: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px',
          }}
        >
          <div style={{ marginBottom: '20px' }}>⚠️</div>
          <div>Error generating image</div>
        </div>
      ),
      { ...size }
    )
  }
}