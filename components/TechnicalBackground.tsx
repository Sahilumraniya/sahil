"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function DataNodes() {
    const ref = useRef<THREE.Points>(null!);

    const [positions, connections] = useMemo(() => {
        const pos = new Float32Array(500 * 3);
        for (let i = 0; i < 500; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return [pos, null];
    }, []);

    useFrame((state) => {
        ref.current.rotation.x = state.clock.getElapsedTime() * 0.05;
        ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#38bdf8"
                size={0.05}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </Points>
    );
}

export function TechnicalBackground() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden tech-grid opacity-60 dark:opacity-30 transition-opacity duration-1000">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <fog attach="fog" args={["#020617", 5, 15]} />
                <ambientLight intensity={0.5} />
                <DataNodes />
            </Canvas>
        </div>
    );
}
