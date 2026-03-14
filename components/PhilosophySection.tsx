'use client';

import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Scale, Puzzle } from 'lucide-react';

const VALUES = [
    {
        icon: Zap,
        title: "Performance First",
        desc: "I write code that respects the user's CPU and battery. Optimized React renders and efficient Node.js logic are my standard.",
        color: "text-yellow-500"
    },
    {
        icon: ShieldCheck,
        title: "Secure by Design",
        desc: "Security isn't an afterthought. I implement strict validation, authorization, and data protection practices from day one.",
        color: "text-green-500"
    },
    {
        icon: Scale,
        title: "Scalable Architecture",
        desc: "Building for today, planning for tomorrow. I design backends that can handle growth without needing a total rewrite.",
        color: "text-blue-500"
    },
    {
        icon: Puzzle,
        title: "Modular Code",
        desc: "I believe in clean, reusable components. This makes maintenance easy and future feature additions seamless.",
        color: "text-violet-500"
    }
];

export default function PhilosophySection() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row gap-12 items-center">

                    <div className="md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                            My Engineering <br />
                            <span className="text-violet-600">Philosophy</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                            Great software is about more than just making it work. It's about making it maintainable, performant, and secure.
                            <br /><br />
                            As a Full Stack Engineer, I bring a holistic view to development. I don't just patch bugs; I engineer solutions that stand the test of time.
                        </p>
                        {/* <a href="/about" className="text-violet-600 font-bold hover:underline">
                            Read more about my background &rarr;
                        </a> */}
                    </div>

                    <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {VALUES.map((val, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="ds-card p-6 shadow-sm"
                            >
                                <val.icon className={`w-8 h-8 ${val.color} mb-4`} />
                                <h3 className="font-bold text-[var(--ds-text,currentColor)] mb-2">{val.title}</h3>
                                <p className="text-sm text-[var(--ds-text,currentColor)] opacity-70">
                                    {val.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}