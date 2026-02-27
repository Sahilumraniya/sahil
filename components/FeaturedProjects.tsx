'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Package, Layout, Server, BrainCircuit, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { SectionHeading } from "./SectionHeading";

const FEATURED_PROJECTS = [
    {
        title: "Retro Table",
        tech: ["React", "TypeScript", "NPM"],
        desc: "A headless, high-performance React hook for building complex data tables. Features sorting, pagination, and filtering out of the box.",
        link: "https://www.npmjs.com/package/retro-table",
        github: "#",
        icon: Package,
        gradient: "from-blue-500 to-cyan-500",
        lightBg: "bg-blue-50",
        darkBg: "dark:bg-blue-950/30",
        accent: "text-blue-600 dark:text-blue-400",
        tag: "NPM Package"
    },
    {
        title: "Web Panda AI",
        tech: ["OpenAI", "Next.js", "PostgreSQL"],
        desc: "Freelance marketplace with LLM-based resume parsing and AI-powered candidate matching.",
        link: "https://webpand.ai",
        github: "#",
        icon: BrainCircuit,
        gradient: "from-violet-500 to-purple-500",
        lightBg: "bg-violet-50",
        darkBg: "dark:bg-violet-950/30",
        accent: "text-violet-600 dark:text-violet-400",
        tag: "Full Stack App"
    },
    {
        title: "Retro Form",
        tech: ["React", "Zod", "Tailwind"],
        desc: "Advanced form builder with type-safe validation and dynamic layout generation.",
        link: "https://retroform.io",
        github: "#",
        icon: Layout,
        gradient: "from-indigo-500 to-blue-500",
        lightBg: "bg-indigo-50",
        darkBg: "dark:bg-indigo-950/30",
        accent: "text-indigo-600 dark:text-indigo-400",
        tag: "Developer Tool"
    },
    {
        title: "Redis Queue",
        tech: ["Redis", "Node.js", "System Design"],
        desc: "Production-grade async job processor handling 10k+ events/hour with reliable retry logic.",
        link: "https://github.com/sahilumraniya",
        github: "https://github.com/sahilumraniya",
        icon: Server,
        gradient: "from-emerald-500 to-teal-500",
        lightBg: "bg-emerald-50",
        darkBg: "dark:bg-emerald-950/30",
        accent: "text-emerald-600 dark:text-emerald-400",
        tag: "Backend System"
    },
];

export default function FeaturedProjects() {
    return (
        <section className="container mx-auto px-4 sm:px-6">

            <SectionHeading
                badge="Portfolio"
                title="Featured Projects"
                description="Selected projects where I solved complex engineering challenges."
            />

            {/* Bento-style grid: first two projects take full width, bottom two are side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {FEATURED_PROJECTS.map((project, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                        className={`
                            group relative flex flex-col p-8
                            rounded-3xl overflow-hidden
                            ${project.lightBg} ${project.darkBg}
                            border border-slate-200/60 dark:border-white/5
                            transition-all duration-500
                            hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-none
                        `}
                    >
                        {/* Gradient accent bar at top */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

                        {/* Card Header */}
                        <div className="flex justify-between items-start mb-6">
                            {/* Icon with gradient background */}
                            <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${project.gradient} text-white shadow-lg`}>
                                <project.icon size={28} />
                            </div>

                            {/* Tag + Action buttons */}
                            <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold uppercase tracking-wider ${project.accent} bg-white/80 dark:bg-white/5 px-3 py-1.5 rounded-full border border-slate-200/60 dark:border-white/10`}>
                                    {project.tag}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-indigo-600 dark:group-hover:from-violet-400 dark:group-hover:to-indigo-400 transition-all duration-300">
                            {project.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-1 text-base">
                            {project.desc}
                        </p>

                        {/* Footer: Tech Stack + Links */}
                        <div className="flex items-end justify-between pt-6 border-t border-slate-200/60 dark:border-white/5 mt-auto">
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map(t => (
                                    <span key={t} className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/80 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-white/5">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                {project.github !== '#' && (
                                    <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub Repo"
                                        className="p-2.5 rounded-xl bg-white/80 dark:bg-white/5 text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200/60 dark:border-white/10 transition-colors">
                                        <Github size={18} />
                                    </a>
                                )}
                                {project.link !== '#' && (
                                    <a href={project.link} target="_blank" rel="noreferrer" aria-label="Live Demo"
                                        className={`p-2.5 rounded-xl bg-gradient-to-r ${project.gradient} text-white shadow-md hover:shadow-lg transition-shadow`}>
                                        <ExternalLink size={18} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* View All Link */}
            <div className="mt-14 text-center">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-black/5"
                >
                    View Complete Portfolio <ArrowUpRight size={16} />
                </Link>
            </div>
        </section>
    );
}