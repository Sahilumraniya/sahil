"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github,
    ExternalLink,
    Code2,
    Smartphone,
    Layout,
    Server,
    BrainCircuit,
    Terminal,
    Gamepad2,
    Package
} from 'lucide-react';
import Link from 'next/link';

// --- DATA STRUCTURE ---

const PROJECTS = [
    // 1. Featured / High Priority
    {
        title: "Retro Table",
        tech: ["React", "TypeScript", "NPM"],
        tag: "Tools",
        desc: "A powerful, headless React hook for building complex data tables. Features sorting, pagination, and filtering out of the box.",
        github: "https://www.npmjs.com/package/retro-table",
        host: "https://www.npmjs.com/package/retro-table",
        challenge: "Abstracting data logic while maintaining 100% UI flexibility for developers.",
        featured: true,
        icon: Package,
        color: "text-blue-500 bg-blue-500/10"
    },
    {
        title: "Retro Form",
        tech: ["React", "Zod", "Validation"],
        tag: "Tools",
        desc: "Schema-driven form generator. Define your schema in JSON/Zod and render production-ready forms instantly.",
        github: "#", // Add link if public
        host: "#",
        challenge: "Handling complex nested validation and dynamic field dependencies efficiently.",
        featured: true,
        icon: Layout,
        color: "text-indigo-500 bg-indigo-500/10"
    },
    {
        title: "Get Hired Marketplace",
        tech: ["Next.js", "Firebase", "GenAI"],
        tag: "Full Stack",
        desc: "Two-sided freelance marketplace connecting talent with agencies. Features AI-powered resume parsing and matching.",
        github: "https://github.com/Sahilumraniya",
        host: "https://gethiredat.vercel.app",
        challenge: "Mapping unstructured resume data to structured database schemas using LLMs.",
        featured: true,
        icon: Layout,
        color: "text-violet-500 bg-violet-500/10"
    },
    {
        title: "Redis Queue Processor",
        tech: ["Redis", "Node.js", "System Design"],
        tag: "Backend",
        desc: "Production-grade async processing system for handling thousands of batch jobs reliably.",
        github: "https://github.com/sahilumraniya",
        host: "#",
        challenge: "Ensuring idempotency and handling race conditions in a distributed environment.",
        featured: true,
        icon: Server,
        color: "text-emerald-500 bg-emerald-500/10"
    },

    // 2. Web & Full Stack
    {
        title: "Swap & Share",
        tech: ["MERN Stack", "AWS S3", "Socket.io"],
        tag: "Full Stack",
        desc: "Real-time resource swapping platform allowing users to exchange digital assets securely.",
        github: "https://github.com/Sahilumraniya/ShwapNShare/",
        host: "https://swapnshare.vercel.app/",
        challenge: "Implementing real-time state synchronization across clients.",
        icon: Layout,
        color: "text-orange-500 bg-orange-500/10"
    },
    {
        title: "Learnfinity",
        tech: ["Next.js", "Tailwind", "PostgreSQL"],
        tag: "Full Stack",
        desc: "Modern educational platform designed for seamless learning experiences with video streaming integration.",
        github: "https://github.com/Sahilumraniya/Learnfinity",
        host: "https://learnfinity.vercel.app/",
        challenge: "Optimizing video delivery and SEO for dynamic content.",
        icon: Layout,
        color: "text-cyan-500 bg-cyan-500/10"
    },
    {
        title: "Startup Directory",
        tech: ["MERN Stack", "Tailwind"],
        tag: "Full Stack",
        desc: "A curated directory of startups with search, filter, and submission capabilities.",
        github: "https://github.com/Sahilumraniya/Startup-Directory-Web-App",
        host: "https://startup-directory-web-app.vercel.app/",
        icon: Layout,
        color: "text-pink-500 bg-pink-500/10"
    },
    {
        title: "Manufacturing Business Site",
        tech: ["Next.js", "Framer Motion"],
        tag: "Web",
        desc: "Corporate website for Bhramani Machinery with product catalog and inquiry systems.",
        github: "https://github.com/Sahilumraniya/Bhramani-Machinery",
        host: "https://bhramani-machinery.vercel.app/",
        icon: Layout,
        color: "text-slate-500 bg-slate-500/10"
    },

    // 3. AI & Python
    {
        title: "AI Maze Solver",
        tech: ["Python", "Pygame", "A* Algo"],
        tag: "AI/ML",
        desc: "Intelligent bot that visualizes pathfinding algorithms to solve complex mazes in real-time.",
        github: "https://github.com/Sahilumraniya/Maze_Game",
        host: "https://drive.google.com/file/d/1LrzyO_xEnLR_5kf07WBCzsCL-b5WsLQg/view",
        challenge: "Optimizing heuristics for faster path convergence.",
        icon: BrainCircuit,
        color: "text-rose-500 bg-rose-500/10"
    },
    {
        title: "Flappy Bird AI",
        tech: ["Python", "NEAT", "Pygame"],
        tag: "AI/ML",
        desc: "Recreated the classic game with an AI that learns to play itself using Neural Evolution.",
        github: "https://github.com/Sahilumraniya/Flappy-Bird-Game",
        host: "#",
        icon: Gamepad2,
        color: "text-yellow-500 bg-yellow-500/10"
    },

    // 4. Mobile
    {
        title: "Expense Manager",
        tech: ["Flutter", "Dart", "SQLite"],
        tag: "Mobile",
        desc: "Cross-platform mobile app for tracking daily expenses with visual charts and reports.",
        github: "https://github.com/Sahilumraniya/Expense-manager-Flutter-App",
        host: "#",
        icon: Smartphone,
        color: "text-blue-600 bg-blue-600/10"
    },

    // 5. Basic Web
    {
        title: "Movie Search Engine",
        tech: ["JavaScript", "OMDb API"],
        tag: "Web",
        desc: "Fast movie search application using vanilla JavaScript and public APIs.",
        github: "https://github.com/sahilumraniya/MovieSearch/",
        host: "https://sahilumraniya.github.io/MovieSearch/",
        icon: Code2,
        color: "text-teal-500 bg-teal-500/10"
    },
    {
        title: "Insightful Blog",
        tech: ["HTML5", "CSS3"],
        tag: "Web",
        desc: "A minimal, accessible blog template focusing on typography and readability.",
        github: "https://github.com/Sahilumraniya/Insightful-Blog",
        host: "https://sahilumraniya.github.io/Insightful-Blog/",
        icon: Code2,
        color: "text-teal-500 bg-teal-500/10"
    }
];

const CATEGORIES = ['All', 'Full Stack', 'Backend', 'AI/ML', 'Mobile', 'Tools', 'Web'];

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const displayedProjects = activeCategory === 'All'
        ? PROJECTS
        : PROJECTS.filter((p) => {
            // Flexible matching: If category is "Web", allow "Full Stack" too
            if (activeCategory === 'Web' && p.tag === 'Full Stack') return true;
            return p.tag.toLowerCase().includes(activeCategory.toLowerCase()) ||
                (activeCategory === 'Full Stack' && p.tag === 'Web');
        });

    return (
        <main className="min-h-screen pt-32 pb-20">

            {/* Header Section */}
            <div className="relative container mx-auto px-4 sm:px-6 mb-8 text-center overflow-hidden py-4">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full bg-violet-500/5 blur-[120px] pointer-events-none -z-10" />

                <div className="space-y-6 max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest"
                    >
                        <Package size={14} className="text-violet-500" />
                        <span>Featured Works</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black tracking-tight text-slate-900 dark:text-white"
                    >
                        Built to <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">Perform.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        A curated collection of production-grade applications, developer tools, and AI experiments crafted with technical precision.
                    </motion.p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="container mx-auto px-4 sm:px-6 mb-12">
                <div className="flex justify-center">
                    <div className="flex flex-wrap justify-center gap-2 p-1.5 ds-card text-[var(--ds-text,currentColor)]">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-300 z-10 ${activeCategory === cat
                                    ? 'text-white dark:text-slate-900'
                                    : 'opacity-70 hover:opacity-100'
                                    }`}
                            >
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-slate-900 dark:bg-violet-600 rounded-xl -z-10 shadow-lg"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode='popLayout'>
                        {displayedProjects.map((project, idx) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={project.title} // Use title as key for stability
                                className="ds-card group relative flex flex-col h-full p-6 hover:brightness-105 hover:border-[var(--ds-card-border)] hover:border-violet-500/30 transition-all duration-300"
                            >
                                {/* Header: Icon & Links */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-3 rounded-2xl ${project.color}`}>
                                        <project.icon size={24} />
                                    </div>
                                    <div className="flex gap-2">
                                        {project.github && project.github !== '#' && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                                title="View Code"
                                            >
                                                <Github size={18} />
                                            </a>
                                        )}
                                        {project.host && project.host !== '#' && (
                                            <a
                                                href={project.host}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                                title="View Live"
                                            >
                                                <ExternalLink size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="mb-6 flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-violet-500 transition-colors">
                                            {project.title}
                                        </h3>
                                        {project.featured && (
                                            <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-wide">
                                                Featured
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {project.desc}
                                    </p>

                                    {/* Challenge Box (Only if exists) */}
                                    {project.challenge && (
                                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-1">
                                                Key Challenge
                                            </p>
                                            <p className="text-xs text-slate-700 dark:text-slate-300 italic">
                                                "{project.challenge}"
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Footer: Tech Stack */}
                                <div className="mt-auto flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs font-medium text-slate-600 dark:text-slate-400"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </main>
    );
}