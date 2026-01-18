import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Faq } from '@/lib/models/Faq';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectToDatabase();
        const faq = await Faq.findById(id);
        if (!faq) return NextResponse.json({ error: 'Not found' }, { status: 404 });
        return NextResponse.json(faq);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch FAQ' }, { status: 500 });
    }
}

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

        const faq = await Faq.findByIdAndUpdate(id, body, { new: true });
        if (!faq) return NextResponse.json({ error: 'Not found' }, { status: 404 });

        return NextResponse.json(faq);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 });
    }
}

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
        await Faq.findByIdAndDelete(id);

        return NextResponse.json({ message: 'Deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
    }
}
