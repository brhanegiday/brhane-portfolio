"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

/** Pulls its child a little toward the pointer while hovered, and springs back on leave. */
export function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();
    const spring = { stiffness: 220, damping: 16, mass: 0.4 };
    const x = useSpring(0, spring);
    const y = useSpring(0, spring);

    return (
        <motion.div
            ref={ref}
            style={{ x, y }}
            className={cn("inline-block", className)}
            onPointerMove={(event) => {
                const element = ref.current;
                if (!element || reducedMotion || event.pointerType === "touch") return;
                const rect = element.getBoundingClientRect();
                x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
                y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
            }}
            onPointerLeave={() => {
                x.set(0);
                y.set(0);
            }}
        >
            {children}
        </motion.div>
    );
}
