"use client";

import { cn } from "@/lib/utils";

interface BrandLogoProps {
    className?: string;
    /** @deprecated size is controlled by className / parent font-size */
    width?: number;
    /** @deprecated size is controlled by className / parent font-size */
    height?: number;
}

export function BrandLogo({ className }: BrandLogoProps) {
    return (
        <span
            aria-label="brhane.giday"
            className={cn(
                "inline-flex items-center gap-2 select-none leading-none",
                className
            )}
        >
            {/* Terminal cursor — blinks continuously */}
            <span className="w-[2px] h-[1em] bg-current rounded-sm animate-cursor-blink opacity-80" />

            {/* First name — light weight, wide tracking */}
            <span className="text-[15px] font-light tracking-[0.07em]">
                brhane
            </span>

            {/* Accent diamond — subtle pulse */}
            <span className="inline-flex items-center justify-center shrink-0">
                <span className="block w-[5px] h-[5px] rotate-45 bg-current rounded-[1px] animate-diamond-pulse opacity-75" />
            </span>

            {/* Last name — semibold, tighter tracking */}
            <span className="text-[15px] font-semibold tracking-[0.03em]">
                giday
            </span>
        </span>
    );
}
