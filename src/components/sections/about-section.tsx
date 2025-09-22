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
        <section id="about" className="relative py-20 lg:py-24">
            {/* Enhanced Background with Visual Depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/10 to-secondary/20" />
            <div className="absolute inset-0 bg-gradient-to-tl from-primary/5 via-transparent to-accent/8" />

            {/* Geometric patterns */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-10 right-10 w-32 h-32 border border-primary/20 rounded-full" />
                <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent/10 rounded-lg rotate-45" />
                <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-secondary/20 rounded-full" />
            </div>

            <div className="relative container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Clean Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        <User className="w-4 h-4" />
                        About Me
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Engineering at Scale
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Staff-level engineer specializing in AI-powered healthcare solutions and system architecture
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* About Content */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                                <span className="text-foreground font-semibold">Staff Software Engineer</span> with
                                proven expertise architecting scalable systems and leading cross-functional teams that
                                deliver measurable impact.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                Currently leading AI research initiatives at Carnegie Mellon University&apos;s Upanzi Network,
                                where I architect LLM-powered healthcare platforms serving 1,000+ researchers globally.
                                My work achieves 40% reduction in biomarker assay variability.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                I&lsquo;ve built and mentored engineering teams across three countries, consistently
                                delivering systems with 99.9% uptime while maintaining rapid development velocity.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={() => scrollToSection("projects")}
                                className="gap-2"
                            >
                                <ExternalLink className="w-4 h-4" />
                                View My Projects
                            </Button>
                            <Button
                                variant="outline"
                                className="gap-2"
                                asChild
                            >
                                <a href={personalInfo.cvUrl} target="_blank" rel="noopener noreferrer">
                                    <Download className="w-4 h-4" />
                                    Download CV
                                </a>
                            </Button>
                        </div>

                        {/* Education */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-primary" />
                                Education
                            </h3>
                            <div className="space-y-3">
                                {education.map((edu) => (
                                    <div key={edu.id} className="group p-6 rounded-2xl border bg-card/80 backdrop-blur-sm hover:bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                                        <div className="space-y-3">
                                            <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                                {edu.degree} - {edu.field}
                                            </h4>
                                            <p className="text-primary font-medium text-base">{edu.institution}</p>
                                            <p className="text-sm text-muted-foreground">{edu.location}</p>
                                            <div className="text-sm text-muted-foreground">
                                                {edu.startDate} - {edu.endDate}
                                            </div>
                                            {edu.thesis && (
                                                <p className="text-sm text-muted-foreground mt-3 p-3 rounded-lg bg-muted/50">
                                                    <strong className="text-foreground">Thesis:</strong> {edu.thesis}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Award className="w-5 h-5 text-primary" />
                                Recent Achievements
                            </h3>
                            <div className="space-y-3">
                                {achievements.slice(0, 3).map((achievement) => (
                                    <div key={achievement.id} className="group p-6 rounded-2xl border bg-card/80 backdrop-blur-sm hover:bg-card hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-base group-hover:text-accent transition-colors mb-2">{achievement.title}</h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {achievement.description}
                                                </p>
                                            </div>
                                            <Badge variant="secondary" className="text-xs px-3 py-1 bg-accent/10 text-accent border-accent/20">
                                                {achievement.date}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Technical Expertise</h3>
                            <p className="text-muted-foreground text-sm">
                                Technologies and tools I work with to build solutions.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {Object.entries(skillsByCategory).map(([category, skills]) => {
                                const IconComponent = categoryIcons[category as SkillCategory] || Code2;
                                return (
                                    <div key={category} className="group p-6 rounded-2xl border bg-card/80 backdrop-blur-sm hover:bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                                                <IconComponent className="w-5 h-5 text-primary" />
                                            </div>
                                            <h4 className="font-semibold text-base">{category}</h4>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((skill) => (
                                                <Badge
                                                    key={skill.name}
                                                    variant={skill.proficiency === "expert" ? "default" : "secondary"}
                                                    className="text-xs hover:scale-105 transition-transform"
                                                >
                                                    {skill.name}
                                                    {skill.yearsOfExperience && (
                                                        <span className="ml-1 opacity-75">
                                                            {skill.yearsOfExperience}y
                                                        </span>
                                                    )}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Current Focus */}
                        <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/20">
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <Brain className="w-4 h-4 text-primary" />
                                Current Focus
                            </h4>
                            <p className="text-muted-foreground text-sm">
                                Leading a cross-functional team of 8 engineers and researchers to develop
                                LLM-powered healthcare solutions that have reduced biomarker assay variability by
                                40%. Currently architecting systems that serve 1000+ healthcare researchers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
