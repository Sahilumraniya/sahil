// components/FAQSection.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const faqs = [
    {
        question: "What is your preferred Tech Stack?",
        answer: "I specialize in the MERN Stack (MongoDB, Express, React, Node.js). For modern web apps, I heavily use Next.js with TypeScript and Tailwind CSS. For AI integrations, I use Python, LangChain, and OpenAI/Hugging Face models."
    },
    {
        question: "Do you work with clients in different time zones?",
        answer: "Yes! I am based in Ahmedabad, India (IST), but I am accustomed to working with clients in the US, UK, and Europe. I ensure a 3-4 hour overlap for meetings and daily standups."
    },
    {
        question: "Are you available for full-time roles?",
        answer: "Yes, I am open to full-time Backend or Full Stack Engineering roles. I am also available for contract-based freelance work for specific projects."
    },
    {
        question: "How do you handle project payments?",
        answer: "For freelance projects, I typically work with a 40% upfront deposit and 60% upon completion. For larger projects, we can set up milestone-based payments."
    }
];

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="pt-20">
            <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
                <SectionHeading title="Frequently Asked Questions" description="Answers to common questions about working with me." />

                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div
                            key={idx}
                            className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-semibold text-slate-900 dark:text-white">{faq.question}</span>
                                {openIndex === idx ? (
                                    <Minus className="text-violet-500" />
                                ) : (
                                    <Plus className="text-slate-400" />
                                )}
                            </button>

                            <AnimatePresence>
                                {openIndex === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 mt-2">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};