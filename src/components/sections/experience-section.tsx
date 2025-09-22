"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Building, ExternalLink, CheckCircle, Briefcase } from "lucide-react";
import { experiences, personalInfo } from "@/lib/data";

export function ExperienceSection() {
    return (
        <section id="experience" className="relative py-20 lg:py-24">
            {/* Rich Background with Professional Feel */}
            <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/5 to-muted/30" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/8 via-transparent to-secondary/10" />

            {/* Professional geometric elements */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-20 left-10 w-20 h-20 border-2 border-primary/30 rounded-lg rotate-12" />
                <div className="absolute bottom-32 right-16 w-28 h-28 bg-accent/20 rounded-full" />
                <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-secondary/30 rotate-45" />
                <div className="absolute bottom-1/4 left-1/4 w-16 h-16 border border-primary/20 rounded-full" />
            </div>

            <div className="relative container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Clean Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        <Briefcase className="w-4 h-4" />
                        Experience
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Professional Journey
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Staff-level engineering experience leading teams and architecting scalable systems
                    </p>
                </div>

                {/* Experience List */}
                <div className="space-y-8 mb-16">
                    {experiences.map((experience, index) => (
                        <div key={experience.id} className="group relative">
                            {/* Timeline connector */}
                            {index < experiences.length - 1 && (
                                <div className="absolute left-8 top-16 w-0.5 h-24 bg-gradient-to-b from-primary/50 to-primary/20 hidden lg:block" />
                            )}

                            <div className="relative p-8 rounded-3xl border bg-card/90 backdrop-blur-sm hover:bg-card hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:border-primary/30">
                                {/* Status indicator */}
                                <div className="absolute -left-4 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background hidden lg:block" />

                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            {!experience.endDate && (
                                                <Badge className="text-xs px-3 py-1 bg-green-500/10 text-green-600 border-green-500/20">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                                                    Current
                                                </Badge>
                                            )}
                                            <Badge variant="secondary" className="text-xs px-3 py-1 bg-primary/10 text-primary border-primary/20">
                                                {experience.type.replace("-", " ")}
                                            </Badge>
                                        </div>
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                            {experience.title}
                                        </h3>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <Building className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="text-primary font-semibold text-base">{experience.company}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                {experience.location}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-xl">
                                        <Calendar className="w-4 h-4" />
                                        <span className="font-medium">{experience.startDate} - {experience.endDate || "Present"}</span>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-muted-foreground leading-relaxed text-base">
                                        {experience.description}
                                    </p>
                                </div>

                                {/* Technologies */}
                                {experience.technologies && experience.technologies.length > 0 && (
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold mb-3 text-foreground">Technologies Used</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {experience.technologies.slice(0, 8).map((tech, index) => (
                                                <Badge key={index} variant="secondary" className="text-xs px-3 py-1 hover:scale-105 transition-transform bg-muted/70 hover:bg-primary/10 hover:text-primary">
                                                    {tech}
                                                </Badge>
                                            ))}
                                            {experience.technologies.length > 8 && (
                                                <Badge variant="secondary" className="text-xs px-3 py-1 bg-accent/10 text-accent">
                                                    +{experience.technologies.length - 8} more
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Achievements */}
                                {experience.achievements && experience.achievements.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-semibold mb-4 text-foreground">Key Achievements</h4>
                                        <div className="grid gap-3">
                                            {experience.achievements.slice(0, 4).map((achievement, index) => (
                                                <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/10">
                                                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-sm text-muted-foreground leading-relaxed">
                                                        {achievement}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center">
                    <Button
                        variant="outline"
                        className="gap-2"
                        asChild
                    >
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
