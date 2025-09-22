"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";
import type { Project } from "@/types";
import {
    ExternalLink,
    Github,
    ArrowUpRight,
    Calendar,
    Layers,
    X,
    Code2,
    Zap
} from "lucide-react";
import { useState } from "react";

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [filter, setFilter] = useState("all");

    const filteredProjects = filter === "all"
        ? projects
        : projects.filter(p => p.category === filter);

    const categories = ["all", ...Array.from(new Set(projects.map(p => p.category)))];

    return (
        <section id="projects" className="relative py-20">
            {/* Simple Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />

            <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Clean Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        <Layers className="w-4 h-4" />
                        Selected Work
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Featured Projects
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A curated selection of projects showcasing technical excellence and innovation
                    </p>
                </div>

                {/* Clean Filter */}
                <div className="flex justify-center mb-12">
                    <div className="flex gap-2 p-1 rounded-2xl bg-muted/50">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                                    filter === cat
                                        ? "bg-primary text-primary-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                {cat === "all" ? "All" : cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group cursor-pointer"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="h-full p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                <div className="space-y-4">
                                    {/* Project Header */}
                                    <div className="flex items-start justify-between">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                            <Code2 className="w-5 h-5 text-primary" />
                                        </div>
                                        <Badge variant="secondary" className="text-xs">
                                            {project.status === "completed" ? "Live" : "In Progress"}
                                        </Badge>
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                                            {project.description.split('📈')[0].replace(/🎯|⚡/g, '').trim()}
                                        </p>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-1">
                                        {project.technologies.slice(0, 3).map((tech, i) => (
                                            <span key={i} className="px-2 py-1 text-xs bg-muted rounded-md">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <span className="px-2 py-1 text-xs bg-muted rounded-md">
                                                +{project.technologies.length - 3}
                                            </span>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Calendar className="w-3 h-3" />
                                            {project.startDate}
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
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

            {/* Clean Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-background border-b p-6 flex items-start justify-between">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>{selectedProject.category}</span>
                                    <span>•</span>
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
                        <div className="p-6 space-y-8">
                            {/* Description */}
                            <div>
                                <h3 className="font-semibold mb-3">Overview</h3>
                                <div className="text-muted-foreground leading-relaxed">
                                    {selectedProject.longDescription ? (
                                        selectedProject.longDescription.split('\n\n').map((para, i) => (
                                            <p key={i} className="mb-3">{para.replace(/\*\*/g, '')}</p>
                                        ))
                                    ) : (
                                        <p>{selectedProject.description.split('📈')[0].replace(/🎯|⚡/g, '').trim()}</p>
                                    )}
                                </div>
                            </div>

                            {/* Technologies */}
                            <div>
                                <h3 className="font-semibold mb-3">Technologies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.technologies.map((tech, i) => (
                                        <Badge key={i} variant="secondary">{tech}</Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            {selectedProject.features && selectedProject.features.length > 0 && (
                                <div>
                                    <h3 className="font-semibold mb-3">Key Features</h3>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {selectedProject.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
                                                <Zap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                {selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
                                    <Button className="gap-2" asChild>
                                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-4 h-4" />
                                            Live Demo
                                        </a>
                                    </Button>
                                )}
                                {selectedProject.githubUrl && selectedProject.githubUrl !== "#" && (
                                    <Button variant="outline" className="gap-2" asChild>
                                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                                            <Github className="w-4 h-4" />
                                            Source Code
                                        </a>
                                    </Button>
                                )}
                                {(!selectedProject.liveUrl || selectedProject.liveUrl === "#") &&
                                 (!selectedProject.githubUrl || selectedProject.githubUrl === "#") && (
                                    <Button variant="outline" disabled>
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