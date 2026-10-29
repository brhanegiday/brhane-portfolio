"use client";

import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { ProjectArt } from "@/components/common/project-art";
import { TiltCard } from "@/components/common/tilt-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Project, ProjectCategory } from "@/types";
import {
    ArrowUpRight,
    Box,
    Brain,
    Calendar,
    Code2,
    Database,
    ExternalLink,
    Github,
    Layers,
    Lock,
    Zap,
    type LucideIcon,
} from "lucide-react";
import { useState } from "react";

const categoryIcons: Record<ProjectCategory, LucideIcon> = {
    "Immersive 3D Web": Box,
    "Data Engineering": Database,
    "AI/ML Application": Brain,
    "Full-Stack Development": Layers,
    "Frontend Engineering": Code2,
    "Team Leadership": Layers,
};

const statusLabels: Record<Project["status"], string> = {
    completed: "Completed",
    "in-progress": "In progress",
    planned: "Planned",
};

/** Long descriptions are written as "**Heading:** text" paragraphs; split them for display. */
function parseSections(longDescription: string): { heading?: string; body: string }[] {
    return longDescription.split("\n\n").map((paragraph) => {
        const match = paragraph.match(/^\*\*(.+?):\*\*\s*([\s\S]*)$/);
        return match ? { heading: match[1], body: match[2] } : { body: paragraph };
    });
}

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [filter, setFilter] = useState("all");

    const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter);
    const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];

    return (
        <section id="projects" className="relative py-24 lg:py-32">
            <div aria-hidden className="bg-grid absolute inset-0" />
            <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    title="Projects"
                    description="Products, research tools and experiments, from AI platforms to immersive 3D."
                />

                {/* Filter */}
                <Reveal className="mb-12 flex justify-center">
                    <div className="glass flex max-w-full flex-wrap justify-center gap-1 rounded-xl p-1">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={cn(
                                    "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                                    filter === cat
                                        ? "bg-primary text-primary-foreground shadow"
                                        : "text-muted-foreground hover:text-foreground",
                                )}
                            >
                                {cat === "all" ? "All" : cat}
                            </button>
                        ))}
                    </div>
                </Reveal>

                {/* Grid */}
                <div className="mb-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {filteredProjects.map((project, index) => {
                        const Icon = categoryIcons[project.category];
                        return (
                            <Reveal key={project.id} delay={(index % 3) * 0.08}>
                                <TiltCard
                                    onClick={() => setSelectedProject(project)}
                                    className="h-full cursor-pointer rounded-2xl"
                                >
                                    {/* The frosted background is its own layer: backdrop-filter would flatten the 3D depth of the content */}
                                    <div className="glass absolute inset-0 rounded-2xl transition-colors duration-300 group-hover:border-primary/40" />

                                    <div className="preserve-3d relative flex h-full flex-col gap-4 p-5">
                                        {/* Artwork floats above the card */}
                                        <div
                                            className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/10 via-transparent to-orange-400/10 text-primary"
                                            style={{ transform: "translateZ(38px)" }}
                                        >
                                            <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
                                            <ProjectArt project={project} className="relative h-36 w-full" />
                                            <Icon className="absolute left-3 top-3 h-4 w-4 opacity-70" />
                                            {project.status === "in-progress" && (
                                                <Badge className="absolute right-3 top-3 border-emerald-500/30 bg-emerald-500/15 text-[11px] text-emerald-400">
                                                    {statusLabels[project.status]}
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="flex-1" style={{ transform: "translateZ(20px)" }}>
                                            <h3 className="mb-2 line-clamp-2 text-base font-bold transition-colors group-hover:text-primary">
                                                {project.title}
                                            </h3>
                                            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                                                {project.description}
                                            </p>
                                        </div>

                                        <div
                                            className="flex flex-wrap gap-1.5"
                                            style={{ transform: "translateZ(12px)" }}
                                        >
                                            {project.technologies.slice(0, 4).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="rounded-lg bg-muted/60 px-2.5 py-1 font-mono text-[11px]"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 4 && (
                                                <span className="rounded-lg bg-muted/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                                                    +{project.technologies.length - 4}
                                                </span>
                                            )}
                                        </div>

                                        <div
                                            className="flex items-center justify-between border-t pt-3"
                                            style={{ transform: "translateZ(8px)" }}
                                        >
                                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {project.startDate}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs font-medium text-primary">
                                                Details
                                                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                            </span>
                                        </div>
                                    </div>
                                </TiltCard>
                            </Reveal>
                        );
                    })}
                </div>

                <div className="text-center">
                    <Button variant="outline" className="gap-2" asChild>
                        <a href="https://github.com/brhanegiday" target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            More on GitHub
                        </a>
                    </Button>
                </div>
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
                                                    className="flex items-start gap-2 rounded-lg bg-muted/50 p-3 text-sm"
                                                >
                                                    <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                                    <span>{feature}</span>
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
                                            <Button variant="outline" size="sm" disabled className="gap-2">
                                                <Lock className="h-4 w-4" />
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
