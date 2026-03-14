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
            <section className="relative py-4 sm:py-8 px-4 sm:px-6 container mx-auto">
                {/* Background Glow Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full bg-gradient-to-tr from-violet-500/10 via-transparent to-indigo-500/10 blur-[100px] pointer-events-none -z-10" />

                <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 max-w-6xl mx-auto">
                    {/* Photo Container */}
                    <div className="relative group">
                        {/* Animated Ring */}
                        <div className="absolute -inset-4 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-[2.5rem] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>

                        {/* Image Frame */}
                        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden border border-white/80 dark:border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                            {/* Inner Glow */}
                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <Image
                                src="/sahil-about.png"
                                alt="Sahil Umraniya"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                priority
                                sizes="(max-width: 768px) 256px, 320px"
                            />
                        </div>

                        {/* Floating Tech Badge (Optional/Aesthetic) */}
                        <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 animate-bounce hover:animate-none transition-all cursor-default">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-sm font-bold tracking-tight text-slate-800 dark:text-slate-200">Available for Work</span>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 border border-violet-100 dark:border-violet-800 text-violet-600 dark:text-violet-400 text-sm font-semibold tracking-wide uppercase">
                            <span>The Journey</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                            The Person Behind <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">The Pixels</span>
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                            Based in Ahmedabad, Engineering for the World. I specialize in building <span className="text-slate-900 dark:text-white font-medium italic underline decoration-violet-500/30">bespoke software solutions</span> and remote-first collaboration for high-growth global startups.
                        </p>

                        {/* <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                                        +
                                    </div>
                                ))}
                            </div>
                            <span className="text-sm text-slate-500 dark:text-slate-500 font-medium">Trusted by founders globally</span>
                        </div> */}
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