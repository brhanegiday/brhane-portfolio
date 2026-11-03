"use client";

import { Reveal } from "@/components/common/reveal";
import { ProjectArt } from "@/components/common/project-art";
import { TiltCard } from "@/components/common/tilt-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { contactInfo, projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/types";
import {
    motion,
    useMotionValue,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

/** Each kind of project gets its own colour; the artwork is drawn in it. */
const CATEGORY_STYLE: Record<ProjectCategory, { tone: string; dot: string }> = {
    "AI/ML Application": { tone: "text-cyan-600 dark:text-cyan-400", dot: "bg-cyan-500" },
    "Immersive 3D Web": { tone: "text-violet-600 dark:text-violet-400", dot: "bg-violet-500" },
    "Data Engineering": { tone: "text-amber-600 dark:text-amber-400", dot: "bg-amber-500" },
    "Full-Stack Development": { tone: "text-emerald-600 dark:text-emerald-400", dot: "bg-emerald-500" },
    "Frontend Engineering": { tone: "text-pink-600 dark:text-pink-400", dot: "bg-pink-500" },
    "Team Leadership": { tone: "text-sky-600 dark:text-sky-400", dot: "bg-sky-500" },
};

const statusLabels: Record<Project["status"], string> = {
    completed: "Completed",
    "in-progress": "In progress",
    planned: "Planned",
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Long descriptions are written as "**Heading:** text" paragraphs; split them for display. */
function parseSections(longDescription: string): { heading?: string; body: string }[] {
    return longDescription.split("\n\n").map((paragraph) => {
        const match = paragraph.match(/^\*\*(.+?):\*\*\s*([\s\S]*)$/);
        return match ? { heading: match[1], body: match[2] } : { body: paragraph };
    });
}

function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const media = window.matchMedia(query);
        const update = () => setMatches(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, [query]);
    return matches;
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
    const style = CATEGORY_STYLE[project.category];

    return (
        <TiltCard maxTilt={4} className="h-full rounded-[1.75rem]">
            {/* The frosted background is its own layer: backdrop-filter would flatten the 3D depth of the content */}
            <div className="glass absolute inset-0 rounded-[inherit] transition-colors duration-300 group-hover:border-primary/40" />

            <div className="preserve-3d relative flex h-full flex-col p-5">
                {/* Artwork floats above the card */}
                <div
                    className={cn("relative min-h-44 flex-1 overflow-hidden rounded-2xl border", style.tone)}
                    style={{
                        transform: "translateZ(40px)",
                        background:
                            "radial-gradient(circle at 25% 15%, color-mix(in oklab, currentColor 16%, transparent), transparent 65%)",
                    }}
                >
                    <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
                    <ProjectArt project={project} className="absolute inset-0 h-full w-full p-6 pb-8" />
                    <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-current/20 bg-background/70 px-2.5 py-1 text-[11px] font-medium backdrop-blur">
                        {project.category}
                    </span>
                    {project.status === "in-progress" && (
                        <Badge className="absolute right-3 top-3 border-emerald-500/30 bg-emerald-500/15 text-[11px] text-emerald-600 dark:text-emerald-400">
                            {statusLabels[project.status]}
                        </Badge>
                    )}
                    <span aria-hidden className="text-outline absolute -bottom-4 right-3 text-7xl font-semibold leading-none tracking-tighter opacity-50">
                        {pad(index + 1)}
                    </span>
                </div>

                <div className="mt-5" style={{ transform: "translateZ(22px)" }}>
                    <h3 className="line-clamp-2 text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-primary">
                        {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5" style={{ transform: "translateZ(12px)" }}>
                    {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="rounded-lg bg-muted/60 px-2.5 py-1 font-mono text-[11px]">
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 3 && (
                        <span className="rounded-lg bg-muted/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                            +{project.technologies.length - 3}
                        </span>
                    )}
                </div>

                <div className="mt-4 flex items-center justify-between border-t pt-3" style={{ transform: "translateZ(8px)" }}>
                    <span className="text-xs text-muted-foreground">
                        {project.startDate}
                        {project.endDate ? ` – ${project.endDate}` : ""}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-primary">
                        Details
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                </div>
            </div>

            {/* The whole card is one button, for keyboards and screen readers */}
            <button onClick={onOpen} aria-label={`${project.title}: details`} className="absolute inset-0 z-20 cursor-pointer rounded-[inherit]" />
        </TiltCard>
    );
}

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
    const [active, setActive] = useState(0);
    const [distance, setDistance] = useState(0);

    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    // On large screens the gallery pins and vertical scrolling slides it sideways; elsewhere it is a swipeable row.
    const pinned = isDesktop && !reducedMotion;

    const filteredProjects = useMemo(
        () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
        [filter],
    );
    const categories = useMemo(() => {
        const counts = new Map<ProjectCategory, number>();
        projects.forEach((p) => counts.set(p.category, (counts.get(p.category) ?? 0) + 1));
        return Array.from(counts, ([category, count]) => ({ category, count }));
    }, []);
    const total = filteredProjects.length;

    // How far the track has to travel so its last card ends at the right edge.
    const distanceValue = useMotionValue(0);
    useEffect(() => {
        const track = trackRef.current;
        if (!track || !pinned) {
            setDistance(0);
            distanceValue.set(0);
            return;
        }
        const measure = () => {
            const next = Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
            setDistance(next);
            distanceValue.set(next);
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(track);
        window.addEventListener("resize", measure);
        return () => {
            observer.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [pinned, total, distanceValue]);

    // One progress value (0 to 1) whichever way the gallery is moving.
    const progress = useMotionValue(0);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
    const { scrollXProgress } = useScroll({ container: trackRef });
    useMotionValueEvent(scrollYProgress, "change", (v) => pinned && progress.set(v));
    useMotionValueEvent(scrollXProgress, "change", (v) => !pinned && progress.set(v));
    useMotionValueEvent(progress, "change", (v) => setActive(Math.min(total - 1, Math.round(v * (total - 1)))));

    const x = useSpring(
        useTransform(() => -scrollYProgress.get() * distanceValue.get()),
        { stiffness: 260, damping: 40, mass: 0.35 },
    );
    const backdropX = useTransform(progress, [0, 1], ["0%", "-28%"]);

    const chooseFilter = (next: "all" | ProjectCategory) => {
        setFilter(next);
        setActive(0);
        const section = sectionRef.current;
        if (pinned && section && window.scrollY > section.offsetTop) {
            window.scrollTo({ top: section.offsetTop, behavior: "smooth" });
        }
        trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
    };

    const githubUrl = contactInfo.socialLinks.find((s) => s.platform === "GitHub")?.url ?? "https://github.com";

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative"
            style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
        >
            <div className={cn("relative overflow-hidden", pinned ? "sticky top-0 flex h-screen flex-col justify-center pt-20" : "py-24")}>
                <div aria-hidden className="bg-grid absolute inset-0" />
                <div aria-hidden className="bg-noise absolute inset-0" />
                <div aria-hidden className="absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-[120px]" />

                {/* A giant word drifting behind the cards */}
                <motion.p
                    aria-hidden
                    style={{ x: backdropX }}
                    className="pointer-events-none absolute -bottom-[0.12em] left-0 select-none whitespace-nowrap text-[20vw] font-bold leading-none tracking-[-0.05em] text-foreground/[0.035]"
                >
                    Selected work · Selected work
                </motion.p>

                <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
                        <Reveal>
                            <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-[3.4rem]">
                                Things I&apos;ve <span className="text-gradient">built</span>
                            </h2>
                            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                                Products, research tools and experiments, from AI platforms to immersive 3D.
                            </p>
                        </Reveal>

                        <div className="flex shrink-0 items-center gap-4 lg:mb-2" aria-live="polite">
                            <p className="font-mono text-sm text-muted-foreground">
                                <span className="text-4xl font-semibold tracking-tight text-foreground tabular-nums">{pad(active + 1)}</span>
                                <span className="ml-1">/ {pad(total)}</span>
                            </p>
                            <div className="h-px w-28 overflow-hidden bg-foreground/15 sm:w-40">
                                <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-primary" />
                            </div>
                        </div>
                    </div>

                    {/* Filter */}
                    <div className="scrollbar-none -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
                        {[{ category: "all" as const, count: projects.length }, ...categories].map(({ category, count }) => {
                            const isActive = filter === category;
                            return (
                                <button
                                    key={category}
                                    onClick={() => chooseFilter(category)}
                                    aria-pressed={isActive}
                                    className={cn(
                                        "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                                        isActive
                                            ? "border-foreground bg-foreground text-background"
                                            : "border-foreground/15 text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                                    )}
                                >
                                    {category !== "all" && <span className={cn("h-1.5 w-1.5 rounded-full", CATEGORY_STYLE[category].dot)} />}
                                    {category === "all" ? "All" : category}
                                    <span className={cn("font-mono text-[11px]", isActive ? "opacity-60" : "opacity-50")}>{count}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* The film strip */}
                <motion.div
                    ref={trackRef}
                    style={pinned ? { x } : undefined}
                    className={cn(
                        "gallery-gutter relative z-10 flex gap-5 px-[var(--gutter)] pb-6 lg:gap-6",
                        pinned ? "w-max" : "scrollbar-none snap-x snap-mandatory overflow-x-auto scroll-px-[var(--gutter)]",
                    )}
                >
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="h-[34rem] w-[84vw] shrink-0 snap-start sm:w-[25rem] lg:h-[min(36rem,calc(100vh-16.5rem))] lg:w-[clamp(22rem,29vw,27rem)]"
                        >
                            <ProjectCard project={project} index={index} onOpen={() => setSelectedProject(project)} />
                        </div>
                    ))}

                    {/* The end of the strip */}
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-[34rem] w-[70vw] shrink-0 snap-start flex-col justify-between rounded-[1.75rem] border border-dashed border-foreground/20 p-8 transition-colors hover:border-primary/60 sm:w-[20rem] lg:h-[min(36rem,calc(100vh-16.5rem))]"
                    >
                        <Github className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
                        <div>
                            <p className="text-3xl font-semibold leading-tight tracking-tight">
                                More experiments on GitHub
                            </p>
                            <p className="mt-3 text-sm text-muted-foreground">Open-source work, prototypes and notes.</p>
                            <span className="mt-8 flex h-14 w-14 items-center justify-center rounded-full border border-foreground/20 transition-all duration-300 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                                <ArrowUpRight className="h-5 w-5" />
                            </span>
                        </div>
                    </a>
                </motion.div>
            </div>

            {/* Details */}
            <Dialog open={selectedProject !== null} onOpenChange={(open) => !open && setSelectedProject(null)}>
                <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto sm:max-w-3xl">
                    {selectedProject && (
                        <>
                            <div className="pr-6">
                                <DialogTitle className="mb-1 text-xl font-bold leading-snug">
                                    {selectedProject.title}
                                </DialogTitle>
                                <DialogDescription>
                                    {selectedProject.category} · {selectedProject.startDate}
                                    {selectedProject.endDate ? ` – ${selectedProject.endDate}` : ""}
                                </DialogDescription>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-4">
                                    {(selectedProject.longDescription
                                        ? parseSections(selectedProject.longDescription)
                                        : [{ body: selectedProject.description }]
                                    ).map((section, i) => (
                                        <div key={i}>
                                            {section.heading && (
                                                <h4 className="mb-1 text-sm font-semibold">{section.heading}</h4>
                                            )}
                                            <p className="text-sm leading-relaxed text-muted-foreground">
                                                {section.body}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <h4 className="mb-2 text-sm font-semibold">Technologies</h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {selectedProject.technologies.map((tech) => (
                                            <Badge key={tech} variant="secondary" className="text-xs">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                {selectedProject.features.length > 0 && (
                                    <div>
                                        <h4 className="mb-2 text-sm font-semibold">Key features</h4>
                                        <div className="grid gap-2 sm:grid-cols-2">
                                            {selectedProject.features.map((feature) => (
                                                <div
                                                    key={feature}
                                                    className="rounded-lg bg-muted/50 p-3 text-sm"
                                                >
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-3 pt-2">
                                    {selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
                                        <Button className="gap-2" size="sm" asChild>
                                            <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="h-4 w-4" />
                                                Live demo
                                            </a>
                                        </Button>
                                    )}
                                    {selectedProject.githubUrl && selectedProject.githubUrl !== "#" && (
                                        <Button variant="outline" className="gap-2" size="sm" asChild>
                                            <a
                                                href={selectedProject.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Github className="h-4 w-4" />
                                                Source code
                                            </a>
                                        </Button>
                                    )}
                                    {(!selectedProject.liveUrl || selectedProject.liveUrl === "#") &&
                                        (!selectedProject.githubUrl || selectedProject.githubUrl === "#") && (
                                            <Button variant="outline" size="sm" disabled>
                                                Private project
                                            </Button>
                                        )}
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}
