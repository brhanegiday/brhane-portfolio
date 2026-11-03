"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SceneCanvas } from "./scene-canvas";

/**
 * One cloud of particles that keeps rebuilding itself into the three things I work on:
 * a fingerprint (identity systems), a chat bubble (public-service automation) and a
 * stack of database discs (data platforms). Between shapes the particles burst out and
 * regroup. The morph runs on the GPU; the CPU only swaps the start and end positions.
 */

const COUNT = 7000;
const MORPH_SECONDS = 1.8;

/** Small deterministic random number generator, so every load draws the same shapes. */
function random(seed: number) {
    let state = seed;
    return () => {
        state = (state + 0x6d2b79f5) | 0;
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/** Ridges of a fingerprint: closed loops in the core, arches opening downward further out, with breaks. */
function fingerprint(rand: () => number): Float32Array {
    const out = new Float32Array(COUNT * 3);
    const rings = 17;
    const gaps = Array.from({ length: rings }, () => ({ at: rand() * Math.PI * 2, size: 0.25 + rand() * 0.45 }));
    for (let i = 0; i < COUNT; i++) {
        // Outer ridges are longer, so they get somewhat more particles.
        const k = Math.floor(Math.pow(rand(), 0.75) * rings);
        const radius = 0.16 + k * 0.088;
        // The core is closed loops; further out the ridges open at the bottom, as on a real fingertip.
        const open = k > 5;
        const opening = open ? 0.12 + ((k - 5) / rings) * 0.35 : 0;
        let angle = 0;
        for (let tries = 0; tries < 8; tries++) {
            angle = open
                ? -Math.PI / 2 + opening * Math.PI + rand() * (2 - 2 * opening) * Math.PI
                : rand() * Math.PI * 2;
            const gap = gaps[k];
            const distance = Math.abs(((angle - gap.at + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
            if (distance > gap.size / 2) break;
        }
        const wobble = 0.035 * Math.sin(angle * 5 + k * 1.7);
        const r = radius + wobble + (rand() - 0.5) * 0.02;
        const x = r * 0.8 * Math.cos(angle);
        const y = r * 1.12 * Math.sin(angle) + 0.08;
        out.set([x, y, -0.18 * (x * x + y * y) + (rand() - 0.5) * 0.03], i * 3);
    }
    return out;
}

/** Point on a rounded rectangle's outline, t in [0, 1). */
function roundedRect(t: number, width: number, height: number, corner: number): [number, number] {
    const straightW = width - 2 * corner;
    const straightH = height - 2 * corner;
    const arc = (Math.PI / 2) * corner;
    const perimeter = 2 * straightW + 2 * straightH + 4 * arc;
    let d = t * perimeter;
    const segments: [number, (s: number) => [number, number]][] = [
        [straightW, (s) => [-straightW / 2 + s, height / 2]],
        [arc, (s) => { const a = Math.PI / 2 - s / corner; return [straightW / 2 + corner * Math.cos(a), straightH / 2 + corner * Math.sin(a)]; }],
        [straightH, (s) => [width / 2, straightH / 2 - s]],
        [arc, (s) => { const a = -s / corner; return [straightW / 2 + corner * Math.cos(a), -straightH / 2 + corner * Math.sin(a)]; }],
        [straightW, (s) => [straightW / 2 - s, -height / 2]],
        [arc, (s) => { const a = -Math.PI / 2 - s / corner; return [-straightW / 2 + corner * Math.cos(a), -straightH / 2 + corner * Math.sin(a)]; }],
        [straightH, (s) => [-width / 2, -straightH / 2 + s]],
        [arc, (s) => { const a = Math.PI - s / corner; return [-straightW / 2 + corner * Math.cos(a), straightH / 2 + corner * Math.sin(a)]; }],
    ];
    for (const [length, point] of segments) {
        if (d <= length) return point(d);
        d -= length;
    }
    return [-straightW / 2, height / 2];
}

/** A message bubble with a tail and a typing indicator, and a smaller reply behind it. */
function chatBubble(rand: () => number): Float32Array {
    const out = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
        const pick = rand();
        const jitter = () => (rand() - 0.5) * 0.045;
        let p: [number, number, number];
        if (pick < 0.46) {
            const [x, y] = roundedRect(rand(), 2.9, 1.9, 0.5);
            p = [x - 0.15 + jitter(), y - 0.15 + jitter(), 0.25 + jitter()];
        } else if (pick < 0.54) {
            // Tail: two short edges meeting at a point below the bubble's lower-left corner.
            const s = rand();
            const side = rand() < 0.5;
            const x = side ? -1.05 + s * -0.25 : -0.55 + s * -0.75;
            const y = -1.1 - s * 0.45;
            p = [x + jitter(), y + jitter(), 0.25 + jitter()];
        } else if (pick < 0.8) {
            // Three dots, filled.
            const dot = Math.floor(rand() * 3);
            const a = rand() * Math.PI * 2;
            const r = Math.sqrt(rand()) * 0.17;
            p = [-0.75 + dot * 0.6 + r * Math.cos(a), -0.15 + r * Math.sin(a), 0.25 + jitter()];
        } else {
            const [x, y] = roundedRect(rand(), 1.9, 1.25, 0.38);
            p = [x + 0.75 + jitter(), y + 0.95 + jitter(), -0.55 + jitter()];
        }
        out.set(p, i * 3);
    }
    return out;
}

/** Three stacked discs, the usual picture of a database, tilted so the tops show. */
function database(rand: () => number): Float32Array {
    const out = new Float32Array(COUNT * 3);
    const radius = 1.15;
    const height = 0.62;
    const gap = 0.16;
    const tilt = new THREE.Matrix4().makeRotationX(0.42);
    const v = new THREE.Vector3();
    for (let i = 0; i < COUNT; i++) {
        const level = Math.floor(rand() * 3);
        const base = -1.2 + level * (height + gap);
        const a = rand() * Math.PI * 2;
        const pick = rand();
        let y: number;
        let r = radius;
        if (pick < 0.64) {
            // Rims: the top and bottom circle of each disc.
            y = base + (rand() < 0.5 ? 0 : height);
            r += (rand() - 0.5) * 0.03;
        } else if (pick < 0.86) {
            // Sides, thinning out toward the middle.
            y = base + rand() * height;
        } else {
            // A few on the top face of the top disc.
            y = -1.2 + 2 * (height + gap) + height;
            r = Math.sqrt(rand()) * radius;
        }
        v.set(r * Math.cos(a), y + 0.15, r * Math.sin(a)).applyMatrix4(tilt);
        out.set([v.x, v.y, v.z], i * 3);
    }
    return out;
}

/** A loose cloud the particles start from on first load. */
function cloud(rand: () => number): Float32Array {
    const out = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
        const v = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize().multiplyScalar(2.5 + rand() * 2.5);
        out.set([v.x, v.y, v.z], i * 3);
    }
    return out;
}

const vertexShader = /* glsl */ `
    attribute vec3 aFrom;
    attribute vec3 aTo;
    attribute vec3 aScatter;
    attribute float aSeed;
    uniform float uProgress;
    uniform float uTime;
    uniform float uSize;
    varying float vMix;
    varying float vSeed;

    void main() {
        // Each particle leaves at a slightly different moment, so the shape dissolves rather than jumps.
        float t = clamp(uProgress * 1.4 - aSeed * 0.4, 0.0, 1.0);
        t = t * t * (3.0 - 2.0 * t);
        vec3 p = mix(aFrom, aTo, t);
        p += aScatter * sin(3.14159 * t) * 0.85;
        p += 0.018 * vec3(sin(uTime * 1.3 + aSeed * 40.0), cos(uTime * 1.1 + aSeed * 30.0), sin(uTime * 0.9 + aSeed * 20.0));

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uSize * (0.55 + aSeed * 0.9) / -mv.z;
        vMix = clamp((p.x + p.y) * 0.25 + 0.5, 0.0, 1.0);
        vSeed = aSeed;
    }
`;

const fragmentShader = /* glsl */ `
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform float uOpacity;
    varying float vMix;
    varying float vSeed;

    void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.05, d) * uOpacity * (0.55 + vSeed * 0.45);
        gl_FragColor = vec4(mix(uColorA, uColorB, vMix), alpha);
    }
`;

interface MorphProps {
    index: number;
    light: boolean;
}

function Morph({ index, light }: MorphProps) {
    const groupRef = useRef<THREE.Group>(null);
    const reducedMotion = useReducedMotion();
    const invalidate = useThree((state) => state.invalidate);
    const pixelRatio = useThree((state) => state.viewport.dpr);

    const { shapes, geometry, material } = useMemo(() => {
        const rand = random(7);
        const shapes = [fingerprint(rand), chatBubble(rand), database(rand)];
        const start = cloud(rand);
        const scatter = new Float32Array(COUNT * 3);
        const seeds = new Float32Array(COUNT);
        for (let i = 0; i < COUNT; i++) {
            const v = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize().multiplyScalar(0.4 + rand() * 1.1);
            scatter.set([v.x, v.y, v.z], i * 3);
            seeds[i] = rand();
        }
        const geometry = new THREE.BufferGeometry();
        // three.js needs a position attribute to size the draw call; the shader ignores it.
        geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
        geometry.setAttribute("aFrom", new THREE.BufferAttribute(start, 3));
        geometry.setAttribute("aTo", new THREE.BufferAttribute(shapes[0].slice(), 3));
        geometry.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));
        geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
        geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 6);

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            uniforms: {
                uProgress: { value: 0 },
                uTime: { value: 0 },
                uSize: { value: 26 },
                uOpacity: { value: 1 },
                uColorA: { value: new THREE.Color() },
                uColorB: { value: new THREE.Color() },
            },
        });
        return { shapes, geometry, material };
    }, []);

    // Theme: glowing light on dark, solid ink on light.
    useEffect(() => {
        material.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
        material.uniforms.uColorA.value.set(light ? "#0e7490" : "#22d3ee");
        material.uniforms.uColorB.value.set(light ? "#ea580c" : "#fb923c");
        material.uniforms.uOpacity.value = light ? 0.85 : 0.9;
        material.uniforms.uSize.value = 26 * pixelRatio;
        material.needsUpdate = true;
        invalidate();
    }, [light, material, pixelRatio, invalidate]);

    // A new shape: start from where the last one was heading, and morph to the next.
    const shown = useRef(0);
    useEffect(() => {
        if (index === shown.current) return;
        const from = geometry.getAttribute("aFrom") as THREE.BufferAttribute;
        const to = geometry.getAttribute("aTo") as THREE.BufferAttribute;
        from.array.set(shapes[shown.current]);
        to.array.set(shapes[index]);
        from.needsUpdate = true;
        to.needsUpdate = true;
        material.uniforms.uProgress.value = reducedMotion ? 1 : 0;
        shown.current = index;
        invalidate();
    }, [index, geometry, material, shapes, reducedMotion, invalidate]);

    useFrame((state, delta) => {
        const uniforms = material.uniforms;
        uniforms.uTime.value = state.clock.elapsedTime;
        uniforms.uProgress.value = reducedMotion ? 1 : Math.min(1, uniforms.uProgress.value + delta / MORPH_SECONDS);

        const group = groupRef.current;
        if (!group) return;
        // Sway slowly so the depth shows, and lean toward the pointer.
        const t = state.clock.elapsedTime;
        const targetY = Math.sin(t * 0.35) * 0.45 + state.pointer.x * 0.35;
        const targetX = Math.sin(t * 0.27) * 0.12 - state.pointer.y * 0.2;
        group.rotation.y = THREE.MathUtils.damp(group.rotation.y, targetY, 2.5, delta);
        group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 2.5, delta);
    });

    return (
        <group ref={groupRef}>
            <points geometry={geometry} material={material} />
        </group>
    );
}

export function PillarMorph({ index, light = false, className }: { index: number; light?: boolean; className?: string }) {
    return (
        <SceneCanvas className={className} camera={{ position: [0, 0, 6.2], fov: 40 }}>
            <Morph index={index} light={light} />
        </SceneCanvas>
    );
}
