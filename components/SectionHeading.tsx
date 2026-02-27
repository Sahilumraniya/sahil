"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
    badge?: string;
    title: string;
    description?: string;
}

export function SectionHeading({ badge, title, description }: SectionHeadingProps) {
    return (
        <div className="relative flex flex-col items-center justify-center mb-16 text-center">
            {/* Optional Badge */}
            {badge && (
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-5 text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase bg-violet-50 dark:bg-violet-500/10 rounded-full border border-violet-200 dark:border-violet-500/20"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
                    {badge}
                </motion.span>
            )}

            {/* Title */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4"
            >
                {title}
            </motion.h2>

            {/* Gradient underline */}
            <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full mb-5" />

            {/* Description */}
            {description && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-2xl text-lg text-slate-500 dark:text-slate-400 leading-relaxed"
                >
                    {description}
                </motion.p>
            )}
        </div>
    );
}