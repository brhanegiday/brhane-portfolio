"use client";

import { Edges, Grid, Html, Line, OrbitControls, RoundedBox, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type ComponentRef } from "react";
import * as THREE from "three";
import { decStops, WALL_COLORS, type DecStop } from "@/lib/virtual-dec";
import { SceneCanvas } from "./scene-canvas";

const FLOOR_Y = 0.03;

interface PodProps {
    stop: DecStop;
    index: number;
    isActive: boolean;
    isHovered: boolean;
    onSelect: (index: number) => void;
    onHover: (index: number | null) => void;
}

/** One booth: hexagonal plinth, kiosk body, glowing screen with UI bars, and a floor ring. */
function Pod({ stop, index, isActive, isHovered, onSelect, onHover }: PodProps) {
    const color = WALL_COLORS[stop.wall];
    const lift = useRef<THREE.Group>(null);
    const screenMaterial = useRef<THREE.MeshStandardMaterial>(null);
    const ringMaterial = useRef<THREE.MeshBasicMaterial>(null);
    const emphasised = isActive || isHovered;

    useFrame((_, delta) => {
        if (lift.current) {
            const targetScale = emphasised ? 1.14 : 1;
            lift.current.scale.setScalar(THREE.MathUtils.damp(lift.current.scale.x, targetScale, 8, delta));
        }
        if (screenMaterial.current) {
            screenMaterial.current.emissiveIntensity = THREE.MathUtils.damp(
                screenMaterial.current.emissiveIntensity,
                emphasised ? 2.1 : 0.7,
                8,
                delta,
            );
        }
        if (ringMaterial.current) {
            ringMaterial.current.opacity = THREE.MathUtils.damp(ringMaterial.current.opacity, emphasised ? 0.95 : 0.3, 8, delta);
        }
    });

    return (
        <group
            position={[stop.position[0], 0, stop.position[1]]}
            rotation={[0, stop.facing, 0]}
            onPointerOver={(event) => {
                event.stopPropagation();
                onHover(index);
                document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
                onHover(null);
                document.body.style.cursor = "";
            }}
            onClick={(event) => {
                event.stopPropagation();
                onSelect(index);
            }}
        >
            {/* Floor ring */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, FLOOR_Y, 0]}>
                <ringGeometry args={[0.52, 0.6, 6]} />
                <meshBasicMaterial ref={ringMaterial} color={color} transparent opacity={0.3} toneMapped={false} />
            </mesh>

            <group ref={lift}>
                {/* Plinth */}
                <mesh position={[0, FLOOR_Y + 0.02, 0]}>
                    <cylinderGeometry args={[0.4, 0.46, 0.06, 6]} />
                    <meshStandardMaterial color="#0b1220" metalness={0.8} roughness={0.3} />
                    <Edges color={color} threshold={20} />
                </mesh>

                {/* Kiosk body, tilted back a little so the screen catches the camera */}
                <group position={[0, 0.4, -0.04]} rotation={[-0.1, 0, 0]}>
                    <RoundedBox args={[0.46, 0.66, 0.12]} radius={0.035} smoothness={4}>
                        <meshStandardMaterial color="#121c33" metalness={0.65} roughness={0.35} />
                    </RoundedBox>

                    {/* Screen */}
                    <mesh position={[0, 0.02, 0.063]}>
                        <planeGeometry args={[0.36, 0.5]} />
                        <meshStandardMaterial
                            ref={screenMaterial}
                            color="#04131c"
                            emissive={color}
                            emissiveIntensity={0.7}
                            toneMapped={false}
                        />
                    </mesh>

                    {/* UI bars drawn on the screen */}
                    {[
                        { y: 0.17, w: 0.26 },
                        { y: 0.07, w: 0.18 },
                        { y: -0.02, w: 0.24 },
                        { y: -0.11, w: 0.14 },
                    ].map((bar) => (
                        <mesh key={bar.y} position={[-0.14 + bar.w / 2, bar.y, 0.066]}>
                            <planeGeometry args={[bar.w, 0.035]} />
                            <meshBasicMaterial color="#ffffff" transparent opacity={0.75} toneMapped={false} />
                        </mesh>
                    ))}
                    <mesh position={[0.1, -0.19, 0.066]}>
                        <circleGeometry args={[0.035, 24]} />
                        <meshBasicMaterial color="#ffffff" toneMapped={false} />
                    </mesh>

                    {/* Top light bar */}
                    <mesh position={[0, 0.355, 0.0]}>
                        <boxGeometry args={[0.3, 0.018, 0.1]} />
                        <meshBasicMaterial color={color} toneMapped={false} />
                    </mesh>
                </group>
            </group>
        </group>
    );
}

/** A translucent room wall with a glowing edge. */
function Wall({ position, size }: { position: [number, number, number]; size: [number, number, number] }) {
    return (
        // raycast is disabled so a wall never blocks hovering the booth behind it
        <mesh position={position} raycast={() => null}>
            <boxGeometry args={size} />
            <meshStandardMaterial color="#38bdf8" transparent opacity={0.05} roughness={0.2} />
            <Edges color="#38bdf8" threshold={15} />
        </mesh>
    );
}

/** The open end of the U: two pillars and a lintel, echoing the visitors' gate. */
function Gate() {
    return (
        <group position={[0, 0, 2.55]}>
            {[-1.15, 1.15].map((x) => (
                <mesh key={x} position={[x, 0.7, 0]}>
                    <boxGeometry args={[0.1, 1.4, 0.1]} />
                    <meshStandardMaterial color="#0b1220" emissive="#22d3ee" emissiveIntensity={0.9} toneMapped={false} />
                </mesh>
            ))}
            <mesh position={[0, 1.4, 0]}>
                <boxGeometry args={[2.4, 0.08, 0.1]} />
                <meshStandardMaterial color="#0b1220" emissive="#22d3ee" emissiveIntensity={1.4} toneMapped={false} />
            </mesh>
        </group>
    );
}

interface VisitorProps {
    curve: THREE.CatmullRomCurve3;
    activeIndex: number;
}

/** The glowing visitor who walks the route; it eases to whichever booth is active. */
function Visitor({ curve, activeIndex }: VisitorProps) {
    const orb = useRef<THREE.Group>(null);
    const progress = useRef(activeIndex / (decStops.length - 1));

    useFrame((state, delta) => {
        const target = activeIndex / (decStops.length - 1);
        progress.current = THREE.MathUtils.damp(progress.current, target, 2.6, delta);
        if (orb.current) {
            orb.current.position.copy(curve.getPoint(THREE.MathUtils.clamp(progress.current, 0, 1)));
            orb.current.position.y = 0.22 + Math.sin(state.clock.elapsedTime * 3) * 0.03;
        }
    });

    return (
        <group ref={orb}>
            <mesh>
                <sphereGeometry args={[0.075, 24, 24]} />
                <meshBasicMaterial color="#ffffff" toneMapped={false} />
            </mesh>
            <mesh>
                <sphereGeometry args={[0.16, 24, 24]} />
                <meshBasicMaterial color="#67e8f9" transparent opacity={0.28} toneMapped={false} />
            </mesh>
            <pointLight color="#67e8f9" intensity={2.5} distance={2.4} />
        </group>
    );
}

interface DecWorldProps {
    activeIndex: number;
    onSelect: (index: number) => void;
}

function DecWorld({ activeIndex, onSelect }: DecWorldProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const rig = useRef<THREE.Group>(null);
    const routeLine = useRef<ComponentRef<typeof Line>>(null);

    // The route passes just in front of each booth, in tour order.
    const curve = useMemo(() => {
        const points = decStops.map((stop) => {
            const inward = new THREE.Vector3(Math.sin(stop.facing), 0, Math.cos(stop.facing)).multiplyScalar(0.95);
            return new THREE.Vector3(stop.position[0], FLOOR_Y + 0.02, stop.position[1]).add(inward);
        });
        return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.4);
    }, []);
    const routePoints = useMemo(() => curve.getPoints(160), [curve]);

    useFrame((state, delta) => {
        // A slow sway keeps the room alive even when nobody is dragging it.
        if (rig.current) rig.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        if (routeLine.current) routeLine.current.material.dashOffset -= delta * 0.25;
    });

    const labelIndex = hoveredIndex ?? activeIndex;
    const labelStop = decStops[labelIndex];

    return (
        <group ref={rig}>
            {/* Floor slab with glowing edge and a fading grid */}
            <mesh position={[0, -0.04, -0.6]}>
                <boxGeometry args={[9.6, 0.08, 7.6]} />
                <meshStandardMaterial color="#070d1a" metalness={0.5} roughness={0.6} />
                <Edges color="#22d3ee" threshold={15} />
            </mesh>
            <Grid
                position={[0, 0.002, -0.6]}
                args={[9.6, 7.6]}
                cellSize={0.4}
                cellThickness={0.5}
                cellColor="#16384a"
                sectionSize={2}
                sectionThickness={1}
                sectionColor="#0e7490"
                fadeDistance={14}
                fadeStrength={1.6}
            />

            <Wall position={[0, 0.8, -4.4]} size={[9.6, 1.6, 0.04]} />
            <Wall position={[-4.8, 0.8, -0.6]} size={[0.04, 1.6, 7.6]} />
            <Wall position={[4.8, 0.8, -0.6]} size={[0.04, 1.6, 7.6]} />
            <Gate />

            {/* Route the visitor follows */}
            <Line
                ref={routeLine}
                points={routePoints}
                color="#67e8f9"
                lineWidth={1.4}
                dashed
                dashSize={0.14}
                gapSize={0.1}
                transparent
                opacity={0.7}
            />

            {decStops.map((stop, index) => (
                <Pod
                    key={stop.id}
                    stop={stop}
                    index={index}
                    isActive={index === activeIndex}
                    isHovered={index === hoveredIndex}
                    onSelect={onSelect}
                    onHover={setHoveredIndex}
                />
            ))}

            <Visitor curve={curve} activeIndex={activeIndex} />

            {/* Name tag above the booth that is active or under the pointer */}
            <Html
                position={[labelStop.position[0], 1.25, labelStop.position[1]]}
                center
                distanceFactor={9}
                style={{ pointerEvents: "none" }}
                zIndexRange={[20, 0]}
            >
                <div className="whitespace-nowrap rounded-full border border-white/20 bg-slate-950/80 px-3 py-1 text-[13px] font-medium text-white backdrop-blur-md">
                    Station {labelIndex + 1}
                </div>
            </Html>

            <Sparkles count={40} scale={[9, 3, 7]} position={[0, 1.2, -0.6]} size={1.8} speed={0.25} opacity={0.6} color="#bdeeff" />
        </group>
    );
}

interface DecSceneProps {
    activeIndex: number;
    onSelect: (index: number) => void;
    className?: string;
}

export function DecScene({ activeIndex, onSelect, className }: DecSceneProps) {
    // Dragging to orbit would capture touch scrolling on phones, so it is for mouse/pen only.
    const [canOrbit, setCanOrbit] = useState(false);
    useEffect(() => {
        setCanOrbit(window.matchMedia("(pointer: fine)").matches);
    }, []);

    return (
        <SceneCanvas className={className} camera={{ position: [0, 5.6, 8.2], fov: 38 }}>
            <ambientLight intensity={0.55} />
            <directionalLight position={[4, 8, 5]} intensity={1.1} color="#dbeafe" />
            <pointLight position={[0, 2.5, -1]} intensity={14} color="#22d3ee" distance={9} />

            <DecWorld activeIndex={activeIndex} onSelect={onSelect} />

            <OrbitControls
                enabled={canOrbit}
                target={[0, 0, -0.9]}
                enableZoom={false}
                enablePan={false}
                minPolarAngle={0.55}
                maxPolarAngle={1.25}
                minAzimuthAngle={-0.9}
                maxAzimuthAngle={0.9}
                rotateSpeed={0.6}
            />
        </SceneCanvas>
    );
}
