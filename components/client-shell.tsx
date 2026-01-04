"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from "next-themes";
import {
    ArrowRight,
    Package,
} from 'lucide-react';
import TechStack from './TechStack';
import { SectionHeading } from './SectionHeading';
import { FAQSection } from './FAQSection';
import ServicesSection from './ServicesSection';
import ImpactStats from './ImpactStats';
import Testimonials from './Testimonials';
import CTABanner from './CTABanner';
import ExperienceSection from './ExperienceSection';
import FeaturedProjects from './FeaturedProjects';

/* -------------------------------------------------------------------------- */
/* UTILITY COMPONENTS                                                         */
/* -------------------------------------------------------------------------- */

const MouseFollower = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            requestAnimationFrame(() => {
                setPosition({ x: e.clientX, y: e.clientY });
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="hidden md:block pointer-events-none fixed inset-0 z-[60] opacity-50 dark:opacity-30 mix-blend-screen">
            <div
                className="absolute w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
                style={{ left: position.x, top: position.y }}
            />
        </div>
    );
};

const ScrambleText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

    useEffect(() => {
        if (!isHovering) {
            setDisplayText(text);
            return;
        }
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(prev =>
                text.split("").map((letter, index) => {
                    if (index < iteration) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [isHovering, text]);

    return (
        <span
            className="font-mono cursor-default inline-block min-w-[200px]"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {displayText}
        </span>
    );
};

const FadeIn = ({ children }: { children: React.ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        });
        const currentElement = domRef.current;
        if (currentElement) observer.observe(currentElement);
        return () => { if (currentElement) observer.unobserve(currentElement); };
    }, []);
    return (
        <div ref={domRef} className={`fade-up ${isVisible ? 'visible' : ''}`}>
            {children}
        </div>
    );
};

export default function ClientShell() {
    return (
        <div className="min-h-screen transition-colors duration-300 overflow-x-hidden relative w-full">            <MouseFollower />

            {/* Background */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
                <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-violet-200 dark:bg-violet-900/20 rounded-full blur-[120px] animate-pulse opacity-50"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-200 dark:bg-blue-900/20 rounded-full blur-[120px] animate-pulse delay-1000 opacity-50"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] dark:opacity-20"></div>
            </div>

            <main className="pt-32 w-full display:flex flex-col items-center justify-center sm:px-6 px-4">
                <div className="space-y-32">
                    <section className="container mx-auto px-4 sm:px-6 text-center">
                        <FadeIn>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-700 dark:text-violet-300 text-xs sm:text-sm font-bold uppercase mb-6 sm:mb-8">
                                <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span></span> Open to Work
                            </div>
                            <h1 className="text-[clamp(2.6rem,8vw,4.6rem)] md:text-7xl lg:text-8xl font-extrabold leading-[1.05] md:leading-tight mb-6 sm:mb-8 tracking-tight text-slate-900 dark:text-white">
                                Building Scalable <br className="hidden sm:block" /><span className="text-gradient inline-block relative"><ScrambleText text="Full-Stack Systems" /></span>
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">I'm Sahil Umraniya. I engineer <span className="font-semibold text-slate-900 dark:text-white">high-performance backends</span> and <span className="font-semibold text-slate-900 dark:text-white">AI-driven applications</span> that scale.</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full sm:w-auto">
                                <a href="/projects" className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">View Work <ArrowRight size={18} /></a>
                                <a href="/resume" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white rounded-full font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">View Resume</a>
                            </div>
                        </FadeIn>
                    </section>

                    <ImpactStats />
                    <ServicesSection />
                    <FeaturedProjects />
                    <Testimonials />
                    <TechStack />
                    <ExperienceSection />
                </div>
                <CTABanner />
                <FAQSection />
            </main>
        </div>
    );
}