"use client";

import { Menu, Sun, Moon, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

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

    // FIX: Destructure resolvedTheme to handle system preference correctly
    const { setTheme, resolvedTheme } = useTheme();

    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isMenuOpen]);

    if (!mounted) return null;

    return (
        <nav
            className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? "py-3" : "py-6"
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6">
                <div
                    className={`mx-auto max-w-6xl rounded-full border transition-all duration-300 backdrop-blur-xl px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2 ${scrolled
                        ? "bg-white/80 dark:bg-black/40 border-slate-200 dark:border-white/10 shadow-lg shadow-black/5"
                        : "bg-transparent border-transparent"
                        }`}
                >
                    {/* --- LOGO AREA --- */}
                    <Link
                        href="/"
                        className="text-lg sm:text-xl font-bold tracking-tight flex items-center gap-2 text-slate-900 dark:text-white hover:opacity-80 transition-opacity"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-white/10">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                fill
                                className="object-cover"
                                sizes="32px"
                            />
                        </div>
                        <span>Sahil<span className="text-violet-500">.dev</span></span>
                    </Link>

                    {/* --- DESKTOP NAVIGATION --- */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {NAV_LINKS.map((link) => {
                            const active = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full ${active
                                        ? "text-slate-900 dark:text-white bg-slate-100 dark:bg-white/10"
                                        : "text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* --- ACTIONS (Theme & Mobile Toggle) --- */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* <button
                            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                            className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                        </button> */}

                        <Link
                            href="/contact"
                            className="hidden sm:flex px-6 py-2.5 text-sm bg-slate-900 dark:bg-white text-white dark:text-black rounded-full font-bold hover:opacity-90 transition-all hover:scale-105"
                        >
                            Hire Me
                        </Link>

                        <button
                            className="lg:hidden p-2.5 text-slate-900 dark:text-white rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MOBILE MENU OVERLAY --- */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-[95] bg-slate-900/40 dark:bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
                    <div className="pt-24 px-4">
                        <div className="rounded-[2rem] bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/10 shadow-2xl p-4 flex flex-col gap-2">
                            {NAV_LINKS.map((link) => {
                                const active = pathname === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`w-full text-left text-base font-semibold py-4 px-6 rounded-2xl transition-all ${active
                                            ? "bg-violet-500/10 text-violet-600 dark:text-violet-300"
                                            : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                            <div className="h-px bg-slate-200 dark:bg-white/10 my-2" />
                            <Link
                                href="/contact-us"
                                onClick={() => setIsMenuOpen(false)}
                                className="w-full text-center py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-lg hover:opacity-90 transition-opacity"
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