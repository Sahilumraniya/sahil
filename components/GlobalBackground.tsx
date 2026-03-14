"use client";

import React from "react";
import { useDesignSystem } from "./design-system-provider";
import { FramerMotionScene } from "./FramerMotionScene";
import { TechnicalBackground } from "./TechnicalBackground";

export function GlobalBackground() {
    const { designSystem } = useDesignSystem();

    return (
        <>
            {designSystem === "framermotion" && <FramerMotionScene />}
            {designSystem === "precision-ai" && <TechnicalBackground />}
        </>
    );
}
