"use client";

import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { cn } from "@/lib/utils";
import { decStops, WALL_COLORS, WALL_NAMES } from "@/lib/virtual-dec";
import { useInView, useReducedMotion } from "framer-motion";
import { Lock, MousePointerClick } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const DecScene = dynamic(() => import("@/components/three/dec-scene").then((m) => m.DecScene), {
    ssr: false,
    loading: () => <div className="h-full w-full animate-pulse bg-muted/20" />,
});

const TECH = [
    "Next.js",
    "React Three Fiber",
    "Three.js",
    "TypeScript",
    "GSAP",
    "Zustand",
    "next-intl",
    "Tailwind CSS",
    "Docker",
    "GitHub Actions",
];

// What the application is for, kept at a high level on purpose.
const PURPOSE_POINTS = [
    {
        title: "Reach",
        text: "Partners, funders and students who cannot visit in person still get the full walk-through.",
    },
    {
        title: "Consistency",
        text: "Every visitor gets the same clear, guided story, with captions and narration, whoever is free to host.",
    },
    {
        title: "Scale",
        text: "It is open any time and for many visitors at once, so the team can focus on the work rather than the tours.",
    },
];

// Corner brackets that frame the 3D view like a viewfinder.
const CORNERS = [
    "left-3 top-3 border-l-2 border-t-2",
    "right-3 top-3 border-r-2 border-t-2",
    "bottom-3 left-3 border-b-2 border-l-2",
    "bottom-3 right-3 border-b-2 border-r-2",
];

const AUTOPLAY_MS = 3600;
const PAUSE_AFTER_CLICK_MS = 9000;

export function ShowcaseSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const inView = useInView(sectionRef, { amount: 0.3 });
    const reducedMotion = useReducedMotion();
    const resumeAt = useRef(0);

    // The visitor walks the route by itself until the user takes over.
    useEffect(() => {
        if (!inView || reducedMotion) return;
        const timer = setInterval(() => {
            if (Date.now() < resumeAt.current) return;
            setActiveIndex((current) => (current + 1) % decStops.length);
        }, AUTOPLAY_MS);
        return () => clearInterval(timer);
    }, [inView, reducedMotion]);

    const select = (index: number) => {
        resumeAt.current = Date.now() + PAUSE_AFTER_CLICK_MS;
        setActiveIndex(index);
    };

    const active = decStops[activeIndex];

    return (
        <section id="showcase" className="aurora relative overflow-hidden py-24 lg:py-32">
            <div aria-hidden className="bg-dots absolute inset-0" />
            <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    title="Virtual DEC"
                    description="A self-guided 3D tour of a physical lab, playable in any browser."
                />

                {/* 3D room, full width, with a slim station picker down its right edge */}
                <Reveal>
                    <div
                        ref={sectionRef}
                        className="glass glow-primary relative h-[460px] overflow-hidden rounded-2xl sm:h-[560px] lg:h-[660px]"
                    >
                        <DecScene activeIndex={activeIndex} onSelect={select} className="absolute inset-0" />

                        <ol
                            aria-label="Stations"
                            className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-1.5 sm:right-4"
                        >
                            {decStops.map((stop, index) => {
                                const color = WALL_COLORS[stop.wall];
                                const isActive = index === activeIndex;
                                return (
                                    <li key={stop.id}>
                                        <button
                                            onClick={() => select(index)}
                                            aria-label={`Station ${index + 1}`}
                                            aria-current={isActive}
                                            className={cn(
                                                "flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[11px] backdrop-blur transition-all",
                                                isActive
                                                    ? "scale-110 text-white"
                                                    : "bg-background/50 text-muted-foreground hover:text-foreground",
                                            )}
                                            style={{ borderColor: color, background: isActive ? color : undefined }}
                                        >
                                            {index + 1}
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>

                        <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-background/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
                            <MousePointerClick className="h-3.5 w-3.5" />
                            Station {activeIndex + 1} · {WALL_NAMES[active.wall]}
                            <span className="hidden sm:inline">· Drag to rotate</span>
                        </div>
                        {CORNERS.map((corner) => (
                            <span
                                key={corner}
                                aria-hidden
                                className={cn("pointer-events-none absolute h-4 w-4 border-primary/60", corner)}
                            />
                        ))}
                    </div>
                </Reveal>

                {/* Purpose */}
                <Reveal className="mx-auto mt-16 max-w-3xl text-center">
                    <h3 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">Why it exists</h3>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        Virtual DEC puts a physical innovation lab in the browser. Anyone can take a guided walk-through
                        of the space and its work at their own pace, in English or French, with no travel and no
                        scheduling.
                    </p>
                </Reveal>

                <div className="mt-12 grid gap-10 border-t pt-10 md:grid-cols-3">
                    {PURPOSE_POINTS.map((point, i) => (
                        <Reveal key={point.title} delay={i * 0.1}>
                            <p className="mb-2 font-mono text-sm text-primary">{String(i + 1).padStart(2, "0")}</p>
                            <h4 className="mb-2 text-lg font-semibold">{point.title}</h4>
                            <p className="leading-relaxed text-muted-foreground">{point.text}</p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
