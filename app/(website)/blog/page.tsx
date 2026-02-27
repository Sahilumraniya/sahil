import type { Metadata } from "next";
import connectToDatabase from "@/lib/db";
import { Blog } from "@/lib/models/Blog";
import BlogList from "./BlogList";
import Script from "next/script";

// Force dynamic rendering so new blogs appear immediately
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: "Blog — Engineering Insights",
    description: "Read Sahil Umraniya's blog on modern web development, software architecture, Next.js, Node.js, Generative AI, and cutting-edge technology insights.",
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        title: "Blog — Engineering Insights | Sahil Umraniya",
        description: "Deep dives into modern web development, software architecture, and the future of tech by Sahil Umraniya.",
        url: "https://sahilumraniya.dev/blog",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog — Engineering Insights | Sahil Umraniya",
        description: "Deep dives into web development, software architecture, and AI.",
        creator: "@2Umraniya",
    },
};

const getBlogs = async () => {
    try {
        await connectToDatabase();
        const blogs = await Blog.find({ status: "Published" }).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(blogs));
    } catch (error) {
        return [];
    }
};

export default async function BlogPage() {
    const blogs = await getBlogs();

    // CollectionPage JSON-LD
    const collectionJsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Blog — Engineering Insights",
        description: "Deep dives into modern web development, software architecture, and the future of tech.",
        url: "https://sahilumraniya.dev/blog",
        mainEntity: {
            "@type": "ItemList",
            numberOfItems: blogs.length,
            itemListElement: blogs.slice(0, 10).map((blog: any, index: number) => ({
                "@type": "ListItem",
                position: index + 1,
                url: `https://sahilumraniya.dev/blog/${blog.slug}`,
                name: blog.title,
            })),
        },
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
        ],
    };

    return (
        <>
            <Script
                id="blog-collection-jsonld"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
            />
            <Script
                id="blog-breadcrumb-jsonld"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <BlogList initialBlogs={blogs} />
        </>
    );
}
