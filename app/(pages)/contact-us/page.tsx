'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Send,
    Loader2,
    CheckCircle2,
    Mail,
    MapPin,
    Linkedin,
    Github,
    Terminal,
    ArrowRight,
    Clock
} from 'lucide-react';
import { WorkflowSection } from '@/components/WorkflowSection';
import { ContactForm } from '@/components/Contact';

// --- Sub-Components ---

const ContactItem = ({ icon: Icon, label, value, href, delay }: any) => (
    <motion.a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 hover:border-violet-500/30 hover:bg-violet-500/5 transition-all duration-300 group cursor-pointer"
    >
        <div className="p-3 rounded-full bg-white dark:bg-white/10 text-slate-600 dark:text-slate-300 group-hover:text-violet-500 group-hover:scale-110 transition-all shadow-sm">
            <Icon size={20} />
        </div>
        <div>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{value}</p>
        </div>
        {href && <ArrowRight className="ml-auto text-slate-300 group-hover:text-violet-500 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" size={16} />}
    </motion.a>
);

// --- Main Section ---

export default function ContactUsSection() {
    return (
        <>
            <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-violet-500/20 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-20"></div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">

                    {/* KEY CHANGE: items-stretch ensures both columns are equal height */}
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-stretch">

                        {/* LEFT SIDE */}
                        {/* KEY CHANGE: flex flex-col to distribute content vertically */}
                        <div className="lg:w-5/12 pt-4 flex flex-col">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold border border-green-500/20 mb-6"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Available for new projects
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
                            >
                                Ready to build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">extraordinary?</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed"
                            >
                                Whether you need a high-performance **Next.js** web app, a scalable **Node.js** backend, or AI integration using **GenAI**, I am here to help.
                                <br /><br />
                                Currently based in India, working with clients globally.
                            </motion.p>
                            {/* Tech Badge Strip */}
                            {/* KEY CHANGE: mt-auto pushes this to the bottom, aligning with form bottom */}
                            <div className="space-y-4 my-8">
                                <ContactItem
                                    icon={Mail}
                                    label="Drop me a line"
                                    value="sahilumraniya9512@gmail.com"
                                    href="mailto:sahilumraniya9512@gmail.com"
                                    delay={0.3}
                                />
                                <ContactItem
                                    icon={Linkedin}
                                    label="Connect Professionally"
                                    value="linkedin.com/in/sahilumraniya"
                                    href="https://linkedin.com/in/sahilumraniya"
                                    delay={0.4}
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ContactItem
                                        icon={Github}
                                        label="Check my Code"
                                        value="github.com/sahilumraniya"
                                        href="https://github.com/sahilumraniya"
                                        delay={0.5}
                                    />
                                    <ContactItem
                                        icon={MapPin}
                                        label="Based In"
                                        value="Ahmedabad, Gujarat, India"
                                        href="#"
                                        delay={0.6}
                                    />
                                </div>
                            </div>
                        </div>


                        {/* RIGHT SIDE: Form */}
                        {/* KEY CHANGE: h-full ensures the wrapper takes full height provided by items-stretch */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="lg:w-7/12 w-full h-full"
                        >
                            <ContactForm />
                        </motion.div>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-auto pt-8 border-t border-slate-200 dark:border-white/10 flex items-center gap-6 text-slate-400"
                    >
                        <span className="text-xs font-semibold uppercase tracking-widest">Specialized In:</span>
                        <div className="flex gap-4">
                            <Terminal size={20} className="hover:text-slate-900 dark:hover:text-white transition-colors" />
                            <div className="h-5 w-[1px] bg-slate-300 dark:bg-white/20"></div>
                            <span className="font-mono text-xs text-slate-500 dark:text-slate-400">MERN Stack • Next.js • GenAI • Cloud</span>
                        </div>
                    </motion.div>
                </div>
            </section>
            <WorkflowSection />
        </>
    );
}