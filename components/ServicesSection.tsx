'use client';

import { motion } from 'framer-motion';
import { Layout, Database, Bot, Smartphone, Check } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const SERVICES = [
    {
        icon: Layout,
        title: "Web App Development",
        desc: "I build pixel-perfect, responsive web applications using Next.js 14 and Tailwind CSS.",
        features: ["SPA & PWA Architecture", "Performance Optimization", "SEO-ready Structures", "Complex Dashboards"],
        // Define full classes to ensure Tailwind compiles them
        iconColor: "text-blue-500",
        bgColor: "bg-blue-500/10",
        checkColor: "text-blue-600",
        hoverBorder: "group-hover:border-blue-500/50"
    },
    {
        icon: Database,
        title: "Backend Engineering",
        desc: "Scalable server-side logic using Node.js. I focus on security, speed, and clean architecture.",
        features: ["REST & GraphQL APIs", "Database Design (SQL/NoSQL)", "Auth & Security", "Microservices"],
        iconColor: "text-emerald-500",
        bgColor: "bg-emerald-500/10",
        checkColor: "text-emerald-600",
        hoverBorder: "group-hover:border-emerald-500/50"
    },
    {
        icon: Bot,
        title: "AI Integration",
        desc: "Enhance your app with intelligence. I integrate LLMs and RAG pipelines for smart features.",
        features: ["Chatbots & Assistants", "Vector Search Implementation", "OpenAI / LangChain", "Automated Workflows"],
        iconColor: "text-violet-500",
        bgColor: "bg-violet-500/10",
        checkColor: "text-violet-600",
        hoverBorder: "group-hover:border-violet-500/50"
    },
    {
        icon: Smartphone, // Changed from Check to Smartphone
        title: "Mobile App Development",
        desc: "Cross-platform mobile apps using React Native. I ensure smooth performance on iOS and Android.",
        features: ["Native-like UX/UI", "API Integration", "Push Notifications", "App Store Deployment"],
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

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">How I Can Help</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        I don't just write code; I provide solutions. Choose the expertise that fits your project needs.
                    </p>
                </div> */}

                <SectionHeading title='How I Can Help' description="I don't just write code; I provide solutions. Choose the expertise that fits your project needs." />

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