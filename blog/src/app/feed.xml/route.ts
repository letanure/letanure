import { postMetadataGetAll } from '@/lib/mdx'

export async function GET() {
  const posts = postMetadataGetAll()
  
  const rssItems = posts.map((post) => {
    return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.summary}]]></description>
      <link>https://www.letanure.dev/blog/${post.slug}</link>
      <guid>https://www.letanure.dev/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
  }).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Letanure Blog</title>
    <description>Thoughts on web development, AI, and technology</description>
    <link>https://www.letanure.dev</link>
    <atom:link href="https://www.letanure.dev/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${rssItems}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}