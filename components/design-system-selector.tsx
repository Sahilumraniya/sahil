"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDesignSystem, DesignSystem } from "./design-system-provider";
import { Palette, ChevronDown, Check } from "lucide-react";

const options: { value: DesignSystem; label: string }[] = [
    { value: "default", label: "Default" },
    { value: "glassmorphism", label: "Glassmorphism" },
    { value: "skeuomorphism", label: "Skeuomorphism" },
    { value: "neobrutalism", label: "Neo Brutalism" },
    { value: "claymorphism", label: "Claymorphism" },
    { value: "minimalism", label: "Minimalism" },
    { value: "liquidglass", label: "Liquid Glass" },
    { value: "precision-ai", label: "Precision AI" },
    { value: "retroengine", label: "Retro Engine" },
];

export function DesignSystemSelector({ align = "right" }: { align?: "left" | "right" }) {
    const { designSystem, setDesignSystem } = useDesignSystem();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const activeOption = options.find((o) => o.value === designSystem) || options[0];

    return (
        <div className="relative inline-block text-left z-50" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium ds-card hover:brightness-105 transition-all focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <Palette className="w-4 h-4 text-blue-500" />
                <span className="hidden sm:inline-block">{activeOption.label}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className={`absolute ${align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'} mt-2 w-48 ds-card overflow-hidden focus:outline-none`}>
                    <div className="py-1 p-1">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    setDesignSystem(option.value);
                                    setIsOpen(false);
                                }}
                                className={`flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm ${designSystem === option.value
                                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                                    : "text-[var(--ds-text,currentColor)] hover:bg-slate-100 dark:hover:bg-white/5 opacity-80 hover:opacity-100"
                                    }`}
                            >
                                {option.label}
                                {designSystem === option.value && <Check className="w-4 h-4" />}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
