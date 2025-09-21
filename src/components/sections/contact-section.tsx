// src/components/sections/contact-section.tsx

"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { contactInfo, personalInfo } from "@/lib/data";
import {
    Calendar,
    Check,
    Copy,
    ExternalLink,
    Github,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    Send,
    Youtube,
} from "lucide-react";
import { useState } from "react";

const socialIcons = {
    GitHub: Github,
    LinkedIn: Linkedin,
    YouTube: Youtube,
    Instagram: Instagram,
};

export function ContactSection() {
    const [copiedEmail, setCopiedEmail] = useState(false);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(contactInfo.email);
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2000);
        } catch (err) {
            console.error("Failed to copy email:", err);
        }
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <section id="contact" className="py-20 lg:py-32 bg-background">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <Badge variant="secondary" className="mb-4">
                        Get In Touch
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                        Let&apos;s Build Something{" "}
                        <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                            Amazing Together
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Ready to bring your ideas to life? I&apos;m always interested in hearing about new projects and
                        opportunities.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-6">Let&apos;s start a conversation</h3>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                                I&apos;m available for staff-level engineering roles, technical leadership positions,
                                and strategic consulting engagements. Whether you need someone to architect scalable
                                systems, lead engineering teams, or build AI-powered solutions, I&apos;d love to discuss
                                how we can work together.
                            </p>
                        </div>

                        {/* Contact Methods */}
                        <div className="space-y-6">
                            {/* Email */}
                            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                                <Mail className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground">Email Me</h4>
                                                <p className="text-muted-foreground">{contactInfo.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={copyEmail}
                                                className="transition-all hover:scale-105"
                                            >
                                                {copiedEmail ? (
                                                    <Check className="w-4 h-4" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                            </Button>
                                            <Button size="sm" asChild className="transition-all hover:scale-105">
                                                <a href={`mailto:${contactInfo.email}`}>
                                                    <Send className="w-4 h-4 mr-2" />
                                                    Send
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Phone */}
                            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                                                <Phone className="w-6 h-6 text-blue-500" />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-foreground">Call Me</h4>
                                                <p className="text-muted-foreground">{contactInfo.phone}</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                            className="transition-all hover:scale-105"
                                        >
                                            <a href={`tel:${contactInfo.phone}`}>
                                                <Phone className="w-4 h-4 mr-2" />
                                                Call
                                            </a>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Location */}
                            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                                <CardContent className="p-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                                            <MapPin className="w-6 h-6 text-green-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">Location</h4>
                                            <p className="text-muted-foreground">{contactInfo.location}</p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Available for remote work worldwide
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Availability Status */}
                        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 dark:from-green-950/20 dark:to-emerald-950/20 dark:border-green-800">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                    <div>
                                        <h4 className="font-semibold text-green-800 dark:text-green-300">
                                            Available for New Projects
                                        </h4>
                                        <p className="text-green-600 dark:text-green-400 text-sm">
                                            Currently accepting new opportunities and collaborations
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Social Links */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <MessageCircle className="w-5 h-5 mr-2 text-primary" />
                                    Connect With Me
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    {contactInfo.socialLinks.map((social) => {
                                        const IconComponent = socialIcons[social.platform as keyof typeof socialIcons];
                                        return (
                                            <Button
                                                key={social.platform}
                                                variant="outline"
                                                asChild
                                                className="justify-start h-auto p-4 transition-all hover:scale-105 hover:shadow-md"
                                            >
                                                <a href={social.url} target="_blank" rel="noopener noreferrer">
                                                    <IconComponent className="w-5 h-5 mr-3" />
                                                    <div className="text-left">
                                                        <div className="font-medium">{social.platform}</div>
                                                        {social.username && (
                                                            <div className="text-xs text-muted-foreground">
                                                                @{social.username}
                                                            </div>
                                                        )}
                                                    </div>
                                                </a>
                                            </Button>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Calendar className="w-5 h-5 mr-2 text-primary" />
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button
                                    className="w-full justify-start h-auto p-4 bg-primary hover:bg-primary/90 transition-all hover:scale-105"
                                    onClick={() =>
                                        window.open(
                                            `mailto:${contactInfo.email}?subject=Project Collaboration&body=Hi Brhane,%0A%0AI'm interested in discussing a project collaboration with you.`
                                        )
                                    }
                                >
                                    <Mail className="w-5 h-5 mr-3" />
                                    <div className="text-left">
                                        <div className="font-medium">Start a Project</div>
                                        <div className="text-xs opacity-90">Send a project inquiry</div>
                                    </div>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start h-auto p-4 transition-all hover:scale-105"
                                    asChild
                                >
                                    <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="w-5 h-5 mr-3" />
                                        <div className="text-left">
                                            <div className="font-medium">Download Resume</div>
                                            <div className="text-xs text-muted-foreground">View my full background</div>
                                        </div>
                                    </a>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start h-auto p-4 transition-all hover:scale-105"
                                    onClick={() => scrollToSection("projects")}
                                >
                                    <ExternalLink className="w-5 h-5 mr-3" />
                                    <div className="text-left">
                                        <div className="font-medium">View My Work</div>
                                        <div className="text-xs text-muted-foreground">See my recent projects</div>
                                    </div>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Response Time */}
                        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-950/20 dark:to-indigo-950/20 dark:border-blue-800">
                            <CardContent className="p-6">
                                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                                    Fast Response Time
                                </h4>
                                <p className="text-blue-600 dark:text-blue-400 text-sm">
                                    I typically respond to emails within 24 hours. For urgent matters, feel free to
                                    mention &quot;URGENT&quot; in your subject line.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 text-center">
                    <Separator className="mb-8" />
                    <h3 className="text-2xl font-bold text-foreground mb-4">Ready to get started?</h3>
                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Whether you have a clear vision or just an idea, I&apos;m here to help bring it to life.
                        Let&apos;s discuss how we can work together to create something amazing.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            size="lg"
                            onClick={() => window.open(`mailto:${contactInfo?.email}?subject=Let's work together!`)}
                            className="bg-primary hover:bg-primary/90 px-8 py-3 rounded-full font-medium transition-all hover:shadow-lg hover:scale-105"
                        >
                            <Mail className="mr-2 w-5 h-5" />
                            Send Message
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => scrollToSection("about")}
                            className="px-8 py-3 rounded-full font-medium transition-all hover:shadow-lg hover:scale-105"
                        >
                            Learn More About Me
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
