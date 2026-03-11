"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { experiences, personalInfo } from "@/lib/data";
import { Briefcase, Building, Calendar, CheckCircle, ExternalLink, MapPin } from "lucide-react";

export function ExperienceSection() {
    return (
        <section id="experience" className="relative py-20 lg:py-24">
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <Briefcase className="w-3.5 h-3.5" />
                        Experience
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        Professional Journey
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Staff-level engineering experience leading teams and architecting scalable systems
                    </p>
                </div>

                {/* Experience List */}
                <div className="space-y-6 mb-10">
                    {experiences.map((experience) => (
                        <div
                            key={experience.id}
                            className="p-6 lg:p-8 rounded-xl border bg-card hover:shadow-md transition-shadow"
                        >
                            {/* Header row */}
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        {!experience.endDate && (
                                            <Badge className="text-xs bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5" />
                                                Current
                                            </Badge>
                                        )}
                                        <Badge variant="secondary" className="text-xs">
                                            {experience.type.replace("-", " ")}
                                        </Badge>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">
                                        {experience.title}
                                    </h3>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <Building className="w-4 h-4 text-primary" />
                                            <span className="text-primary font-medium">
                                                {experience.company}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {experience.location}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg shrink-0">
                                    <Calendar className="w-3.5 h-3.5" />
                                    <span className="font-medium">
                                        {experience.startDate} – {experience.endDate || "Present"}
                                    </span>
                                </div>
                            </div>

                            {/* Description */}
                            <p className="text-muted-foreground leading-relaxed mb-5">
                                {experience.description}
                            </p>

                            {/* Technologies */}
                            {experience.technologies && experience.technologies.length > 0 && (
                                <div className="mb-5">
                                    <h4 className="text-sm font-semibold mb-2 text-foreground">Technologies</h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {experience.technologies.map((tech, techIndex) => (
                                            <Badge
                                                key={techIndex}
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Achievements */}
                            {experience.achievements && experience.achievements.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-semibold mb-2 text-foreground">Key Achievements</h4>
                                    <div className="grid gap-2">
                                        {experience.achievements.slice(0, 4).map((achievement, i) => (
                                            <div
                                                key={i}
                                                className="flex items-start gap-2 text-sm text-muted-foreground"
                                            >
                                                <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                                                <span className="leading-relaxed">{achievement}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Button variant="outline" className="gap-2" asChild>
                        <a href={personalInfo.cvUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            View Full Resume
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
