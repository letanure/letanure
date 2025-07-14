import type { MetadataRoute } from 'next'
import { postMetadataGetAll } from '@/lib/mdx'
import { workshopItems } from '@/data/workshopItems'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = postMetadataGetAll()
  
  const blogPosts = posts.map((post) => ({
    url: `https://www.letanure.dev/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const workshopPages = workshopItems.map((item) => ({
    url: `https://www.letanure.dev/workshop-diy/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: 'https://www.letanure.dev',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://www.letanure.dev/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.letanure.dev/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://www.letanure.dev/projects',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://www.letanure.dev/now',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: 'https://www.letanure.dev/workshop-diy',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...blogPosts,
    ...workshopPages,
  ]
}