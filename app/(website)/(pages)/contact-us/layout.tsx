import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact — Let's Build Something Extraordinary",
    description: "Get in touch with Sahil Umraniya for freelance projects, full-stack web development, AI integration, or collaboration. Available for new projects.",
    alternates: {
        canonical: "/contact-us",
    },
    openGraph: {
        title: "Contact Sahil Umraniya | Full Stack Engineer",
        description: "Ready to build something extraordinary? Contact Sahil for Next.js, MERN Stack, or AI-powered solutions.",
        url: "https://sahilumraniya.dev/contact-us",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Sahil Umraniya",
        description: "Available for freelance projects, web development, and AI integration.",
        creator: "@2Umraniya",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
