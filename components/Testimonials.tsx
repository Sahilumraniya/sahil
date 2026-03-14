'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const TESTIMONIALS = [
    {
        text: "Sahil re-architected our legacy backend into a high-performance Node.js system. API response latency dropped by 60%, and the codebase is now maintainable and scalable. Exceptional work.",
        author: "Project Manager",
        role: "Enterprise Client",
        initials: "PM",
        rating: 5
    },
    {
        text: "His expertise in Generative AI is remarkable. He integrated a RAG pipeline that transformed our search into an intelligent, context-aware system. Delivered ahead of schedule with clean documentation.",
        author: "Startup Founder",
        role: "AI Integration Project",
        initials: "SF",
        rating: 5
    },
    {
        text: "Reliable, communicative, and writes incredibly clean code. Sahil delivered a production-ready Admin Dashboard 2 weeks ahead of schedule. Will definitely work together again.",
        author: "Tech Lead",
        role: "Long-Term Client",
        initials: "TL",
        rating: 5
    }
];

export default function Testimonials() {
    return (
        <section className="relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <SectionHeading title='What Clients Say' description="Real feedback from teams and founders I've worked with." />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="ds-card p-8 relative hover:-translate-y-1 transition-all duration-300"
                        >
                            <Quote className="absolute top-8 right-8 text-violet-500/20 w-10 h-10" />

                            {/* Star Rating */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: item.rating }).map((_, i) => (
                                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed relative z-10">
                                &quot;{item.text}&quot;
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