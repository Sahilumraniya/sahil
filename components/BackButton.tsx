"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

interface BackButtonProps {
    href?: string;
    label?: string;
    className?: string;
}

export function BackButton({ href = "/", label = "Back to Home", className = "" }: BackButtonProps) {
    return (
        <Link href={href}>
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: -2 }}
                className={`group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md text-slate-600 dark:text-slate-400 font-medium hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-500/30 transition-all shadow-sm hover:shadow-md ${className}`}
            >
                <div className="relative overflow-hidden w-5 h-5 flex items-center justify-center">
                    <ArrowLeft
                        size={18}
                        className="transition-transform duration-300 group-hover:-translate-x-1"
                    />
                </div>
                <span className="text-sm tracking-tight">{label}</span>
            </motion.div>
        </Link>
    );
}
