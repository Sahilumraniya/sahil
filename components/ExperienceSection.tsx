import React from 'react'
import { SectionHeading } from './SectionHeading'

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

const ExperienceSection = () => {
    return (
        <section className="container mx-auto px-4 sm:px-6 max-w-4xl pb-24">
            {/* <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-12 text-center">Experience</h2> */}
            <SectionHeading title="Experience" description="A snapshot of my professional journey, highlighting key roles and accomplishments in the tech industry." />
            <div className="space-y-8">
                {EXPERIENCES.map((exp: any, i: number) => (
                    <div key={i} className="relative pl-8 border-l-2 border-slate-200 dark:border-white/10">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-violet-500 ring-4 ring-[var(--ds-card-bg,white)]"></div>
                        <div className="flex flex-col sm:flex-row justify-between mb-2"><h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.title}</h3><span className="text-sm text-slate-500 dark:text-slate-400 font-mono">{exp.date}</span></div>
                        <div className="text-violet-600 dark:text-violet-400 font-medium mb-4">{exp.company_name}</div>
                        <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">{exp.points.map((pt: string, j: number) => <li key={j}>{pt}</li>)}</ul>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default ExperienceSection