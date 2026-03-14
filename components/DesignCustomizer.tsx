"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Palette, Check, ChevronUp, X,
    Monitor, Cpu, Layers, Ghost,
    Sparkles, MousePointer, Droplets,
    Box, Smartphone, Sun, Moon,
    Wand2, Settings2, Command
} from "lucide-react";
import { useDesignSystem, DesignSystem } from "./design-system-provider";
import { useTheme } from "next-themes";

/* -------------------------------------------------------------------------- */
/* CONFIG                                                                     */
/* -------------------------------------------------------------------------- */

const DESIGN_SYSTEMS: {
    id: DesignSystem;
    label: string;
    icon: any;
    color: string;
    description: string;
}[] = [
        { id: "default", label: "Modern", icon: Monitor, color: "#7c3aed", description: "Standard professional aesthetic." },
        { id: "precision-ai", label: "Precision", icon: Cpu, color: "#10b981", description: "Grid-based engineering style." },
        { id: "minimalism", label: "Pure Zen", icon: Ghost, color: "#94a3b8", description: "Ultra-clean focused view." },
        { id: "framermotion", label: "Dynamic", icon: Sparkles, color: "#d946ef", description: "Physics-based movement." },
        { id: "glassmorphism", label: "Glass", icon: Layers, color: "#38bdf8", description: "Refractive frosted depth." },
        { id: "neobrutalism", label: "Bold", icon: MousePointer, color: "#facc15", description: "High-contrast statement." },
        { id: "liquidglass", label: "Liquid", icon: Droplets, color: "#4f46e5", description: "Vibrant energy flow." },
        { id: "skeuomorphism", label: "Tactile", icon: Box, color: "#64748b", description: "Physical textures & depth." },
        { id: "claymorphism", label: "Soft", icon: Smartphone, color: "#60a5fa", description: "Friendly 3D geometry." },
    ];

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                              */
/* -------------------------------------------------------------------------- */

export function DesignCustomizer() {
    const [isOpen, setIsOpen] = useState(false);
    const { designSystem, setDesignSystem } = useDesignSystem();
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    if (!mounted) return null;

    const currentSystem = DESIGN_SYSTEMS.find(s => s.id === designSystem) || DESIGN_SYSTEMS[0];

    return (
        <div className="fixed bottom-8 left-8 z-[100]" ref={dropdownRef}>

            {/* Adaptive Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full left-0 mb-4 w-72 ds-card bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col p-2 gap-1"
                        style={{ transformOrigin: "bottom left" }}
                    >
                        {/* Header */}
                        <div className="px-4 py-3 mb-2 flex items-center justify-between border-b border-slate-100 dark:border-white/5">
                            <div className="flex items-center gap-2">
                                <Command size={14} className="text-violet-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Design_Kernel</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg text-slate-400 transition-colors"
                                >
                                    {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg text-slate-400 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        </div>

                        {/* List Area */}
                        <div className="max-h-[60vh] overflow-y-auto px-1 custom-scrollbar">
                            <div className="grid grid-cols-1 gap-1">
                                {DESIGN_SYSTEMS.map((system) => (
                                    <button
                                        key={system.id}
                                        onClick={() => setDesignSystem(system.id)}
                                        className={`group flex items-center gap-3 p-3 rounded-xl transition-all ${designSystem === system.id
                                            ? 'bg-violet-600/10 dark:bg-violet-600/20'
                                            : 'hover:bg-slate-50 dark:hover:bg-white/5'
                                            }`}
                                    >
                                        <div
                                            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${designSystem === system.id ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20' : 'bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:text-violet-500'
                                                }`}
                                        >
                                            <system.icon size={18} strokeWidth={designSystem === system.id ? 2.5 : 1.5} />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="flex items-center justify-between">
                                                <span className={`text-sm font-bold ${designSystem === system.id ? 'text-violet-600 dark:text-violet-400' : 'text-slate-700 dark:text-slate-300'}`}>
                                                    {system.label}
                                                </span>
                                                {designSystem === system.id && (
                                                    <Check size={14} className="text-emerald-500" strokeWidth={3} />
                                                )}
                                            </div>
                                            <p className="text-[10px] text-slate-400 font-medium truncate w-40">
                                                {system.description}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Footer Status */}
                        <div className="mt-2 p-3 bg-slate-50 dark:bg-white/[0.02] rounded-xl border border-slate-100 dark:border-white/5">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">System_Online</span>
                                </div>
                                <span className="text-[9px] font-bold text-slate-300 dark:text-slate-600 uppercase">Sahil.dev // Core</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Adaptive Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`ds-btn group flex items-center gap-3 px-6 py-4 shadow-xl shadow-black/5 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 ${isOpen ? 'brightness-90 scale-95' : ''
                    }`}
            >
                <div className="relative">
                    <Palette size={20} className={`transition-all duration-500 ${isOpen ? 'rotate-180 text-violet-500' : ''}`} />
                    {isOpen && (
                        <motion.div
                            layoutId="btn-active-glow"
                            className="absolute inset-0 bg-violet-500/20 blur-md rounded-full"
                        />
                    )}
                </div>
                <div className="flex flex-col items-start leading-tight">
                    <span className="text-[9px] font-black opacity-60 uppercase tracking-widest">
                        {isOpen ? 'Select_Core' : 'Personalize'}
                    </span>
                    <span className="text-sm font-black flex items-center gap-1.5">
                        {isOpen ? 'Design Hub' : currentSystem.label}
                        <ChevronUp size={14} className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                    </span>
                </div>
            </motion.button>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(124, 58, 237, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(124, 58, 237, 0.3);
                }
            `}</style>
        </div>
    );
}
