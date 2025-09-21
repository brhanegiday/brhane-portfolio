// src/components/sections/experience-section.tsx

"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Building, ExternalLink, CheckCircle, Award, Users, TrendingUp } from "lucide-react";
import { experiences, personalInfo } from "@/lib/data";

const experienceTypeColors = {
    "full-time": "bg-green-100 text-green-800 border-green-200",
    "part-time": "bg-blue-100 text-blue-800 border-blue-200",
    contract: "bg-purple-100 text-purple-800 border-purple-200",
    internship: "bg-orange-100 text-orange-800 border-orange-200",
    research: "bg-indigo-100 text-indigo-800 border-indigo-200",
};

export function ExperienceSection() {
    const currentExperience = experiences.find((exp) => !exp.endDate);

    return (
        <section id="experience" className="py-20 lg:py-32 bg-muted/20">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4">
                        Experience
                    </Badge>
                    <h2 className="text-heading-2 mb-6">
                        Professional <span className="gradient-text">Leadership</span> Journey
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Staff-level engineering experience leading teams, architecting scalable systems, and delivering
                        solutions that serve thousands of users worldwide
                    </p>
                </div>

                {/* Current Role Highlight */}
                {currentExperience && (
                    <div className="mb-16">
                        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-blue-600/5">
                            <CardContent className="p-8">
                                <div className="flex items-center mb-4">
                                    <Badge className="bg-green-500 text-white mr-3">Current Role</Badge>
                                    <Badge variant="outline" className={experienceTypeColors[currentExperience.type]}>
                                        {currentExperience.type.replace("-", " ").toUpperCase()}
                                    </Badge>
                                </div>
                                <div className="grid lg:grid-cols-2 gap-8 items-center">
                                    <div>
                                        <h3 className="text-2xl font-bold text-foreground mb-2">
                                            {currentExperience.title}
                                        </h3>
                                        <div className="flex items-center text-primary font-medium mb-2">
                                            <Building className="w-4 h-4 mr-2" />
                                            {currentExperience.company}
                                        </div>
                                        <div className="flex items-center text-muted-foreground mb-4">
                                            <MapPin className="w-4 h-4 mr-2" />
                                            {currentExperience.location}
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {currentExperience.description}
                                        </p>
                                    </div>
                                    <div>
                                        {currentExperience.achievements && (
                                            <div>
                                                <h4 className="font-semibold text-foreground mb-3 flex items-center">
                                                    <Award className="w-4 h-4 mr-2 text-primary" />
                                                    Key Achievements
                                                </h4>
                                                <ul className="space-y-2">
                                                    {currentExperience.achievements
                                                        .slice(0, 3)
                                                        .map((achievement, index) => (
                                                            <li key={index} className="flex items-start">
                                                                <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                                <span className="text-sm text-muted-foreground">
                                                                    {achievement}
                                                                </span>
                                                            </li>
                                                        ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden lg:block" />

                    <div className="space-y-8">
                        {experiences.map((experience, index) => (
                            <div key={experience.id} className="relative">
                                {/* Timeline Dot */}
                                <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-md hidden lg:block" />

                                <Card className="lg:ml-16 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <CardHeader className="pb-3">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Badge
                                                        variant="outline"
                                                        className={experienceTypeColors[experience.type]}
                                                    >
                                                        {experience.type.replace("-", " ").toUpperCase()}
                                                    </Badge>
                                                    {!experience.endDate && (
                                                        <Badge className="bg-green-500 text-white text-xs">
                                                            Current
                                                        </Badge>
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-bold text-foreground mb-1">
                                                    {experience.title}
                                                </h3>
                                                <div className="flex items-center text-primary font-medium mb-1">
                                                    <Building className="w-4 h-4 mr-2" />
                                                    {experience.company}
                                                </div>
                                                <div className="flex items-center text-muted-foreground text-sm">
                                                    <MapPin className="w-4 h-4 mr-2" />
                                                    {experience.location}
                                                </div>
                                            </div>
                                            <div className="flex items-center text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-full">
                                                <Calendar className="w-4 h-4 mr-2" />
                                                {experience.startDate} - {experience.endDate || "Present"}
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <p className="text-muted-foreground mb-4 leading-relaxed">
                                            {experience.description}
                                        </p>

                                        {/* Technologies */}
                                        {experience.technologies && experience.technologies.length > 0 && (
                                            <div className="mb-4">
                                                <h4 className="text-sm font-medium text-foreground mb-2">
                                                    Technologies Used:
                                                </h4>
                                                <div className="flex flex-wrap gap-1">
                                                    {experience.technologies.map((tech, index) => (
                                                        <Badge key={index} variant="secondary" className="text-xs">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Achievements */}
                                        {experience.achievements && experience.achievements.length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
                                                    <TrendingUp className="w-4 h-4 mr-2 text-primary" />
                                                    Key Achievements
                                                </h4>
                                                <ul className="space-y-2">
                                                    {experience.achievements.map((achievement, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                            <span className="text-sm text-muted-foreground">
                                                                {achievement}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience Summary */}
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">5+</h3>
                            <p className="text-muted-foreground">Years of Experience</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Building className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">6+</h3>
                            <p className="text-muted-foreground">Companies & Organizations</p>
                        </CardContent>
                    </Card>

                    <Card className="text-center hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-6 h-6 text-green-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">3+</h3>
                            <p className="text-muted-foreground">Teams Led</p>
                        </CardContent>
                    </Card>
                </div>

                {/* CTA */}
                <div className="text-center mt-16">
                    <p className="text-muted-foreground mb-6">Want to learn more about my professional background?</p>
                    <Button
                        variant="outline"
                        size="lg"
                        asChild
                        className="px-8 py-3 rounded-full font-medium transition-all hover:shadow-lg hover:scale-105"
                    >
                        <a href={personalInfo.cvUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 w-4 h-4" />
                            Download Full CV
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
