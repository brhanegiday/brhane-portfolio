import { featuredTechnologies } from "@/lib/data";

const EXTRA = ["Three.js", "LLMs", "RAG", "PostgreSQL", "Docker", "Kubernetes", "GitHub Actions", "FastAPI"];
const ITEMS = [...featuredTechnologies, ...EXTRA];

/** An endless strip of technology names. The list is doubled so the loop has no seam. */
export function TechMarquee() {
    return (
        <div
            aria-label="Technologies I work with"
            className="relative overflow-hidden border-y bg-background/40 py-4 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
        >
            <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
                {[...ITEMS, ...ITEMS].map((name, i) => (
                    <span
                        key={i}
                        className="flex items-center gap-10 font-mono text-sm text-muted-foreground"
                        aria-hidden={i >= ITEMS.length}
                    >
                        {name}
                        <span className="h-1 w-1 rotate-45 bg-primary" />
                    </span>
                ))}
            </div>
        </div>
    );
}
