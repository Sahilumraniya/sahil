import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Blog } from '@/lib/models/Blog';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

// GET single blog
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectToDatabase();
        const blog = await Blog.findById(id);
        if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
    }
}

// Helper to calculate read time
const calculateReadTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
};

// UPDATE blog (Protected)
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const cookieStore = await cookies();
        const token = cookieStore.get('admin_token')?.value;
        const verified = token && await verifyToken(token);
        if (!verified) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        await connectToDatabase();

        // Recalculate read time if content is updated
        if (body.content) {
            body.readTime = calculateReadTime(body.content);
        }

        const blog = await Blog.findByIdAndUpdate(id, body, { new: true });
        if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        return NextResponse.json(blog);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
    }
}

// DELETE blog (Protected) - Soft Delete
export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const cookieStore = await cookies();
        const token = cookieStore.get('admin_token')?.value;
        const verified = token && await verifyToken(token);
        if (!verified) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        await connectToDatabase();

        // Soft Delete: Update status to 'Deleted'
        const blog = await Blog.findByIdAndUpdate(id, { status: 'Deleted' }, { new: true });

        if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        return NextResponse.json({ message: 'Moved to trash successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
    }
}
