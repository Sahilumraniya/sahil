import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import mongoose from 'mongoose';

export async function GET() {
    try {
        await connectToDatabase();
        const state = mongoose.connection.readyState;
        // 1 = Connected
        const status = state === 1 ? 'connected' : 'disconnected';

        return NextResponse.json({
            status: 'ok',
            db: status,
            env: process.env.NODE_ENV
        });
    } catch (error: any) {
        return NextResponse.json({ error: 'Database connection failed', details: error.message }, { status: 500 });
    }
}
