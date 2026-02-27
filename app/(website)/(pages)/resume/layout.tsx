import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Resume — Sahil Umraniya",
    description: "View the professional resume of Sahil Umraniya — Full Stack Engineer with expertise in React, Next.js, Node.js, Redis, and Generative AI. 2+ years of industry experience.",
    alternates: {
        canonical: "/resume",
    },
    openGraph: {
        title: "Resume | Sahil Umraniya — Full Stack Engineer",
        description: "Professional resume: 2+ years experience, 15+ projects, specializing in Next.js, MERN Stack, and AI.",
        url: "https://sahilumraniya.dev/resume",
        type: "profile",
    },
    twitter: {
        card: "summary_large_image",
        title: "Resume | Sahil Umraniya",
        description: "Full Stack Engineer with 2+ years experience in Next.js, Node.js, and AI.",
        creator: "@2Umraniya",
    },
};

export default function ResumeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
