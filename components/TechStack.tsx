"use client";

import { Layout, Server, Cpu, Globe, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading"; // Import the component above

// Updated Data Structure: Added 'color' for dynamic styling
const SKILL_CATEGORIES = [
    {
        title: "Frontend Core",
        icon: <Layout className="w-6 h-6" />,
        skills: ["React", "Next.js", "TypeScript", "Tailwind", "HTML5", "CSS3", "MUI"],
        span: "md:col-span-3 lg:col-span-2",
        color: "blue", // Used for dynamic class generation
        gradient: "from-blue-500/20 via-blue-500/5 to-transparent",
        text: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "group-hover:border-blue-500/50"
    },
    {
        title: "Backend & DB",
        icon: <Server className="w-6 h-6" />,
        skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "Feathers", "Firebase"],
        span: "md:col-span-3 lg:col-span-2",
        color: "emerald",
        gradient: "from-emerald-500/20 via-emerald-500/5 to-transparent",
        text: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "group-hover:border-emerald-500/50"
    },
    {
        title: "AI & Data",
        icon: <Cpu className="w-6 h-6" />,
        skills: ["Python", "GenAI", "TensorFlow", "OpenAI", "LangChain", "RAG", "NLP"],
        span: "md:col-span-3 lg:col-span-2",
        color: "purple",
        gradient: "from-purple-500/20 via-purple-500/5 to-transparent",
        text: "text-purple-500",
        bg: "bg-purple-500/10",
        border: "group-hover:border-purple-500/50"
    },
    {
        title: "DevOps & Cloud",
        icon: <Globe className="w-6 h-6" />,
        skills: ["Docker", "AWS", "CI/CD", "Git", "Vercel", "Netlify", "Linux"],
        span: "md:col-span-3 lg:col-span-3",
        color: "orange",
        gradient: "from-orange-500/20 via-orange-500/5 to-transparent",
        text: "text-orange-500",
        bg: "bg-orange-500/10",
        border: "group-hover:border-orange-500/50"
    },
    {
        title: "Languages",
        icon: <Code2 className="w-6 h-6" />,
        skills: ["JavaScript", "TypeScript", "Python", "Java", "C++", "Dart"],
        span: "md:col-span-3 lg:col-span-3",
        color: "rose",
        gradient: "from-rose-500/20 via-rose-500/5 to-transparent",
        text: "text-rose-500",
        bg: "bg-rose-500/10",
        border: "group-hover:border-rose-500/50"
    }
];

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function TechStack() {
    return (
        <section className="relative container mx-auto px-4 sm:px-6 overflow-hidden">

            {/* Reusable Heading */}
            <SectionHeading
                badge="Technical Ecosystem"
                title="Tools & Technologies"
                description="A comprehensive look at the software, languages, and frameworks I use to build production-grade applications."
            />

            {/* Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-6 gap-6"
            >
                {SKILL_CATEGORIES.map((cat, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        className={`
              ${cat.span} group relative overflow-hidden rounded-3xl 
              ds-card ${cat.border} transition-colors duration-300
            `}
                    >
                        {/* Dynamic Background Gradient on Hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                        <div className="relative z-10 p-6 h-full flex flex-col">
                            {/* Header */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`p-3 rounded-2xl ${cat.bg} ${cat.text} group-hover:scale-110 transition-transform duration-300 ring-1 ring-inset ring-black/5 dark:ring-white/10`}>
                                    {cat.icon}
                                </div>
                                <h3 className="font-bold text-xl text-[var(--ds-text,currentColor)]">
                                    {cat.title}
                                </h3>
                            </div>

                            {/* Skills Container */}
                            <div className="flex flex-wrap gap-2 mt-auto">
                                {cat.skills.map((skill, sIdx) => (
                                    <span
                                        key={sIdx}
                                        className={`
                      inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold
                      text-[var(--ds-text,currentColor)] opacity-80
                      bg-slate-100 dark:bg-slate-800/80
                      border border-transparent
                      group-hover:border-${cat.color}-500/20
                      group-hover:text-${cat.color}-600 dark:group-hover:text-${cat.color}-400
                      group-hover:opacity-100
                      group-hover:bg-${cat.color}-500/5
                      transition-all duration-300 cursor-default
                    `}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}