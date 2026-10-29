"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    /** Maximum tilt in degrees. */
    maxTilt?: number;
    onClick?: () => void;
}

/**
 * A card that leans toward the pointer in 3D and carries a moving highlight.
 * The transform is written straight to the element (no React state) so
 * moving the mouse never re-renders the page.
 */
export function TiltCard({ children, className, maxTilt = 7, onClick }: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();

    const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card || reducedMotion || event.pointerType === "touch") return;
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        card.style.transform = `perspective(900px) rotateX(${(0.5 - py) * maxTilt * 2}deg) rotateY(${(px - 0.5) * maxTilt * 2}deg) translateZ(0)`;
        card.style.setProperty("--mx", `${px * 100}%`);
        card.style.setProperty("--my", `${py * 100}%`);
    };

    const handleLeave = () => {
        if (cardRef.current) cardRef.current.style.transform = "";
    };

    return (
        <div
            ref={cardRef}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
            onClick={onClick}
            className={cn("group preserve-3d relative transition-transform duration-200 ease-out will-change-transform", className)}
        >
            {/* Highlight that follows the pointer */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background:
                        "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), color-mix(in oklab, var(--primary) 18%, transparent), transparent 45%)",
                }}
            />
            {children}
        </div>
    );
}
