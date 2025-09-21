/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/sections/about-section.tsx

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { achievements, education, personalInfo, skillsByCategory } from "@/lib/data";
import { SkillCategory } from "@/types";
import {
    Award,
    Brain,
    Cloud,
    Code2,
    Database,
    Download,
    ExternalLink,
    GraduationCap,
    Palette,
    Settings,
    Target,
    User,
    Users
} from "lucide-react";

const categoryIcons: Record<SkillCategory, any> = {
    Frontend: Code2,
    Backend: Database,
    "AI/ML": Brain,
    Database: Database,
    "Cloud/DevOps": Cloud,
    Leadership: Users,
    Tools: Settings,
    Design: Palette,
    Core: Target,
};

export function AboutSection() {
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section id="about" className="relative py-20 lg:py-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-background" />
                <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Enhanced Section Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm mb-6">
                        <User className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-muted-foreground">About Me</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                        Engineering{" "}
                        <span className="relative">
                            <span className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Excellence
                            </span>
                            <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                        </span>{" "}
                        at Scale
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Staff-level engineer specializing in{" "}
                        <span className="text-primary font-semibold">AI-powered healthcare solutions</span>,
                        system architecture, and high-performance team leadership
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* About Content */}
                    <div className="space-y-8">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                                <span className="text-foreground font-semibold">Staff Software Engineer</span> with
                                proven expertise architecting scalable systems and leading cross-functional teams that
                                deliver measurable impact. I specialize in transforming complex technical challenges
                                into elegant, production-ready solutions.
                            </p>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Currently{" "}
                                <span className="text-foreground font-medium">leading AI research initiatives</span> at
                                Carnegie Mellon University&apos;s Upanzi Network, where I architect LLM-powered
                                healthcare platforms serving 1,000+ researchers globally. My work bridges cutting-edge
                                AI research with practical clinical applications, achieving 40% reduction in biomarker
                                assay variability.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                My leadership philosophy centers on{" "}
                                <span className="text-foreground font-medium">
                                    technical excellence through collaborative innovation
                                </span>
                                . I&apos;ve built and mentored engineering teams across three countries, consistently
                                delivering systems with 99.9% uptime while maintaining rapid development velocity.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={() => scrollToSection("projects")}
                                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-medium transition-all hover:shadow-lg hover:scale-105"
                            >
                                View My Projects
                                <ExternalLink className="ml-2 w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                asChild
                                className="px-6 py-3 rounded-full font-medium transition-all hover:shadow-lg hover:scale-105"
                            >
                                <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                                    <Download className="mr-2 w-4 h-4" />
                                    Download Resume
                                </a>
                            </Button>
                        </div>

                        {/* Education */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-foreground flex items-center">
                                <GraduationCap className="mr-2 w-5 h-5 text-primary" />
                                Education
                            </h3>
                            <div className="space-y-4">
                                {education.map((edu) => (
                                    <Card key={edu.id} className="border-l-4 border-l-primary">
                                        <CardContent className="p-6">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-foreground">
                                                        {edu.degree} - {edu.field}
                                                    </h4>
                                                    <p className="text-primary font-medium">{edu.institution}</p>
                                                    <p className="text-sm text-muted-foreground">{edu.location}</p>
                                                    {edu.thesis && (
                                                        <p className="text-sm text-muted-foreground mt-2">
                                                            <strong>Thesis:</strong> {edu.thesis}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="text-sm text-muted-foreground mt-2 sm:mt-0">
                                                    {edu.startDate} - {edu.endDate}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-foreground flex items-center">
                                <Award className="mr-2 w-5 h-5 text-primary" />
                                Recent Achievements
                            </h3>
                            <div className="grid gap-3">
                                {achievements.slice(0, 3).map((achievement) => (
                                    <Card key={achievement.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-foreground">{achievement.title}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {achievement.description}
                                                    </p>
                                                </div>
                                                <Badge variant="secondary" className="text-xs">
                                                    {achievement.date}
                                                </Badge>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold text-foreground mb-6">Technical Expertise</h3>
                            <p className="text-muted-foreground mb-8">
                                Here are the technologies and tools I work with to bring ideas to life.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {Object.entries(skillsByCategory).map(([category, skills]) => {
                                const IconComponent = categoryIcons[category as SkillCategory] || Code2;
                                return (
                                    <Card key={category} className="hover:shadow-md transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-center mb-4">
                                                <IconComponent className="w-5 h-5 text-primary mr-2" />
                                                <h4 className="font-semibold text-foreground">{category}</h4>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {skills.map((skill) => (
                                                    <Badge
                                                        key={skill.name}
                                                        variant={
                                                            skill.proficiency === "expert" ? "default" : "secondary"
                                                        }
                                                        className={`${
                                                            skill.proficiency === "expert"
                                                                ? "bg-primary text-white"
                                                                : skill.proficiency === "advanced"
                                                                ? "bg-blue-100 text-blue-800"
                                                                : "bg-gray-100 text-gray-800"
                                                        }`}
                                                    >
                                                        {skill.name}
                                                        {skill.yearsOfExperience && (
                                                            <span className="ml-1 text-xs opacity-75">
                                                                {skill.yearsOfExperience}y
                                                            </span>
                                                        )}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* Fun Fact */}
                        <Card className="bg-gradient-to-r from-primary/10 to-blue-600/10 border-primary/20">
                            <CardContent className="p-6">
                                <h4 className="font-semibold text-foreground mb-2 flex items-center">
                                    <Brain className="mr-2 w-5 h-5 text-primary" />
                                    Current Focus
                                </h4>
                                <p className="text-muted-foreground">
                                    Leading a cross-functional team of 8 engineers and researchers to develop
                                    LLM-powered healthcare solutions that have reduced biomarker assay variability by
                                    40%. Currently architecting systems that serve 1000+ healthcare researchers while
                                    advancing the field through peer-reviewed publications.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
