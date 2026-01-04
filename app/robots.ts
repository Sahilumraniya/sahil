import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://sahilumraniya.dev'

    return {
        rules: {
            userAgent: '*', // '*' means this applies to all search engines (Google, Bing, etc.)
            allow: '/',     // Allow them to visit everything
            disallow: '/private/', // (Optional) Block access to specific private folders
        },
        sitemap: `${baseUrl}/sitemap.xml`, // Crucial: Tells bots where to find the map you created above
    }
}