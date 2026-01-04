'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Package, Layout, Server, BrainCircuit, Github } from 'lucide-react';
import Link from 'next/link';
import { SectionHeading } from "./SectionHeading";

const FEATURED_PROJECTS = [
    {
        title: "Retro Table",
        tech: ["React", "TypeScript", "NPM"],
        desc: "A headless, high-performance React hook for building complex data tables. Features sorting, pagination, and filtering out of the box.",
        link: "https://www.npmjs.com/package/retro-table",
        github: "#", // Add link if you have it
        icon: Package,
        color: "text-blue-500",
        border: "hover:border-blue-500/50",
        bg: "hover:bg-blue-500/5",
        iconBg: "bg-blue-500/10"
    },
    {
        title: "Web Panda AI",
        tech: ["Next.js", "GenAI", "Firebase"],
        desc: "Freelance marketplace with LLM-based resume parsing and candidate matching.",
        link: "https://webpand.ai",
        github: "#", // Add link if you have it
        icon: BrainCircuit,
        color: "text-violet-500",
        border: "hover:border-violet-500/50",
        bg: "hover:bg-violet-500/5",
        iconBg: "bg-violet-500/10"
    },
    {
        title: "Retro Form",
        tech: ["React", "Zod", "Schema"],
        desc: "Schema-driven form generator. Define complex validation logic in JSON and render UI instantly.",
        link: "https://retroform.io",
        github: "#",
        icon: Layout,
        color: "text-indigo-500",
        border: "hover:border-indigo-500/50",
        bg: "hover:bg-indigo-500/5",
        iconBg: "bg-indigo-500/10"
    }, {
        title: "Redis Queue",
        tech: ["Redis", "Node.js", "System Design"],
        desc: "Production-grade async job processor handling 10k+ events/hour with reliable retry logic.",
        link: "#",
        github: "https://github.com/sahilumraniya",
        icon: Server,
        color: "text-emerald-500",
        border: "hover:border-emerald-500/50",
        bg: "hover:bg-emerald-500/5",
        iconBg: "bg-emerald-500/10"
    },
];

export default function FeaturedProjects() {
    return (
        <section className="container mx-auto px-4 sm:px-6">

            <SectionHeading
                badge="Portfolio"
                title="Flagship Work"
                description="Selected projects where I solved complex engineering challenges."
            />

            {/* Clean 2x2 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {FEATURED_PROJECTS.map((project, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className={`
                            group relative flex flex-col p-8 rounded-[2rem]
                            bg-white dark:bg-white/5 backdrop-blur-sm
                            border border-slate-200 dark:border-white/10
                            ${project.border} ${project.bg}
                            transition-all duration-300
                            hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-none
                        `}
                    >
                        {/* Card Header: Icon + Links */}
                        <div className="flex justify-between items-start mb-8">
                            {/* Project Icon */}
                            <div className={`p-4 rounded-2xl ${project.iconBg} ${project.color} border border-transparent dark:border-white/5`}>
                                <project.icon size={32} />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                {project.github !== '#' && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="GitHub Repo"
                                        className="p-3 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                                    >
                                        <Github size={20} />
                                    </a>
                                )}
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Live Demo"
                                    className="p-3 rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-white transition-colors hover:bg-slate-900 dark:hover:bg-violet-600"
                                >
                                    <ArrowUpRight size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Text Content */}
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                            {project.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-1 text-base">
                            {project.desc}
                        </p>

                        {/* Tech Stack Footer */}
                        <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100 dark:border-white/5 mt-auto">
                            {project.tech.map(t => (
                                <span key={t} className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* View All Link */}
            <div className="mt-12 text-center">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                >
                    View Complete Portfolio <ArrowUpRight size={16} />
                </Link>
            </div>
        </section>
    );
}