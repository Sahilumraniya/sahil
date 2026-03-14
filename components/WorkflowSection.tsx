// components/WorkflowSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Search, Code, Rocket, MessageSquare } from 'lucide-react';

const steps = [
    {
        icon: MessageSquare,
        title: "1. Discovery",
        desc: "We hop on a call to discuss your goals, technical requirements, and target audience. I ask the right questions to ensure we're aligned."
    },
    {
        icon: Search,
        title: "2. Architecture & Design",
        desc: "I plan the database schema (SQL/NoSQL), API structure, and UI flow. We choose the right stack (Next.js, Node, etc.) for scalability."
    },
    {
        icon: Code,
        title: "3. Development",
        desc: "I build the solution using Agile methodology, providing you with regular updates and preview links so you can see progress in real-time."
    },
    {
        icon: Rocket,
        title: "4. Testing & Launch",
        desc: "Rigorous testing (Unit/Integration), performance optimization, and finally deploying to production (AWS/Vercel) with CI/CD pipelines."
    }
];

export const WorkflowSection = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">How we'll work together</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        I don't just write code; I partner with you to deliver a product that works. Here is my standard workflow for freelance projects.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative group"
                        >
                            {/* Connector Line (Desktop Only) */}
                            {idx !== steps.length - 1 && (
                                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-slate-200 to-transparent dark:from-slate-800" />
                            )}

                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="w-16 h-16 ds-card flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-violet-500/50 transition-all duration-300">
                                    <step.icon className="text-violet-500" size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};