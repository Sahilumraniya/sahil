// app/about/page.tsx
import type { Metadata } from 'next';
import AboutSection from '@/components/AboutSection'; // The Grid/Bio component
import TechStack from '@/components/TechStack'; // The detailed Bento Grid
import PhilosophySection from '@/components/PhilosophySection'; // Engineering Values
import EducationSection from '@/components/EducationSection'; // The NEW component above
import CTABanner from '@/components/CTABanner';
import ExperienceSection from '@/components/ExperienceSection';
import Script from 'next/script';

export const metadata: Metadata = {
    title: "About — Full Stack Engineer & AI Specialist",
    description: "Learn about Sahil Umraniya — a Full Stack Engineer with 2+ years of experience in Next.js, MERN Stack, Node.js, Redis, and Generative AI. Based in Ahmedabad, India.",
    alternates: {
        canonical: "/about-us",
    },
    openGraph: {
        title: "About Sahil Umraniya | Full Stack Engineer",
        description: "My journey from a curious student to a Full Stack Engineer & AI Specialist. 2+ years building scalable production systems.",
        url: "https://sahilumraniya.dev/about-us",
        type: "profile",
    },
    twitter: {
        card: "summary_large_image",
        title: "About Sahil Umraniya | Full Stack Engineer",
        description: "My journey from a curious student to a Full Stack Engineer & AI Specialist.",
        creator: "@2Umraniya",
    },
};

const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: "About Sahil Umraniya",
    description: "Profile page of Sahil Umraniya — Full Stack Engineer & AI Specialist",
    url: "https://sahilumraniya.dev/about-us",
    mainEntity: {
        "@type": "Person",
        "@id": "https://sahilumraniya.dev/#person",
        name: "Sahil Umraniya",
        jobTitle: "Full Stack Engineer",
        description: "Software engineer with 2+ years of experience building scalable, production-grade web applications.",
        image: "https://sahilumraniya.dev/logo.png",
        url: "https://sahilumraniya.dev",
        sameAs: [
            "https://github.com/sahilumraniya",
            "https://linkedin.com/in/sahilumraniya",
            "https://x.com/2Umraniya",
        ],
    },
};

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://sahilumraniya.dev" },
        { "@type": "ListItem", position: 2, name: "About", item: "https://sahilumraniya.dev/about-us" },
    ],
};

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-20">
            <Script
                id="about-profile-jsonld"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
            />
            <Script
                id="about-breadcrumb-jsonld"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* 1. Header Hero for About Page */}
            <section className="relative py-20 px-4 sm:px-6 container mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                    The Person Behind <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">The Pixels</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    My journey from a curious student to a Full Stack Engineer &amp; AI Specialist.
                </p>
            </section>

            {/* 2. Bio & Personality */}
            <AboutSection />

            {/* 3. Detailed Experience Timeline */}
            <ExperienceSection />

            {/* 4. Engineering Philosophy */}
            <PhilosophySection />
            <TechStack />

            {/* 5. Education & Certs */}
            <EducationSection />

            {/* 6. Final Call to Action */}
            <CTABanner />

        </main>
    );
}