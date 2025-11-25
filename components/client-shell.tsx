"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from "next-themes";
import {
    Github, Linkedin, Twitter, Mail, ArrowRight, ExternalLink,
    Code2, Globe, Menu, X, Sun, Moon,
    Database, Layout, Server, Cpu, Award, Briefcase, Terminal,
    Package, ArrowLeft, Send, Loader2, CheckCircle2,
    Download, Eye, Printer
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* UTILITY COMPONENTS                                                         */
/* -------------------------------------------------------------------------- */

const MouseFollower = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            requestAnimationFrame(() => {
                setPosition({ x: e.clientX, y: e.clientY });
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[60] opacity-50 dark:opacity-30 mix-blend-screen">
            <div
                className="absolute w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 will-change-transform"
                style={{ left: position.x, top: position.y }}
            />
        </div>
    );
};

const ScrambleText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

    useEffect(() => {
        if (!isHovering) {
            setDisplayText(text);
            return;
        }
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(prev =>
                text.split("").map((letter, index) => {
                    if (index < iteration) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [isHovering, text]);

    return (
        <span
            className="font-mono cursor-default inline-block min-w-[200px]"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {displayText}
        </span>
    );
};

const TiltCard = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        setRotation({ x: ((y - centerY) / centerY) * -5, y: ((x - centerX) / centerX) * 5 });
        setGlowPos({ x, y });
    };

    return (
        <div
            ref={cardRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => { setOpacity(0); setRotation({ x: 0, y: 0 }); }}
            style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
                transition: 'transform 0.1s ease-out',
            }}
            className={`relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${glowPos.x}px ${glowPos.y}px, rgba(167, 139, 250, 0.15), transparent 40%)`,
                }}
            />
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-0"></div>
            <div className="relative h-full z-20">{children}</div>
        </div>
    );
};

const FadeIn = ({ children }: { children: React.ReactNode }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        });
        const currentElement = domRef.current;
        if (currentElement) observer.observe(currentElement);
        return () => { if (currentElement) observer.unobserve(currentElement); };
    }, []);
    return (
        <div ref={domRef} className={`fade-up ${isVisible ? 'visible' : ''}`}>
            {children}
        </div>
    );
};

const ContactForm = () => {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');
        setTimeout(() => { setFormState('success'); setTimeout(() => setFormState('idle'), 3000); }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md bg-white/90 dark:bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl">
            <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Let's Collaborate</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Send me a message and I'll get back to you ASAP.</p>
            </div>
            <div className="space-y-4">
                {['Name', 'Email'].map((label) => (
                    <div key={label} className="group relative">
                        <input type={label === 'Email' ? 'email' : 'text'} required placeholder=" " className="peer w-full bg-transparent border-b border-slate-300 dark:border-white/20 py-3 px-1 text-slate-900 dark:text-white outline-none transition-colors focus:border-violet-500 placeholder-transparent" />
                        <label className="absolute left-1 top-3 text-slate-500 dark:text-slate-400 text-sm transition-all pointer-events-none origin-left transform scale-100 translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-violet-500">{label}</label>
                    </div>
                ))}
                <div className="group relative">
                    <textarea required rows={3} placeholder=" " className="peer w-full bg-transparent border-b border-slate-300 dark:border-white/20 py-3 px-1 text-slate-900 dark:text-white outline-none transition-colors focus:border-violet-500 resize-none placeholder-transparent"></textarea>
                    <label className="absolute left-1 top-3 text-slate-500 dark:text-slate-400 text-sm transition-all pointer-events-none origin-left transform scale-100 translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-violet-500">Message</label>
                </div>
            </div>
            <button type="submit" disabled={formState !== 'idle'} className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-70">
                {formState === 'submitting' ? <><Loader2 className="animate-spin" size={18} /> Sending...</> : formState === 'success' ? <><CheckCircle2 size={18} /> Sent!</> : <><Send size={18} /> Send Message</>}
            </button>
        </form>
    );
};

const HolographicResumeCard = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        setRotation({ x: ((y - centerY) / centerY) * -15, y: ((x - centerX) / centerX) * 15 });
    };

    return (
        <div className="perspective-1000 w-full max-w-md mx-auto">
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setRotation({ x: 0, y: 0 })}
                style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`, transition: 'transform 0.1s ease-out' }}
                className="holo-card relative aspect-[1.58/1] rounded-2xl overflow-hidden group cursor-pointer"
            >
                <div className="holo-sheen absolute inset-0 pointer-events-none z-20"></div>
                <div className="relative z-10 h-full p-8 flex flex-col justify-between bg-gradient-to-br from-slate-900/90 to-black/90 text-white">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 p-[2px]"><div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs font-bold">SU</div></div>
                            <div><h3 className="font-bold text-lg leading-tight">Sahil Umraniya</h3><p className="text-xs text-slate-400 font-mono">Full Stack Engineer</p></div>
                        </div>
                        <Cpu className="text-violet-500 opacity-50" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-9 rounded bg-gradient-to-r from-yellow-200 to-yellow-500 opacity-80"></div>
                        <div className="font-mono text-xs text-slate-500 tracking-widest">0000 9999 8888 DEV</div>
                    </div>
                    <div className="flex justify-between items-end">
                        <div><p className="text-[10px] text-slate-500 uppercase tracking-wider">Access Level</p><p className="font-mono text-sm text-violet-400">ADMIN / ROOT</p></div>
                        <div className="text-right"><p className="text-[10px] text-slate-500 uppercase tracking-wider">Valid Thru</p><p className="font-mono text-sm">FOREVER</p></div>
                    </div>
                </div>
                <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none z-30"></div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <a href="/SahilUmraniya_Resume.pdf" download className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white rounded-full font-semibold hover:bg-violet-700 transition-all shadow-lg hover:shadow-violet-500/25"><Download size={18} /> PDF</a>
            </div>
        </div>
    );
};

const ProjectFilter = ({ activeCategory, setActiveCategory, categories }: { activeCategory: string, setActiveCategory: (c: string) => void, categories: string[] }) => (
    <div className="flex justify-center mb-12">
        <div className="flex items-center gap-1 p-1.5 bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-x-auto max-w-full">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap z-10 ${activeCategory === cat ? 'text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                >
                    {activeCategory === cat && <span className="absolute inset-0 bg-slate-900 dark:bg-violet-600 rounded-xl -z-10 shadow-lg" />}
                    {cat}
                </button>
            ))}
        </div>
    </div>
);

/* -------------------------------------------------------------------------- */
/* 5. SERVER COMPONENTS (Layout/Structure)                                    */
/* -------------------------------------------------------------------------- */

const Page = ({ children }: { children: React.ReactNode }) => (
    <main className="pt-32 pb-20">
        {children}
    </main>
);

const ResumeView = ({ resumeData, experiences, skillCategories }: any) => (
    <div className="container mx-auto px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/3 flex flex-col items-center">
                <div className="sticky top-32">
                    <HolographicResumeCard />
                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-500 mb-4">Need a paper copy?</p>
                        <button onClick={() => window.print()} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 transition-colors">
                            <Printer size={18} /> Print / Save PDF
                        </button>
                    </div>
                </div>
            </div>

            <div className="lg:w-2/3 bg-white dark:bg-white/5 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-white/10 shadow-sm">
                <div className="border-b border-slate-200 dark:border-white/10 pb-8 mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{resumeData.name}</h1>
                    <p className="text-xl text-violet-600 dark:text-violet-400 mb-4">{resumeData.role}</p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{resumeData.summary}</p>
                </div>

                <div className="mb-10">
                    <h3 className="text-lg font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                        <Briefcase size={18} /> Experience
                    </h3>
                    <div className="space-y-8">
                        {experiences.map((exp: any, i: number) => (
                            <div key={i} className="relative pl-6 border-l-2 border-slate-200 dark:border-white/10">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-violet-500 ring-4 ring-white dark:ring-[#020617]"></div>
                                <div className="flex justify-between mb-1">
                                    <h4 className="font-bold text-slate-900 dark:text-white">{exp.title}</h4>
                                    <span className="text-sm font-mono text-slate-500">{exp.date}</span>
                                </div>
                                <p className="text-violet-600 dark:text-violet-400 font-medium text-sm mb-3">{exp.company_name}</p>
                                <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                    {exp.points.map((pt: string, j: number) => <li key={j}>{pt}</li>)}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-10">
                    <h3 className="text-lg font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                        <Code2 size={18} /> Skills
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {skillCategories.slice(0, 2).map((cat: any, i: number) => (
                            <div key={i}>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-sm">{cat.title}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map((s: string) => (
                                        <span key={s} className="px-2 py-1 bg-slate-100 dark:bg-white/10 rounded text-xs font-medium text-slate-700 dark:text-slate-300">{s}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                        <Award size={18} /> Certifications
                    </h3>
                    <ul className="space-y-4">
                        <li className="flex items-start justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                            <div><h4 className="font-bold text-slate-900 dark:text-white text-sm">Oracle GenAI Certified</h4><p className="text-xs text-slate-500 mt-1">Oracle • 2024</p></div>
                            <Award className="text-yellow-500" size={20} />
                        </li>
                        <li className="flex items-start justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                            <div><h4 className="font-bold text-slate-900 dark:text-white text-sm">Code Unnati AI/ML</h4><p className="text-xs text-slate-500 mt-1">SAP • 2024</p></div>
                            <Award className="text-blue-500" size={20} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);

/* -------------------------------------------------------------------------- */
/* 6. MAIN COMPONENT (Client Shell)                                           */
/* -------------------------------------------------------------------------- */

export default function ClientShell({ resumeData, experiences, projects, skillCategories, blogPosts }: any) {
    const [view, setView] = useState<'home' | 'projects' | 'blog' | 'resume'>('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeCategory, setActiveCategory] = useState('All');

    // Use next-themes hook for reliable toggling
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Filtering
    const categories = ['All', 'Full Stack', 'Backend', 'AI/ML', 'Mobile', 'Tools'];
    const displayedProjects = view === 'home'
        ? projects.filter((p: any) => p.featured)
        : activeCategory === 'All' ? projects : projects.filter((p: any) => p.tag.includes(activeCategory));

    if (!mounted) return null;

    return (
        <div className="min-h-screen transition-colors duration-300">
            <MouseFollower />

            {/* Background */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
                <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-violet-200 dark:bg-violet-900/20 rounded-full blur-[120px] animate-pulse opacity-50"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-200 dark:bg-blue-900/20 rounded-full blur-[120px] animate-pulse delay-1000 opacity-50"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] dark:opacity-20"></div>
            </div>

            {/* Navbar */}
            <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'py-3' : 'py-6'}`}>
                <div className="container mx-auto px-6">
                    <div className={`mx-auto max-w-5xl rounded-full border transition-all duration-300 backdrop-blur-md px-6 py-3 flex items-center justify-between ${scrolled ? 'bg-white/80 dark:bg-white/5 border-slate-200 dark:border-white/10 shadow-lg shadow-black/5' : 'bg-transparent border-transparent'}`}>
                        <button onClick={() => setView('home')} className="text-xl font-bold tracking-tight flex items-center gap-1 text-slate-900 dark:text-white hover:opacity-80">Sahil<span className="text-violet-500">.dev</span></button>
                        <div className="hidden lg:flex items-center space-x-1">
                            {['home', 'projects', 'blog', 'resume'].map((v) => (
                                <button key={v} onClick={() => setView(v as any)} className={`px-4 py-2 text-sm font-medium transition-colors rounded-full capitalize ${view === v ? 'text-violet-600 dark:text-white bg-slate-100 dark:bg-white/10' : 'text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-white'}`}>{v}</button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                            <a href="#contact" className="hidden sm:flex px-5 py-2 text-sm bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-medium hover:opacity-90 transition-opacity">Hire Me</a>
                            <button className="lg:hidden p-2 text-slate-900 dark:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}><Menu size={24} /></button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0a0a0a] border-b border-slate-200 dark:border-white/10 p-6 flex flex-col space-y-4 shadow-2xl">
                        {['home', 'projects', 'blog', 'resume'].map((v) => (
                            <button key={v} onClick={() => { setView(v as any); setIsMenuOpen(false); }} className="text-left text-lg font-medium text-slate-600 dark:text-slate-300 capitalize">{v}</button>
                        ))}
                    </div>
                )}
            </nav>

            <main className="pt-32 pb-20">
                {/* HOME VIEW */}
                {view === 'home' && (
                    <div className="space-y-32">
                        <section className="container mx-auto px-6 text-center">
                            <FadeIn>
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase mb-8">
                                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span></span> Open to Work
                                </div>
                                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-8 tracking-tight text-slate-900 dark:text-white">
                                    Building Scalable <br /><span className="text-gradient inline-block relative"><ScrambleText text="Full-Stack Systems" /></span>
                                </h1>
                                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">I'm Sahil Umraniya. I engineer <span className="font-semibold text-slate-900 dark:text-white">high-performance backends</span> and <span className="font-semibold text-slate-900 dark:text-white">AI-driven applications</span> that scale.</p>
                                <div className="flex justify-center gap-4">
                                    <button onClick={() => setView('projects')} className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">View Work <ArrowRight size={18} /></button>
                                    <button onClick={() => setView('resume')} className="px-8 py-4 bg-transparent border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white rounded-full font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">View Resume</button>
                                </div>
                            </FadeIn>
                        </section>

                        <section className="container mx-auto px-6">
                            <FadeIn>
                                <div className="flex flex-col items-center mb-12">
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Technical Ecosystem</h2>
                                    <p className="text-slate-600 dark:text-slate-400 max-w-xl text-center">The tools and technologies I use to build production-grade software.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {skillCategories.map((cat: any, idx: number) => (
                                        <div key={idx} className={`p-6 rounded-3xl border ${cat.border} ${cat.bg} backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}>
                                            <div className="flex items-center gap-3 mb-6"><div className="p-3 bg-white/50 dark:bg-white/10 rounded-xl">{cat.icon}</div><h3 className="font-bold text-slate-900 dark:text-white">{cat.title}</h3></div>
                                            <div className="flex flex-wrap gap-2">{cat.skills.map((skill: string, sIdx: number) => (<span key={sIdx} className="px-3 py-1 text-xs font-medium bg-white/60 dark:bg-white/10 text-slate-700 dark:text-slate-200 rounded-lg border border-white/20">{skill}</span>))}</div>
                                        </div>
                                    ))}
                                </div>
                            </FadeIn>
                        </section>

                        <section className="container mx-auto px-6">
                            <div className="flex justify-between items-end mb-12">
                                <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">Flagship Work</h2>
                                <button onClick={() => setView('projects')} className="hidden md:flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold hover:underline">View All Projects <ArrowRight size={16} /></button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {displayedProjects.map((project: any, idx: number) => (
                                    <TiltCard key={idx} className="h-full flex flex-col p-6">
                                        <div className="mb-4 flex justify-between items-start">
                                            <div className="p-3 rounded-lg bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300"><Package size={24} /></div>
                                            {project.tag.includes('NPM') && <span className="px-2 py-1 text-xs font-bold bg-red-100 text-red-600 rounded">NPM</span>}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1">{project.desc}</p>
                                        <div className="flex gap-2 mb-6 flex-wrap">{project.tech.map((t: string) => <span key={t} className="text-xs font-mono px-2 py-1 rounded border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">{t}</span>)}</div>
                                        <a href={project.github} target="_blank" rel="noreferrer" className="w-full py-2 rounded-lg border border-slate-200 dark:border-white/10 text-center text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">View Details</a>
                                    </TiltCard>
                                ))}
                            </div>
                        </section>

                        <section className="container mx-auto px-6 max-w-4xl">
                            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-12 text-center">Experience</h2>
                            <div className="space-y-8">
                                {experiences.map((exp: any, i: number) => (
                                    <div key={i} className="relative pl-8 border-l-2 border-slate-200 dark:border-white/10">
                                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-violet-500 ring-4 ring-white dark:ring-[#020617]"></div>
                                        <div className="flex flex-col sm:flex-row justify-between mb-2"><h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.title}</h3><span className="text-sm text-slate-500 dark:text-slate-400 font-mono">{exp.date}</span></div>
                                        <div className="text-violet-600 dark:text-violet-400 font-medium mb-4">{exp.company_name}</div>
                                        <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">{exp.points.map((pt: string, j: number) => <li key={j}>{pt}</li>)}</ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {/* PROJECTS VIEW */}
                {view === 'projects' && (
                    <div className="container mx-auto px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <button onClick={() => setView('home')} className="mb-8 flex items-center gap-2 text-slate-500 hover:text-violet-500 transition-colors"><ArrowLeft size={18} /> Back to Home</button>
                        <div className="mb-12 text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4">All Projects</h1>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">A complete directory of my open source contributions, client work, and side experiments.</p>
                        </div>
                        <ProjectFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} categories={categories} />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {displayedProjects.map((project: any, idx: number) => (
                                <TiltCard key={idx} className="flex flex-col p-6 bg-white dark:bg-white/5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="text-xs font-bold px-2 py-1 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">{project.tag}</div>
                                        <div className="flex gap-3">
                                            {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><Github size={18} /></a>}
                                            {project.host !== '#' && <a href={project.host} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white"><ExternalLink size={18} /></a>}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 flex-1">{project.desc}</p>
                                    {project.challenge && (
                                        <div className="mt-4 p-3 rounded bg-slate-50 dark:bg-black/20 border border-slate-100 dark:border-white/5">
                                            <div className="text-[10px] font-bold text-violet-500 uppercase mb-1">Challenge</div>
                                            <div className="text-xs text-slate-600 dark:text-slate-400 italic">"{project.challenge}"</div>
                                        </div>
                                    )}
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                )}

                {/* BLOG VIEW */}
                {view === 'blog' && (
                    <div className="container mx-auto px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <button onClick={() => setView('home')} className="mb-8 flex items-center gap-2 text-slate-500 hover:text-violet-500 transition-colors"><ArrowLeft size={18} /> Back to Home</button>
                        <div className="mb-12"><h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Engineering Blog</h1><p className="text-slate-600 dark:text-slate-400">Thoughts on system design, AI, and full-stack development.</p></div>
                        <div className="grid gap-6">
                            {blogPosts.map((post: any) => (
                                <div key={post.id} className="p-8 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 hover:border-violet-500 transition-colors cursor-pointer group">
                                    <span className="text-sm text-violet-500 font-mono mb-2 block">{post.tag} • {post.date}</span>
                                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-violet-500 transition-colors">{post.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400">{post.excerpt}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* RESUME VIEW */}
                {view === 'resume' && <ResumeView resumeData={resumeData} experiences={experiences} skillCategories={skillCategories} />}

                {/* Contact (Shared) */}
                <section id="contact" className="container mx-auto px-6 mt-32">
                    <div className="bg-white/80 dark:bg-slate-900 text-slate-900 dark:text-white rounded-[3rem] p-8 md:p-24 relative overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl">
                        <div className="absolute inset-0 bg-noise opacity-10"></div>
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/10 dark:bg-violet-600/20 rounded-full blur-[100px] pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
                            <div className="lg:w-1/2 text-center lg:text-left">
                                <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to build?</h2>
                                <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">I'm available for freelance projects and full-time roles. Let's create something extraordinary together.</p>
                                <div className="flex justify-center lg:justify-start gap-4">
                                    <a href="https://linkedin.com/in/sahilumraniya" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors text-slate-700 dark:text-white"><Linkedin /></a>
                                    <a href="https://github.com/sahilumraniya" target="_blank" rel="noreferrer" className="p-4 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors text-slate-700 dark:text-white"><Github /></a>
                                    <a href="mailto:sahilumraniya9512@gmail.com" className="p-4 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 transition-colors text-slate-700 dark:text-white"><Mail /></a>
                                </div>
                            </div>
                            <div className="lg:w-1/2 w-full"><ContactForm /></div>
                        </div>
                    </div>
                    <div className="text-center text-slate-500 dark:text-slate-600 text-sm py-12">© 2025 Sahil Umraniya. Ahmedabad, India.</div>
                </section>
            </main>
        </div>
    );
}