"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

interface CountUpProps {
    /** Display text such as "5+" or "15+"; the leading number is animated, the rest is kept. */
    value: string;
    className?: string;
}

/** Counts from 0 to the number in `value` the first time it is on screen. */
export function CountUp({ value, className }: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        const element = ref.current;
        const match = value.match(/^(\d+)(.*)$/);
        if (!element || !match || !inView || reducedMotion) return;
        const suffix = match[2];
        const controls = animate(0, Number(match[1]), {
            duration: 1.6,
            ease: "easeOut",
            onUpdate: (latest) => {
                element.textContent = `${Math.round(latest)}${suffix}`;
            },
        });
        return () => controls.stop();
    }, [inView, reducedMotion, value]);

    return (
        <span ref={ref} className={className}>
            {value}
        </span>
    );
}
