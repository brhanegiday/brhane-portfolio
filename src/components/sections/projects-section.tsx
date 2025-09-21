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
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedProject(null)}
                >
                    {/* Enhanced Background with Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-xl" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />

                    {/* Modal Container */}
                    <div
                        className="relative bg-card/95 backdrop-blur-xl rounded-3xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-border/30 ring-1 ring-primary/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute top-0 right-0 w-72 h-72 bg-primary rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
                            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />
                        </div>

                        {/* Content Container with Scroll */}
                        <div className="relative max-h-[95vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border">
                        {/* Enhanced Modal Header */}
                        <div className="sticky top-0 bg-card/98 backdrop-blur-xl border-b border-border/30 z-20">
                            <div className="p-8">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 pr-6">
                                        <div className="flex items-center gap-6 mb-6">
                                            {(() => {
                                                const config =
                                                    categoryConfig[selectedProject.category] ||
                                                    categoryConfig["Full-Stack Development"];
                                                const Icon = config.icon;
                                                return (
                                                    <div className="relative">
                                                        <div
                                                            className={`p-4 rounded-2xl ${config.bgAccent} border ${config.border} shadow-lg`}
                                                        >
                                                            <Icon className={`w-8 h-8 ${config.color}`} />
                                                        </div>
                                                        <div className={`absolute -inset-1 bg-gradient-to-r ${config.gradient} rounded-2xl opacity-30 blur`} />
                                                    </div>
                                                );
                                            })()}
                                            <div className="space-y-2">
                                                <h2 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                                                    {selectedProject.title}
                                                </h2>
                                                <p className="text-lg text-muted-foreground font-medium">
                                                    {selectedProject.category}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-6 text-sm">
                                            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-muted/50 border border-border/50">
                                                <Calendar className="w-4 h-4 text-primary" />
                                                <span className="font-medium">
                                                    {selectedProject.startDate}{" "}
                                                    {selectedProject.endDate && `— ${selectedProject.endDate}`}
                                                </span>
                                            </div>

                                            <div
                                                className={`flex items-center gap-3 px-4 py-2 rounded-xl ${
                                                    statusConfig[selectedProject.status].badge
                                                } border border-border/50 shadow-sm`}
                                            >
                                                {(() => {
                                                    const StatusIcon = statusConfig[selectedProject.status].icon;
                                                    return <StatusIcon className="w-4 h-4" />;
                                                })()}
                                                <span className="font-semibold">
                                                    {statusConfig[selectedProject.status].label}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setSelectedProject(null)}
                                        className="group p-3 hover:bg-muted/50 rounded-2xl transition-all duration-300 border border-transparent hover:border-border/50"
                                    >
                                        <X className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced Modal Content */}
                        <div className="p-10 space-y-12">
                            {/* Overview Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                                        <Eye className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold">Project Overview</h3>
                                </div>
                                <div className="bg-muted/30 rounded-2xl p-8 border border-border/50">
                                    <div className="prose prose-neutral dark:prose-invert max-w-none">
                                        {selectedProject.longDescription ? (
                                            selectedProject.longDescription.split("\n\n").map((para, i) => (
                                                <p key={i} className="text-foreground/90 leading-relaxed text-lg mb-4 last:mb-0">
                                                    {para.replace(/\*\*/g, "")}
                                                </p>
                                            ))
                                        ) : (
                                            <p className="text-foreground/90 leading-relaxed text-lg">
                                                {selectedProject.description.split("📈")[0].replace(/🎯|⚡/g, "").trim()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Technologies Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                        <Code2 className="w-5 h-5 text-purple-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold">Technology Stack</h3>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {selectedProject.technologies.map((tech, i) => (
                                        <div
                                            key={i}
                                            className="group relative px-4 py-3 bg-card border border-border/50 rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                                        >
                                            <div className="text-sm font-medium text-center">{tech}</div>
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Key Features */}
                            {selectedProject.features && selectedProject.features.length > 0 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                                            <Zap className="w-5 h-5 text-emerald-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold">Key Features</h3>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {selectedProject.features.map((feature, i) => (
                                            <div
                                                key={i}
                                                className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors duration-300">
                                                        <ChevronRight className="w-4 h-4 text-emerald-500" />
                                                    </div>
                                                    <span className="text-sm font-medium leading-relaxed">{feature}</span>
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Highlights */}
                            {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                            <Award className="w-5 h-5 text-amber-500" />
                                        </div>
                                        <h3 className="text-2xl font-bold">Project Highlights</h3>
                                    </div>
                                    <div className="space-y-4">
                                        {selectedProject.highlights.map((highlight, i) => (
                                            <div
                                                key={i}
                                                className="group relative p-6 rounded-2xl bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/30">
                                                        <TrendingUp className="w-4 h-4 text-amber-600" />
                                                    </div>
                                                    <span className="text-sm font-medium text-foreground leading-relaxed">{highlight}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Enhanced Action Buttons */}
                            <div className="pt-8 border-t border-border/30">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
                                        <Button
                                            className="group flex-1 gap-4 py-6 px-8 text-base rounded-2xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl hover:shadow-primary/25 transition-all duration-300"
                                            asChild
                                        >
                                            <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                                View Live Demo
                                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                            </a>
                                        </Button>
                                    )}
                                    {selectedProject.githubUrl && selectedProject.githubUrl !== "#" && (
                                        <Button
                                            variant="outline"
                                            className="group flex-1 gap-4 py-6 px-8 text-base rounded-2xl border-2 hover:border-primary/50 hover:bg-primary/5 shadow-lg hover:shadow-xl transition-all duration-300"
                                            asChild
                                        >
                                            <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                                                <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                                View Source Code
                                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                            </a>
                                        </Button>
                                    )}
                                    {(!selectedProject.liveUrl || selectedProject.liveUrl === "#") &&
                                        (!selectedProject.githubUrl || selectedProject.githubUrl === "#") && (
                                            <Button
                                                variant="outline"
                                                className="flex-1 py-6 px-8 text-base rounded-2xl border-2 border-muted-foreground/20"
                                                disabled
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-5 h-5 rounded bg-muted-foreground/20 flex items-center justify-center">
                                                        🔒
                                                    </div>
                                                    Private Repository
                                                </div>
                                            </Button>
                                        )}
                                </div>
                            </div>
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
