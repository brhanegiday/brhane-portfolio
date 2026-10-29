"use client";

import { Canvas, type CanvasProps } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface SceneCanvasProps {
    children: ReactNode;
    className?: string;
    camera?: CanvasProps["camera"];
}

/**
 * Shared WebGL canvas for every 3D scene on the page.
 *
 * Responsibilities: only render frames while the canvas is on screen (a
 * portfolio has several scenes and a laptop GPU should not draw the ones
 * nobody can see), and fall back to a single still frame when the visitor
 * asked their OS for reduced motion. It does not know what is in the scene.
 */
export function SceneCanvas({ children, className, camera }: SceneCanvasProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        const element = wrapperRef.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
            rootMargin: "120px",
        });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={wrapperRef} className={className}>
            <Canvas
                // "demand" draws once (and on pointer/resize events); "never" stops drawing while off screen.
                frameloop={!isVisible ? "never" : reducedMotion ? "demand" : "always"}
                dpr={[1, 1.75]}
                camera={camera}
                gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            >
                {children}
            </Canvas>
        </div>
    );
}
