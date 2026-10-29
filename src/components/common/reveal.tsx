"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
    children: ReactNode;
    className?: string;
    /** Seconds to wait before the animation starts; use it to stagger siblings. */
    delay?: number;
    /** Slide direction on entry. */
    from?: "up" | "left" | "right";
}

const OFFSETS = { up: { y: 28 }, left: { x: -32 }, right: { x: 32 } } as const;

/** Fades and slides its children in once, the first time they scroll into view. */
export function Reveal({ children, className, delay = 0, from = "up" }: RevealProps) {
    const reducedMotion = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={reducedMotion ? false : { opacity: 0, ...OFFSETS[from] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    );
}
