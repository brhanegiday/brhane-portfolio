import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Reveal } from "./reveal";

interface EditorialHeadingProps {
    title: ReactNode;
    description?: string;
    className?: string;
}

/** A left-aligned section opener: a large title and an optional line of context. */
export function EditorialHeading({ title, description, className }: EditorialHeadingProps) {
    return (
        <Reveal className={cn("mb-12 lg:mb-16", className)}>
            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                {title}
            </h2>
            {description && <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{description}</p>}
        </Reveal>
    );
}
