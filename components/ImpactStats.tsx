'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

const STATS = [
    { value: "2+", label: "Years Experience" },
    { value: "15+", label: "Projects Completed" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24/7", label: "Support Available" },
];

// --- 1. The Counting Logic (Same robust logic) ---
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
            ease: [0.22, 1, 0.36, 1], // "Apple-style" easeOutQuint
            onUpdate(currentValue) {
                element.textContent = Math.round(currentValue) + suffix;
            }
        });

        return () => controls.stop();
    }, [inView, value]);

    return <span ref={ref} className={className}>0</span>;
};

// --- 2. Main Component ---
export default function ImpactStats() {
    return (
        <section className="bg-transparent relative overflow-hidden flex items-center justify-center">

            {/* --- Ambient Background (Moving Blobs) --- */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-1/4 w-[500px] h-[500px]  rounded-full blur-[120px] mix-blend-screen"
                />
                <motion.div
                    animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 right-1/4 w-[500px] h-[500px]  rounded-full blur-[120px] mix-blend-screen"
                />
            </div>

            {/* --- Noise Texture Overlay (The "Premium" Feel) --- */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">

                {/* --- The "iOS 26" Glass Card --- */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }} // Smooth spring physics
                    className="relative rounded-[3rem] p-1"
                >
                    {/* Border Gradient Wrap */}
                    <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-white/20 via-white/5 to-white/10 p-[1px] mask-image-gradient">
                        <div className="h-full w-full bg-black/40 rounded-[3rem] backdrop-blur-3xl" />
                    </div>

                    {/* Inner Glass Content */}
                    <div className="relative bg-white/[0.03] backdrop-blur-2xl rounded-[2.9rem] px-8 py-16 sm:px-12 border border-white/5 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">

                        {/* Top Highlight Shine */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 relative">
                            {STATS.map((stat, idx) => (
                                <div key={idx} className="relative group text-center flex flex-col items-center justify-center">

                                    {/* Desktop Vertical Divider */}
                                    {idx !== 0 && (
                                        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-16 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                                    )}

                                    {/* Value */}
                                    <div className="relative z-10">
                                        <div className="text-5xl md:text-6xl font-bold mb-2 tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                            <Counter value={stat.value} />
                                        </div>
                                    </div>

                                    {/* Label */}
                                    <div className="text-sm font-medium text-white/50 uppercase tracking-[0.2em] group-hover:text-violet-300 transition-colors duration-500">
                                        {stat.label}
                                    </div>

                                    {/* Hover Glow Effect */}
                                    <div className="absolute inset-0 bg-violet-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}