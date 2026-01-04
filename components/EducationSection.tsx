// components/EducationSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Award, BookOpen, ScrollText } from 'lucide-react';

const EDUCATION = [
    {
        degree: "B.E. Computer Engineering",
        school: "Aditya Silver Oak Institute of Technology",
        year: "2021 - 2025",
        desc: "Graduated with a focus on Software Engineering and Artificial Intelligence.",
        icon: BookOpen,
        color: "blue"
    }
];

const CERTIFICATIONS = [
    {
        title: "Oracle Generative AI Professional",
        issuer: "Oracle",
        date: "2024",
        icon: Award,
        color: "orange"
    },
    {
        title: "AI/ML Certification",
        issuer: "SAP",
        date: "2023",
        icon: Award,
        color: "blue"
    }
];

export default function EducationSection() {
    return (
        <section className="py-20 bg-white dark:bg-black">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row gap-12">

                    {/* Education Column */}
                    <div className="md:w-1/2">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-violet-100 dark:bg-violet-900/30 rounded-xl text-violet-600 dark:text-violet-400">
                                <ScrollText size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Education</h2>
                        </div>

                        {EDUCATION.map((edu, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="pl-8 border-l-2 border-slate-200 dark:border-slate-800 relative pb-12 last:pb-0"
                            >
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-black border-2 border-violet-500"></div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                                <p className="text-slate-600 dark:text-slate-400 font-medium mb-2">{edu.school}</p>
                                <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-white/10 rounded-full text-xs font-semibold text-slate-500 mb-4">
                                    {edu.year}
                                </span>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                    {edu.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Certifications Column */}
                    <div className="md:w-1/2">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
                                <Award size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Certifications</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {CERTIFICATIONS.map((cert, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.02 }}
                                    className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center gap-4"
                                >
                                    <div className={`p-3 rounded-full bg-${cert.color}-100 dark:bg-${cert.color}-900/20 text-${cert.color}-600`}>
                                        <cert.icon size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white">{cert.title}</h3>
                                        <p className="text-sm text-slate-500">{cert.issuer} • {cert.date}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}