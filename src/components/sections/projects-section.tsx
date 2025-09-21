/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/sections/projects-section.tsx

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    ExternalLink,
    Github,
    Calendar,
    CheckCircle,
    Clock,
    Circle,
    Code2,
    Brain,
    Database,
    Globe,
    Building,
    ShoppingCart,
    FileText,
    Users,
} from "lucide-react";
import { projects, getFeaturedProjects } from "@/lib/data";
import { ProjectCategory } from "@/types";

const categoryIcons: Record<ProjectCategory, any> = {
    "Full-Stack Development": Code2,
    "AI/ML Application": Brain,
    "Data Platform": Database,
    "AI/Policy Analysis": FileText,
    "AI Customer Support": Users,
    "Enterprise Software": Building,
    "E-commerce Platform": ShoppingCart,
    "Healthcare Technology": Brain,
    "Enterprise Software Leadership": undefined,
    "AI Platform Architecture": undefined,
    "AI-Powered RegTech": undefined,
    "Enterprise AI Solutions": undefined,
};

const statusIcons = {
    completed: CheckCircle,
    "in-progress": Clock,
    planned: Circle,
};

const statusColors = {
    completed: "text-green-600",
    "in-progress": "text-yellow-600",
    planned: "text-gray-400",
};

export function ProjectsSection() {
    const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "all">("all");
    const [viewMode, setViewMode] = useState<"featured" | "all">("featured");

    const categories = Array.from(new Set(projects.map((p) => p.category)));
    const filteredProjects =
        viewMode === "featured"
            ? getFeaturedProjects()
            : selectedCategory === "all"
            ? projects
            : projects.filter((p) => p.category === selectedCategory);

    return (
        <section id="projects" className="py-20 lg:py-32 bg-background">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4">
                        My Work
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                        Featured{" "}
                        <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            Projects
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        A showcase of my recent work spanning full-stack development, AI applications, and innovative
                        solutions
                    </p>
                </div>

                {/* Filter Controls */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
                    {/* View Mode Toggle */}
                    <div className="flex bg-muted rounded-full p-1">
                        <Button
                            variant={viewMode === "featured" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("featured")}
                            className="rounded-full px-6"
                        >
                            Featured
                        </Button>
                        <Button
                            variant={viewMode === "all" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setViewMode("all")}
                            className="rounded-full px-6"
                        >
                            All Projects
                        </Button>
                    </div>

                    {/* Category Filter (shown only in 'all' mode) */}
                    {viewMode === "all" && (
                        <div className="flex flex-wrap justify-center gap-2">
                            <Button
                                variant={selectedCategory === "all" ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory("all")}
                                className="rounded-full"
                            >
                                All
                            </Button>
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category)}
                                    className="rounded-full text-xs"
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => {
                        const IconComponent = categoryIcons[project.category] || Code2;
                        const StatusIcon = statusIcons[project.status];

                        return (
                            <Card
                                key={project.id}
                                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                            >
                                {/* Project Image/Icon */}
                                <div className="h-48 bg-gradient-to-br from-primary/10 to-blue-600/10 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                                    <div className="absolute top-4 left-4">
                                        <Badge variant="secondary" className="text-xs">
                                            {project.category}
                                        </Badge>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <div className={`flex items-center space-x-1 ${statusColors[project.status]}`}>
                                            <StatusIcon className="w-4 h-4" />
                                            <span className="text-xs capitalize">
                                                {project.status.replace("-", " ")}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <IconComponent className="w-16 h-16 text-primary/40 group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    {project.imageUrl && <div className="absolute inset-0 bg-black/20" />}
                                </div>

                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {project.startDate}
                                        {project.endDate && ` - ${project.endDate}`}
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                                        {project.description}
                                    </p>

                                    {/* Key Features */}
                                    {project.features && project.features.length > 0 && (
                                        <div className="mb-4">
                                            <h4 className="text-sm font-medium text-foreground mb-2">Key Features:</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {project.features.slice(0, 3).map((feature, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        {feature}
                                                    </Badge>
                                                ))}
                                                {project.features.length > 3 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{project.features.length - 3} more
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Technologies */}
                                    <div className="mb-6">
                                        <div className="flex flex-wrap gap-1">
                                            {project.technologies.slice(0, 4).map((tech, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs">
                                                    {tech}
                                                </Badge>
                                            ))}
                                            {project.technologies.length > 4 && (
                                                <Badge variant="secondary" className="text-xs">
                                                    +{project.technologies.length - 4}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        {project.liveUrl && project.liveUrl !== "#" && (
                                            <Button size="sm" asChild className="flex-1 bg-primary hover:bg-primary/90">
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    Live Demo
                                                </a>
                                            </Button>
                                        )}
                                        {project.githubUrl && (
                                            <Button variant="outline" size="sm" asChild className="flex-1">
                                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                    <Github className="w-4 h-4 mr-2" />
                                                    Code
                                                </a>
                                            </Button>
                                        )}
                                        {!project.liveUrl && !project.githubUrl && (
                                            <Button variant="outline" size="sm" disabled className="flex-1">
                                                <Globe className="w-4 h-4 mr-2" />
                                                Private Project
                                            </Button>
                                        )}
                                    </div>

                                    {/* Highlights */}
                                    {project.highlights && project.highlights.length > 0 && (
                                        <div className="mt-4 pt-4 border-t">
                                            <h4 className="text-sm font-medium text-foreground mb-2">Highlights:</h4>
                                            <ul className="text-xs text-muted-foreground space-y-1">
                                                {project.highlights.slice(0, 2).map((highlight, index) => (
                                                    <li key={index} className="flex items-start">
                                                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                        {highlight}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* View More Button */}
                {viewMode === "featured" && (
                    <div className="text-center mt-12">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => setViewMode("all")}
                            className="px-8 py-3 rounded-full font-medium transition-all hover:shadow-lg hover:scale-105"
                        >
                            View All Projects
                            <ExternalLink className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                )}

                {/* GitHub CTA */}
                <div className="text-center mt-16 p-8 bg-muted/50 rounded-2xl">
                    <h3 className="text-2xl font-bold text-foreground mb-4">Want to see more of my work?</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Check out my GitHub profile for more projects, contributions, and open-source work.
                    </p>
                    <Button
                        size="lg"
                        asChild
                        className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full font-medium transition-all hover:shadow-lg hover:scale-105"
                    >
                        <a href="https://github.com/brhanegiday" target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 w-5 h-5" />
                            Visit GitHub Profile
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
