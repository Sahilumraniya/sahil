// app/about/page.tsx
import AboutSection from '@/components/AboutSection'; // The Grid/Bio component
import TechStack from '@/components/TechStack'; // The detailed Bento Grid
import PhilosophySection from '@/components/PhilosophySection'; // Engineering Values
import EducationSection from '@/components/EducationSection'; // The NEW component above
import CTABanner from '@/components/CTABanner';
import ExperienceSection from '@/components/ExperienceSection';

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-20">

            {/* 1. Header Hero for About Page */}
            <section className="relative py-20 px-4 sm:px-6 container mx-auto text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                    The Person Behind <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">The Pixels</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    My journey from a curious student to a Full Stack Engineer & AI Specialist.
                </p>
            </section>

            {/* 2. Bio & Personality */}
            <AboutSection />

            {/* 3. Detailed Experience Timeline */}
            <ExperienceSection />

            {/* 4. Engineering Philosophy (Why you are good) */}
            <PhilosophySection />
            <TechStack />

            {/* 6. Education & Certs */}
            <EducationSection />

            {/* 7. Final Call to Action */}
            <CTABanner />

        </main>
    );
}