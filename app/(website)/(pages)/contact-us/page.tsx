'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Linkedin,
    Github,
    Terminal,
    ArrowRight,
    Phone,
    Instagram,
    Twitter
} from 'lucide-react';
import { WorkflowSection } from '@/components/WorkflowSection';
import { ContactForm } from '@/components/Contact';

// --- DATA ---
const CONTACT_DETAILS = [
    {
        icon: Phone,
        label: "Drop me a line",
        value: "+91 93272 01427",
        href: "tel:+919327201427"
    },
    {
        icon: Mail,
        label: "Email Me",
        value: "sahilumraniya9512@gmail.com",
        href: "mailto:sahilumraniya9512@gmail.com"
    },
    {
        icon: Linkedin,
        label: "Connect Professionally",
        value: "in/sahilumraniya",
        href: "https://linkedin.com/in/sahilumraniya"
    },
    {
        icon: Instagram,
        label: "Connect Socially",
        value: "@sahilumraniya_",
        href: "https://www.instagram.com/sahilumraniya_/"
    },
    {
        icon: Github,
        label: "Check my Code",
        value: "github.com/sahilumraniya",
        href: "https://github.com/sahilumraniya"
    },
    {
        icon: Twitter,
        label: "Follow me on X",
        value: "@2umraniya",
        href: "https://www.twitter.com/2umraniya"
    }
];

// --- COMPONENTS ---

const ContactCard = ({ icon: Icon, label, value, href, index }: any) => (
    <motion.a
        href={href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel="noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index, duration: 0.5 }}
        className="ds-card flex items-center gap-4 p-4
                   hover:border-[var(--ds-card-border)] hover:bg-violet-500/5 hover:brightness-105
                   transition-all duration-300 group cursor-pointer
                   min-w-0 w-full"
    >
        {/* Icon Container */}
        <div className="p-3 rounded-full bg-slate-100 dark:bg-white/10 
                        text-slate-600 dark:text-slate-300 
                        group-hover:text-violet-600 dark:group-hover:text-violet-400 
                        group-hover:scale-110 transition-all shadow-sm shrink-0">
            <Icon size={20} />
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0 overflow-hidden">
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 
                          uppercase tracking-wider mb-0.5 truncate">
                {label}
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white 
                          group-hover:text-violet-600 dark:group-hover:text-violet-400 
                          transition-colors truncate">
                {value}
            </p>
        </div>

        {/* Arrow Action */}
        <ArrowRight
            className="text-slate-300 group-hover:text-violet-500 
                       -translate-x-2 opacity-0 group-hover:opacity-100 
                       group-hover:translate-x-0 transition-all shrink-0"
            size={16}
        />
    </motion.a>
);

export default function ContactUsSection() {
    return (
        <>
            <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-violet-500/20 blur-[120px] rounded-full pointer-events-none opacity-50 dark:opacity-20"></div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">

                    {/* Main Layout Grid */}
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">

                        {/* LEFT SIDE: Info & Grid */}
                        <div className="lg:w-5/12 flex flex-col h-full">

                            {/* Status Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-3 py-1 w-fit rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-6"
                            >
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Available for new projects
                            </motion.div>

                            {/* Headline */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-[1.1] mb-6"
                            >
                                Ready to build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">extraordinary?</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed"
                            >
                                Whether you need a high-performance **Next.js** web app, a scalable **Node.js** backend, or AI integration using **GenAI**, I am here to help.
                            </motion.p>

                            {/* Contact Grid (Bento Style) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {CONTACT_DETAILS.map((item, idx) => (
                                    <ContactCard key={idx} index={idx} {...item} />
                                ))}
                            </div>

                            {/* Tech Badge Footer (Anchored Bottom) */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="mt-auto pt-6 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center gap-4 text-slate-400"
                            >
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500">
                                    Powering Innovation With:
                                </span>
                                <div className="flex items-center gap-3">
                                    <Terminal size={16} className="text-violet-500" />
                                    <span className="font-mono text-xs font-medium text-slate-600 dark:text-slate-300">
                                        MERN • Next.js • GenAI • Cloud
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT SIDE: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="lg:w-7/12 w-full h-full flex flex-col"
                        >
                            {/* Passing a class to ensure the form takes full height if needed */}
                            <div className="h-full">
                                <ContactForm />
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>
            <WorkflowSection />
        </>
    );
}