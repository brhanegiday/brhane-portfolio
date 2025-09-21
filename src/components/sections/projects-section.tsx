"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";
import type { Project } from "@/types";
import {
    ArrowUpRight,
    Award,
    Brain,
    Briefcase,
    Calendar,
    CheckCircle2,
    ChevronRight,
    Clock,
    Code2,
    Database,
    ExternalLink,
    Eye,
    Github,
    Star,
    TrendingUp,
    X,
    Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const categoryConfig = {
    "Full-Stack Development": {
        gradient: "from-primary/20 via-blue-500/10 to-cyan-500/5",
        border: "border-primary/20",
        icon: Code2,
        color: "text-primary",
        bgAccent: "bg-primary/5",
    },
    "AI/ML Application": {
        gradient: "from-purple-500/20 via-pink-500/10 to-purple-400/5",
        border: "border-purple-500/20",
        icon: Brain,
        color: "text-purple-500",
        bgAccent: "bg-purple-500/5",
    },
    "Frontend Engineering": {
        gradient: "from-emerald-500/20 via-green-500/10 to-teal-500/5",
        border: "border-emerald-500/20",
        icon: Database,
        color: "text-emerald-500",
        bgAccent: "bg-emerald-500/5",
    },
    "Team Leadership": {
        gradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/5",
        border: "border-orange-500/20",
        icon: Briefcase,
        color: "text-orange-500",
        bgAccent: "bg-orange-500/5",
    },
};

const statusConfig = {
    completed: {
        icon: CheckCircle2,
        color: "text-emerald-500",
        label: "Completed",
        badge: "bg-emerald-500/10 text-emerald-600",
    },
    "in-progress": {
        icon: Clock,
        color: "text-amber-500",
        label: "In Progress",
        badge: "bg-amber-500/10 text-amber-600",
    },
    planned: { icon: Clock, color: "text-gray-500", label: "Planned", badge: "bg-gray-500/10 text-gray-600" },
};

export default function ProjectsSection() {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [filter, setFilter] = useState("all");
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const sectionRef = useRef(null);

    const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.category === filter);

    const categories = ["all", ...Array.from(new Set(projects.map((p) => p.category)))];

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-in");
                    }
                });
            },
            { threshold: 0.1 }
        );

        const cards = document.querySelectorAll(".project-card");
        cards.forEach((card) => observer.observe(card));

        return () => observer.disconnect();
    }, [filteredProjects]);

    return (
        <section ref={sectionRef} id="projects" className="relative min-h-screen bg-background py-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2" />
                <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl transform -translate-x-1/2" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Minimalist Header */}
                <div className="text-center mb-20 space-y-6">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm">
                        <Briefcase className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">Featured Work</span>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                            Selected{" "}
                            <span className="relative">
                                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    Projects
                                </span>
                                <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                            </span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                            Crafting digital experiences with AI innovation and modern technologies
                        </p>
                    </div>
                </div>

                {/* Elegant Filter Tabs */}
                <div className="flex justify-center mb-16">
                    <div className="flex items-center gap-1 p-1 rounded-2xl bg-muted/50 backdrop-blur-sm border border-border/50">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                    filter === cat
                                        ? "text-primary-foreground shadow-lg"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                {filter === cat && <div className="absolute inset-0 bg-primary rounded-xl shadow-lg" />}
                                <span className="relative z-10">{cat === "all" ? "All Projects" : cat}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Minimalist Projects Grid */}
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
                    {filteredProjects.map((project, index) => {
                        const config = categoryConfig[project.category] || categoryConfig["Full-Stack Development"];
                        const Icon = config.icon;
                        const statusInfo = statusConfig[project.status] || statusConfig.completed;
                        const StatusIcon = statusInfo.icon;

                        return (
                            <div
                                key={project.id}
                                className="project-card group relative opacity-0 translate-y-8 transition-all duration-700"
                                style={{ transitionDelay: `${index * 150}ms` }}
                                onMouseEnter={() => setHoveredCard(project.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => setSelectedProject(project)}
                            >
                                {/* Main Card */}
                                <div className="relative h-full cursor-pointer">
                                    {/* Hover Effect Background */}
                                    <div
                                        className={`
                    absolute inset-0 rounded-2xl bg-gradient-to-br ${config.gradient}
                    opacity-0 group-hover:opacity-100 transition-all duration-500
                    transform scale-95 group-hover:scale-100
                  `}
                                    />

                                    {/* Card Content */}
                                    <div
                                        className={`
                    relative h-full p-8 rounded-2xl border ${config.border} bg-card/50 backdrop-blur-sm
                    transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-primary/5
                    transform group-hover:-translate-y-2
                  `}
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-6">
                                            <div
                                                className={`
                        p-3 rounded-xl ${config.bgAccent} border ${config.border}
                        group-hover:scale-110 transition-transform duration-300
                      `}
                                            >
                                                <Icon className={`w-6 h-6 ${config.color}`} />
                                            </div>

                                            <div
                                                className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-full ${statusInfo.badge}
                        text-xs font-medium transition-all duration-300
                      `}
                                            >
                                                <StatusIcon className="w-3 h-3" />
                                                {statusInfo.label}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-4 mb-8">
                                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                                                {project.title}
                                            </h3>

                                            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                                                {project.description.split("📈")[0].replace(/🎯|⚡/g, "").trim()}
                                            </p>
                                        </div>

                                        {/* Tech Stack */}
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {project.technologies.slice(0, 4).map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 text-xs bg-muted/80 text-muted-foreground rounded-lg border border-border/50"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 4 && (
                                                <span className="px-3 py-1 text-xs bg-muted/80 text-muted-foreground rounded-lg border border-border/50">
                                                    +{project.technologies.length - 4} more
                                                </span>
                                            )}
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Calendar className="w-4 h-4" />
                                                {project.startDate}
                                            </div>

                                            <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                <span className="text-sm font-medium">View Project</span>
                                                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                            </div>
                                        </div>

                                        {/* Sparkle Effect */}
                                        {hoveredCard === project.id && (
                                            <div className="absolute top-4 right-4 animate-pulse">
                                                <Star className="w-4 h-4 text-primary fill-current" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* GitHub CTA */}
                <div className="text-center space-y-8 py-16">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">More on GitHub</h3>
                        <p className="text-muted-foreground max-w-lg mx-auto">
                            Explore additional projects, open-source contributions, and technical experiments
                        </p>
                    </div>

                    <Button size="lg" className="group gap-3 px-8 py-6 text-base rounded-2xl" asChild>
                        <a href="https://github.com/brhanegiday" target="_blank" rel="noopener noreferrer">
                            <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                            Visit GitHub Profile
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                        </a>
                    </Button>
                </div>
            </div>

            {/* Enhanced Project Detail Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedProject(null)}
                >
                    <div
                        className="bg-background rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border/50"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border/50 p-8 flex items-start justify-between z-10">
                            <div className="flex-1 pr-6">
                                <div className="flex items-center gap-4 mb-4">
                                    {(() => {
                                        const config =
                                            categoryConfig[selectedProject.category] ||
                                            categoryConfig["Full-Stack Development"];
                                        const Icon = config.icon;
                                        return (
                                            <div
                                                className={`p-3 rounded-xl ${config.bgAccent} border ${config.border}`}
                                            >
                                                <Icon className={`w-6 h-6 ${config.color}`} />
                                            </div>
                                        );
                                    })()}
                                    <div>
                                        <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
                                        <p className="text-muted-foreground">{selectedProject.category}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {selectedProject.startDate}{" "}
                                            {selectedProject.endDate && `— ${selectedProject.endDate}`}
                                        </span>
                                    </div>

                                    <div
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                                            statusConfig[selectedProject.status].badge
                                        }`}
                                    >
                                        {(() => {
                                            const StatusIcon = statusConfig[selectedProject.status].icon;
                                            return <StatusIcon className="w-4 h-4" />;
                                        })()}
                                        <span className="font-medium">
                                            {statusConfig[selectedProject.status].label}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedProject(null)}
                                className="p-3 hover:bg-muted rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 space-y-10">
                            {/* Overview */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold flex items-center gap-3">
                                    <Eye className="w-5 h-5 text-primary" />
                                    Project Overview
                                </h3>
                                <div className="prose prose-neutral dark:prose-invert max-w-none">
                                    {selectedProject.longDescription ? (
                                        selectedProject.longDescription.split("\n\n").map((para, i) => (
                                            <p key={i} className="text-muted-foreground leading-relaxed">
                                                {para.replace(/\*\*/g, "")}
                                            </p>
                                        ))
                                    ) : (
                                        <p className="text-muted-foreground leading-relaxed">
                                            {selectedProject.description.split("📈")[0].replace(/🎯|⚡/g, "").trim()}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Technologies */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold">Technology Stack</h3>
                                <div className="flex flex-wrap gap-3">
                                    {selectedProject.technologies.map((tech, i) => (
                                        <Badge key={i} variant="secondary" className="px-4 py-2 text-sm">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Key Features */}
                            {selectedProject.features && selectedProject.features.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold flex items-center gap-3">
                                        <Zap className="w-5 h-5 text-primary" />
                                        Key Features
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {selectedProject.features.map((feature, i) => (
                                            <div
                                                key={i}
                                                className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border/50"
                                            >
                                                <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Highlights */}
                            {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold flex items-center gap-3">
                                        <Award className="w-5 h-5 text-primary" />
                                        Project Highlights
                                    </h3>
                                    <div className="space-y-3">
                                        {selectedProject.highlights.map((highlight, i) => (
                                            <div
                                                key={i}
                                                className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20"
                                            >
                                                <TrendingUp className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-foreground">{highlight}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-8 border-t border-border/50">
                                {selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
                                    <Button className="flex-1 gap-3 py-6 text-base rounded-xl" asChild>
                                        <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-5 h-5" />
                                            View Live Demo
                                        </a>
                                    </Button>
                                )}
                                {selectedProject.githubUrl && selectedProject.githubUrl !== "#" && (
                                    <Button
                                        variant="outline"
                                        className="flex-1 gap-3 py-6 text-base rounded-xl"
                                        asChild
                                    >
                                        <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                                            <Github className="w-5 h-5" />
                                            View Source Code
                                        </a>
                                    </Button>
                                )}
                                {(!selectedProject.liveUrl || selectedProject.liveUrl === "#") &&
                                    (!selectedProject.githubUrl || selectedProject.githubUrl === "#") && (
                                        <Button variant="outline" className="flex-1 py-6 text-base rounded-xl" disabled>
                                            🔒 Private Repository
                                        </Button>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Animations */}
            <style jsx>{`
                .animate-in {
                    opacity: 1 !important;
                    transform: translateY(0) !important;
                }

                .project-card:hover {
                    animation: subtle-float 2s ease-in-out infinite;
                }

                @keyframes subtle-float {
                    0%,
                    100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-4px) rotate(0.5deg);
                    }
                }
            `}</style>
        </section>
    );
}
