// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        // Simple server-side validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 1. Configure Nodemailer Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        // 2. Define the email content
        const mailOptions = {
            from: process.env.GMAIL_USER, // Sender address (must be your verified gmail)
            to: process.env.GMAIL_USER,   // Receiver (you want to receive the lead)
            replyTo: email,               // When you hit reply, it goes to the client
            subject: `New Lead: ${subject} from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                    <h2 style="color: #7c3aed;">New Contact Form Submission</h2>
                    <p>You have received a new message from your portfolio website.</p>
                    
                    <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-top: 20px;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Intent:</strong> ${subject}</p>
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap; color: #4b5563;">${message}</p>
                    </div>

                    <p style="margin-top: 30px; font-size: 12px; color: #9ca3af;">
                        This email was sent from sahil.dev
                    </p>
                </div>
            `,
        };

        // 3. Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        );
    }
}