"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useDesignSystem } from "./design-system-provider";

// Lazily load heavy three.js scenes
const FramerMotionScene = dynamic(() => import("./FramerMotionScene").then(mod => mod.FramerMotionScene), {
    ssr: false,
    loading: () => null
});

const TechnicalBackground = dynamic(() => import("./TechnicalBackground").then(mod => mod.TechnicalBackground), {
    ssr: false,
    loading: () => null
});

export function GlobalBackground() {
    const { designSystem } = useDesignSystem();

    return (
        <>
            {designSystem === "framermotion" && <FramerMotionScene />}
            {designSystem === "precision-ai" && <TechnicalBackground />}
        </>
    );
}
