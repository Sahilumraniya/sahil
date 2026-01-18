import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Faq } from '@/lib/models/Faq';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
    try {
        await connectToDatabase();
        const url = new URL(req.url);
        const search = url.searchParams.get('search') || '';

        let query: any = {};
        if (search) {
            query.$or = [
                { question: { $regex: search, $options: 'i' } },
                { answer: { $regex: search, $options: 'i' } }
            ];
        }

        const faqs = await Faq.find(query).sort({ order: 1 });
        return NextResponse.json(faqs);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('admin_token')?.value;
        const verified = token && await verifyToken(token);
        if (!verified) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        await connectToDatabase();

        const lastFaq = await Faq.findOne().sort({ order: -1 });
        const newOrder = lastFaq ? lastFaq.order + 1 : 0;

        const faq = await Faq.create({ ...body, order: newOrder });
        return NextResponse.json(faq, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
    }
}
export async function PUT(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('admin_token')?.value;
        const verified = token && await verifyToken(token);
        if (!verified) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();

        // Check if this is a reorder request
        if (body.faqs && Array.isArray(body.faqs)) {
            // Bulk update order
            const updates = body.faqs.map((f: { _id: string, order: number }) => {
                return Faq.findByIdAndUpdate(f._id, { order: f.order });
            });
            await Promise.all(updates);
            return NextResponse.json({ message: 'Order updated' });
        }

        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update FAQ order' }, { status: 500 });
    }
}
