"use client";

import { Html, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { skills } from "@/lib/data";
import type { Skill, SkillCategory } from "@/types";
import { SceneCanvas } from "./scene-canvas";

export const SKILL_COLORS: Partial<Record<SkillCategory, string>> = {
    Frontend: "#22d3ee",
    Backend: "#a78bfa",
    "AI/ML": "#fb923c",
    Database: "#34d399",
    "Cloud/DevOps": "#60a5fa",
    Core: "#f472b6",
};

const RADIUS = 2.3;

/** Points spread evenly over a sphere (Fibonacci lattice), so no label sits on top of another. */
function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: count }, (_, i) => {
        const y = 1 - ((i + 0.5) / count) * 2;
        const ring = Math.sqrt(1 - y * y);
        return new THREE.Vector3(Math.cos(goldenAngle * i) * ring, y, Math.sin(goldenAngle * i) * ring).multiplyScalar(radius);
    });
}

const FONT_SIZE: Record<Skill["proficiency"], string> = {
    expert: "15px",
    advanced: "13px",
    intermediate: "12px",
    beginner: "11px",
};

interface CloudProps {
    highlight: SkillCategory | null;
}

function Cloud({ highlight }: CloudProps) {
    const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
    const positions = useMemo(() => fibonacciSphere(skills.length, RADIUS), []);
    const highlightRef = useRef(highlight);
    const scratch = useMemo(() => new THREE.Vector3(), []);

    useEffect(() => {
        highlightRef.current = highlight;
    }, [highlight]);

    // Labels toward the camera are bright and large; those on the far side fade, which gives the flat text depth.
    useFrame((state) => {
        const cameraDistance = state.camera.position.length();
        labelRefs.current.forEach((element, i) => {
            if (!element) return;
            scratch.copy(positions[i]);
            const depth = THREE.MathUtils.clamp((cameraDistance - state.camera.position.distanceTo(scratch)) / RADIUS, -1, 1);
            const front = (depth + 1) / 2;
            const dimmed = highlightRef.current && highlightRef.current !== skills[i].category;
            element.style.opacity = String((0.18 + front * 0.82) * (dimmed ? 0.25 : 1));
            element.style.transform = `scale(${0.78 + front * 0.4})`;
        });
    });

    return (
        <group>
            {/* Core and faint rings give the labels something to orbit */}
            <mesh>
                <icosahedronGeometry args={[0.55, 1]} />
                <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.5} />
            </mesh>
            <mesh>
                <sphereGeometry args={[0.3, 24, 24]} />
                <meshBasicMaterial color="#22d3ee" transparent opacity={0.35} toneMapped={false} />
            </mesh>
            {[0, 1, 2].map((i) => (
                <mesh key={i} rotation={[Math.PI / 2 + i * 0.5, i * 0.7, 0]}>
                    <torusGeometry args={[RADIUS * 0.98, 0.004, 8, 120]} />
                    <meshBasicMaterial color="#38bdf8" transparent opacity={0.2} />
                </mesh>
            ))}

            {skills.map((skill, i) => (
                <Html key={skill.name} position={positions[i]} center zIndexRange={[10, 0]} style={{ pointerEvents: "none" }}>
                    <div
                        ref={(el) => void (labelRefs.current[i] = el)}
                        className="whitespace-nowrap rounded-full border bg-slate-950/70 px-2.5 py-1 font-medium backdrop-blur-sm"
                        style={{
                            color: SKILL_COLORS[skill.category] ?? "#fff",
                            borderColor: `${SKILL_COLORS[skill.category] ?? "#fff"}55`,
                            fontSize: FONT_SIZE[skill.proficiency],
                        }}
                    >
                        {skill.name}
                    </div>
                </Html>
            ))}
        </group>
    );
}

export function SkillCloud({ className, highlight }: { className?: string; highlight: SkillCategory | null }) {
    // Dragging would capture touch scrolling on phones, so manual rotation is for mouse/pen only.
    const [canDrag, setCanDrag] = useState(false);
    useEffect(() => {
        setCanDrag(window.matchMedia("(pointer: fine)").matches);
    }, []);

    return (
        <SceneCanvas className={className} camera={{ position: [0, 0, 7.2], fov: 42 }}>
            <Cloud highlight={highlight} />
            <OrbitControls
                enabled={canDrag}
                autoRotate
                autoRotateSpeed={1.4}
                enableZoom={false}
                enablePan={false}
                enableDamping
            />
        </SceneCanvas>
    );
}
