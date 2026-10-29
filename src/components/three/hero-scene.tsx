"use client";

import { Html, Line, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import {
    ADDIS_ABABA,
    africaDots,
    DATA_SOURCES,
    GLOBE_CENTER_LON,
    KIGALI,
    lonLatToVector,
    REMOTE_AMERICAS,
    REMOTE_EUROPE,
    type LonLat,
} from "@/lib/africa";
import { SceneCanvas } from "./scene-canvas";

const GLOBE_RADIUS = 2.2;
const CYAN = "#22d3ee";
const CORAL = "#fb923c";
const VIOLET = "#a78bfa";

const toVector = (position: LonLat, radius = GLOBE_RADIUS) => new THREE.Vector3(...lonLatToVector(position, radius));

/** A great-circle arc between two places, lifted off the surface so it reads as a flight path. */
function arcPoints(from: LonLat, to: LonLat, lift: number, segments = 72): THREE.Vector3[] {
    const a = toVector(from, 1);
    const b = toVector(to, 1);
    const angle = a.angleTo(b);
    return Array.from({ length: segments + 1 }, (_, i) => {
        const t = i / segments;
        const point = a
            .clone()
            .multiplyScalar(Math.sin((1 - t) * angle) / Math.sin(angle))
            .add(b.clone().multiplyScalar(Math.sin(t * angle) / Math.sin(angle)))
            .normalize();
        return point.multiplyScalar(GLOBE_RADIUS + Math.sin(Math.PI * t) * lift * angle);
    });
}

/** Latitude and longitude lines every 30 degrees, as one set of segments. */
function graticuleSegments(radius: number): Float32Array {
    const segments: number[] = [];
    const steps = 72;
    const push = (a: LonLat, b: LonLat) => segments.push(...lonLatToVector(a, radius), ...lonLatToVector(b, radius));
    for (let lat = -60; lat <= 60; lat += 30) {
        for (let i = 0; i < steps; i++) push([(i / steps) * 360 - 180, lat], [((i + 1) / steps) * 360 - 180, lat]);
    }
    for (let lon = -180; lon < 180; lon += 30) {
        for (let i = -steps / 2; i < steps / 2; i++) push([lon, (i / steps) * 180], [lon, ((i + 1) / steps) * 180]);
    }
    return new Float32Array(segments);
}

interface FlowProps {
    from: LonLat;
    to: LonLat;
    color: string;
    lift: number;
    packets: number;
    speed: number;
    dashed?: boolean;
}

/** A path with small glowing packets travelling along it: data (or a career) in motion. */
function Flow({ from, to, color, lift, packets, speed, dashed }: FlowProps) {
    const points = useMemo(() => arcPoints(from, to, lift), [from, to, lift]);
    const packetRefs = useRef<(THREE.Mesh | null)[]>([]);

    useFrame((state) => {
        packetRefs.current.forEach((mesh, i) => {
            if (!mesh) return;
            const t = (state.clock.elapsedTime * speed + i / packets) % 1;
            const index = t * (points.length - 1);
            const lower = Math.floor(index);
            mesh.position.lerpVectors(points[lower], points[Math.min(lower + 1, points.length - 1)], index - lower);
            // Fade in and out at the ends so packets seem to appear from, and sink into, the cities.
            mesh.scale.setScalar(Math.sin(Math.PI * t) + 0.15);
        });
    });

    return (
        <group>
            <Line
                points={points}
                color={color}
                lineWidth={1.2}
                transparent
                opacity={0.55}
                dashed={dashed}
                dashSize={0.08}
                gapSize={0.06}
            />
            {Array.from({ length: packets }, (_, i) => (
                <mesh key={i} ref={(el) => void (packetRefs.current[i] = el)}>
                    <sphereGeometry args={[0.045, 12, 12]} />
                    <meshBasicMaterial color={color} toneMapped={false} />
                </mesh>
            ))}
        </group>
    );
}

interface MarkerProps {
    position: LonLat;
    color: string;
    size: number;
    pulses?: boolean;
    label?: ReactNode;
    occluder?: React.RefObject<THREE.Object3D | null>;
}

/** A city: a bright point, a ring that sits flat on the surface and ripples outward, and an optional label. */
function Marker({ position, color, size, pulses = false, label, occluder }: MarkerProps) {
    const ringRef = useRef<THREE.Mesh>(null);
    const placement = useMemo(() => {
        const point = toVector(position);
        const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), point.clone().normalize());
        return { point, quaternion };
    }, [position]);

    useFrame((state) => {
        if (!ringRef.current || !pulses) return;
        const t = (state.clock.elapsedTime * 0.7) % 1;
        ringRef.current.scale.setScalar(1 + t * 3.2);
        (ringRef.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.8;
    });

    return (
        <group position={placement.point} quaternion={placement.quaternion}>
            <mesh>
                <sphereGeometry args={[size, 20, 20]} />
                <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>
            <mesh ref={ringRef}>
                <ringGeometry args={[size * 1.4, size * 1.7, 40]} />
                <meshBasicMaterial color={color} transparent opacity={pulses ? 0.8 : 0.4} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} />
            </mesh>
            {label && (
                <Html position={[0, 0, size * 3]} center occlude={occluder ? [occluder as React.RefObject<THREE.Object3D>] : undefined} zIndexRange={[20, 0]} style={{ pointerEvents: "none" }}>
                    {label}
                </Html>
            )}
        </group>
    );
}

function Label({ color, children }: { color: string; children: ReactNode }) {
    return (
        <div
            className="whitespace-nowrap rounded-full border bg-slate-950/80 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md"
            style={{ borderColor: `${color}99` }}
        >
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: color }} />
            {children}
        </div>
    );
}

function Globe() {
    const globeRef = useRef<THREE.Group>(null);
    const surfaceRef = useRef<THREE.Mesh>(null);

    const dots = useMemo(() => new Float32Array(africaDots(42000, GLOBE_RADIUS * 1.003).flat()), []);
    const graticule = useMemo(() => graticuleSegments(GLOBE_RADIUS * 1.001), []);

    useFrame((state, delta) => {
        if (!globeRef.current) return;
        // Face Africa, drift gently, and lean toward the pointer.
        const targetY = -THREE.MathUtils.degToRad(GLOBE_CENTER_LON) + Math.sin(state.clock.elapsedTime * 0.25) * 0.12 + state.pointer.x * 0.35;
        const targetX = 0.3 - state.pointer.y * 0.18;
        globeRef.current.rotation.y = THREE.MathUtils.damp(globeRef.current.rotation.y, targetY, 3, delta);
        globeRef.current.rotation.x = THREE.MathUtils.damp(globeRef.current.rotation.x, targetX, 3, delta);
    });

    return (
        <group ref={globeRef}>
            {/* Dark body, which also hides labels and flows on the far side */}
            <mesh ref={surfaceRef}>
                <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
                <meshStandardMaterial color="#071426" roughness={0.9} metalness={0.1} />
            </mesh>
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[graticule, 3]} />
                </bufferGeometry>
                <lineBasicMaterial color={CYAN} transparent opacity={0.1} />
            </lineSegments>

            {/* Africa, as dots */}
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[dots, 3]} />
                </bufferGeometry>
                <pointsMaterial color="#67e8f9" size={0.034} sizeAttenuation transparent opacity={0.95} />
            </points>

            {/* Data flowing in from across the continent to the pipelines in Kigali */}
            {DATA_SOURCES.map((city, i) => (
                <group key={city.name}>
                    <Flow from={city.position} to={KIGALI.position} color={CYAN} lift={0.55} packets={2} speed={0.16 + (i % 3) * 0.03} />
                    <Marker position={city.position} size={0.028} color="#e0f7ff" />
                </group>
            ))}

            {/* The path: Addis Ababa to Kigali */}
            <Flow from={ADDIS_ABABA.position} to={KIGALI.position} color={CORAL} lift={0.4} packets={2} speed={0.22} />

            {/* Remote teams */}
            <Flow from={KIGALI.position} to={REMOTE_EUROPE.position} color={VIOLET} lift={0.5} packets={2} speed={0.1} dashed />
            <Flow from={KIGALI.position} to={REMOTE_AMERICAS.position} color={VIOLET} lift={0.6} packets={2} speed={0.08} dashed />

            <Marker
                position={KIGALI.position}
                size={0.07}
                color={CYAN}
                pulses
                occluder={surfaceRef}
                label={<Label color={CYAN}>Kigali · LLM research at Upanzi</Label>}
            />
            <Marker
                position={ADDIS_ABABA.position}
                size={0.045}
                color={CORAL}
                occluder={surfaceRef}
                label={<Label color={CORAL}>Addis Ababa · where I started</Label>}
            />
            <Marker
                position={REMOTE_EUROPE.position}
                size={0.035}
                color={VIOLET}
                occluder={surfaceRef}
                label={<Label color={VIOLET}>Remote · Belgium</Label>}
            />
            <Marker
                position={REMOTE_AMERICAS.position}
                size={0.035}
                color={VIOLET}
                occluder={surfaceRef}
                label={<Label color={VIOLET}>Remote · USA</Label>}
            />
        </group>
    );
}

export function HeroScene({ className }: { className?: string }) {
    return (
        <SceneCanvas className={className} camera={{ position: [0, 0, 7.4], fov: 40 }}>
            <ambientLight intensity={0.9} />
            <pointLight position={[5, 3, 5]} intensity={40} color="#9be7ff" />

            {/* Atmosphere: a back-faced, additive shell that glows at the rim */}
            <mesh scale={1.13}>
                <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
                <meshBasicMaterial color={CYAN} transparent opacity={0.1} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>

            <Globe />
            <Sparkles count={60} scale={[10, 8, 6]} size={2} speed={0.3} opacity={0.6} color="#bdeeff" />
        </SceneCanvas>
    );
}
