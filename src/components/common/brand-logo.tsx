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
            role="img"
            aria-label="Brhane Giday"
            className={cn("inline-flex select-none items-center gap-2.5 leading-none", className)}
        >
            <svg
                aria-hidden="true"
                viewBox="0 0 40 40"
                fill="none"
                className="h-9 w-9 shrink-0"
            >
                <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="11" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
                <path
                    d="M10 12h5a4 4 0 0 1 0 8h-5m0-8v16h5a4 4 0 0 0 0-8"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M30 14a7.5 7.5 0 1 0 0 12v-6h-5"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <span aria-hidden="true" className="text-[17px] font-semibold tracking-[-0.045em] text-foreground">
                Brhane<span className="ml-1 font-normal text-muted-foreground">Giday</span>
            </span>
        </span>
    );
}
