import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Blog } from '@/lib/models/Blog';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// Helper to calculate read time
const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
};

// GET all blogs (Public + Private if admin)
export async function GET(req: Request) {
    try {
        await connectToDatabase();
        const url = new URL(req.url);
        const search = url.searchParams.get('search') || '';
        const status = url.searchParams.get('status');

        let query: any = {
            status: { $ne: 'Deleted' } // Default: Exclude Deleted
        };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ];
        }

        // If specific status requested (including 'Deleted' for trash view), override the default exclusion
        if (status && status !== 'All Status') {
            query.status = status;
        }

        const blogs = await Blog.find(query).sort({ createdAt: -1 });
        return NextResponse.json(blogs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}

// POST new blog (Protected)
export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('admin_token')?.value;
        const verified = token && await verifyToken(token);

        if (!verified) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        await connectToDatabase();

        // Basic slug validation
        const existing = await Blog.findOne({ slug: body.slug });
        if (existing) {
            return NextResponse.json({ error: 'Slug already exists' }, { status: 400 });
        }

        // Calculate Read Time
        const readTime = calculateReadTime(body.content || '');

        const blog = await Blog.create({ ...body, readTime });
        return NextResponse.json(blog, { status: 201 });
    } catch (error) {
        console.error("POST /api/blogs ERROR:", error);
        return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
    }
}
