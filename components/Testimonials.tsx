'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const TESTIMONIALS = [
    {
        text: "Sahil transformed our legacy backend into a high-performance Node.js architecture. The API response time dropped by 60%. Highly recommended.",
        author: "Project Manager",
        role: "Smartters Software",
        initials: "PM"
    },
    {
        text: "His understanding of Generative AI is impressive. He integrated a RAG pipeline that made our search engine incredibly smart and context-aware.",
        author: "Startup Founder",
        role: "Freelance Client",
        initials: "SF"
    },
    {
        text: "Reliable, communicative, and writes incredibly clean code. Sahil delivered the Admin Dashboard ahead of schedule.",
        author: "Tech Lead",
        role: "Upwork Client",
        initials: "TL"
    }
];

export default function Testimonials() {
    return (
        <section className="relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Trusted by Teams</h2>
                    <p className="text-slate-600 dark:text-slate-400">
                        I don't just deliver code; I build relationships and trust.
                    </p>
                </div> */}
                <SectionHeading title='Trusted by Teams' description="I don't just deliver code; I build relationships and trust." />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-white/10 relative"
                        >
                            <Quote className="absolute top-8 right-8 text-violet-500/20 w-10 h-10" />

                            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed relative z-10">
                                "{item.text}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                                    {item.initials}
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900 dark:text-white">{item.author}</div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wide">{item.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}