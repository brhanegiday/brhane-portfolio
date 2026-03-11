"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";
import type { Project } from "@/types";
import { ExternalLink, Github, ArrowUpRight, Calendar, Layers, X, Code2, Zap } from "lucide-react";
import { useState } from "react";

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [filter, setFilter] = useState("all");

    const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter);
    const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];

    return (
        <section id="projects" className="relative py-20 lg:py-24 bg-muted/30">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <Layers className="w-3.5 h-3.5" />
                        Selected Work
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Projects</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A curated selection of projects showcasing technical excellence and innovation
                    </p>
                </div>

                {/* Filter */}
                <div className="flex justify-center mb-12">
                    <div className="flex gap-1 p-1 rounded-xl bg-muted/60 border">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    filter === cat
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                {cat === "all" ? "All" : cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group cursor-pointer"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="h-full relative overflow-hidden rounded-xl border bg-card hover:shadow-lg hover:-translate-y-1 hover:border-primary/30 transition-all duration-300">
                                {/* Hover gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                <div className="relative p-6 space-y-4">
                                    {/* Project Header */}
                                    <div className="flex items-start justify-between">
                                        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Code2 className="w-5 h-5 text-primary" />
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                            {project.category}
                                        </Badge>
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className="font-bold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.technologies.slice(0, 4).map((tech, i) => (
                                            <span
                                                key={i}
                                                className="px-2.5 py-1 text-xs bg-muted rounded-lg font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 4 && (
                                            <span className="px-2.5 py-1 text-xs bg-muted text-muted-foreground rounded-lg font-medium">
                                                +{project.technologies.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-3 border-t">
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{project.startDate}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-primary text-xs font-medium group-hover:translate-x-0.5 transition-transform">
                                            <span>Details</span>
                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* GitHub CTA */}
                <div className="text-center">
                    <Button variant="outline" className="gap-2" asChild>
                        <a href="https://github.com/brhanegiday" target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                            More on GitHub
                        </a>
                    </Button>
                </div>
            </div>

            {/* Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="bg-background rounded-xl border max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-background border-b p-6 flex items-start justify-between rounded-t-xl">
                            <div className="flex-1">
                                <h2 className="text-xl font-bold mb-1">{selectedProject.title}</h2>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                    <span>{selectedProject.category}</span>
                                    <span>·</span>
                                    <span>{selectedProject.startDate}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Description */}
                            <div>
                                <h3 className="font-semibold mb-2 text-sm">Overview</h3>
                                <div className="text-muted-foreground text-sm leading-relaxed">
                                    {selectedProject.longDescription ? (
                                        selectedProject.longDescription.split("\n\n").map((para, i) => (
                                            <p key={i} className="mb-3">
                                                {para.replace(/\*\*/g, "")}
                                            </p>
                                        ))
                                    ) : (
                                        <p>{selectedProject.description}</p>
                                    )}
                                </div>
                            </div>

                            {/* Technologies */}
                            <div>
                                <h3 className="font-semibold mb-2 text-sm">Technologies</h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {selectedProject.technologies.map((tech, i) => (
                                        <Badge key={i} variant="secondary" className="text-xs">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            {selectedProject.features && selectedProject.features.length > 0 && (
                                <div>
                                    <h3 className="font-semibold mb-2 text-sm">Key Features</h3>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        {selectedProject.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 text-sm">
                                                <Zap className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                {selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
                                    <Button className="gap-2" size="sm" asChild>
                                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-4 h-4" />
                                            Live Demo
                                        </a>
                                    </Button>
                                )}
                                {selectedProject.githubUrl && selectedProject.githubUrl !== "#" && (
                                    <Button variant="outline" className="gap-2" size="sm" asChild>
                                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                                            <Github className="w-4 h-4" />
                                            Source Code
                                        </a>
                                    </Button>
                                )}
                                {(!selectedProject.liveUrl || selectedProject.liveUrl === "#") &&
                                    (!selectedProject.githubUrl || selectedProject.githubUrl === "#") && (
                                        <Button variant="outline" size="sm" disabled>
                                            Private Project
                                        </Button>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
