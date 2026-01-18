import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import { Admin } from '@/lib/models/Admin';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        // 1. Basic Validation
        if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

        // 2. Normalize email
        const normalizedEmail = email.toLowerCase().trim();

        // 3. Connect DB
        await connectToDatabase();

        // 4. Check if Admin exists (Seed check - simplified logic)
        // In a real app, you'd check a hardcoded list or pre-seeded DB
        // Here, we'll allow creation if no admin exists, OR check if matches allowed email
        // For simplicity: Lets just upsert (create if not exists) for the specific email configured
        const ALLOWED_ADMIN = process.env.ADMIN_EMAIL || 'admin@example.com';

        if (normalizedEmail !== ALLOWED_ADMIN.toLowerCase()) {
            return NextResponse.json({ error: "Unauthorized email address" }, { status: 401 });
        }

        // 5. Generate OTP
        let otpCode = crypto.randomInt(100000, 999999).toString();

        // DEV MODE / NO EMAIL FALLBACK: Use fixed OTP for testing
        if (!process.env.EMAIL_USER) {
            otpCode = '123456';
        }

        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

        // 6. Generate/Update Admin Doc
        await Admin.findOneAndUpdate(
            { email: normalizedEmail },
            {
                email: normalizedEmail,
                otp: { code: otpCode, expiresAt }
            },
            { upsert: true, new: true }
        );

        // 7. Send Email
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or configured host
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Fallback to console if no email creds (dev mode)
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log("--------------------------------");
            console.log(`[DEV MODE] OTP for ${normalizedEmail}: ${otpCode}`);
            console.log("--------------------------------");
            return NextResponse.json({ message: "OTP sent (Console Logged for Dev)" });
        }

        await transporter.sendMail({
            from: `"Admin Panel" <${process.env.GMAIL_APP_PASSWORD}>`,
            to: normalizedEmail,
            subject: "Your Admin Login OTP",
            text: `Your OTP is: ${otpCode}. It expires in 10 minutes.`,
            html: `<p>Your Admin Login OTP is: <strong>${otpCode}</strong></p><p>Expires in 10 minutes.</p>`,
        });

        return NextResponse.json({ message: "OTP sent to email" });

    } catch (error: any) {
        console.error("Send OTP Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
