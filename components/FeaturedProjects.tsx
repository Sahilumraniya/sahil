'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Package, Layout, Server, BrainCircuit, Github, ExternalLink, Terminal } from 'lucide-react';
import Link from 'next/link';
import { SectionHeading } from "./SectionHeading";

const FEATURED_PROJECTS = [
    {
        title: "Self-Hosted Server Platform",
        tech: ["Next.js", "systemd", "Caddy", "MongoDB"],
        desc: "Internal platform for process supervision via systemd, Caddy reverse proxy TLS management, and MongoDB control panel.",
        link: "https://server.sahilumraniya.dev/",
        github: "https://github.com/sahilumraniya",
        icon: Terminal,
        gradient: "from-cyan-500 to-blue-500",
        lightBg: "bg-cyan-50",
        darkBg: "dark:bg-cyan-950/30",
        accent: "text-cyan-600 dark:text-cyan-400",
        tag: "DevOps & Infrastructure"
    },
    {
        title: "WebPanda Multi-Tenant AI Platform",
        tech: ["Next.js", "Firebase", "AWS S3", "OpenAI"],
        desc: "Multi-tenant SaaS marketplace featuring LLM resume parsing, RAG candidate matching, and zero-server-overhead S3 uploads.",
        link: "http://webpanda.ai",
        github: "https://github.com/sahilumraniya",
        icon: BrainCircuit,
        gradient: "from-violet-500 to-purple-500",
        lightBg: "bg-violet-50",
        darkBg: "dark:bg-violet-950/30",
        accent: "text-violet-600 dark:text-violet-400",
        tag: "Multi-Tenant SaaS"
    },
    {
        title: "Retro Form & Retro Table",
        tech: ["React", "TypeScript", "Zod", "NPM"],
        desc: "Headless data table hook for sorting/filtering and schema-driven (JSON/Zod) form generator published on NPM.",
        link: "https://www.npmjs.com/package/retro-table",
        github: "https://github.com/sahilumraniya",
        icon: Package,
        gradient: "from-indigo-500 to-blue-500",
        lightBg: "bg-indigo-50",
        darkBg: "dark:bg-indigo-950/30",
        accent: "text-indigo-600 dark:text-indigo-400",
        tag: "Developer Tooling"
    },
    {
        title: "POS & Operations ERP Suite",
        tech: ["Next.js", "Prisma", "MySQL", "Socket.io"],
        desc: "Real-time Point of Sale and inventory ERP for restaurants with live table state and WebSocket terminal sync.",
        link: "https://restaurant-management-system.sahilumraniya.dev/",
        github: "https://github.com/sahilumraniya",
        icon: Server,
        gradient: "from-emerald-500 to-teal-500",
        lightBg: "bg-emerald-50",
        darkBg: "dark:bg-emerald-950/30",
        accent: "text-emerald-600 dark:text-emerald-400",
        tag: "Full Stack ERP"
    },
    {
        title: "ReplyMe — AI Support Platform",
        tech: ["Conversational AI", "RAG", "Rasa"],
        desc: "AI-driven customer support platform using Rasa and RAG pipelines for domain-specific QA over structured/unstructured knowledge.",
        link: "https://github.com/sahilumraniya",
        github: "https://github.com/sahilumraniya",
        icon: BrainCircuit,
        gradient: "from-pink-500 to-rose-500",
        lightBg: "bg-pink-50",
        darkBg: "dark:bg-pink-950/30",
        accent: "text-pink-600 dark:text-pink-400",
        tag: "Conversational AI"
    },
    {
        title: "Distributed Redis Queue Processor",
        tech: ["Redis", "Node.js", "System Design"],
        desc: "Production-grade async job queue supporting batch, delayed, and event-driven workloads with idempotency guarantees.",
        link: "https://github.com/sahilumraniya",
        github: "https://github.com/sahilumraniya",
        icon: Server,
        gradient: "from-amber-500 to-orange-500",
        lightBg: "bg-amber-50",
        darkBg: "dark:bg-amber-950/30",
        accent: "text-amber-600 dark:text-amber-400",
        tag: "System Design"
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
                            ds-card
                            group relative flex flex-col p-8
                            overflow-hidden
                            transition-all duration-500
                            hover:-translate-y-2 hover:brightness-105
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
                        <h3 className="text-2xl font-bold text-[var(--ds-text,currentColor)] mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-indigo-600 dark:group-hover:from-violet-400 dark:group-hover:to-indigo-400 transition-all duration-300">
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
                                        className="p-2.5 rounded-xl bg-white/80 dark:bg-white/5 opacity-70 hover:opacity-100 hover:text-[var(--ds-text,currentColor)] border border-slate-200/60 dark:border-white/10 transition-colors">
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
                    className="ds-btn inline-flex items-center justify-center gap-2 px-8 py-3.5 font-semibold transition-all duration-300 hover:opacity-90"
                >
                    View Complete Portfolio <ArrowUpRight size={16} />
                </Link>
            </div>
        </section>
    );
}