"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from "next-themes";
import {
    ArrowRight,
    Sparkles,
    Code2,
    Cpu,
    Layers,
    Package,
} from 'lucide-react';
import Image from 'next/image';
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

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
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
        <div ref={domRef} className={`fade-up ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
};

export default function ClientShell() {
    return (
        <div className="min-h-screen transition-colors duration-300 overflow-x-hidden relative w-full">            <MouseFollower />
            <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
                <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-violet-200 dark:bg-violet-900/20 rounded-full blur-[120px] animate-pulse opacity-50"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-200 dark:bg-blue-900/20 rounded-full blur-[120px] animate-pulse delay-1000 opacity-50"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] dark:opacity-20"></div>
            </div>

            <main className="pt-24 w-full display:flex flex-col items-center justify-center px-4">
                <div className="space-y-16 sm:space-y-24">
                    <section className="container mx-auto px-4 sm:px-6 relative">
                        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                            {/* LEFT: Text Content */}
                            <div className="flex-1 text-center lg:text-left relative">
                                <FadeIn>
                                    {/* Availability badge */}
                                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold mb-8">
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                        </span>
                                        Available for Projects
                                    </div>

                                    {/* Headline */}
                                    <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] md:text-6xl lg:text-7xl font-extrabold leading-[1.08] mb-6 tracking-tight">
                                        <span className="text-slate-900 dark:text-white">I Engineer</span>
                                        <br />
                                        <span className="text-slate-900 dark:text-white">Products </span>
                                        <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 dark:from-violet-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                                            <ScrambleText text="That Scale" />
                                        </span>
                                    </h1>

                                    {/* Subtitle */}
                                    <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                                        Full Stack Engineer & AI Specialist building
                                        <span className="font-semibold text-slate-800 dark:text-white"> production-grade backends</span>,
                                        <span className="font-semibold text-slate-800 dark:text-white"> Next.js applications</span>, and
                                        <span className="font-semibold text-slate-800 dark:text-white"> intelligent AI systems</span>.
                                    </p>

                                    {/* CTA Buttons */}
                                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4">
                                        <a href="/projects" className="ds-btn group w-full sm:w-auto px-8 py-4 font-bold text-base hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2">
                                            <Sparkles size={18} />
                                            Explore Portfolio
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </a>
                                        <a href="/resume" className="ds-btn w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-[var(--ds-btn-bg,white)] text-slate-800 dark:text-white font-bold text-base hover:brightness-110 flex items-center justify-center">
                                            View Resume
                                        </a>
                                    </div>

                                    {/* Trust indicators */}
                                    <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center">
                                                <span className="text-violet-600 dark:text-violet-400 font-bold text-xs">15+</span>
                                            </div>
                                            <span>Projects Delivered</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
                                                <span className="text-blue-600 dark:text-blue-400 font-bold text-xs">2+</span>
                                            </div>
                                            <span>Years Experience</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center">
                                                <Cpu size={14} className="text-amber-600 dark:text-amber-400" />
                                            </div>
                                            <span>Oracle AI Certified</span>
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>

                            {/* RIGHT: Professional Photo */}
                            <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md">
                                <FadeIn delay={200}>
                                    <div className="relative">
                                        {/* Gradient border ring */}
                                        <div className="absolute -inset-3 bg-gradient-to-br from-violet-500 via-indigo-500 to-purple-500 rounded-[2rem] opacity-20 blur-lg"></div>

                                        {/* Photo container */}
                                        <div className="relative rounded-[2rem] overflow-hidden border-2 border-white/80 dark:border-white/10 shadow-2xl shadow-violet-500/10 dark:shadow-violet-500/5">
                                            <Image
                                                src="/sahil-hero.jpeg"
                                                alt="Sahil Umraniya — Full Stack Engineer & AI Specialist"
                                                width={500}
                                                height={500}
                                                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                                                priority
                                            />
                                        </div>

                                        {/* Floating badges around photo */}
                                        <div className="absolute -top-4 -left-4 flex items-center gap-2 px-4 py-2.5 ds-card text-sm font-medium text-slate-700 dark:text-slate-300 animate-float">
                                            <Code2 size={16} className="text-violet-500" />
                                            Next.js & React
                                        </div>

                                        <div className="absolute -bottom-3 -right-3 flex items-center gap-2 px-4 py-2.5 ds-card text-sm font-medium text-slate-700 dark:text-slate-300 animate-float" style={{ animationDelay: '1s' }}>
                                            <Layers size={16} className="text-indigo-500" />
                                            System Design
                                        </div>

                                        <div className="absolute top-1/2 -right-6 hidden xl:flex items-center gap-2 px-4 py-2.5 ds-card text-sm font-medium text-slate-700 dark:text-slate-300 animate-float" style={{ animationDelay: '2s' }}>
                                            <Cpu size={16} className="text-emerald-500" />
                                            AI & LLMs
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>

                        </div>
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