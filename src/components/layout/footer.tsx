"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { contactInfo, navSections, personalInfo } from "@/lib/data";
import { ArrowUp, ExternalLink, Github, Heart, Instagram, Linkedin, Mail, MapPin, Twitter } from "lucide-react";

const socialIcons = {
    GitHub: Github,
    LinkedIn: Linkedin,
    Twitter: Twitter,
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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-muted/30 border-t">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-16">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Brand Column */}
                        <div className="lg:col-span-1 space-y-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-primary to-blue-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">BG</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-xl text-foreground">{personalInfo.name}</h3>
                                    <p className="text-sm text-muted-foreground">Software Engineer & AI Researcher</p>
                                </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                Building innovative solutions at the intersection of AI and healthcare technology.
                                Passionate about creating meaningful impact through code.
                            </p>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>{contactInfo.location}</span>
                            </div>
                        </div>

                        {/* Navigation Links */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-foreground">Navigation</h4>
                            <nav className="flex flex-col space-y-2">
                                {navSections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => scrollToSection(section.id)}
                                        className="text-muted-foreground hover:text-primary transition-colors text-sm text-left"
                                    >
                                        {section.label}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Resources */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-foreground">Resources</h4>
                            <div className="flex flex-col space-y-2">
                                <a
                                    href={personalInfo.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center"
                                >
                                    Resume
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                                <a
                                    href={personalInfo.cvUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center"
                                >
                                    Full CV
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                                <a
                                    href="https://github.com/brhanegiday"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center"
                                >
                                    GitHub Profile
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                                <button
                                    onClick={() => window.open(`mailto:${contactInfo.email}`)}
                                    className="text-muted-foreground hover:text-primary transition-colors text-sm text-left"
                                >
                                    Email Me
                                </button>
                            </div>
                        </div>

                        {/* Contact & Social */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-foreground">Connect</h4>
                            <div className="space-y-3">
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                                >
                                    <Mail className="w-4 h-4" />
                                    <span>{contactInfo.email}</span>
                                </a>

                                {/* Social Links */}
                                <div className="flex space-x-4 pt-2">
                                    {contactInfo.socialLinks.map((social) => {
                                        const IconComponent = socialIcons[social.platform as keyof typeof socialIcons];
                                        if (!IconComponent) return null;

                                        return (
                                            <a
                                                key={social.platform}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                                                aria-label={`Follow on ${social.platform}`}
                                            >
                                                <IconComponent className="w-5 h-5" />
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
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        {/* Copyright */}
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>
                                © {currentYear} {personalInfo.name}. All rights reserved.
                            </span>
                        </div>

                        {/* Built With */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <span>Built with</span>
                                <Heart className="w-3 h-3 text-red-500" />
                                <span>using</span>
                                <a
                                    href="https://nextjs.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Next.js
                                </a>
                                <span>&</span>
                                <a
                                    href="https://tailwindcss.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Tailwind CSS
                                </a>
                            </div>

                            {/* Back to Top */}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={scrollToTop}
                                className="text-muted-foreground hover:text-primary transition-all hover:scale-110"
                                aria-label="Back to top"
                            >
                                <ArrowUp className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Legal Links (if needed) */}
                <div className="pb-6">
                    <div className="flex justify-center space-x-6 text-xs text-muted-foreground">
                        <button className="hover:text-primary transition-colors">Privacy Policy</button>
                        <button className="hover:text-primary transition-colors">Terms of Service</button>
                        <button className="hover:text-primary transition-colors">Cookie Policy</button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
