"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Environment, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, color, speed = 1, distort = 0.4 }: { position: [number, number, number], color: string, speed?: number, distort?: number }) {
    const mesh = useRef<THREE.Mesh>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        mesh.current.rotation.x = Math.cos(t / 4) / 2;
        mesh.current.rotation.y = Math.sin(t / 4) / 2;
        mesh.current.rotation.z = Math.sin(t / 4) / 2;
        mesh.current.position.y = position[1] + Math.sin(t * speed) * 0.5;
    });

    return (
        <Float speed={speed * 2} rotationIntensity={2} floatIntensity={2}>
            <mesh ref={mesh} position={position}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color={color}
                    speed={speed}
                    distort={distort}
                    radius={1}
                    emissive={color}
                    emissiveIntensity={0.5}
                    roughness={0}
                    metalness={1}
                />
            </mesh>
        </Float>
    );
}

function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

            <FloatingShape position={[-4, 2, -5]} color="#8b5cf6" speed={1.2} distort={0.5} />
            <FloatingShape position={[4, -2, -8]} color="#6366f1" speed={0.8} distort={0.3} />
            <FloatingShape position={[-2, -3, -12]} color="#a78bfa" speed={1.5} distort={0.6} />
            <FloatingShape position={[6, 3, -15]} color="#4f46e5" speed={0.5} distort={0.4} />

            <ContactShadows
                position={[0, -10, 0]}
                opacity={0.4}
                scale={40}
                blur={2}
                far={15}
                resolution={256}
                color="#8b5cf6"
            />

            <Environment preset="city" />
        </>
    );
}

export function FramerMotionScene() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden opacity-40 dark:opacity-20 transition-opacity duration-1000">
            <Canvas
                shadows
                camera={{ position: [0, 0, 10], fov: 50 }}
                gl={{ antialias: true, alpha: true }}
            >
                <Scene />
            </Canvas>
        </div>
    );
}
