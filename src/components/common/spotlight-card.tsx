"use client";

import { cn } from "@/lib/utils";
import { useRef, type HTMLAttributes } from "react";

/**
 * A surface whose border and fill light up around the pointer.
 * The position is written to CSS variables (no React state), so moving the mouse never re-renders.
 * The look lives in the `.spotlight` utility in globals.css.
 */
export function SpotlightCard({ className, children, onPointerMove, ...props }: HTMLAttributes<HTMLDivElement>) {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={ref}
            onPointerMove={(event) => {
                const element = ref.current;
                if (element) {
                    const rect = element.getBoundingClientRect();
                    element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
                    element.style.setProperty("--my", `${event.clientY - rect.top}px`);
                }
                onPointerMove?.(event);
            }}
            className={cn("spotlight", className)}
            {...props}
        >
            {children}
        </div>
    );
}
