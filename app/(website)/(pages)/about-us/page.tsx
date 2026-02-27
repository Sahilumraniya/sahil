// app/about/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import AboutSection from '@/components/AboutSection'; // The Grid/Bio component
import TechStack from '@/components/TechStack'; // The detailed Bento Grid
import PhilosophySection from '@/components/PhilosophySection'; // Engineering Values
import EducationSection from '@/components/EducationSection'; // The NEW component above
import CTABanner from '@/components/CTABanner';
import ExperienceSection from '@/components/ExperienceSection';

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
        address: {
            "@type": "PostalAddress",
            streetAddress: "Makarba",
            addressLocality: "Ahmedabad",
            addressRegion: "Gujarat",
            postalCode: "380051",
            addressCountry: "IN",
        },
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* 1. Header Hero for About Page */}
            <section className="relative py-16 sm:py-20 px-4 sm:px-6 container mx-auto overflow-hidden">

                {/* Decorative Tech Pattern Illustration */}
                <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] opacity-[0.06] dark:opacity-[0.04] pointer-events-none -z-10 animate-float">
                    <Image
                        src="/tech-pattern.png"
                        alt="Abstract Tech Pattern"
                        width={500}
                        height={500}
                        className="w-full h-full object-contain"
                    />
                </div>

                <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                    {/* Photo */}
                    <div className="relative flex-shrink-0 w-48 h-48 md:w-64 md:h-64">
                        <div className="absolute -inset-2 bg-gradient-to-br from-violet-500 via-indigo-500 to-purple-500 rounded-3xl opacity-20 blur-md"></div>
                        <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-white/80 dark:border-white/10 shadow-2xl group cursor-pointer">
                            <Image
                                src="/sahil-about.png"
                                alt="Sahil Umraniya"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                sizes="(max-width: 768px) 192px, 256px"
                            />
                        </div>
                    </div>
                    {/* Text */}
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">
                            The Person Behind <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">The Pixels</span>
                        </h1>
                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl">
                            Based in Ahmedabad, Engineering for the World. I specialize in bespoke software solutions and remote-first collaboration for global clients.
                        </p>
                    </div>
                </div>
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