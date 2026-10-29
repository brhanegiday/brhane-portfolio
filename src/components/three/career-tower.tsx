"use client";

import { Edges, Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { experiences } from "@/lib/data";
import type { Experience } from "@/types";
import { SceneCanvas } from "./scene-canvas";

const TYPE_COLORS: Record<Experience["type"], string> = {
    research: "#22d3ee",
    "full-time": "#a78bfa",
    contract: "#fb923c",
    "part-time": "#34d399",
    internship: "#34d399",
};

const SLAB_RADIUS = 1.45;
const GAP = 0.07;

/** Whole months between "YYYY-MM" and now (or the end date). */
function monthsInRole(experience: Experience): number {
    const [startYear, startMonth] = experience.startDate.split("-").map(Number);
    const end = experience.endDate ? experience.endDate.split("-").map(Number) : [new Date().getFullYear(), new Date().getMonth() + 1];
    return Math.max(1, (end[0] - startYear) * 12 + (end[1] - startMonth));
}

interface Slab {
    experience: Experience;
    /** Index into `experiences`, which is newest first. */
    sourceIndex: number;
    height: number;
    y: number;
}

/** Oldest role at the bottom, newest on top. A slab's thickness is the time spent in that role. */
function buildSlabs(): { slabs: Slab[]; totalHeight: number } {
    let y = 0;
    const slabs = [...experiences]
        .map((experience, sourceIndex) => ({ experience, sourceIndex }))
        .reverse()
        .map(({ experience, sourceIndex }) => {
            const height = 0.22 + monthsInRole(experience) * 0.03;
            const slab = { experience, sourceIndex, height, y: y + height / 2 };
            y += height + GAP;
            return slab;
        });
    return { slabs, totalHeight: y - GAP };
}

function SlabMesh({ slab, isActive }: { slab: Slab; isActive: boolean }) {
    const color = TYPE_COLORS[slab.experience.type];
    const group = useRef<THREE.Group>(null);
    const material = useRef<THREE.MeshStandardMaterial>(null);

    useFrame((_, delta) => {
        if (group.current) {
            // The active role steps out of the stack toward the viewer.
            group.current.position.x = THREE.MathUtils.damp(group.current.position.x, isActive ? 0.28 : 0, 6, delta);
        }
        if (material.current) {
            material.current.emissiveIntensity = THREE.MathUtils.damp(material.current.emissiveIntensity, isActive ? 1.1 : 0.12, 6, delta);
        }
    });

    return (
        <group ref={group} position={[0, slab.y, 0]}>
            <mesh>
                <cylinderGeometry args={[SLAB_RADIUS, SLAB_RADIUS, slab.height, 6]} />
                <meshStandardMaterial ref={material} color="#0d1b30" emissive={color} emissiveIntensity={0.12} metalness={0.6} roughness={0.35} />
                <Edges color={color} threshold={20} />
            </mesh>
            <Html position={[SLAB_RADIUS + 0.35, 0, 0]} style={{ pointerEvents: "none" }} zIndexRange={[10, 0]}>
                <div
                    className="whitespace-nowrap font-mono text-[11px] transition-all duration-300"
                    style={{ color: isActive ? color : "#94a3b8", opacity: isActive ? 1 : 0.6, fontWeight: isActive ? 700 : 400 }}
                >
                    {slab.experience.startDate.slice(0, 4)}
                    <span className="ml-1.5 hidden sm:inline">{slab.experience.company.split(",")[0]}</span>
                </div>
            </Html>
        </group>
    );
}

function Tower({ activeIndex }: { activeIndex: number }) {
    const { slabs, totalHeight } = useMemo(buildSlabs, []);
    const spin = useRef<THREE.Group>(null);
    const beacon = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (spin.current) spin.current.rotation.y += delta * 0.18;
        if (beacon.current) beacon.current.position.y = totalHeight + 0.7 + Math.sin(state.clock.elapsedTime * 1.6) * 0.08;
    });

    return (
        // Centre the tower on the origin so the camera can orbit its middle.
        <group position={[0, -totalHeight / 2, 0]}>
            <group ref={spin}>
                {slabs.map((slab) => (
                    <SlabMesh key={slab.experience.id} slab={slab} isActive={slab.sourceIndex === activeIndex} />
                ))}
            </group>

            {/* Base plate */}
            <mesh position={[0, -0.12, 0]}>
                <cylinderGeometry args={[SLAB_RADIUS + 0.5, SLAB_RADIUS + 0.6, 0.08, 6]} />
                <meshStandardMaterial color="#070d1a" metalness={0.5} roughness={0.5} />
                <Edges color="#22d3ee" threshold={20} />
            </mesh>

            {/* Beacon above the newest role */}
            <group ref={beacon}>
                <mesh>
                    <octahedronGeometry args={[0.22, 0]} />
                    <meshBasicMaterial color="#67e8f9" wireframe toneMapped={false} />
                </mesh>
                <mesh>
                    <octahedronGeometry args={[0.1, 0]} />
                    <meshBasicMaterial color="#ffffff" toneMapped={false} />
                </mesh>
            </group>
        </group>
    );
}

export function CareerTower({ activeIndex, className }: { activeIndex: number; className?: string }) {
    return (
        <SceneCanvas className={className} camera={{ position: [4.6, 0.6, 7.4], fov: 36 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[4, 6, 5]} intensity={1.4} color="#dbeafe" />
            <pointLight position={[-4, 2, 2]} intensity={20} color="#a78bfa" />
            <Tower activeIndex={activeIndex} />
        </SceneCanvas>
    );
}
