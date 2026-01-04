"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
    badge?: string;
    title: string;
    description?: string;
}

export function SectionHeading({ badge, title, description }: SectionHeadingProps) {
    return (
        <div className="flex flex-col items-center justify-center mb-16 text-center">
            {/* Optional Badge */}
            {badge && (
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-indigo-500 uppercase bg-indigo-500/10 rounded-full border border-indigo-500/20"
                >
                    {badge}
                </motion.span>
            )}

            {/* Title with Gradient */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
            >
                {/* If you want a gradient text effect, wrap part of the text in a span with these classes:
            bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400
        */}
                {title}
            </motion.h2>

            {/*add bottom border like sketch fed not like underline*/}
            <div className="w-24 h-1 bg-indigo-500 rounded-full mb-6" />

            {/* Description */}
            {description && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-2xl text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
                >
                    {description}
                </motion.p>
            )}

            {/* Decorative Blur Background (Optional) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-indigo-500/10 blur-[100px] -z-10 rounded-full pointer-events-none" />
        </div>
    );
}