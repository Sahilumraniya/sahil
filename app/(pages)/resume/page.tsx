"use client";

import { Briefcase, Code2, Award, Download, Printer } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

const RESUME_DATA = {
    name: "Sahil Umraniya",
    role: "Full-Stack Engineer • AI Specialist",
    summary: "Full-stack developer with 2+ years focused on Generative AI and high-performance backends. Skilled in Node.js, Python, React, Next.js. Built a Redis-backed async job queue that improved API responsiveness by 30%. Experienced with LLM integrations, event-driven systems, and cloud (Firebase, AWS). Oracle Generative AI certified."
};

const EXPERIENCES = [
    {
        title: "Software Developer",
        company_name: "Smartters Software",
        date: "Feb 2024 - Present",
        points: [
            "Optimized database access and API logic, cutting average response times by 30%+ and improving UX at scale.",
            "Built internal toolkit (Retro Form & Retro Table) to automate form/table generation, reducing boilerplate by up to 50%.",
            "Designed a Redis-backed async job queue for Feathers.js/Express with batch, delay, and event-driven tracking.",
            "Delivered multilingual support, scheduled tasks, and real-time complaint tracking."
        ],
    },
];

const SKILL_CATEGORIES = [
    {
        title: "Frontend Core",
        skills: ["React", "Next.js", "TypeScript", "Tailwind", "HTML5", "CSS3", "MUI"]
    },
    {
        title: "Backend & DB",
        skills: ["Node.js", "Express", "Redis", "MongoDB", "PostgreSQL", "Feathers", "Spring Boot"]
    },
    {
        title: "AI & Data",
        skills: ["Python", "GenAI", "Prompt Eng.", "NumPy", "Pandas", "Scikit-learn"]
    },
    {
        title: "DevOps & Tools",
        skills: ["Docker", "AWS", "Git", "Firebase", "Postman"]
    }
];

export default function ResumePage() {
    const contentRef = useRef<HTMLDivElement>(null);

    return (

        <div className="flex flex-col lg:flex-row gap-12" ref={contentRef}>
            {/* Sidebar */}
            <div className="lg:w-1/3 flex flex-col items-center">
                <div className="w-full max-w-md">
                    <div className="relative aspect-[1.58/1] rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-slate-900/90 to-black/90 text-white p-8 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs font-bold">
                                        <Image
                                            src="/logo.png"
                                            alt="Sahil Umraniya"
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover rounded-full"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg leading-tight">Sahil Umraniya</h3>
                                    <p className="text-xs text-slate-400 font-mono">Full Stack Engineer</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Access Level</p>
                                <p className="font-mono text-sm text-violet-400">ADMIN / ROOT</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider">Valid Thru</p>
                                <p className="font-mono text-sm">FOREVER</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full">
                        <a
                            href="/SahilUmraniya_Resume.pdf"
                            download
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-full font-semibold hover:bg-violet-700 transition-all shadow-lg hover:shadow-violet-500/25"
                        >
                            <Download size={18} /> Download PDF
                        </a>
                        <button
                            onClick={() => window.print()}
                            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 transition-colors"
                        >
                            <Printer size={18} /> Print / Save PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-2/3 bg-white dark:bg-white/5 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
                <div className="border-b border-slate-200 dark:border-white/10 pb-8 mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{RESUME_DATA.name}</h1>
                    <p className="text-xl text-violet-600 dark:text-violet-400 mb-4">{RESUME_DATA.role}</p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{RESUME_DATA.summary}</p>
                </div>

                <div className="mb-10">
                    <h3 className="text-lg font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                        <Briefcase size={18} /> Experience
                    </h3>
                    <div className="space-y-8">
                        {EXPERIENCES.map((exp, i) => (
                            <div key={i} className="relative pl-6 border-l-2 border-slate-200 dark:border-white/10">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-violet-500 ring-4 ring-white dark:ring-[#020617]"></div>
                                <div className="flex justify-between mb-1">
                                    <h4 className="font-bold text-slate-900 dark:text-white">{exp.title}</h4>
                                    <span className="text-sm font-mono text-slate-500">{exp.date}</span>
                                </div>
                                <p className="text-violet-600 dark:text-violet-400 font-medium text-sm mb-3">{exp.company_name}</p>
                                <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                    {exp.points.map((pt, j) => (
                                        <li key={j}>{pt}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-10">
                    <h3 className="text-lg font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                        <Code2 size={18} /> Skills
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {SKILL_CATEGORIES.map((cat, i) => (
                            <div key={i}>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">{cat.title}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map((s) => (
                                        <span
                                            key={s}
                                            className="px-2 py-1 bg-slate-100 dark:bg-white/10 rounded text-xs font-medium text-slate-700 dark:text-slate-300"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                        <Award size={18} /> Certifications
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex items-start justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Oracle GenAI Certified</h4>
                                <p className="text-xs text-slate-500 mt-1">Oracle • 2024</p>
                            </div>
                            <Award className="text-yellow-500" size={20} />
                        </li>
                        <li className="flex items-start justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Code Unnati AI/ML</h4>
                                <p className="text-xs text-slate-500 mt-1">SAP • 2024</p>
                            </div>
                            <Award className="text-blue-500" size={20} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
