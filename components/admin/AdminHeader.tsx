"use client";

import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function AdminHeader() {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Simple breadcrumb logic
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumb = segments.length > 1
        ? segments[segments.length - 1].charAt(0).toUpperCase() + segments[segments.length - 1].slice(1)
        : "Dashboard";

    return (
        <header className="flex justify-between items-center mb-8">
            <div>
                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                    Admin / <span className="text-violet-600 dark:text-violet-400">{breadcrumb}</span>
                </h2>
            </div>

            <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
                {mounted && theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </header>
    );
}
