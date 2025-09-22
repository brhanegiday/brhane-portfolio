"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Building, ExternalLink, CheckCircle, Briefcase } from "lucide-react";
import { experiences, personalInfo } from "@/lib/data";

export function ExperienceSection() {
    return (
        <section id="experience" className="relative py-20 lg:py-24">
            {/* Simple Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />

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
                <div className="space-y-6 mb-16">
                    {experiences.map((experience, index) => (
                        <div key={experience.id} className="p-6 rounded-2xl border bg-card">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        {!experience.endDate && (
                                            <Badge className="text-xs">Current</Badge>
                                        )}
                                        <Badge variant="secondary" className="text-xs">
                                            {experience.type.replace("-", " ")}
                                        </Badge>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-1">
                                        {experience.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                                        <div className="flex items-center gap-1">
                                            <Building className="w-4 h-4" />
                                            <span className="text-primary font-medium">{experience.company}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {experience.location}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    {experience.startDate} - {experience.endDate || "Present"}
                                </div>
                            </div>

                            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                                {experience.description}
                            </p>

                            {/* Technologies */}
                            {experience.technologies && experience.technologies.length > 0 && (
                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-1">
                                        {experience.technologies.slice(0, 6).map((tech, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                                {tech}
                                            </Badge>
                                        ))}
                                        {experience.technologies.length > 6 && (
                                            <Badge variant="secondary" className="text-xs">
                                                +{experience.technologies.length - 6}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Achievements */}
                            {experience.achievements && experience.achievements.length > 0 && (
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Key Achievements</h4>
                                    <ul className="space-y-1">
                                        {experience.achievements.slice(0, 3).map((achievement, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                                                <span className="text-xs text-muted-foreground">
                                                    {achievement}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
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
                        <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            View Full Resume
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
