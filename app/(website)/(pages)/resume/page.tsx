"use client";

import {
    Briefcase,
    Code2,
    Award,
    Download,
    GraduationCap,
    LayoutTemplate,
    ExternalLink,
    MapPin,
    Mail,
    Github,
    Linkedin,
    Terminal,
    Zap,
    Cpu,
    Globe,
    Phone,
    Instagram,
    BarChart3,
    Coffee,
    Bug,
    BrainCircuit,
    Twitter
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

const RESUME_DATA = {
    name: "Sahil Umraniya",
    role: "Full Stack Engineer | Generative AI & RAG Systems | Cloud & DevOps Infrastructure",
    summary: "Full-stack software engineer with 2+ years shipping production systems on React, Next.js, and Node.js. Comfortable moving between application code, distributed systems (Redis-backed job queues, multi-tenant architecture), self-hosted infrastructure (Linux, systemd, Caddy), and applied Generative AI (RAG pipelines, LLM integration). Built and shipped 15+ production-grade applications across SaaS, e-commerce, and mobile.",
    location: "Ahmedabad, India",
    email: "sahilumraniya9512@gmail.com",
    github: "https://github.com/sahilumraniya",
    linkedin: "https://linkedin.com/in/sahilumraniya",
    website: "https://sahilumraniya.dev",
    phone: "+91 9327201427",
};

const EXPERIENCES = [
    {
        title: "Software Engineer (Full Stack)",
        company_name: "Smartters Software",
        date: "Feb 2024 - Present",
        location: "Ahmedabad, India",
        points: [
            "Designed and shipped full-stack features using React, Next.js, and Node.js/Express for production-scale systems.",
            "Architected a Redis-backed asynchronous job processing system (Feathers.js/Express) supporting batch, delayed, and event-driven workflows with idempotency guarantees.",
            "Built schema-driven, reusable form and table abstractions (Retro Form, Retro Table), reducing frontend duplication by 50%, and implemented multilingual support with real-time complaint tracking workflows."
        ],
    },
];

const PROJECTS = [
    {
        title: "Self-Hosted Server Management Platform",
        tech: "Next.js (App Router) | MongoDB/Mongoose | Tailwind | systemd | Caddy",
        description: "Built an internal platform to manage self-hosted infrastructure: process supervision via systemd, reverse proxy and TLS via Caddy, and a Next.js/MongoDB control panel.",
        link: "https://server.sahilumraniya.dev/"
    },
    {
        title: "Retro Form & Retro Table — Developer Tooling",
        tech: "React | TypeScript | Zod | NPM",
        description: "Published Retro Table, a headless React hook for sorting, pagination, and filtering, and Retro Form, a schema-driven (JSON/Zod) form generator with dynamic field dependencies.",
        link: "https://www.npmjs.com/package/retro-table"
    },
    {
        title: "Distributed Job Queue — Redis-Backed Async Processing",
        tech: "Redis | Node.js | System Design",
        description: "Designed a production-grade async job processing system handling batch, delayed, and event-driven workloads with idempotency guarantees and race-condition-safe execution in a distributed environment.",
        link: ""
    },
    {
        title: "WebPanda — Multi-Tenant AI Marketplace Platform",
        tech: "Next.js | Multi-Tenancy | Firebase | AWS S3 | OpenAI | RAG",
        description: "Architected multi-tenant SaaS platform serving multiple branded web apps from a single codebase with isolated data. Built WebPanda.AI with LLM-based resume parsing, RAG matching, and direct-to-S3 presigned URL uploads.",
        link: "http://webpanda.ai"
    },
    {
        title: "POS & Operations ERP Suite",
        tech: "Next.js | Prisma | MySQL | Socket.io",
        description: "Built a real-time point-of-sale and inventory ERP for restaurants with live table state, kitchen order printers, and analytics, synchronized across terminals via WebSockets.",
        link: "https://restaurant-management-system.sahilumraniya.dev/"
    },
    {
        title: "ReplyMe — AI-Powered Customer Support Platform",
        tech: "Conversational AI | RAG | Rasa",
        description: "Built an AI-driven customer support chatbot using Rasa and retrieval-augmented generation pipelines. Enabled domain-specific question answering by indexing structured and unstructured knowledge bases.",
        link: ""
    }
];

const SKILL_CATEGORIES = [
    { title: "Frontend", skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS", "MUI"] },
    { title: "Backend", skills: ["Node.js", "Express.js", "Feathers.js", "REST APIs", "WebSockets (Socket.io)", "Spring Boot"] },
    { title: "AI / ML", skills: ["Generative AI", "LLMs", "RAG", "LangChain", "Prompt Engineering", "Conversational AI (Rasa)"] },
    { title: "DevOps / Cloud", skills: ["Docker", "AWS (S3, EC2)", "Linux", "systemd", "Caddy", "CI/CD", "Git", "Vercel", "Netlify"] },
    { title: "Databases", skills: ["MongoDB", "PostgreSQL", "MySQL", "Oracle SQL", "Redis", "Prisma"] }
];

const EDUCATION = {
    school: "Aditya Silver Oak Institute of Technology",
    degree: "B.E. in Computer Engineering",
    year: "2021 - 2025",
    grade: "CGPA: 9.48 / 10"
};

const CERTIFICATIONS = [
    { name: "Oracle Cloud Infrastructure 2024 Gen AI Professional", issuer: "Oracle", link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=1BBB15E94D645DE45156935112528F197168D2E99FF1C73FBB5D6779153A7E32" },
    { name: "Code Unnati AI/ML Certification", issuer: "SAP", link: "https://codeunnati.edunetfoundation.com/verify-certificate/CU24_8889" }
];

const HackerText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState(text);

    return (
        <span className="cursor-default block min-h-[32px]">
            {displayText}
        </span>
    );
};

// 2. The 3D Tilt Card Component
const InteractiveProfileCard = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
    const [currentTime, setCurrentTime] = useState("");

    // Time for Terminal
    useEffect(() => {
        const updateTime = () => setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation (max 15 degrees)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        setRotation({ x: rotateX, y: rotateY });
        setSpotlight({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 });
    };

    return (
        <div
            className="perspective-1000 w-full max-w-md mx-auto"
            style={{ perspective: "1000px" }}
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="group relative ds-card text-slate-700 dark:text-slate-200 shadow-2xl transition-all duration-200 ease-out"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Dynamic Spotlight */}
                <div
                    className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                    style={{
                        background: `radial-gradient(600px circle at ${spotlight.x}% ${spotlight.y}%, rgba(139, 92, 246, 0.15), transparent 40%)`
                    }}
                />

                {/* Circuit Pattern Overlay */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.08] pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M10 10h20v20h-20z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M0 20h40 M20 0v40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#circuit)" />
                </svg>

                {/* Content Container - Pushed forward in Z-space */}
                <div className="relative p-8 flex flex-col items-center text-center z-10" style={{ transform: "translateZ(30px)" }}>

                    {/* Floating Avatar */}
                    <div className="relative mb-6 group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute -inset-4 rounded-full border border-violet-500/30 border-dashed animate-[spin_8s_linear_infinite]" />
                        <div className="absolute -inset-1 rounded-full border border-slate-900/10 dark:border-white/10 animate-[spin_10s_linear_infinite_reverse]" />

                        <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-blue-500 shadow-lg shadow-violet-500/40 relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-950 overflow-hidden relative z-10">
                                <Image
                                    src="/logo.png"
                                    alt={RESUME_DATA.name}
                                    width={112}
                                    height={112}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>
                        </div>
                        {/* Online Status Dot */}
                        <div className="absolute bottom-1 right-2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white dark:border-[#0f172a] shadow-md z-20">
                            <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></div>
                        </div>
                    </div>

                    {/* Hacker Name & Role */}
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight h-8">
                        <HackerText text={RESUME_DATA.name} />
                    </h2>
                    <p className="text-violet-600 dark:text-violet-400 font-medium text-sm mb-6 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
                        {RESUME_DATA.role}
                    </p>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-0 w-full mb-6 border-y border-slate-200 dark:border-white/5 bg-slate-50/[0.5] dark:bg-white/[0.02]">
                        <div className="py-3 flex flex-col items-center group/stat hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-default">
                            <span className="text-lg font-bold text-slate-800 dark:text-white group-hover/stat:text-violet-600 dark:group-hover/stat:text-violet-400 transition-colors">2+</span>
                            <span className="text-[10px] uppercase text-slate-500 tracking-wider">Years</span>
                        </div>
                        <div className="py-3 flex flex-col items-center border-l border-slate-200 dark:border-white/5 group/stat hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-default">
                            <span className="text-lg font-bold text-slate-800 dark:text-white group-hover/stat:text-blue-600 dark:group-hover/stat:text-blue-400 transition-colors">15+</span>
                            <span className="text-[10px] uppercase text-slate-500 tracking-wider">Projects</span>
                        </div>
                        <div className="py-3 flex flex-col items-center border-l border-slate-200 dark:border-white/5 group/stat hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-default">
                            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400 group-hover/stat:shadow-[0_0_10px_rgba(52,211,153,0.5)] transition-shadow">100%</span>
                            <span className="text-[10px] uppercase text-slate-500 tracking-wider">Commitment</span>
                        </div>
                    </div>

                    {/* Floating Social Icons */}
                    <div className="flex gap-4 mb-6" style={{ transform: "translateZ(20px)" }}>
                        {[
                            { icon: Github, href: RESUME_DATA.github, color: "hover:bg-[#333] hover:text-white" },
                            { icon: Linkedin, href: RESUME_DATA.linkedin, color: "hover:bg-[#0077b5] hover:text-white" },
                            { icon: Mail, href: `mailto:${RESUME_DATA.email}`, color: "hover:bg-red-500 hover:text-white" },
                            // { icon: Globe, href: RESUME_DATA.website, color: "hover:bg-violet-500" },
                            { icon: Phone, href: `tel:${RESUME_DATA.phone}`, color: "hover:bg-green-500 hover:text-white" },
                            { icon: Instagram, href: "https://instagram.com/sahilumraniya", color: "hover:bg-pink-500 hover:text-white" },
                            { icon: Twitter, href: "https://x.com/2Umraniya", color: "hover:bg-blue-400 hover:text-white" }
                        ].map((item, idx) => (
                            <a
                                key={idx}
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                className={`p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.color}`}
                            >
                                <item.icon size={18} />
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                        <MapPin size={12} className="text-violet-500" />
                        {RESUME_DATA.location}
                    </div>
                </div>

                {/* Terminal Footer - Pushed slightly less forward */}
                <div className="mb-6 bg-white/40 dark:bg-black/40 backdrop-blur-md p-4 border border-slate-200 dark:border-white/5 text-[10px] font-mono text-slate-600 dark:text-slate-400 rounded-2xl relative overflow-hidden" style={{ transform: "translateZ(10px)" }}>
                    <div className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
                    <div className="flex flex-col gap-1.5 z-10 relative">
                        <div className="flex items-center gap-2">
                            <Terminal size={12} className="text-emerald-600 dark:text-emerald-500" />
                            <span className="text-emerald-600 dark:text-emerald-500 font-bold">root@sahil:~$</span>
                            <span className="typing-cursor text-slate-700 dark:text-slate-300">./display_profile.sh</span>
                        </div>
                        <div className="flex justify-between opacity-80 mt-1">
                            <span className="text-blue-500 dark:text-blue-400">Status: Running...</span>
                            <span>{currentTime}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`ds-card ${className}`}>
        {children}
    </div>
);

const CoreStackWidget = () => (
    <GlassCard className="p-5 relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 text-slate-200 dark:text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-500">
            <Cpu size={120} />
        </div>
        <h4 className="text-xs font-bold text-slate-800 dark:text-white mb-3 uppercase tracking-wider flex items-center gap-2 relative z-10">
            <Zap size={14} className="text-amber-500" />
            Powering
        </h4>
        <div className="flex flex-wrap gap-2 relative z-10">
            {["Next.js", "Node.js", "GenAI", "Redis", "AWS", "Docker"].map((tech) => (
                <span key={tech} className="px-2 py-1 bg-slate-200/50 dark:bg-white/5 hover:bg-violet-100 dark:hover:bg-violet-500/20 rounded-md text-[11px] font-bold text-slate-700 dark:text-slate-300 border border-slate-300/50 dark:border-transparent hover:border-violet-500/50 transition-all cursor-default">
                    {tech}
                </span>
            ))}
        </div>
    </GlassCard>
);

const ActivityGraph = () => {
    const bars = [40, 70, 45, 90, 60, 80, 50, 75, 60, 95, 80, 45, 30, 60];
    return (
        <GlassCard className="p-5">
            <h4 className="text-xs font-bold text-slate-800 dark:text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                <BarChart3 size={14} className="text-blue-500 dark:text-blue-400" />
                Coding Activity
            </h4>
            <div className="flex items-end justify-between h-12 gap-1">
                {bars.map((height, i) => (
                    <div
                        key={i}
                        style={{ height: `${height}%` }}
                        className="w-full bg-violet-200 dark:bg-violet-500/20 hover:bg-violet-600 dark:hover:bg-violet-500 rounded-sm transition-all duration-300 relative group"
                    >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 dark:bg-black text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {height}%
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-mono">
                <span>Mon</span>
                <span>Sun</span>
            </div>
        </GlassCard>
    );
};

const DevStats = () => (
    <div className="grid grid-cols-2 gap-3">
        <GlassCard className="p-4 flex flex-col items-center text-center">
            <Coffee size={20} className="text-amber-500 mb-2" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">∞</span>
            <span className="text-[10px] text-slate-500 uppercase">Coffee</span>
        </GlassCard>
        <GlassCard className="p-4 flex flex-col items-center text-center">
            <Bug size={20} className="text-red-500 mb-2" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">0</span>
            <span className="text-[10px] text-slate-500 uppercase">Active Bugs</span>
        </GlassCard>
    </div>
);

const LanguagesWidget = () => (
    <GlassCard className="p-5">
        <h4 className="text-xs font-bold text-slate-800 dark:text-white mb-3 uppercase tracking-wider flex items-center gap-2">
            <Globe size={14} className="text-emerald-500 dark:text-emerald-400" />
            Languages
        </h4>
        <div className="flex flex-wrap gap-2">
            {["English", "Hindi", "Gujarati"].map(lang => (
                <span key={lang} className="px-2.5 py-1 rounded-md bg-slate-200/50 dark:bg-white/5 border border-slate-300/50 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300">
                    {lang}
                </span>
            ))}
        </div>
    </GlassCard>
);

const ThreeDTiltCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Tilt intensity
        const rotateX = ((y - centerY) / centerY) * -5;
        const rotateY = ((x - centerX) / centerX) * 5;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

    return (
        <div
            className={`perspective-1000 ${className}`}
            style={{ perspective: "1000px" }}
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="transition-all duration-200 ease-out h-full"
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    transformStyle: "preserve-3d",
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default function ResumePage() {
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-7xl mx-auto pt-18" ref={contentRef}>

            <div className="lg:w-1/3 flex flex-col items-center">
                <div className="w-full max-w-md sticky top-8 space-y-6">

                    <InteractiveProfileCard />

                    <Link
                        href="https://drive.google.com/file/d/1ihC8bX6SDFLF4qUDmk42WglKN7jy_i2t/view"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button
                            className="mt-4 w-full group relative overflow-hidden rounded-xl bg-violet-600 p-4 text-white shadow-[0_10px_20px_-10px_rgba(124,58,237,0.5)] transition-all hover:bg-violet-700 hover:scale-[1.02] hover:shadow-[0_20px_25px_-12px_rgba(124,58,237,0.6)] active:scale-[0.98]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:animate-[shimmer_1.5s_infinite]" />
                            <div className="relative flex items-center justify-center gap-2 font-bold tracking-wide">
                                <Download size={18} />
                                DOWNLOAD RESUME
                            </div>
                        </button>
                    </Link>
                    <section>
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest my-6 flex items-center gap-2 ml-1">
                            <GraduationCap size={16} /> Education
                        </h3>
                        <GlassCard className="p-6 h-full">
                            <h4 className="font-bold text-slate-900 dark:text-white text-lg">{EDUCATION.school}</h4>
                            <p className="text-violet-600 dark:text-violet-400 text-sm mt-1">{EDUCATION.degree}</p>
                            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-200 dark:border-white/5 text-xs text-slate-500 font-mono">
                                <span>{EDUCATION.year}</span>
                                <span className="bg-slate-100 dark:bg-white/10 px-2 py-1 rounded text-slate-700 dark:text-white">{EDUCATION.grade}</span>
                            </div>
                        </GlassCard>
                    </section>
                    {/* 4. Sidebar Widgets (Using GlassCard) */}
                    <CoreStackWidget />
                    <ActivityGraph />
                    <div className="flex flex-col gap-6">
                        <DevStats />
                        <LanguagesWidget />
                    </div>
                </div>
            </div>

            {/* --- MAIN CONTENT (UNCHANGED) --- */}
            <div className="lg:w-2/3 flex flex-col gap-8">

                {/* Header Section */}
                <GlassCard className="p-8 md:p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                        {RESUME_DATA.name}
                    </h1>
                    <p className="text-xl text-violet-600 dark:text-violet-400 font-medium mb-6 flex items-center gap-3">
                        <Terminal size={24} />
                        {RESUME_DATA.role}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg max-w-2xl">
                        {RESUME_DATA.summary}
                    </p>
                </GlassCard>

                {/* Experience */}
                <section>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2 ml-1">
                        <Briefcase size={16} /> Professional Experience
                    </h3>
                    <div className="space-y-6">
                        {EXPERIENCES.map((exp, i) => (
                            <GlassCard key={i} className="group p-8 border border-slate-200 dark:border-white/10 hover:border-violet-500/50 hover:bg-white/80 dark:hover:bg-[#0f172a]/80 transition-all duration-300">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline mb-4">
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{exp.title}</h4>
                                        <p className="text-violet-600 dark:text-violet-500 font-medium">{exp.company_name}</p>
                                    </div>
                                    <span className="mt-2 sm:mt-0 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-xs font-mono text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5">
                                        {exp.date}
                                    </span>
                                </div>
                                <ul className="space-y-3">
                                    {exp.points.map((pt, j) => (
                                        <li key={j} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500/50 flex-shrink-0" />
                                            {pt}
                                        </li>
                                    ))}
                                </ul>
                            </GlassCard>
                        ))}
                    </div>
                </section>

                {/* Projects Grid (With 3D Tilt Effect!) */}
                <section>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2 ml-1">
                        <LayoutTemplate size={16} /> Featured Projects
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {PROJECTS.map((project, i) => (
                            <ThreeDTiltCard key={i}>
                                <GlassCard className="group p-6 h-full border border-slate-200 dark:border-white/10 hover:border-violet-500/50 transition-all duration-300 flex flex-col hover:shadow-2xl hover:shadow-violet-500/10">
                                    <div className="flex justify-between items-start mb-4 transform translate-z-10">
                                        <h4 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{project.title}</h4>
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                                <ExternalLink size={18} />
                                            </a>
                                        )}
                                    </div>
                                    <div className="mb-4">
                                        <span className="text-xs font-mono text-violet-700 dark:text-violet-400 bg-violet-100 dark:bg-violet-500/10 px-2 py-1 rounded border border-violet-200 dark:border-transparent">
                                            {project.tech}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">
                                        {project.description}
                                    </p>
                                </GlassCard>
                            </ThreeDTiltCard>
                        ))}
                    </div>
                </section>

                {/* Skills */}
                <section>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2 ml-1">
                        <Code2 size={16} /> Technical Arsenal
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {SKILL_CATEGORIES.map((cat, i) => (
                            <GlassCard key={i} className="p-6 border border-slate-200 dark:border-white/10 hover:bg-white/80 dark:hover:bg-[#0f172a]/80 transition-colors">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-white/5 flex items-center gap-2">
                                    {i === 2 ? <BrainCircuit size={16} className="text-fuchsia-500" /> : <Zap size={16} className="text-slate-500" />}
                                    {cat.title}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map((s) => (
                                        <span key={s} className="px-2.5 py-1.5 rounded-lg bg-slate-200/50 dark:bg-white/5 text-xs text-slate-700 dark:text-slate-300 border border-slate-300/50 dark:border-transparent hover:border-violet-500/30 hover:bg-violet-50 dark:hover:bg-violet-500/10 transition-all cursor-default">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </section>

                {/* Education & Certs */}
                <section>
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2 ml-1">
                        <Award size={16} /> Certifications
                    </h3>
                    <div className="flex flex-col gap-3">
                        {CERTIFICATIONS.map((cert, i) => (
                            <a
                                key={i}
                                href={cert.link}
                                target="_blank"
                                rel="noreferrer"
                                className="group block"
                            >
                                <GlassCard className="flex items-center justify-between p-4 hover:bg-white/80 dark:hover:bg-[#0f172a]/90 hover:border-violet-500/30 transition-all">
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-1">
                                            {cert.name}
                                        </h4>
                                        <p className="text-xs text-slate-500 mt-1">{cert.issuer} • 2024</p>
                                    </div>
                                    <Award size={26} className={i === 0 ? "text-yellow-500" : "text-blue-500"} />
                                </GlassCard>
                            </a>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}