import CinematicBlogView from "./CinematicBlogView";
import connectToDatabase from "@/lib/db";
import { Blog } from "@/lib/models/Blog";
import { notFound } from "next/navigation";

interface BlogPostProps {
    params: Promise<{
        slug: string;
    }>
}

async function getBlogPost(slug: string) {
    await connectToDatabase();
    const blog = await Blog.findOne({ slug, status: "Published" });
    if (!blog) return null;

    // Increment views (simple way, better moved to an API action for strict counting to avoid revalidation loops)
    // For now, valid for a simple blog
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

    return {
        title: blog.title,
        description: blog.seoDescription || blog.excerpt || blog.title,
        openGraph: {
            title: blog.title,
            description: blog.seoDescription || blog.excerpt,
            images: blog.image ? [blog.image] : [],
        }
    };
}

export default async function BlogPostPage({ params }: BlogPostProps) {
    const { slug } = await params;
    const blog = await getBlogPost(slug);

    if (!blog) {
        notFound();
    }

    return <CinematicBlogView blog={blog} />;
}
