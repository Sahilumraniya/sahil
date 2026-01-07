"use client";

import { Github, Linkedin, Twitter, ArrowUpRight, Copy, Check, MapPin, Phone, Mail, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

// --- DATA ---
const SOCIALS = [
    { icon: Github, href: "https://github.com/sahilumraniya", label: "GitHub", bg: "hover:bg-[#24292e] hover:text-white" },
    { icon: Linkedin, href: "https://linkedin.com/in/sahilumraniya", label: "LinkedIn", bg: "hover:bg-[#0077b5] hover:text-white" },
    { icon: Twitter, href: "https://x.com/2Umraniya", label: "Twitter", bg: "hover:bg-[#1da1f2] hover:text-white" },
    { icon: Instagram, href: "https://instagram.com/sahilumraniya_", label: "Instagram", bg: "hover:bg-[#e1306c] hover:text-white" }
];

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about-us" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact-us" }
];

// --- COMPONENTS ---

// 1. Status Card (Time & Location)
function StatusCard() {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', {
                timeZone: "Asia/Kolkata",
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-6 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Online</span>
                </div>
            </div>
            <div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">
                    {time || "--:--"}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1 flex items-center gap-1">
                    <MapPin size={12} /> Ahmedabad, India
                </p>
            </div>
        </div>
    );
}

// 2. Phone Card
function PhoneCard() {
    return (
        <Link href="https://wa.me/919327201427?text=Hi%20Sahil!%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20potential%20opportunity%20with%20you." target="_blank" rel="noreferrer">
            <div
                className="group p-6 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col justify-between h-full transition-all hover:border-violet-500/50 hover:shadow-xl dark:hover:shadow-none hover:-translate-y-1"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="p-2.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 group-hover:text-white group-hover:bg-violet-500 transition-colors">
                        <Phone size={20} />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 text-violet-500">
                        <ArrowUpRight size={20} />
                    </div>
                </div>
                <div>
                    <p className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                        +91 93272 01427
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Call / WhatsApp</p>
                </div>
            </div>
        </Link>
    );
}

// 3. Email Card (Full Width)
function EmailCard() {
    const [copied, setCopied] = useState(false);
    const email = "sahilumraniya9512@gmail.com";

    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="group relative w-full p-6 rounded-3xl bg-slate-900 dark:bg-violet-600 text-white flex flex-col justify-between items-start h-full min-h-[160px] overflow-hidden transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
            <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity">
                {copied ? <Check size={24} /> : <Copy size={24} />}
            </div>

            <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm mb-auto">
                <Mail size={20} />
            </div>

            <div className="relative z-10 mt-6 text-left">
                <p className="text-sm text-slate-300 dark:text-violet-200 mb-1">Quick Mail</p>
                <p className="text-xl sm:text-2xl font-bold break-all leading-tight">
                    {copied ? "Copied to Clipboard!" : email}
                </p>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
    );
}

export function Footer() {
    return (
        <footer className="relative bg-slate-50 dark:bg-[#020617] pt-20 pb-10 overflow-hidden border-t border-slate-200 dark:border-white/5">

            <div className="container mx-auto px-4 sm:px-6 relative z-10">

                {/* LAYOUT STRATEGY: 
                   Using 'items-stretch' ensures both left and right columns are equal height.
                */}
                <div className="flex flex-col lg:flex-row gap-6 items-stretch mb-12">

                    {/* --- LEFT SIDE: Brand, Nav & CTA (Takes 40% width) --- */}
                    <div className="lg:w-5/12 flex flex-col">
                        <div className="h-full p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col justify-between gap-10">

                            {/* Top: Brand */}
                            <div>
                                <Link href="/" className="inline-flex items-center gap-3 mb-6">
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200 dark:border-white/10">
                                        <Image src="/logo.png" alt="Sahil" fill className="object-cover" />
                                    </div>
                                    <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                        Sahil<span className="text-violet-500">.dev</span>
                                    </span>
                                </Link>
                                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                                    Let’s build the <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">next big thing.</span>
                                </h2>
                            </div>

                            {/* Middle: Navigation Links (Moved here to fill space) */}
                            <nav className="flex flex-wrap gap-x-6 gap-y-3">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* Bottom: CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Link
                                    href="/contact-us"
                                    className="flex-1 px-6 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-center hover:opacity-90 transition-all flex justify-center items-center gap-2"
                                >
                                    Start Project <ArrowUpRight size={18} />
                                </Link>
                                <Link
                                    href="/projects"
                                    className="px-6 py-4 rounded-2xl border border-slate-200 dark:border-white/20 text-slate-700 dark:text-white font-bold text-center hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
                                >
                                    View Projects
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT SIDE: Bento Grid (Takes 60% width) --- */}
                    <div className="lg:w-7/12 flex flex-col gap-4">

                        {/* Row 1: Status & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                            <StatusCard />
                            <PhoneCard />
                        </div>

                        {/* Row 2: Email (Big Card) */}
                        <div className="flex-1">
                            <EmailCard />
                        </div>

                        {/* Row 3: Socials */}
                        <div className="grid grid-cols-4 gap-4 h-24">
                            {SOCIALS.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`
                                        flex items-center justify-center rounded-3xl 
                                        bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 
                                        transition-all duration-300 group h-full
                                        ${social.bg} hover:border-transparent
                                    `}
                                >
                                    <social.icon size={24} className="text-slate-400 group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM COPYRIGHT --- */}
                <div className="flex justify-between items-center pt-8 border-t border-slate-200 dark:border-white/10">
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                        © {new Date().getFullYear()} Sahil Umraniya.
                    </p>
                    <p className="text-xs text-slate-400">
                        Designed with precision.
                    </p>
                </div>

            </div>
        </footer>
    );
}