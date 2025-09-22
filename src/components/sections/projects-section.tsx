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
        <section id="projects" className="relative py-20 lg:py-24">
            {/* Creative Background for Innovation */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/8 to-primary/15" />
            <div className="absolute inset-0 bg-gradient-to-tl from-accent/10 via-transparent to-muted/20" />

            {/* Tech-inspired background elements */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
                <div className="absolute top-16 right-20 w-40 h-40 border border-primary/30 rounded-2xl rotate-12 animate-pulse" />
                <div className="absolute bottom-24 left-16 w-32 h-32 bg-accent/20 rounded-full blur-xl" />
                <div className="absolute top-1/3 left-1/3 w-6 h-6 bg-primary/40 rotate-45" />
                <div className="absolute bottom-1/3 right-1/4 w-8 h-8 border-2 border-secondary/40 rounded-full" />
                <div className="absolute top-3/4 right-1/2 w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg rotate-45" />
            </div>

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
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className="group cursor-pointer"
                            onClick={() => setSelectedProject(project)}
                        >
                            <div className="h-full relative overflow-hidden rounded-3xl border bg-card/90 backdrop-blur-sm hover:bg-card hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 hover:border-primary/30">
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative p-8 space-y-6">
                                    {/* Project Header */}
                                    <div className="flex items-start justify-between">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Code2 className="w-6 h-6 text-primary" />
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <Badge
                                                variant="secondary"
                                                className={`text-xs px-3 py-1 ${
                                                    project.status === "completed"
                                                        ? "bg-green-500/10 text-green-600 border-green-500/20"
                                                        : "bg-blue-500/10 text-blue-600 border-blue-500/20"
                                                }`}
                                            >
                                                {project.status === "completed" ? "✅ Live" : "🚧 In Progress"}
                                            </Badge>
                                            <Badge variant="outline" className="text-xs px-2 py-1">
                                                {project.category}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-3">
                                        <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed line-clamp-3">
                                            {project.description.split('📈')[0].replace(/🎯|⚡/g, '').trim()}
                                        </p>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.slice(0, 4).map((tech, i) => (
                                            <span key={i} className="px-3 py-1.5 text-xs bg-muted/80 rounded-xl font-medium hover:bg-primary/10 hover:text-primary transition-colors">
                                                {tech}
                                            </span>
                                        ))}
                                        {project.technologies.length > 4 && (
                                            <span className="px-3 py-1.5 text-xs bg-accent/10 text-accent rounded-xl font-medium">
                                                +{project.technologies.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Calendar className="w-4 h-4" />
                                            <span className="font-medium">{project.startDate}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-primary group-hover:translate-x-1 transition-transform">
                                            <span className="text-xs font-medium">View Details</span>
                                            <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                {/* Hover effect border */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
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