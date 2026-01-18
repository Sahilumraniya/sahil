import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Admin } from '@/lib/models/Admin';
import { signToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
        }

        await connectToDatabase();

        const normalizedEmail = email.toLowerCase().trim();

        // 1. Find Admin
        const admin = await Admin.findOne({ email: normalizedEmail });

        if (!admin || !admin.otp || !admin.otp.code) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        // 2. Check Expiry
        if (new Date() > new Date(admin.otp.expiresAt)) {
            return NextResponse.json({ error: "OTP expired" }, { status: 400 });
        }

        // 3. Verify Code
        if (admin.otp.code !== otp) {
            return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
        }

        // 4. Clear OTP (single use)
        // await Admin.updateOne({ email: normalizedEmail }, { $unset: { otp: 1 } }); 
        // Commented out to allow retry in case of network error on client response, 
        // or clear it later. Good practice to verify then clear. Here we clear.
        await Admin.updateOne({ email: normalizedEmail }, { $set: { "otp.code": null } });

        // 5. Create Session
        const token = await signToken({ email: normalizedEmail, role: 'admin' });

        // 6. Set Cookie
        const cookieStore = await cookies();
        cookieStore.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return NextResponse.json({ message: "Login successful" });

    } catch (error: any) {
        console.error("Verify OTP Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
