
import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    // Force path style for buckets with dots (e.g. "my.bucket.name") to avoid SSL errors
    forcePathStyle: true,
    // Prevent the SDK from adding checksum headers/params that the browser won't send
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED",
});

export async function POST(request: Request) {
    try {
        const { filename, filetype } = await request.json();

        if (!filename || !filetype) {
            return NextResponse.json({ error: "Filename and filetype are required" }, { status: 400 });
        }

        const key = `uploads/${uuidv4()}-${filename.replace(/\s+/g, '-')}`;

        if (!process.env.AWS_REGION || !process.env.AWS_BUCKET_NAME) {
            return NextResponse.json({ error: "Missing AWS Configuration" }, { status: 500 });
        }

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key,
            // Header handling in S3Client v3 is strict. We let client send whatever Content-Type they want.
            // ContentType: filetype, 
            // ACL: 'public-read', // Commented out: Use Bucket Policy for public access instead of ACLs to avoid "Block Public Access" errors
        });

        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 30 });

        // Construct Path-Style Public URL to avoid SSL errors: https://s3.REGION.amazonaws.com/BUCKET/KEY
        const fileUrl = `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${key}`;

        return NextResponse.json({ signedUrl, fileUrl });
    } catch (error) {
        console.error("S3 Presign Error:", error);
        return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
    }
}
