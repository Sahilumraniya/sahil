'use client';

import { motion } from 'framer-motion';
import { Layout, Database, Bot, Smartphone, Check } from 'lucide-react';
import Image from 'next/image';
import { SectionHeading } from './SectionHeading';

const SERVICES = [
    {
        icon: Layout,
        title: "Custom Software Development",
        desc: "Bespoke software solutions engineered for global performance. I transform complex business requirements into scalable, production-grade digital products.",
        features: ["Tailored ERP & CRM Systems", "Performance-First Architecture", "Cloud-Native Infrastructure", "Remote-First Collaboration"],
        iconColor: "text-blue-500",
        bgColor: "bg-blue-500/10",
        checkColor: "text-blue-600",
        hoverBorder: "group-hover:border-blue-500/50"
    },
    {
        icon: Database,
        title: "Backend & API Engineering",
        desc: "Scalable, secure server-side systems with Node.js and Express. RESTful APIs, real-time features, and battle-tested database architecture.",
        features: ["REST & GraphQL APIs", "Database Design (SQL/NoSQL)", "Authentication & Security", "Microservices Architecture"],
        iconColor: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        checkColor: "text-emerald-600",
        hoverBorder: "group-hover:border-emerald-500/50"
    },
    {
        icon: Bot,
        title: "AI & LLM Integration",
        desc: "Transform your products with intelligence. Expert integration of LLMs, RAG pipelines, and AI agents for smart, context-aware features.",
        features: ["Custom AI Chatbots & Assistants", "RAG & Vector Search Pipelines", "OpenAI / LangChain Integration", "Automated AI Workflows"],
        iconColor: "text-violet-500",
        bgColor: "bg-violet-500/10",
        checkColor: "text-violet-600",
        hoverBorder: "group-hover:border-violet-500/50"
    },
    {
        icon: Smartphone,
        title: "Developer Tools & Packages",
        desc: "Reusable, well-documented developer tools and NPM packages. I build abstractions that save your team hundreds of development hours.",
        features: ["Open-Source NPM Packages", "Schema-Driven Form Engines", "Headless Data Table Hooks", "CI/CD & DevOps Automation"],
        iconColor: "text-orange-500",
        bgColor: "bg-orange-500/10",
        checkColor: "text-orange-600",
        hoverBorder: "group-hover:border-orange-500/50"
    }
];

export default function ServicesSection() {
    return (
        <section className="relative overflow-hidden">

            {/* Background Texture for Depth */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"></div>

            {/* Decorative AI Core Illustration (Glassmorphic) */}
            {/* <div className="absolute -bottom-20 -left-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] opacity-[0.1] dark:opacity-[0.07] pointer-events-none -z-10 animate-float">
                <Image
                    src="/ai-core.png"
                    alt="AI Core Illustration"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain"
                />
            </div> */}

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <SectionHeading title='Solutions I Deliver' description="From concept to deployment — engineering excellence at every stage of your product." />

                {/* Grid Layout: 1 col mobile, 2 cols tablet, 4 cols desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {SERVICES.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`
                                group relative bg-white dark:bg-white/5 backdrop-blur-sm 
                                p-8 rounded-3xl border border-slate-200 dark:border-white/10 
                                ${service.hoverBorder} shadow-sm hover:shadow-2xl dark:hover:shadow-none 
                                transition-all duration-300
                            `}
                        >
                            {/* Inner Gradient Shine on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>

                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-2xl ${service.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <service.icon className={`w-7 h-7 ${service.iconColor}`} />
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-sm h-20">
                                    {service.desc}
                                </p>

                                <ul className="space-y-3">
                                    {service.features.map((feat, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                                            <div className={`mt-0.5 p-1 rounded-full ${service.bgColor} ${service.checkColor} flex-shrink-0`}>
                                                <Check size={10} strokeWidth={3} />
                                            </div>
                                            <span className="leading-tight">{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}