
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Tag } from '@/lib/models/Tag';

const MONGODB_URI = process.env.MONGODB_URI as string;

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGODB_URI);
};

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();
        const { id } = await params; // await params in Next.js 15+
        await Tag.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Tag deleted' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete tag' }, { status: 500 });
    }
}
