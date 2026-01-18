
import connectToDatabase from "@/lib/db";
import { Blog } from "@/lib/models/Blog";
import BlogList from "./BlogList";

// Force dynamic rendering so new blogs appear immediately
export const dynamic = 'force-dynamic';

const getBlogs = async () => {
    try {
        await connectToDatabase();
        // Only published blogs
        const blogs = await Blog.find({ status: "Published" }).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(blogs));
    } catch (error) {
        return [];
    }
};

export default async function BlogPage() {
    const blogs = await getBlogs();

    return <BlogList initialBlogs={blogs} />;
}
