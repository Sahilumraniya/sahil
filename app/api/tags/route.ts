
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Tag } from '@/lib/models/Tag';

const MONGODB_URI = process.env.MONGODB_URI as string;

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGODB_URI);
};

export async function GET() {
    try {
        await connectDB();
        const tags = await Tag.find().sort({ createdAt: -1 });
        return NextResponse.json(tags);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const { name } = await req.json();

        if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });

        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        // Check duplicate
        const existing = await Tag.findOne({ slug });
        if (existing) {
            return NextResponse.json({ error: 'Tag already exists' }, { status: 400 });
        }

        const tag = await Tag.create({ name, slug });
        return NextResponse.json(tag, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 });
    }
}
export async function PUT(req: Request) {
    try {
        await connectDB();
        const { _id, name } = await req.json();

        if (!_id || !name) return NextResponse.json({ error: 'ID and Name are required' }, { status: 400 });

        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        // Check duplicate excluding self
        const existing = await Tag.findOne({ slug, _id: { $ne: _id } });
        if (existing) {
            return NextResponse.json({ error: 'Tag already exists' }, { status: 400 });
        }

        const tag = await Tag.findByIdAndUpdate(_id, { name, slug }, { new: true });
        return NextResponse.json(tag);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update tag' }, { status: 500 });
    }
}
