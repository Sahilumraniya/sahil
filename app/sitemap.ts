import { MetadataRoute } from 'next'
import connectToDatabase from '@/lib/db'
import { Blog } from '@/lib/models/Blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://sahilumraniya.dev'

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/about-us`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact-us`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/resume`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ]

    // Dynamic blog post pages
    let blogPages: MetadataRoute.Sitemap = []
    try {
        await connectToDatabase()
        const blogs = await Blog.find(
            { status: 'Published' },
            { slug: 1, updatedAt: 1 }
        ).lean()

        blogPages = blogs.map((blog: any) => ({
            url: `${baseUrl}/blog/${blog.slug}`,
            lastModified: blog.updatedAt || new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }))
    } catch (error) {
        console.error('Sitemap: Failed to fetch blog posts', error)
    }

    return [...staticPages, ...blogPages]
}