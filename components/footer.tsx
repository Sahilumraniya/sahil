import { Github, Linkedin, Mail, Twitter, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SOCIAL_LINKS = [
    { icon: Github, href: "https://github.com/sahilumraniya", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/sahilumraniya", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/2Umraniya", label: "Twitter" },
    { icon: Mail, href: "mailto:sahilumraniya9512@gmail.com", label: "Email" },
];

const FOOTER_LINKS = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about-us" },
    { label: "Contact", href: "/contact-us" },
];

export function Footer() {
    return (
        <footer className="relative bg-slate-50 dark:bg-black pt-20 pb-10 overflow-hidden">

            {/* 1. Top Gradient Separator */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-300 dark:via-white/10 to-transparent"></div>

            {/* Optional: Colorful Glow Spot */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-violet-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="max-w-6xl mx-auto">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                        {/* --- BRAND COLUMN (Spans 2 cols on tablet) --- */}
                        <div className="md:col-span-2 flex flex-col gap-6">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 group"
                            >
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 dark:border-white/10 group-hover:border-violet-500 transition-colors">
                                    <Image
                                        src="/logo.png"
                                        alt="Sahil Umraniya"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                    Sahil<span className="text-violet-500">.dev</span>
                                </span>
                            </Link>

                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed max-w-sm">
                                Empowering businesses with scalable Full Stack architectures and intelligent Generative AI solutions.
                            </p>

                            {/* Status Indicator */}
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </span>
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                    Available for new projects
                                </span>
                            </div>
                        </div>

                        {/* --- LINKS COLUMN --- */}
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-6 text-sm uppercase tracking-wider">
                                Explore
                            </h4>
                            <ul className="space-y-3">
                                {FOOTER_LINKS.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors text-sm font-medium flex items-center gap-1 group"
                                        >
                                            <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* --- CONNECT COLUMN --- */}
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-6 text-sm uppercase tracking-wider">
                                Socials
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {SOCIAL_LINKS.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.label}
                                        className="p-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-violet-500/50 hover:bg-violet-50 dark:hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-white"
                                    >
                                        <social.icon size={18} />
                                    </a>
                                ))}
                            </div>
                            <div className="mt-6">
                                <a
                                    href="mailto:sahilumraniya9512@gmail.com"
                                    className="text-sm font-semibold text-slate-900 dark:text-white hover:text-violet-500 transition-colors inline-flex items-center gap-1"
                                >
                                    sahilumraniya9512@gmail.com
                                    <ArrowUpRight size={14} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* --- BOTTOM BAR --- */}
                    <div className="border-t border-slate-200 dark:border-white/10 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-sm text-slate-500 dark:text-slate-500 text-center md:text-left">
                                © {new Date().getFullYear()} Sahil Umraniya. Built with <span className="text-violet-500">Next.js</span> & <span className="text-violet-500">Tailwind</span>.
                            </p>

                            <div className="flex gap-6 text-sm font-medium text-slate-500 dark:text-slate-500">
                                <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                                    Privacy Policy
                                </a>
                                <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                                    Terms of Service
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}