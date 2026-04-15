"use client";

import { Separator } from "@/components/ui/separator";
import { contactInfo, navSections, personalInfo } from "@/lib/data";
import { ExternalLink, Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { BrandLogo } from "@/components/common/brand-logo";

const socialIcons = {
    GitHub: Github,
    LinkedIn: Linkedin,
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
            <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12">
                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* Brand Column */}
                        <div className="lg:col-span-4 space-y-3">
                            <BrandLogo className="text-primary" />
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                                From full-stack apps to DevOps pipelines and applied AI research, I bridge design, code,
                                and data to deliver technology that matters.
                            </p>
                            <div className="flex items-center space-x-1.5 text-sm text-muted-foreground">
                                <MapPin className="w-3.5 h-3.5" />
                                <span>{contactInfo.location}</span>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="lg:col-span-2 space-y-3">
                            <h4 className="font-semibold text-sm">Quick Links</h4>
                            <nav className="flex flex-col space-y-2">
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
                        <div className="lg:col-span-3 space-y-3">
                            <h4 className="font-semibold text-sm">Resources</h4>
                            <div className="flex flex-col space-y-2">
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
                            </div>
                        </div>

                        {/* Contact & Social */}
                        <div className="lg:col-span-3 space-y-3">
                            <h4 className="font-semibold text-sm">Get in Touch</h4>
                            <div className="space-y-3">
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                    <Mail className="w-3.5 h-3.5 shrink-0" />
                                    <span className="truncate">{contactInfo.email}</span>
                                </a>

                                {/* Social Links */}
                                <div className="flex items-center space-x-2">
                                    {contactInfo.socialLinks.map((social) => {
                                        const IconComponent = socialIcons[social.platform as keyof typeof socialIcons];
                                        if (!IconComponent) return null;

                                        return (
                                            <a
                                                key={social.platform}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
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
                <div className="py-5">
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground">
                            © {currentYear} {personalInfo.name}. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
