import CinematicBlogView from "./CinematicBlogView";
import connectToDatabase from "@/lib/db";
import { Blog } from "@/lib/models/Blog";
import { notFound } from "next/navigation";
import Script from "next/script";

interface BlogPostProps {
    params: Promise<{
        slug: string;
    }>
}

async function getBlogPost(slug: string) {
    await connectToDatabase();
    const blog = await Blog.findOne({ slug, status: "Published" });
    if (!blog) return null;

    try {
        blog.views += 1;
        await blog.save();
    } catch (e) {
        console.error("Failed to increment views", e);
    }

    return JSON.parse(JSON.stringify(blog));
}

export async function generateMetadata({ params }: BlogPostProps) {
    const { slug } = await params;
    const blog = await getBlogPost(slug);
    if (!blog) return { title: 'Post Not Found' };

    const description = blog.seoDescription || blog.excerpt || blog.title;

    return {
        title: blog.title,
        description,
        keywords: [
            ...(blog.tags || []),
            'Sahil Umraniya',
            'blog',
            'web development',
            'software engineering',
        ],
        authors: [{ name: 'Sahil Umraniya', url: 'https://sahilumraniya.dev' }],
        alternates: {
            canonical: `/blog/${slug}`,
        },
        openGraph: {
            title: blog.title,
            description,
            url: `https://sahilumraniya.dev/blog/${slug}`,
            siteName: 'Sahil Umraniya',
            type: 'article',
            publishedTime: blog.createdAt,
            modifiedTime: blog.updatedAt || blog.createdAt,
            authors: ['Sahil Umraniya'],
            tags: blog.tags || [],
            images: blog.image ? [{
                url: blog.image,
                width: 1200,
                height: 630,
                alt: blog.title,
            }] : [{
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: blog.title,
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.title,
            description,
            images: blog.image ? [blog.image] : ['/og-image.png'],
            creator: '@2Umraniya',
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
    const { slug } = await params;
    const blog = await getBlogPost(slug);

    if (!blog) {
        notFound();
    }

    // Article JSON-LD Structured Data
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: blog.title,
        description: blog.seoDescription || blog.excerpt || blog.title,
        image: blog.image || "https://sahilumraniya.dev/og-image.png",
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt || blog.createdAt,
        author: {
            "@type": "Person",
            name: "Sahil Umraniya",
            url: "https://sahilumraniya.dev",
            image: "https://sahilumraniya.dev/logo.png",
        },
        publisher: {
            "@type": "Person",
            name: "Sahil Umraniya",
            url: "https://sahilumraniya.dev",
            logo: {
                "@type": "ImageObject",
                url: "https://sahilumraniya.dev/logo.png",
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://sahilumraniya.dev/blog/${blog.slug}`,
        },
        keywords: (blog.tags || []).join(", "),
        wordCount: blog.content ? blog.content.split(/\s+/).length : undefined,
        articleSection: (blog.tags && blog.tags[0]) || "Technology",
        inLanguage: "en-US",
    };

    // BreadcrumbList JSON-LD
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://sahilumraniya.dev",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://sahilumraniya.dev/blog",
            },
            {
                "@type": "ListItem",
                position: 3,
                name: blog.title,
                item: `https://sahilumraniya.dev/blog/${blog.slug}`,
            },
        ],
    };

    return (
        <>
            <Script
                id={`article-jsonld-${blog.slug}`}
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            <Script
                id={`breadcrumb-jsonld-${blog.slug}`}
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <CinematicBlogView blog={blog} />
        </>
    );
}
