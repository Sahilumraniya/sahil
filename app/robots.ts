import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://sahilumraniya.dev'

    return {
        rules: [
            {
                // Default rule — allow all search engines and AI bots
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                // Explicitly allow OpenAI's crawlers
                userAgent: 'GPTBot',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                // Explicitly allow Google's AI crawler
                userAgent: 'Google-Extended',
                allow: '/',
            },
            {
                // Explicitly allow Anthropic / Claude
                userAgent: 'anthropic-ai',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                userAgent: 'ClaudeBot',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                // Explicitly allow Perplexity
                userAgent: 'PerplexityBot',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                // Common Crawl (used by many AI training datasets)
                userAgent: 'CCBot',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                // ByteDance AI
                userAgent: 'Bytespider',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
            {
                // Cohere AI
                userAgent: 'cohere-ai',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    }
}