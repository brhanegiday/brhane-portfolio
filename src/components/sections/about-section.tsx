"use client";

import { Reveal } from "@/components/common/reveal";
import { SectionHeading } from "@/components/common/section-heading";
import { SKILL_COLORS } from "@/components/three/skill-cloud";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    Users
} from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const SkillCloud = dynamic(() => import("@/components/three/skill-cloud").then((m) => m.SkillCloud), {
    ssr: false,
    loading: () => <div className="h-full w-full animate-pulse bg-muted/20" />,
});

/* eslint-disable @typescript-eslint/no-explicit-any */
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
    const [highlight, setHighlight] = useState<SkillCategory | null>(null);
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section id="about" className="relative py-24 lg:py-32">
            <div aria-hidden className="bg-circuit absolute inset-0" />
            <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <SectionHeading
                    title="Code, data and applied AI"
                    description="Software engineer and AI researcher building tools for healthcare and policy."
                />

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* About Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <p className="text-muted-foreground leading-relaxed">
                                <span className="text-foreground font-semibold">Software engineer</span> with 7+ years
                                in fullstack development, DevOps and cloud-native systems, and an MSc in Information
                                Technology from Carnegie Mellon University Africa.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                I am a research associate at the Upanzi Network, where I work on LLM-powered analysis of
                                policy and healthcare data and design the pipelines that harmonise datasets from across
                                Africa.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                I like turning hard problems into products people can use: scalable architectures, CI/CD
                                pipelines, and interfaces that make complex information easy to explore, including
                                immersive 3D ones.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
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
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-primary" />
                                Education
                            </h3>
                            <div className="space-y-3">
                                {education.map((edu) => (
                                    <div key={edu.id} className="glass rounded-xl p-5 transition-transform duration-300 hover:-translate-y-0.5">
                                        <h4 className="font-semibold text-base mb-1">
                                            {edu.degree} — {edu.field}
                                        </h4>
                                        <p className="text-primary font-medium text-sm">{edu.institution}</p>
                                        <p className="text-sm text-muted-foreground">{edu.location}</p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            {edu.startDate} – {edu.endDate}
                                        </p>
                                        {edu.thesis && (
                                            <p className="text-sm text-muted-foreground mt-2 p-3 rounded-lg bg-muted/50">
                                                <strong className="text-foreground">Thesis:</strong> {edu.thesis}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Award className="w-5 h-5 text-primary" />
                                Recent Achievements
                            </h3>
                            <div className="space-y-3">
                                {achievements.slice(0, 3).map((achievement) => (
                                    <div key={achievement.id} className="glass rounded-xl p-5 transition-transform duration-300 hover:-translate-y-0.5">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                                                <p className="text-sm text-muted-foreground leading-relaxed">
                                                    {achievement.description}
                                                </p>
                                            </div>
                                            <Badge variant="secondary" className="text-xs shrink-0">
                                                {achievement.date}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="space-y-4">
                        <div className="mb-2">
                            <h3 className="text-lg font-semibold mb-1">Technical Expertise</h3>
                            <p className="text-muted-foreground text-sm">
                                Technologies and tools I work with to build solutions.
                            </p>
                        </div>

                        {/* 3D skill sphere: drag to turn it, pick a category to light it up */}
                        <Reveal>
                            <div className="glass relative overflow-hidden rounded-2xl">
                                <div aria-hidden className="bg-dots absolute inset-0 opacity-60" />
                                <div className="relative h-[380px]">
                                    <SkillCloud className="absolute inset-0" highlight={highlight} />
                                </div>
                                <div className="relative flex flex-wrap justify-center gap-1.5 border-t p-3">
                                    {(Object.keys(SKILL_COLORS) as SkillCategory[]).map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setHighlight(highlight === category ? null : category)}
                                            aria-pressed={highlight === category}
                                            className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors hover:bg-muted/60 aria-pressed:bg-muted"
                                        >
                                            <span className="h-2 w-2 rounded-full" style={{ background: SKILL_COLORS[category] }} />
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </Reveal>

                        {Object.entries(skillsByCategory).map(([category, skills]) => {
                            const IconComponent = categoryIcons[category as SkillCategory] || Code2;
                            return (
                                <div key={category} className="glass rounded-xl p-5 transition-transform duration-300 hover:-translate-y-0.5">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <IconComponent className="w-4 h-4 text-primary" />
                                        </div>
                                        <h4 className="font-semibold text-sm">{category}</h4>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {skills.map((skill) => (
                                            <Badge
                                                key={skill.name}
                                                variant={skill.proficiency === "expert" ? "default" : "secondary"}
                                                className="text-xs"
                                            >
                                                {skill.name}
                                                {skill.yearsOfExperience && (
                                                    <span className="ml-1 opacity-70">
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
                </div>
            </div>
        </section>
    );
}
