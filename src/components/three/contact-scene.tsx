"use client";

import { Html, Sparkles } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SceneCanvas } from "./scene-canvas";

const CYAN = "#22d3ee";

/** The channels people can reach me on, orbiting the pin. */
const CHANNELS = [
    { name: "Email", color: "#22d3ee", radius: 2.1, speed: 0.5, phase: 0 },
    { name: "LinkedIn", color: "#60a5fa", radius: 2.9, speed: -0.38, phase: 2.1 },
    { name: "GitHub", color: "#a78bfa", radius: 3.6, speed: 0.28, phase: 4.2 },
];

const PING_COUNT = 3;
const PING_PERIOD_S = 4.5;

/** A ring that grows outward from the pin and fades, like a radar ping or a signal being sent. */
function Ping({ index }: { index: number }) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!ref.current) return;
        const t = ((state.clock.elapsedTime + (index * PING_PERIOD_S) / PING_COUNT) % PING_PERIOD_S) / PING_PERIOD_S;
        ref.current.scale.setScalar(0.2 + t * 4.2);
        (ref.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.7;
    });

    return (
        <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
            <ringGeometry args={[0.95, 1, 96]} />
            <meshBasicMaterial color={CYAN} transparent opacity={0.7} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
        </mesh>
    );
}

function Channel({ channel }: { channel: (typeof CHANNELS)[number] }) {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!ref.current) return;
        const angle = state.clock.elapsedTime * channel.speed + channel.phase;
        ref.current.position.set(Math.cos(angle) * channel.radius, 0.55 + Math.sin(angle * 2) * 0.12, Math.sin(angle) * channel.radius);
    });

    return (
        <group ref={ref}>
            <mesh>
                <octahedronGeometry args={[0.1, 0]} />
                <meshBasicMaterial color={channel.color} toneMapped={false} />
            </mesh>
            <Html center position={[0, 0.3, 0]} style={{ pointerEvents: "none" }} zIndexRange={[10, 0]}>
                <div
                    className="whitespace-nowrap rounded-full border bg-slate-950/75 px-2.5 py-1 text-[11px] font-medium backdrop-blur"
                    style={{ color: channel.color, borderColor: `${channel.color}66` }}
                >
                    {channel.name}
                </div>
            </Html>
        </group>
    );
}

function Pin() {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (ref.current) ref.current.position.y = 0.55 + Math.sin(state.clock.elapsedTime * 1.8) * 0.06;
    });

    return (
        <group ref={ref}>
            <mesh position={[0, 0.22, 0]}>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshBasicMaterial color="#ffffff" toneMapped={false} />
            </mesh>
            <mesh position={[0, 0.22, 0]}>
                <sphereGeometry args={[0.38, 32, 32]} />
                <meshBasicMaterial color={CYAN} transparent opacity={0.25} toneMapped={false} />
            </mesh>
            {/* Point of the pin */}
            <mesh position={[0, -0.12, 0]} rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[0.13, 0.4, 24]} />
                <meshBasicMaterial color="#ffffff" toneMapped={false} />
            </mesh>
            <Html center position={[0, 0.95, 0]} style={{ pointerEvents: "none" }} zIndexRange={[10, 0]}>
                <div className="whitespace-nowrap rounded-full border border-cyan-300/50 bg-slate-950/80 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                    Kigali, Rwanda
                </div>
            </Html>
        </group>
    );
}

function Rig() {
    const camera = useThree((state) => state.camera);
    useEffect(() => {
        camera.lookAt(0, 0.5, 0);
    }, [camera]);
    return null;
}

export function ContactScene({ className }: { className?: string }) {
    return (
        <SceneCanvas className={className} camera={{ position: [0, 3.3, 7.4], fov: 38 }}>
            <Rig />

            {/* Concentric ground rings and spokes */}
            {[1, 2, 3, 4].map((radius) => (
                <mesh key={radius} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[radius - 0.008, radius + 0.008, 96]} />
                    <meshBasicMaterial color={CYAN} transparent opacity={0.22} side={THREE.DoubleSide} />
                </mesh>
            ))}
            {Array.from({ length: 12 }, (_, i) => (
                <mesh key={i} rotation={[-Math.PI / 2, 0, (i / 12) * Math.PI * 2]} position={[0, 0.001, 0]}>
                    <planeGeometry args={[8, 0.006]} />
                    <meshBasicMaterial color={CYAN} transparent opacity={0.1} />
                </mesh>
            ))}

            {Array.from({ length: PING_COUNT }, (_, i) => (
                <Ping key={i} index={i} />
            ))}
            <Pin />
            {CHANNELS.map((channel) => (
                <Channel key={channel.name} channel={channel} />
            ))}

            <Sparkles count={50} scale={[9, 3, 6]} position={[0, 1.2, 0]} size={2} speed={0.3} opacity={0.6} color="#bdeeff" />
        </SceneCanvas>
    );
}
