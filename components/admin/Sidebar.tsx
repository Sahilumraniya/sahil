"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileEdit,
    HelpCircle,
    Settings,
    LogOut,
    Menu,
    X,
    Tag
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Blogs", href: "/admin/blogs", icon: FileEdit },
        { name: "Tags", href: "/admin/tags", icon: Tag },
        { name: "FAQs", href: "/admin/faqs", icon: HelpCircle },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <>
            {/* Mobile Trigger */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-slate-900 rounded-lg shadow-md border border-slate-200 dark:border-slate-800"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar Container */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        bg-white dark:bg-[#0f172a] border-r border-slate-200 dark:border-slate-800 flex flex-col
      `}>
                {/* Logo Area */}
                <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-white">
                        <span className="text-violet-600">Admin</span>Panel
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {links.map((link) => {
                        const isActive = pathname.startsWith(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium
                  ${isActive
                                        ? "bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                                    }
                `}
                            >
                                <link.icon size={20} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User / Logout */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors font-medium">
                        <LogOut size={20} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}
