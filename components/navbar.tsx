"use client";

import { Menu, X, FileText, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";

// --- CONFIGURATION ---
// 1. Paste your Google Drive Link here.
// 2. IMPORTANT: On Google Drive, click Share -> General Access -> "Anyone with the link" -> "Viewer"
// const RESUME_LINK = "https://drive.google.com/file/d/1ihC8bX6SDFLF4qUDmk42WglKN7jy_i2t/view?usp=sharing";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about-us", label: "About" },
    { href: "/contact-us", label: "Contact" },
];

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const isBlogDetail = pathname.startsWith('/blog/') && pathname !== '/blog';

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!mounted) return null;

    return (
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? "py-3" : "py-6"}`}>
            <div className="container mx-auto px-4 sm:px-6">
                <div className={`mx-auto max-w-6xl transition-all duration-300 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2 ${scrolled ? "ds-card" : "bg-transparent border-transparent"}`}>

                    {/* LOGO */}
                    <Link href="/" className={`text-lg sm:text-xl font-bold tracking-tight flex items-center gap-2 hover:opacity-80 transition-opacity ${!scrolled && isBlogDetail ? "text-white" : "text-[var(--ds-text,currentColor)]"}`} onClick={() => setIsMenuOpen(false)}>
                        <div className={`relative w-8 h-8 rounded-full overflow-hidden border ${!scrolled && isBlogDetail ? "border-white/20" : "border-slate-200 dark:border-white/10"}`}>
                            <Image src="/logo.png" alt="Logo" fill className="object-cover" sizes="32px" />
                        </div>
                        <span>Sahil<span className={`text-violet-500`}>.dev</span></span>
                    </Link>

                    {/* DESKTOP NAV */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {NAV_LINKS.map((link) => (
                            <Link key={link.href} href={link.href} className={`px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-lg ${pathname === link.href ? "bg-white/10 backdrop-blur-md" : "hover:bg-white/10"} ${!scrolled && isBlogDetail ? "text-white hover:text-white/80" : (pathname === link.href ? "text-[var(--ds-text,currentColor)] bg-slate-100 dark:bg-white/10" : "text-[var(--ds-text,currentColor)] opacity-70 hover:opacity-100 hover:bg-slate-50 dark:hover:bg-white/5")}`}>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* THEME TOGGLE */}
                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className={`p-2.5 rounded-full transition-colors ${!scrolled && isBlogDetail ? "text-white hover:bg-white/10" : "text-[var(--ds-text,currentColor)] opacity-70 hover:opacity-100 hover:bg-slate-100 dark:hover:bg-white/10"}`}
                            aria-label="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {/* RESUME BUTTON (Desktop) */}
                        <Link
                            href={'/resume'}
                            className={`hidden sm:flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${!scrolled && isBlogDetail ? "text-white hover:text-white/80" : "text-[var(--ds-text,currentColor)] opacity-70 hover:opacity-100"}`}
                        >
                            <FileText size={18} />
                            <span>Resume</span>
                        </Link>

                        <Link href="/contact-us" className="hidden sm:flex px-6 py-2.5 text-sm ds-btn font-bold hover:opacity-90 transition-all hover:scale-105">
                            Hire Me
                        </Link>

                        {/* MOBILE MENU TOGGLE */}
                        <button className="lg:hidden p-2.5 text-[var(--ds-text,currentColor)] rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE MENU */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-[95] bg-slate-900/40 dark:bg-black/60 backdrop-blur-md animate-in fade-in duration-200" onClick={() => setIsMenuOpen(false)}>
                    <div className="pt-24 px-4 h-full overflow-y-auto pb-4">
                        <div onClick={(e) => e.stopPropagation()} className="ds-card p-4 flex flex-col gap-2 max-h-full">
                            {/* Theme Toggle (Mobile) */}
                            <div className="flex items-center justify-between px-6 py-2 border-b border-slate-200 dark:border-white/10 mb-2">
                                <span className="text-sm font-medium text-[var(--ds-text,currentColor)] opacity-70">Appearance</span>
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="p-2.5 rounded-full bg-slate-100 dark:bg-white/10 text-[var(--ds-text,currentColor)] opacity-70 hover:opacity-100 transition-colors"
                                >
                                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                                </button>
                            </div>

                            {NAV_LINKS.map((link) => (
                                <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className={`w-full text-left text-base font-semibold py-4 px-6 rounded-2xl transition-all ${pathname === link.href ? "bg-violet-500/10 text-violet-600 dark:text-violet-300" : "text-[var(--ds-text,currentColor)] opacity-70 hover:opacity-100 hover:bg-slate-50 dark:hover:bg-white/5"}`}>
                                    {link.label}
                                </Link>
                            ))}

                            <div className="h-px bg-slate-200 dark:bg-white/10 my-2" />

                            {/* MOBILE RESUME BUTTON */}
                            <Link
                                href={'/resume'}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full text-center py-3 rounded-2xl border border-slate-200 dark:border-white/10 text-[var(--ds-text,currentColor)] font-semibold hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                            >
                                <FileText size={18} /> Resume
                            </Link>

                            {/* MOBILE HIRE ME BUTTON */}
                            <Link
                                href="/contact-us"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full text-center py-4 ds-btn font-bold text-lg hover:opacity-90 transition-opacity"
                            >
                                Hire Me
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}