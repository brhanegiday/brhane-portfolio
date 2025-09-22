"use client";

import { Separator } from "@/components/ui/separator";
import { contactInfo, navSections, personalInfo } from "@/lib/data";
import { ExternalLink, Github, Instagram, Linkedin, Mail, MapPin, Youtube } from "lucide-react";

const socialIcons = {
    GitHub: Github,
    LinkedIn: Linkedin,
    YouTube: Youtube,
    Instagram: Instagram,
};

export function Footer() {
    const currentYear = new Date().getFullYear();

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <footer className="bg-muted/30 border-t">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12 lg:py-16">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Brand Column */}
                        <div className="lg:col-span-4 space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">BG</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-foreground">{personalInfo.name}</h3>
                                    <p className="text-xs text-muted-foreground">Software Engineer & AI Researcher</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                                From full-stack apps to DevOps pipelines and applied AI research, I bridge design, code,
                                and data to deliver technology that matters.
                            </p>

                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>{contactInfo.location}</span>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="lg:col-span-2 space-y-4">
                            <h4 className="font-semibold text-sm text-foreground">Quick Links</h4>
                            <nav className="flex flex-col space-y-2.5">
                                {navSections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                                    >
                                        {section.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Resources */}
                        <div className="lg:col-span-3 space-y-4">
                            <h4 className="font-semibold text-sm text-foreground">Resources</h4>
                            <div className="flex flex-col space-y-2.5">
                                <a
                                    href={personalInfo.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                                >
                                    Resume
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                                <a
                                    href={personalInfo.cvUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                                >
                                    Curriculum Vitae
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                                <a
                                    href="https://github.com/brhanegiday"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                                >
                                    GitHub
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                                <a
                                    href="https://youtube.com/@bashandbeyond"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5"
                                >
                                    Bash & Beyond
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>

                        {/* Contact & Social */}
                        <div className="lg:col-span-3 space-y-4">
                            <h4 className="font-semibold text-sm text-foreground">Get in Touch</h4>
                            <div className="space-y-3">
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <Mail className="w-4 h-4 flex-shrink-0" />
                                    <span className="truncate">{contactInfo.email}</span>
                                </a>

                                {/* Social Links */}
                                <div className="flex items-center space-x-3 pt-1">
                                    {contactInfo.socialLinks.map((social) => {
                                        const IconComponent = socialIcons[social.platform as keyof typeof socialIcons];
                                        if (!IconComponent) return null;

                                        return (
                                            <a
                                                key={social.platform}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                                                aria-label={social.platform}
                                            >
                                                <IconComponent className="w-4 h-4" />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Separator />

                {/* Bottom Footer */}
                <div className="py-6">
                    <div className="flex justify-center">
                        {/* Copyright */}
                        <div className="text-sm text-muted-foreground text-center sm:text-left">
                            <span>
                                © {currentYear} {personalInfo.name}. All rights reserved.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
