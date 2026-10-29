"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A thin bar across the top of the page showing how far down the visitor has read. */
export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

    return (
        <motion.div
            aria-hidden
            style={{ scaleX }}
            className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary via-violet-400 to-orange-400"
        />
    );
}
