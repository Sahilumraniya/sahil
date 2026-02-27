import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Projects — Built to Perform",
    description: "Explore Sahil Umraniya's projects: from NPM packages (Retro Table, Retro Form) to full-stack apps, AI experiments, and backend systems. Production-grade code.",
    alternates: {
        canonical: "/projects",
    },
    openGraph: {
        title: "Projects by Sahil Umraniya | Full Stack Engineer",
        description: "A collection of production-grade applications, developer tools, and AI experiments.",
        url: "https://sahilumraniya.dev/projects",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Projects by Sahil Umraniya",
        description: "NPM packages, full-stack apps, AI experiments, and backend systems.",
        creator: "@2Umraniya",
    },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
