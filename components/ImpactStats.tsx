'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

const STATS = [
    { value: "2+", label: "Years of Experience", suffix: "yrs" },
    { value: "15+", label: "Production Apps Shipped", suffix: "apps" },
    { value: "30%", label: "Avg. Latency Reduced", suffix: "faster" },
    { value: "50%", label: "Code Reuse via Abstractions", suffix: "less code" },
];

const Counter = ({ value, className }: { value: string, className?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-10%" });

    useEffect(() => {
        const element = ref.current;
        if (!element || !inView) return;

        const numericValue = parseInt(value.replace(/,/g, '')) || 0;
        const suffix = value.replace(numericValue.toString(), '');

        const controls = animate(0, numericValue, {
            duration: 2,
            ease: [0.22, 1, 0.36, 1],
            onUpdate(currentValue) {
                element.textContent = Math.round(currentValue) + suffix;
            }
        });

        return () => controls.stop();
    }, [inView, value]);

    return <span ref={ref} className={className}>0</span>;
};

export default function ImpactStats() {
    return (
        <section className="relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-[2.5rem] overflow-hidden"
                >
                    {/* Light mode: clean gradient card | Dark mode: glass card */}
                    <div className="
                        relative p-10 sm:p-16
                        bg-gradient-to-br from-slate-900 via-violet-950 to-indigo-950
                        dark:bg-gradient-to-br dark:from-slate-900/90 dark:via-violet-950/80 dark:to-indigo-950/90
                        border border-slate-200/10 dark:border-white/10
                        shadow-2xl shadow-violet-500/10 dark:shadow-none
                    ">
                        {/* Decorative gradient orbs */}
                        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
                        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />

                        {/* Top highlight */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 relative z-10">
                            {STATS.map((stat, idx) => (
                                <div key={idx} className="relative group text-center flex flex-col items-center justify-center">

                                    {/* Vertical divider between items */}
                                    {idx !== 0 && (
                                        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-16 w-[1px] bg-gradient-to-b from-transparent via-white/15 to-transparent" />
                                    )}

                                    {/* Value */}
                                    <div className="relative z-10">
                                        <div className="text-5xl md:text-6xl font-bold mb-3 tracking-tight text-white">
                                            <Counter value={stat.value} className='sm:text-6xl text-5xl' />
                                        </div>
                                    </div>

                                    {/* Label */}
                                    <div className="text-sm font-medium text-white/60 uppercase tracking-[0.15em] group-hover:text-violet-300 transition-colors duration-500 max-w-[140px]">
                                        {stat.label}
                                    </div>

                                    {/* Hover glow */}
                                    <div className="absolute inset-0 bg-violet-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}