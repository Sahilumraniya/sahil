"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type DesignSystem =
    | "default"
    | "glassmorphism"
    | "skeuomorphism"
    | "neobrutalism"
    | "claymorphism"
    | "minimalism"
    | "liquidglass"
    | "framermotion"
    | "precision-ai"
    | "retroengine";

interface DesignSystemContextProps {
    designSystem: DesignSystem;
    setDesignSystem: (ds: DesignSystem) => void;
}

const DesignSystemContext = createContext<DesignSystemContextProps | undefined>(
    undefined
);

export function DesignSystemProvider({ children }: { children: React.ReactNode }) {
    const [designSystem, setDesignSystemState] = useState<DesignSystem>("default");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load from localStorage if available
        const savedDs = localStorage.getItem("design-system") as DesignSystem;
        if (savedDs) {
            setDesignSystemState(savedDs);
            document.documentElement.setAttribute("data-design", savedDs);
        } else {
            document.documentElement.setAttribute("data-design", "default");
        }
    }, []);

    const setDesignSystem = (ds: DesignSystem) => {
        setDesignSystemState(ds);
        localStorage.setItem("design-system", ds);
        document.documentElement.setAttribute("data-design", ds);
    };

    // We always render the provider to avoid hook errors in children, 
    // but the actual attribute application happens in useEffect after mounting.
    return (
        <DesignSystemContext.Provider value={{ designSystem, setDesignSystem }}>
            {children}
        </DesignSystemContext.Provider>
    );
}

export function useDesignSystem() {
    const context = useContext(DesignSystemContext);
    if (context === undefined) {
        throw new Error(
            "useDesignSystem must be used within a DesignSystemProvider"
        );
    }
    return context;
}
